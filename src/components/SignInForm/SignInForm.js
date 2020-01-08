import React, { Component } from 'react';
import { Button, Paper, TextField } from 'react-md';
import ReCAPTCHA from 'react-google-recaptcha';
import SignUpLink from '../SignUpLink/SignUpLink';
import { auth } from '../../firebase';
import { ROUTES } from '../../constants/enums';
import './SignInForm.css';

// helper function to link property names to a value
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

// initial sign in form state
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  captchaSolved: false
};

/**
 * This form signs a new user up using firebase auth with e-mail, then creates that
 * user by id in the datastore
 */
class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  _onCaptchaChange = event => {
    this.setState({
      captchaSolved: true
    });
  };

  /**
   * When users click submit, use firebase to create the user, then head to index
   * @param {Object} event - the event passed from the button click
   */
  _onSubmit = event => {
    const { email, password } = this.state;
    const { history } = this.props;

    // create the user
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.INDEX_PATH);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error, captchaSolved } = this.state;

    // simple checks for now
    // TODO - create better validation for the sign in form
    const isInvalid = password === '' || email === '' || captchaSolved === false;

    return (
      <form onSubmit={this._onSubmit} className="md-grid SignInForm" style={{ justifyContent: 'center' }}>
        <Paper zDepth={2} className="paper--background paper--padding md-cell--10">
          <TextField
            id="sign-in-email"
            value={email}
            onChange={(value, event) => this.setState(byPropKey('email', value))}
            type="text"
            placeholder="Email Address"
          />
          <TextField
            id="sign-in-password"
            value={password}
            onChange={(value, event) => this.setState(byPropKey('password', value))}
            type="password"
            placeholder="Password"
          />
          <ReCAPTCHA
            sitekey="6Ldq1nQUAAAAAKr5YiIoSr5NF148jnXhDZTH-NSt"
            onChange={this._onCaptchaChange}
            style={{ margin: '1em 0 1em 0' }}
          />
          <Button raised secondary disabled={isInvalid} type="submit">
            Sign In
          </Button>
          {error && <p>{error.message}</p>}
          <br />
          <br />
          <SignUpLink />
        </Paper>
      </form>
    );
  }
}

export default SignInForm;
