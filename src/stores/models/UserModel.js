import {
  object,
  serializable,
} from 'serializr';
import { createViewModel } from 'mobx-utils';

class ViewModel {
  _viewModel;

  get viewModel() {
    if (!this._viewModel) {
      this._viewModel = createViewModel(this);
    }

    return this._viewModel;
  }
}

class UserLocation extends ViewModel {
  @serializable city;
  @serializable state;
  @serializable street;
  @serializable postcode;
}

export default class UserModel extends ViewModel {
  @serializable displayName;
  @serializable email;
  @serializable _id;
  @serializable(object(UserLocation)) location;
  @serializable photo;
  @serializable gender;
  @serializable dob;
  @serializable phone;
}
