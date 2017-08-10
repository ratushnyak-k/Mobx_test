import React from 'react';
import {
  Avatar,
} from 'material-ui';


const propTypes = {};

const defaultProps = {};

const HeaderDropDown = (props) => {

  return (
    <Avatar src={props.photo || 'http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png'} />
  );
};


export default HeaderDropDown;
HeaderDropDown.propTypes = propTypes;
HeaderDropDown.defaultProps = defaultProps;