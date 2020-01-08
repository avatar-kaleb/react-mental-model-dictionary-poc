import React, { PureComponent } from 'react';
import withAuthorization from '../../hoc/withAuthorization';
import AuthUserContext from '../../components/AuthUserContext/AuthUserContext';
import SearchableMentalModelList from '../../components/SearchableMentalModelList/SearchableMentalModelList';
import { ADMIN_EMAIL } from '../../constants/user';

import './AdminDictionary.css';

class AdminDictionary extends PureComponent {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => <SearchableMentalModelList authUser={authUser} isAdmin={true} {...this.props} />}
      </AuthUserContext.Consumer>
    );
  }
}

const authCondition = authUser => {
  return !!authUser && authUser.email === ADMIN_EMAIL;
};
export default withAuthorization(authCondition)(AdminDictionary);
