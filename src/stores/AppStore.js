import {
  observable,
  action,
  useStrict,
} from 'mobx';
import AuthSession from '../utils/AuthSession';
import API from '../utils/API';
import { ApiRoutes } from '../utils/constants';


useStrict(true);

export class AppStore {
  @observable userData = {};

  @action.bound signout() {
    this.setUserData({});
    AuthSession.remove();
  }

  @action.bound setUserData(data) {
    this.userData = data;
  }


  async generate() {
    try {
      const response = await API.getData('https://randomuser.me/api/', {
        results: 100,
      });
      console.log(response.data.results);
      const data = response.data.results.map((item, i) => {
        let newItem = {};
        newItem.displayName = item.name.first + ' ' + item.name.last;
        newItem.email = item.email;
        newItem.password = item.login.password;
        newItem.photo = item.picture.large;
        newItem.location = item.location;
        console.log(newItem.location, i);
        newItem.phone = item.phone;
        newItem.gender = item.gender;
        newItem.dob = new Date(item.dob);
        return newItem;
      });
      data.push({
        displayName: 'Kostya Ratushnyak',
        email: 'ratushnyak@steelkiwi.com',
        password: '12345',
        photo: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/15698218_1399415436758358_7453856702470598442_n.jpg?oh=135f28a8e14e9ef7b13d204446620229&oe=5A2E180D',
      });
      //data.forEach(item => {
      //  API.postData(ApiRoutes.signup, item);
      //});
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }


}

export default new AppStore();
