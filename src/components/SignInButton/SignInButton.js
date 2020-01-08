import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-md';

import { ROUTES } from '../../constants/enums';

/**
 * Functional component -> Button wrapper that links to sign in path on click
 * @param {Object} props
 */
const SignInButton = () => (
  <Link to={ROUTES.SIGN_IN_PATH}>
    <Button flat style={{ color: 'white' }}>
      Sign In
    </Button>
  </Link>
);

export default SignInButton;
