import React from 'react';
import Formsy from 'formsy-react';
import {
  observer,
  inject,
} from 'mobx-react';
import { each as _each } from 'lodash';

import Input from '../shared/form/Input';
import API from '../../utils/API';
import {
  ApiRoutes,
} from '../../utils/constants';
import { RaisedButton } from 'material-ui';
import AuthSession from '../../utils/AuthSession';
import FieldsGroup from '../../stores/models/form/FieldGroup';
import Field from '../../stores/models/form/Field';

const propTypes = {};

const defaultProps = {};
@inject('appStore')
@observer
class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.form = new FieldsGroup({
      displayName: new Field({
        name: 'displayName',
        value: 'e',

      }),
      photo: new Field({
        name: 'photo',
        value: '',

      }),
      email: new Field({
        name: 'email',
        value: 'ratushnyak@steelkiwi.com',

      }),
      password: new Field({
        name: 'password',
        value: '12345',

      }),
      passwordRepeat: new Field({
        name: 'passwordRepeat',
        value: '12345',
      }),
    });
  }

  async onSubmitForm(model, resetForm, invalidateForm) {
    try {
      const response = await API.postData(ApiRoutes.signup, this.form.data);
      this.props.appStore.setUserData(response.data.user);
      AuthSession.set(response.data.token);
      this.props.router.replace('/profile');
    } catch (error) {
      const {errors} = error.response.data;
      _each(errors, (value, key) => {
        if (!(key in model)) return;
        invalidateForm({
          [key]: value.message,
        });
      });
    }
    return false;
  }

  render() {
    return (
      <div className="row" style={{marginTop: '50px'}}>
        <div className="offset-3 col-sm-6">
          <h1>Sign Up</h1>
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
              floatingLabelText="URL to your avatar"
              name="photo"
              type="text"
              onChange={this.form.fields.photo.change}
              value={this.form.fields.photo.value}
            />

            <Input
              floatingLabelText="Email"
              name="email"
              type="email"
              onChange={this.form.fields.email.change}
              value={this.form.fields.email.value}
              required
              validations={{
                isEmail: true,
              }}
              validationErrors={{
                isEmail: 'This is not a valid email',
                isDefaultRequiredValue: 'This field is required',
              }}
            />

            <Input
              floatingLabelText="Password"
              name="password"
              type="password"
              onChange={this.form.fields.password.change}
              value={this.form.fields.password.value}
              required
              validations={{
                minLength: 5,
              }}
              validationErrors={{
                minLength: 'Type more then 5 characters',
                isDefaultRequiredValue: 'This field is required',
              }}
            />
            <Input
              floatingLabelText="Password Repeat"
              name="passwordRepeat"
              type="password"
              onChange={this.form.fields.passwordRepeat.change}
              value={this.form.fields.passwordRepeat.value}
              required
              validations={{
                minLength: 5,
                equalsField: 'password',
              }}
              validationErrors={{
                minLength: 'Type more then 5 characters',
                isDefaultRequiredValue: 'This field is required',
                equalsField: 'Password don\'t match',
              }}
            />
            <RaisedButton
              label="Submit"
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


export default SignUp;
SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;