import AuthSession from './AuthSession';

class RouterHooks {
  static requireBeingAuth(nextState, replace, callback) {
    const {mustBeRedirectedTo} = nextState.routes[nextState.routes.length - 1];

    if (!AuthSession.isTokenSet() && mustBeRedirectedTo) {
      replace({
        pathname: mustBeRedirectedTo,
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    }

    callback();
  };

  static requireBeingUnauth(nextState, replace, callback) {
    const {mustBeRedirectedTo} = nextState.routes[nextState.routes.length - 1];

    if (AuthSession.isTokenSet() && mustBeRedirectedTo) {
      replace({
        pathname: mustBeRedirectedTo,
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    }

    callback();
  };
}


export default RouterHooks;
