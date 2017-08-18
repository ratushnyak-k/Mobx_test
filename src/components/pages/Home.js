import React from 'react';


const propTypes = {};

const defaultProps = {};

const Home = (props) => {

  return (
    <div className="iframe">
      <iframe
        src="http://swizec.github.io/react-particles-experiment/"
      />
    </div>
  );
};


export default Home;
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;