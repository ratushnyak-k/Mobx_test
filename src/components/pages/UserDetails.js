import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import UserItem from '../shared/UserItem';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';

@inject('appStore')
@inject('usersStore')
@inject('friendsStore')
@observer
class UserDetails extends React.Component {
  componentWillMount() {
    this.props.usersStore.fetchUser(this.props.myProfileId || this.props.params.id);
  }

  render() {
    const {userDetails} = this.props.usersStore;
    if (!Object.keys(userDetails).length) {
      return null;
    }
    return (
      <div className="row">
        <UserItem
          className="col-sm-6"
          request={this.props.usersStore.request}
          cancel={this.props.usersStore.cancel}
          accept={this.props.usersStore.accept}
          deny={this.props.usersStore.deny}
          remove={this.props.usersStore.remove}
          myId={this.props.appStore.userData._id}
          user={userDetails}
        />
        <div className="col-sm-6">
          {
            this.props.myProfileId &&
            <div style={{textAlign: 'right'}}>
              <Link to="/profile/edit">
                <RaisedButton
                  label="Edit"
                  secondary
                />
              </Link>
            </div>
          }
          <div>
            <b>Email:</b> {userDetails.email || '-'}
          </div>
          <div>
            <b>Gender:</b> {userDetails.gender || '-'}
          </div>
          <div>
            <b>State:</b> {userDetails.location.state || '-'}
          </div>
          <div>
            <b>City:</b> {userDetails.location.city || '-'}
          </div>
          <div>
            <b>Street:</b> {userDetails.location.street || '-'}
          </div>
          <div>
            <b>Postcode:</b> {userDetails.location.postcode || '-'}
          </div>
        </div>
      </div>
    );
  }
}

UserDetails.propTypes = {
  // optionalString: React.PropTypes.string,
};

UserDetails.defaultProps = {};

export default UserDetails;
