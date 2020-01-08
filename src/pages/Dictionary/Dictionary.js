import React, { PureComponent } from 'react';
import SearchableMentalModelList from '../../components/SearchableMentalModelList/SearchableMentalModelList';
import withAuthorization from '../../hoc/withAuthorization';
import AuthUserContext from '../../components/AuthUserContext/AuthUserContext';
import './Dictionary.css';

class Dictionary extends PureComponent {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="Dictionary transition-item">
            <SearchableMentalModelList isAdmin={false} authUser={authUser} {...this.props} />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Dictionary);
