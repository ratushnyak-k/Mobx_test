import {
  action,
  observable,
  useStrict,
} from 'mobx';
import {
  isEqual,
  merge,
} from 'lodash';
import * as mobx from 'mobx';
import { deserialize } from 'serializr';

import API from '../utils/API';
import {
  ApiRoutes,
  userTabs,
} from '../utils/constants';
import UserModel from '../stores/models/UserModel';

useStrict(true);

export class FriendsStore {
  @observable initialQueries = {
    displayName: '',
    gender: '',
  };

  @observable initialOptions = {
    offset: 0,
    limit: 10,
  };

  @observable data = {
    [userTabs.friends]: [],
    [userTabs.pending]: [],
  };

  @observable isOpenSnackBar = false;
  @observable options = {
    [userTabs.friends]: {...this.initialOptions},
    [userTabs.pending]: {...this.initialOptions},
  };

  @observable queries = {
    [userTabs.friends]: {...this.initialQueries},
    [userTabs.pending]: {...this.initialQueries},
  };

  @observable total = {
    [userTabs.friends]: 0,
    [userTabs.pending]: 0,
  };

  activeTab = observable.box(userTabs.friends);

  @action.bound
  changeTab(value) {
    this.activeTab.set(value);
  }

  @action.bound
  async fetchItems(dataKey, cb) {
    try {
      const options = merge(
        mobx.toJS(this.options[dataKey]),
        mobx.toJS(this.queries[dataKey]),
      );
      const url = dataKey === userTabs.friends ? ApiRoutes.friends.get : ApiRoutes.friends.pending;
      const response = await API.getData(url, options);
      cb(dataKey, response.data.docs);
      this.setTotal(dataKey, response.data.total);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound
  setTotal(dataKey, total) {
    this.total[dataKey] = total;
  }

  @action.bound
  paginate(dataKey) {
    this.options[dataKey].offset = this.options[dataKey].offset + 10;
    this.fetchItems(dataKey, this.concatUsers);
  }

  @action.bound
  resetOptions() {
    this.options[userTabs.friends] = {...this.initialOptions};
    this.options[userTabs.pending] = {...this.initialOptions};
  }

  @action.bound
  search(dataKey, queries) {
    if (!isEqual(mobx.toJS(this.queries[dataKey]), queries)) {
      this.queries[dataKey] = queries;
      this.options[dataKey].offset = 0;
      this.fetchItems(dataKey, this.replaceUsers);
    }
  }

  @action.bound
  concatUsers(dataKey, data) {
    const users = data.map(user => deserialize(UserModel, user));
    this.data[dataKey] = this.data[dataKey].concat(users);
  }

  @action.bound
  replaceUsers(dataKey, data) {
    this.data[dataKey] = data.map(user => deserialize(UserModel, user));
  }

  @action.bound
  removeFromList(dataKey, _id) {
    this.data[dataKey] = this.data[dataKey].filter((item) => {
      return item._id !== _id;
    });
  }

}

export default new FriendsStore();
