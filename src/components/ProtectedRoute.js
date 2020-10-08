import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={(prop) => (user.user_data.id === undefined ? <Redirect to={{ pathname: '/' }} /> : <Component {...prop} />)} />
);


export default connect((state) => ({ user: state.user }), {})(withRouter(ProtectedRoute));
