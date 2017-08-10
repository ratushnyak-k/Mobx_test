import React from 'react';


import MainLoader from '../shared/MainLoader'
import AuthSession from '../../utils/AuthSession';


const propTypes = {};

const defaultProps = {};

const ActicvateAccount = (props) => {
  const {token} = props.location.query;
  AuthSession.set(token);
  props.router.replace('/user-list');
  return (
    <MainLoader>
      Your account is in activating...
    </MainLoader>
  );
};


export default ActicvateAccount;
ActicvateAccount.propTypes = propTypes;
ActicvateAccount.defaultProps = defaultProps;