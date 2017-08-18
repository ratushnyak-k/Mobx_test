import React from 'react';
import { Link } from 'react-router';
import DevTools from 'mobx-react-devtools';
import {
  observer,
  inject,
} from 'mobx-react';
import {
  AppBar,
  FlatButton,
  IconButton,
  IconMenu,
  LinearProgress,
  MenuItem,
} from 'material-ui';

import HeaderDropDown from './shared/HeaderDropDown';
import AuthSession from '../utils/AuthSession';
import API from '../utils/API';
import {
  ApiRoutes,
} from '../utils/constants';


const propTypes = {};

const defaultProps = {};

@inject('appStore')
@inject('usersStore')
@inject('friendsStore')

@observer
class App extends React.Component {

  onSignOut() {
    this.props.appStore.signout();
    this.props.router.replace('/');
  }

  async componentWillMount() {
    if (!AuthSession.isTokenSet()) {
      return;
    }

    try {
      AuthSession.setHeader();
      const response = await API.getData(ApiRoutes.myProfile);
      this.props.appStore.setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <DevTools
          position={{
            bottom: 0,
            right: 0,
          }}
        />

        <AppBar
          title={<Link to="/">MobX Test</Link>}
          iconElementRight={
            <div>
              {
                !this.props.appStore.userData._id &&
                <Link to="/sign-up">
                  <FlatButton label="Sign Up" />
                </Link>
              }
              {
                !this.props.appStore.userData._id &&
                <Link to="/sign-in">
                  <FlatButton label="Sign In" />
                </Link>
              }
              {
                this.props.appStore.userData._id &&
                <Link to="/user-list">
                  <FlatButton
                    label="Users list"
                    secondary={this.props.location.pathname === '/user-list'}
                  />
                </Link>
              }
              {
                this.props.appStore.userData._id &&
                <Link to="/friends-list">
                  <FlatButton
                    label="Friends list"
                    secondary={this.props.location.pathname === '/friends-list'}
                  />
                </Link>
              }
              {
                this.props.appStore.userData._id &&
                <IconMenu
                  className="expander"
                  iconButtonElement={<IconButton>
                    <HeaderDropDown
                      photo={this.props.appStore.userData.photo}
                    />
                  </IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <Link to="/profile">
                    <MenuItem primaryText="Profile" />
                  </Link>
                  <MenuItem
                    onTouchTap={::this.onSignOut}
                    primaryText="Sign out"
                  />
                </IconMenu>
              }
            </div>
          }
        />

        {
          (this.props.usersStore.loading || this.props.friendsStore.loading) &&
          <LinearProgress
            color="#ff4081"
            className="spinner-main"
          />
        }
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default App;
App.propTypes = propTypes;
App.defaultProps = defaultProps;