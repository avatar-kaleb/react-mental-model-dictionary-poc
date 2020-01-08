import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-md';
import { ROUTES } from '../../constants/enums';
import './SignUpButton.css';

/**
 * Functional component wrapper that rounds to sign up page on click
 */
const SignUpButton = () => (
  <Link to={ROUTES.SIGN_UP_PATH}>
    {/* TODO - change this hide on mobile to another ux flow */}
    <Button raised secondary className="hide-on-mobile">
      Sign Up
    </Button>
  </Link>
);

export default SignUpButton;
