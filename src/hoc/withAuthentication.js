import React from 'react';

import AuthUserContext from '../components/AuthUserContext/AuthUserContext';
import { firebase } from '../firebase';

const withAuthentication = Component =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this._isMounted = true;
      firebase.auth.onAuthStateChanged(authUser => {
        // added this here to prevent mem leaks on async set state
        // found here: https://github.com/jaredpalmer/formik/issues/772
        if (this._isMounted) {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        }
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };

export default withAuthentication;
