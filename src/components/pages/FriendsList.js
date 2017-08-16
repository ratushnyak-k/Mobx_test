import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';
import {
  Tabs,
  Tab,
  RaisedButton,
  Badge,
} from 'material-ui';

import Field from '../../stores/models/form/Field';
import FieldGroup from '../../stores/models/form/FieldGroup';
import UserItem from '../shared/UserItem';
import ListFilter from '../shared/ListFilter';
import { userTabs } from '../../utils/constants';

@inject('friendsStore')
@inject('usersStore')
@inject('appStore')
@observer
class FriendsList extends React.Component {

  componentWillMount() {
    this.props.friendsStore.resetOptions();
    this.props.friendsStore.fetchItems(userTabs.friends, this.props.friendsStore.replaceUsers);
    this.props.friendsStore.fetchItems(userTabs.pending, this.props.friendsStore.replaceUsers);

    this.friendsForm = new FieldGroup({
      displayName: new Field({
        name: 'displayName',
        value: this.props.friendsStore.queries[userTabs.friends].displayName,
      }),
      gender: new Field({
        name: 'gender',
        value: this.props.friendsStore.queries[userTabs.friends].gender,
      }),
    });
    this.pendingForm = new FieldGroup({
      displayName: new Field({
        name: 'displayName',
        value: this.props.friendsStore.queries[userTabs.pending].displayName,
      }),
      gender: new Field({
        name: 'gender',
        value: this.props.friendsStore.queries[userTabs.pending].gender,
      }),
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  load() {
    this.props.friendsStore.paginate(this.props.friendsStore.activeTab.get());
  }

  onSubmitForm() {
    this.props.friendsStore.search(this.props.friendsStore.activeTab.get(), this[`${this.props.friendsStore.activeTab.get()}Form`].data);
  }

  render() {
    return (
      <div>
        <ListFilter
          onSubmitForm={::this.onSubmitForm}
          clear
          formModel={this[`${this.props.friendsStore.activeTab.get()}Form`]}
        />
        <Tabs
          value={this.props.friendsStore.activeTab.get()}
          onChange={this.props.friendsStore.changeTab}
        >
          <Tab
            label="My Friends"
            value={userTabs.friends}
          >
            <div className="row">
              {
                this.props.friendsStore.data[userTabs.friends].map((user) => {
                  return (
                    <UserItem
                      className="col-md-4 col-sm-6"
                      key={user._id}
                      remove={this.props.usersStore.remove}
                      removeFromList={this.props.friendsStore.removeFromList}
                      myId={this.props.appStore.userData._id}
                      user={user}
                    />
                  );
                })
              }
            </div>
            {
              this.props.friendsStore.data[userTabs.friends].length < this.props.friendsStore.total[userTabs.friends] &&
              <RaisedButton
                label="Load More"
                primary
                fullWidth
                onTouchTap={::this.load}
              />
            }
          </Tab>
          <Tab
            label={
              <div>
                Pending Requests
                {
                  !!this.props.friendsStore.data[userTabs.pending].length &&
                  <Badge
                    className="badge"
                    badgeContent={this.props.friendsStore.data[userTabs.pending].length}
                    secondary
                  />
                }
              </div>
            }
            value={userTabs.pending}
          >
            <div className="row">
              {
                this.props.friendsStore.data[userTabs.pending].map((user) => {
                  return (
                    <UserItem
                      className="col-md-4 col-sm-6"
                      key={user._id}
                      removeFromList={this.props.friendsStore.removeFromList}
                      addToList={this.props.friendsStore.addToList}
                      accept={this.props.usersStore.accept}
                      deny={this.props.usersStore.deny}
                      myId={this.props.appStore.userData._id}
                      user={user}
                    />
                  );
                })
              }
            </div>
            {
              this.props.friendsStore.data[userTabs.pending].length < this.props.friendsStore.total[userTabs.pending] &&
              <RaisedButton
                label="Load More"
                primary
                fullWidth
                onTouchTap={::this.load}
              />
            }
          </Tab>
        </Tabs>
      </div>
    );
  }
}

FriendsList.propTypes = {
  // optionalString: React.PropTypes.string,
};

FriendsList.defaultProps = {};

export default FriendsList;
