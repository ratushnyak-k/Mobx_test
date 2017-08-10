import React from 'react';
import { HOC } from 'formsy-react';
import { DatePicker as DatePickerMUI } from 'material-ui';
class DatePicker extends React.Component {
  onChange(nothing, value) {
    this.props.onChange(new Date(value))
  }

  render() {
    const {isPristine, getErrorMessage} = this.props;
    return (
      <DatePickerMUI
        className="date-picker"
        hintText={this.props.hintText}
        container="inline"
        value={this.props.value ? new Date(this.props.value) : undefined}
        onChange={::this.onChange}
        errorText={!isPristine() ? getErrorMessage() : ''}
      />
    );
  }
}

DatePicker.propTypes = {
  // optionalString: React.PropTypes.string,
};

DatePicker.defaultProps = {};

export default HOC(DatePicker);
