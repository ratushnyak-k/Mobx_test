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
class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.form = new FieldsGroup({
      email: new Field({
        name: 'email',
        value: '',
      }),
      password: new Field({
        name: 'password',
        value: '',
      }),
    });
  }

  async onSubmitForm(model, resetForm, invalidateForm) {
    try {
      const response = await API.postData(ApiRoutes.signin, this.form.data);
      this.props.appStore.setUserData(response.data.user);
      AuthSession.set(response.data.token);
      this.props.router.replace('/user-list');
    } catch (error) {
      console.dir(error);
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
      <div className="row">
        <div className="offset-3 col-sm-6" style={{marginTop: '50px'}}>
          <h1>Sign In</h1>
          <Formsy.Form
            onValidSubmit={::this.onSubmitForm}
          >
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
            <RaisedButton
              label="Submit"
              fullWidth
              type="submit"
              primary
            />

          </Formsy.Form>
        </div>
        {false && <RaisedButton
          label="Generate"
          primary
          fullWidth
          onTouchTap={this.props.appStore.generate}
        />}
      </div>
    );
  }
}


export default Signin;
Signin.propTypes = propTypes;
Signin.defaultProps = defaultProps;