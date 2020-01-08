import React from 'react';

/**
 * Used with context api to get AuthUser from firebase
 * Taken from example: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-user-database
 */
const AuthUserContext = React.createContext(null);

export default AuthUserContext;
