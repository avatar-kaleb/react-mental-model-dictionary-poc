import React, { Component } from 'react';
import { ADMIN_EMAIL } from '../../constants/user';
import AuthUserContext from '../../components/AuthUserContext/AuthUserContext';
import MentalModelEditor from '../../components/MentalModelEditor/MentalModelEditor';
import withAuthorization from '../../hoc/withAuthorization';

import './AdminMentalModel.css';

class AdminMentalModel extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => <MentalModelEditor mentalModelId={this.props.match.params.mentalModalId} />}
      </AuthUserContext.Consumer>
    );
  }
}

const authCondition = authUser => {
  // todo use role based instead of an e-mail here
  return !!authUser && authUser.email === ADMIN_EMAIL;
};
export default withAuthorization(authCondition)(AdminMentalModel);
