import React from 'react';
import { ROUTES } from '../../constants/enums';
import { Link } from 'react-router-dom';

/**
 * Functional component that wraps the sign up message with a link to the sign up page
 */
const SignUpLink = () => {
  return (
    <p style={{ textAlign: 'center', paddingBottom: '1em' }}>
      Don't have an account? <Link to={ROUTES.SIGN_UP_PATH}>Sign Up</Link>
    </p>
  );
};

export default SignUpLink;
