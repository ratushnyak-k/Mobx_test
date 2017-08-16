import React from 'react';
import {
  observer,
} from 'mobx-react';
import Formsy from 'formsy-react';

import Input from '../shared/form/Input';
import RadioGroup from '../shared/form/RadioGroup';
import {
  IconButton,
  RadioButton,
  RaisedButton,
} from 'material-ui';
import Clear from 'material-ui/svg-icons/content/clear';

@observer
class ListFilter extends React.Component {
  componentWillMount() {
    this.form = this.props.formModel;
  }

  componentWillReceiveProps(nextProps) {
    this.form = nextProps.formModel;
  }

  clear() {
    this.form.fields.displayName.clear();
    this.props.onSubmitForm();
  }

  render() {
    return (
      <Formsy.Form
        className="row"
        style={{margin: '15px 0'}}
        onValidSubmit={this.props.onSubmitForm}
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
        <div className="col-sm-5">
          <div className="cleanable-input">
            <Input
              floatingLabelText="Search"
              name="displayName"
              type="text"
              onChange={this.form.fields.displayName.change}
              value={this.form.fields.displayName.value}
            />
            {
              this.props.clear &&
              <IconButton
                onTouchTap={::this.clear}
              >
                <Clear />
              </IconButton>
            }
          </div>
        </div>
        <div
          className="offset-1 col-sm-2"
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
    );
  }
}

ListFilter.propTypes = {
  // optionalString: React.PropTypes.string,
};

ListFilter.defaultProps = {};

export default ListFilter;
