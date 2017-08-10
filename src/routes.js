import React from 'react';
import {
  IndexRoute,
  Route,
} from 'react-router';

import App from './components/App';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import AcitvateAccount from './components/pages/AcitvateAccount'
import UserList from './components/pages/UserList';
import FriendsList from './components/pages/FriendsList';
import Profile from './components/pages/Profile';
import ProfileEdit from './components/pages/ProfileEdit';
import Error from './components/pages/Error';
import UserDetails from './components/pages/UserDetails';

import RouterHooks from './utils/RouterHooks'
const Routes = (

  <Route
    path="/"
    component={App}
  >
    <IndexRoute
      component={Home}
    />
    <Route
      onEnter={RouterHooks.requireBeingUnauth}
      mustBeRedirectedTo="/"
      path="/sign-up"
      component={SignUp}
    />
    <Route
      onEnter={RouterHooks.requireBeingUnauth}
      mustBeRedirectedTo="/"
      path="/sign-in"
      component={SignIn}
    />
    <Route
      onEnter={RouterHooks.requireBeingUnauth}
      mustBeRedirectedTo="/"
      path="/activate-account"
      component={AcitvateAccount}
    />
    <Route
      onEnter={RouterHooks.requireBeingAuth}
      mustBeRedirectedTo="/sign-in"
      path="/user-list"
      component={UserList}
    />
    <Route
      onEnter={RouterHooks.requireBeingAuth}
      mustBeRedirectedTo="/sign-in"
      path="/friends-list"
      component={FriendsList}
    />
    <Route
      path="/user/:id"
      component={UserDetails}
    />
    <Route
      path="/profile"
      component={Profile}
    />
     <Route
       path="/profile/edit"
       component={ProfileEdit}
     />
    <Route
      path="*"
      component={Error}
    />
  </Route>
);

export default Routes;
