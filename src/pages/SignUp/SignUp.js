import React from 'react';
import { withRouter } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './SignUp.css';

const SignUpPage = ({ history }) => (
  <div className="SignUp transition-item">
    <SignUpForm history={history} />
  </div>
);

export default withRouter(SignUpPage);
