import React from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle,
  FlatButton,
  RaisedButton,
} from 'material-ui';
import moment from 'moment';
import { Link } from 'react-router';

import {
  friendsStatuses,
} from '../../utils/constants';
import { userTabs } from '../../utils/constants';


const propTypes = {};

const defaultProps = {};

@observer
class UserItem extends React.Component {
  request() {
    this.props.request(this.props.myId, this.props.user._id);
  };

  cancel() {
    this.props.cancel(this.props.user._id);
  };

  accept() {
    this.props.accept(this.props.user._id);
    if (this.props.removeFromList) {
      this.props.removeFromList(userTabs.pending, this.props.user._id);
    }
  };

  deny() {
    this.props.deny(this.props.user._id);
    if (this.props.removeFromList) {

      this.props.removeFromList(userTabs.pending, this.props.user._id);
    }
  };

  remove() {
    this.props.remove(this.props.user._id);
    if (this.props.removeFromList) {

      this.props.removeFromList(userTabs.friends, this.props.user._id);
    }
  };

  render() {
    const {user} = this.props;
    return (
      <div className={this.props.className} style={{marginBottom: '30px'}}>
        <Card>
          <Link to={`/user/${user._id}`}>
            <CardMedia
              overlay={
                <CardTitle
                  title={user.displayName}
                />
              }
            >
              <img
                src={user.photo || 'http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png'}
                alt={user.displayName}
              />
            </CardMedia>
          </Link>
          <CardText>
            <div><b>Date of Birth:</b> {user.dob ? moment(user.dob).format('Do MMMM YYYY') : '-'}</div>
            <div><b>Phone:</b> {user.phone || '-'}</div>
          </CardText>
          {
            !(this.props.myId === user._id) &&
            <CardActions>
              {
                this.props.request &&
                (user.friendship.status === friendsStatuses.NOT_FRIENDS ||
                  user.friendship.status === friendsStatuses.FRIENDS_OF_FRIENDS) &&
                <RaisedButton
                  label="Add to friends"
                  secondary
                  onTouchTap={::this.request}
                />
              }
              {
                (this.props.cancel && user.friendship.status === friendsStatuses.PENDING_FRIENDS) &&
                (this.props.myId === user.friendship.requester) &&
                <div>
                  <FlatButton
                    secondary
                    disabled
                    label="Pending..."
                  />
                  <FlatButton
                    label="Cancel request"
                    onTouchTap={::this.cancel}
                    secondary
                  />
                </div>
              }
              {
                ((this.props.accept && this.props.deny) &&
                  user.friendship.status === friendsStatuses.PENDING_FRIENDS) &&
                !(this.props.myId === user.friendship.requester) &&
                <div>
                  <RaisedButton
                    style={{marginRight: '15px'}}
                    label="Accept"
                    onTouchTap={::this.accept}
                    primary
                  />
                  <FlatButton
                    secondary
                    label="Deny"
                    onTouchTap={::this.deny}
                  />
                </div>
              }
              {
                this.props.remove &&
                user.friendship.status === friendsStatuses.FRIENDS &&

                <div>
                  <FlatButton
                    label="Remove from friends"
                    onTouchTap={::this.remove}
                    secondary
                  />
                </div>
              }
            </CardActions>
          }
        </Card>
      </div>
    );
  }
}

export default observer(UserItem);
UserItem.propTypes = propTypes;
UserItem.defaultProps = defaultProps;