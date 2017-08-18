import React from 'react';
import {
  Badge,
  IconButton,
} from 'material-ui';


const propTypes = {};

const defaultProps = {};

const Empty = (props) => {

  return (
    <div className="col-sm-12 empty">
      <Badge
        badgeContent={<IconButton disabled>{props.icon}</IconButton>}
        className="empty-badge"
      >
        {props.title}
      </Badge>
    </div>
  );
};


export default Empty;
Empty.propTypes = propTypes;
Empty.defaultProps = defaultProps;