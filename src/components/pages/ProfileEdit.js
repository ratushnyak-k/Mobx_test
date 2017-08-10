import React from 'react';
import Formsy from 'formsy-react';
import {
  observer,
  inject,
} from 'mobx-react';
import { each as _each } from 'lodash';
import {
  RaisedButton,
} from 'material-ui';

import FieldsGroup from '../../stores/models/form/FieldGroup';
import Field from '../../stores/models/form/Field';

import Input from '../shared/form/Input';
import DatePicker from '../shared/form/DatePicker';
import Select from '../shared/form/Select';
import API from '../../utils/API';
import {
  ApiRoutes,
} from '../../utils/constants';

@observer
class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    const {userData} = this.props.appStore;
    this.form = new FieldsGroup({
      displayName: new Field({
        name: 'displayName',
        value: userData.displayName,
      }),
      photo: new Field({
        name: 'photo',
        value: userData.photo,
      }),
      dob: new Field({
        name: 'dob',
        value: userData.dob,
      }),
      gender: new Field({
        name: 'gender',
        value: userData.gender,
      }),
      phone: new Field({
        name: 'phone',
        value: userData.phone,
      }),
      location: new FieldsGroup({
        state: new Field({
          name: 'state',
          value: userData.location.state,
        }),
        city: new Field({
          name: 'city',
          value: userData.location.city,
        }),
        street: new Field({
          name: 'street',
          value: userData.location.street,
        }),
        postcode: new Field({
          name: 'postcode',
          value: userData.location.postcode,
        }),
      }),
    });
  }

  async onSubmitForm(model, resetForm, invalidateForm) {

    console.log(this.form.data);
    try {
      const response = await API.putData(ApiRoutes.myProfile, this.form.data);
      this.props.appStore.setUserData(response.data);
      this.props.router.replace('/profile');
    } catch (error) {
      const {errors} = error.response.data;
      // invalidateForm or formRef.updateInputsWithError
      _each(errors, (value, key) => {
        if (!(key in model)) return;
        // invalidate if key exist in current form model
        invalidateForm({
          [key]: Array.isArray(value) ? value.join(', ') : value,
        });
      });
    }
    return false;
  }

  render() {
    return (
      <div className="row" style={{marginTop: '50px'}}>
        <div className="offset-3 col-sm-6">
          <h1>Edit profile</h1>
          <Formsy.Form
            onValidSubmit={::this.onSubmitForm}
          >
            <Input
              floatingLabelText="Full Name"
              name="displayName"
              type="text"
              onChange={this.form.fields.displayName.change}
              value={this.form.fields.displayName.value}
              required
              validationErrors={{
                isDefaultRequiredValue: 'This field is required',
              }}
            />

            <Input
              floatingLabelText="Enter link to you photo"
              name="photo"
              type="text"
              onChange={this.form.fields.photo.change}
              value={this.form.fields.photo.value}
            />

            <DatePicker
              hintText="Choose your Date of Birth"
              name="dob"
              onChange={this.form.fields.dob.change}
              value={this.form.fields.dob.value}
            />

            <Select
              options={[
                {
                  value: '',
                  label: 'Don\'t want to specify',
                },
                {
                  value: 'male',
                  label: 'Male',
                },
                {
                  value: 'female',
                  label: 'Female',
                },
              ]}
              onChange={this.form.fields.gender.change}
              value={this.form.fields.gender.value}
            />

            <Input
              floatingLabelText="Phone"
              name="phone"
              type="text"
              onChange={this.form.fields.phone.change}
              value={this.form.fields.phone.value}
            />

            <Input
              floatingLabelText="State"
              name="state"
              type="text"
              onChange={this.form.fields.location.fields.state.change}
              value={this.form.fields.location.fields.state.value}
            />

            <Input
              floatingLabelText="City"
              name="city"
              type="text"
              onChange={this.form.fields.location.fields.city.change}
              value={this.form.fields.location.fields.city.value}
            />

            <Input
              floatingLabelText="Street"
              name="street"
              type="text"
              onChange={this.form.fields.location.fields.street.change}
              value={this.form.fields.location.fields.street.value}
            />

            <Input
              floatingLabelText="Postcode"
              name="postcode"
              type="text"
              onChange={this.form.fields.location.fields.postcode.change}
              value={this.form.fields.location.fields.postcode.value}
            />

            <RaisedButton
              label="Save"
              fullWidth
              type="submit"
              primary
            />
          </Formsy.Form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  // optionalString: React.PropTypes.string,
};

ProfileEdit.defaultProps = {};

@inject('appStore')
@observer
class ProfileEditWrapper extends React.Component {
  render() {
    if (!Object.keys(this.props.appStore.userData).length) {
      return null;
    }
    return (
      <ProfileEdit {...this.props} />
    );
  }
}


export default ProfileEditWrapper;
