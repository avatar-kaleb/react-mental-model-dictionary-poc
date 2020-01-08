import React from 'react';
import { withRouter } from 'react-router-dom';
import SignInForm from '../../components/SignInForm/SignInForm';
import './SignIn.css';
const SignInPage = ({ history }) => (
  <div className="SignIn transition-item">
    <SignInForm history={history} />
  </div>
);

export default withRouter(SignInPage);
