import React, { Component } from 'react';
import { db } from '../../firebase';
import MentalModelViewer from '../../components/MentalModelViewer/MentalModelViewer';
import withAuthorization from '../../hoc/withAuthorization';
import AuthUserContext from '../../components/AuthUserContext/AuthUserContext';

import './MentalModel.css';

// in the future, this component will handle auth logic
// but for now we want it to be free
class MentalModel extends Component {
  constructor() {
    super();

    this.state = {
      mentalModel: {}
    };
  }

  componentDidMount() {
    // retrieve the mental model passed in from the route
    this.firebaseCallback = snap => {
      this.setState({ mentalModel: snap.val() });
    };
    db.onGetMentalModel(this.props.match.params.mentalModalId, this.firebaseCallback);
  }

  componentWillUnmount() {
    // Un-register the listener on '/mental-models/:mentalModelId'.
    db.offGetMentalModel(this.firebaseCallback);
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="MentalModel transition-item">
            <MentalModelViewer mentalModel={this.state.mentalModel} />;
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(MentalModel);
