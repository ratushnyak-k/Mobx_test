import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import Snackbar from 'material-ui/Snackbar';
import {
  RaisedButton,
} from 'material-ui';

import Field from '../../stores/models/form/Field';
import FieldGroup from '../../stores/models/form/FieldGroup';
import UserItem from '../shared/UserItem';
import ListFilter from '../shared/ListFilter';

@inject('usersStore')
@inject('friendsStore')
@inject('appStore')
@observer
class UserList extends React.Component {
  componentWillMount() {
    if (!this.props.usersStore.users.length) {
      this.props.usersStore.fetchItems(this.props.usersStore.replaceUsers);
    }
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
        <ListFilter
          onSubmitForm={::this.onSubmitForm}
          clear
          formModel={this.form}
        />
        <div className="row">
          {
            this.props.usersStore.users.map((user) => {
              return (
                <UserItem
                  className="col-md-4 col-sm-6"
                  key={user._id}
                  request={this.props.usersStore.request}
                  cancel={this.props.usersStore.cancel}
                  accept={this.props.usersStore.accept}
                  deny={this.props.usersStore.deny}
                  remove={this.props.usersStore.remove}
                  user={user}
                  myId={this.props.appStore.userData._id}
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
