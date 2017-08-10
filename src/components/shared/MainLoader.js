import React from 'react';
import { CircularProgress } from 'material-ui';


const propTypes = {};

const defaultProps = {};

const MainLoader = (props) => {

  return (
    <div className="main-loader">
      <div className="loader-wrap">
        {
          props.children &&
          <div className="loader-text">{props.children}</div>
        }
        <CircularProgress
          size={80}
          thickness={5}
        />
      </div>
    </div>
  );
};


export default MainLoader;
MainLoader.propTypes = propTypes;
MainLoader.defaultProps = defaultProps;