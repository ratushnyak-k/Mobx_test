import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import UserDetails from '../pages/UserDetails';

@inject('appStore')
@observer
class Profile extends React.Component {
  render() {
    if (Object.keys(this.props.appStore.userData).length) {
      return (
        <UserDetails
          myProfileId={this.props.appStore.userData._id}
        />
      );
    } else {

      return null;
    }
  }
}

Profile.propTypes = {
  // optionalString: React.PropTypes.string,
};

Profile.defaultProps = {};

export default Profile;
