import {
  observable,
  action,
  useStrict,
} from 'mobx';
import {
  merge,
  isEqual,
} from 'lodash';
import { deserialize } from 'serializr';

import UserModel from './models/UserModel';
import {
  ApiRoutes,
} from '../utils/constants';
import API from '../utils/API';
import * as mobx from 'mobx';

useStrict(true);

export class UsersStore {
  @observable users = [];
  @observable userDetails = {};
  @observable options = {
    offset: 0,
    limit: 10,
  };
  @observable queries = {
    displayName: '',
    gender: '',
  };

  @observable total = 0;

  @action.bound
  async fetchItems(cb) {
    try {
      const options = merge(mobx.toJS(this.options), mobx.toJS(this.queries));
      const response = await API.getData(ApiRoutes.users, options);
      cb(response.data.docs);
      this.setTotal(response.data.total);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async fetchUser(id) {
    try {
      const response = await API.getData(ApiRoutes.user(id));
      this.setUser(response.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound setTotal(total) {
    this.total = total;
  }

  @action.bound paginate() {
    this.options.offset = this.options.offset + 10;
    this.fetchItems(this.concatUsers);
  }

  @action.bound search(queries) {
    if (!isEqual(mobx.toJS(this.queries), queries)) {
      this.queries = queries;
      this.fetchItems(this.replaceUsers);
    }
  }

  @action.bound concatUsers(data) {
    const users = data.map(user => deserialize(UserModel, user));
    this.users = this.users.concat(users);
  }

  @action.bound replaceUsers(data) {
    this.users = data.map(user => deserialize(UserModel, user));
  }

  @action.bound setUser(user) {
    this.userDetails = deserialize(UserModel, user);
  }

  @action.bound friend(id) {
    this.users.forEach((user) => {
      if (user._id === id) {
        user.isMyFriend = true;
      }
    });
  }

  @action.bound unFriend(id) {
    this.users.forEach((user) => {
      if (user._id === id) {
        user.isMyFriend = false;
      }
    });
  }
}

export default new UsersStore();
