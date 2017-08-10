import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';
import Formsy from 'formsy-react';

import UserItem from '../shared/UserItem';
import Input from '../shared/form/Input';
import Snackbar from 'material-ui/Snackbar';
import {
  RadioButton,
  RaisedButton,
} from 'material-ui';
import Field from '../../stores/models/form/Field';
import FieldGroup from '../../stores/models/form/FieldGroup';
import RadioGroup from '../shared/form/RadioGroup';

@inject('usersStore')
@inject('friendsStore')
@observer
class UserList extends React.Component {
  componentWillMount() {
    this.form = new FieldGroup({
      displayName: new Field({
        name: 'displayName',
        value: this.props.usersStore.queries.displayName,
      }),
      gender: new Field({
        name: 'gender',
        value: this.props.usersStore.queries.gender,
      }),
    });
    if (!this.props.usersStore.users.length) {
      this.props.usersStore.fetchItems(this.props.usersStore.replaceUsers);
    }
  }

  load() {
    this.props.usersStore.paginate();
  }

  onSubmitForm() {
    this.props.usersStore.search(this.form.data);
  }

  render() {
    return (
      <div>
        <Formsy.Form
          className="row"
          style={{margin: '15px 0'}}
          onValidSubmit={::this.onSubmitForm}
        >
          <div className="col-sm-4">
            <RadioGroup
              name="gender"
              value={this.form.fields.gender.value}
              onChange={this.form.fields.gender.change}
            >
              <RadioButton
                value=""
                label="All"
              />
              <RadioButton
                value="male"
                label="Male"
              />
              <RadioButton
                value="female"
                label="Female"
              />
            </RadioGroup>
          </div>
            <div className="col-sm-6">
              <Input
                floatingLabelText="Search"
                name="displayName"
                type="text"
                onChange={this.form.fields.displayName.change}
                value={this.form.fields.displayName.value}
              />
            </div>
          <div
            className="col-sm-2"
            style={{marginTop: '25px'}}
          >
            <RaisedButton
              type="submit"
              label="Submit"
              fullWidth
              primary
            />
          </div>

        </Formsy.Form>
        <div className="row">
          {
            this.props.usersStore.users.map((user) => {
              return (
                <UserItem
                  className="col-md-4 col-sm-6"
                  key={user._id}
                  onDelete={this.props.friendsStore.onDelete}
                  unFriend={this.props.usersStore.unFriend}
                  onAddToFriends={this.props.friendsStore.addUserToFriendsList}
                  onFriendStatus={this.props.usersStore.friend}
                  user={user}
                />
              );
            })
          }
        </div>
        <Snackbar
          open={this.props.friendsStore.isOpenSnackBar}
          message="Successfully added to friends list"
          action="close"
          autoHideDuration={5000}
          onActionTouchTap={this.props.friendsStore.closeSnackBar}
          onRequestClose={this.props.friendsStore.closeSnackBar}
        />

        {
          this.props.usersStore.users.length < this.props.usersStore.total &&
          <RaisedButton
            label="Load More"
            primary
            fullWidth
            onTouchTap={::this.load}
          />
        }
      </div>
    );
  }
}

UserList.propTypes = {
  // optionalString: React.PropTypes.string,
};

UserList.defaultProps = {};

export default UserList;
