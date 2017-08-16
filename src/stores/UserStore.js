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

  @action.bound
  setTotal(total) {
    this.total = total;
  }

  @action.bound
  paginate() {
    this.options.offset = this.options.offset + 10;
    this.fetchItems(this.concatUsers);
  }

  @action.bound
  search(queries) {
    if (!isEqual(mobx.toJS(this.queries), queries)) {
      this.queries = queries;
      this.options.offset = 0;
      this.fetchItems(this.replaceUsers);
    }
  }

  @action.bound
  concatUsers(data) {
    const users = data.map(user => deserialize(UserModel, user));
    this.users = this.users.concat(users);
  }

  @action.bound
  replaceUsers(data) {
    this.users = data.map(user => deserialize(UserModel, user));
  }

  @action.bound
  setUser(user) {
    this.userDetails = deserialize(UserModel, user);
  }

  @action.bound
  setFriendship(_id, friendship) {
    this.users.map((user) => {
      if (user._id === _id) {
        return user.friendship = friendship;
      }
      return user;
    });
  }

  @action.bound
  async request(myId, _id) {
    try {
      const response = await API.postData(ApiRoutes.friends.request(_id));
      const data = {
        requester: myId,
        status: response.data.status
      };
      this.setFriendship(_id, data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound
  async cancel(_id) {
    try {
      const response = await API.postData(ApiRoutes.friends.cancel(_id));
      this.setFriendship(_id, response.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound
  async accept(_id) {
    try {
      const response = await API.postData(ApiRoutes.friends.accept(_id));
      this.setFriendship(_id, response.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound
  async deny(_id) {
    try {
      const response = await API.postData(ApiRoutes.friends.deny(_id));
      this.setFriendship(_id, response.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound
  async remove(_id) {
    try {
      const response = await API.postData(ApiRoutes.friends.remove(_id));
      this.setFriendship(_id, response.data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}

export default new UsersStore();
