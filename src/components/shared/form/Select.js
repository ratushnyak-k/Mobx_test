import React from 'react';
import {
  DropDownMenu,
  MenuItem,
} from 'material-ui';

class Select extends React.Component {
  onChange(event, key, value) {
    this.props.onChange(value);
  }

  render() {
    return (
      <DropDownMenu
        className="select-mui"
        value={this.props.value}
        onChange={::this.onChange}
      >
        {
          this.props.options.map((option) => {
            return (
              <MenuItem
                key={option.value}
                value={option.value}
                primaryText={option.label}
                label={option.label}
              />
            );
          })
        }
      </DropDownMenu>
    );
  }
}

Select.propTypes = {
  // optionalString: React.PropTypes.string,
};

Select.defaultProps = {};

export default Select;
