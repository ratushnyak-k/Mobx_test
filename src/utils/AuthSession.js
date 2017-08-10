import axios from 'axios';
// -
import Storage from './Storage';


class AuthSession {
  static tokenKey = 'mobXTestToken';

  static isTokenSet() {
    const authToken = Storage.get(AuthSession.tokenKey);
    return authToken && !!(authToken.trim());
  };


  static setHeader() {
    if (AuthSession.isTokenSet()) {
      axios.defaults.headers['Authorization'] = Storage.get(AuthSession.tokenKey);
    }
  };

  static removeHeader() {
    axios.defaults.headers['Authorization'] = '';
  };

  static set(tokenValue) {
    Storage.set(AuthSession.tokenKey, tokenValue);
    AuthSession.setHeader();
  };

  static remove() {
    Storage.remove(AuthSession.tokenKey);
    AuthSession.removeHeader();
  };
}


export default AuthSession;
