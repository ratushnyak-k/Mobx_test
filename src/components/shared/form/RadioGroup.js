import React from 'react';
import {
  RadioButtonGroup,
} from 'material-ui';
import { HOC } from 'formsy-react';

class RadioGroup extends React.Component {
  constructor() {
    super();
  }

  onChange(event, value) {
    this.props.onChange(value);
  }

  render() {

    return (
      <RadioButtonGroup
        name={this.props.name}
        valueSelected={this.props.value}
        onChange={::this.onChange}
      >
        {this.props.children}
      </RadioButtonGroup>
    );
  }
}

RadioGroup.propTypes = {
  // optionalString: React.PropTypes.string,
};

RadioGroup.defaultProps = {};

export default HOC(RadioGroup);
