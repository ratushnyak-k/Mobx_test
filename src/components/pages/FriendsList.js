import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';
import UserItem from '../shared/UserItem';

@inject('friendsStore')
@inject('usersStore')
@observer
class FriendsList extends React.Component {
  render() {
    return (
      <div className="row">
        {
          this.props.friendsStore.friends.map((user) => {
            return (
              <UserItem
                key={user.id}
                onDelete={this.props.friendsStore.onDelete}
                unFriend={this.props.usersStore.unFriend}
                user={user}
              />
            );
          })
        }
      </div>
    );
  }
}

FriendsList.propTypes = {
  // optionalString: React.PropTypes.string,
};

FriendsList.defaultProps = {};

export default FriendsList;
