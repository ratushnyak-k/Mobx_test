import React from 'react';
import { TextField } from 'material-ui';
import { HOC } from 'formsy-react';

class Input extends React.Component {
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const {isPristine, getErrorMessage} = this.props;
    return (
      <TextField
        style={{width: '100%'}}
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        onChange={::this.onChange}
        errorText={!isPristine() ? getErrorMessage() : ''}
        floatingLabelText={this.props.floatingLabelText}
      />
    );
  }
}

Input.propTypes = {
  // optionalString: React.PropTypes.string,
};

Input.defaultProps = {};

export default HOC(Input);
