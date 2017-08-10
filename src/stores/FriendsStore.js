import {
  action,
  observable,
  useStrict,
} from 'mobx';

useStrict(true);

export class FriendsStore {
  @observable friends = [];
  @observable isOpenSnackBar = false;

  @action.bound addUserToFriendsList(user) {
    try {
      this.friends.push(user);
      this.openSnackBar();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound onDelete(id) {
    this.friends = this.friends.filter((friend) => {
      return friend.id !== id;
    });

  }

  @action.bound closeSnackBar() {
    this.isOpenSnackBar = false;
  }

  @action.bound openSnackBar() {
    this.isOpenSnackBar = true;
  }


}

export default new FriendsStore();
