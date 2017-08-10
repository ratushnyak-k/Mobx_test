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


const propTypes = {};

const defaultProps = {};

const UserItem = (props) => {
  const {user} = props;
  const addUserToFriends = () => {
    props.onFriendStatus(user._id);
    props.onAddToFriends(user);
  };

  const onDelete = () => {
    props.onDelete(user._id);
    props.unFriend(user._id);
  };

  return (
    <div className={props.className} style={{marginBottom: '30px'}}>
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
          <div><b>Date of Birth:</b> {user.dob ? moment(user.dob).format('Do MMMM YYYY'): '-'}</div>
          <div><b>Phone:</b> {user.phone || '-'}</div>
        </CardText>
        <CardActions>
          {
            (props.onAddToFriends && !user.isMyFriend) &&
            <RaisedButton
              label="Add to friends"
              secondary
              onTouchTap={addUserToFriends}
            />
          }
          {
            (props.onDelete && user.isMyFriend) &&
            <FlatButton
              label="Remove from friends"
              onTouchTap={onDelete}
              secondary
            />
          }
        </CardActions>
      </Card>
    </div>
  );
};


export default observer(UserItem);
UserItem.propTypes = propTypes;
UserItem.defaultProps = defaultProps;