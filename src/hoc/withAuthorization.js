import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from '../components/AuthUserContext/AuthUserContext';
import { firebase } from '../firebase';
import { ROUTES } from '../constants/enums';

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(ROUTES.SIGN_IN_PATH);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <Component {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;
