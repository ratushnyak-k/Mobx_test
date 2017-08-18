import React from 'react';
import ReactDOM from 'react-dom';
import {
  browserHistory,
  Router,
} from 'react-router';

import { Provider } from 'mobx-react';
import AppStore from './stores/AppStore';
import UserStore from './stores/UserStore';
import FriendsStore from './stores/FriendsStore';

import injectTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import 'bootstrap-css';

import routes from './routes';
import { MuiThemeProvider } from 'material-ui/styles/index';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Provider
      usersStore={UserStore}
      friendsStore={FriendsStore}
      appStore={AppStore}
    >
      <Router
        routes={routes}
        history={browserHistory}
      />
    </Provider>
  </MuiThemeProvider>, document.getElementById('root'));
