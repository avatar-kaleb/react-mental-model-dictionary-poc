import React from 'react';
import { auth } from '../../firebase';
import { Button } from 'react-md';

/**
 * Functional component button wrapper that signs out from firestore on click
 */
const SignOutButton = () => (
  <Button flat secondary onClick={auth.doSignOut}>
    Sign Out
  </Button>
);

export default SignOutButton;
