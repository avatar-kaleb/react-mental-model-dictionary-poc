import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ROUTES } from '../../constants/enums';
import { auth, db } from '../../firebase';
import { Button, Paper, TextField } from 'react-md';
import './SignUpForm.css';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  captchaSolved: false
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onCaptchaChange = event => {
    this.setState({
      captchaSolved: true
    });
  };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    event.preventDefault();

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // favorites / created mental model fields are added as they change,
        // bc firebase doesnt store fake data
        let newUser = {
          id: authUser.user.uid,
          email,
          username,
          avatarImageId: '',
          profileSummary: '',
          role: 'USER'
        };
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(newUser)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(ROUTES.INDEX_PATH);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error, captchaSolved } = this.state;

    // TODO update to real form validation
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '' || captchaSolved === false;

    return (
      <form onSubmit={this.onSubmit} className="SignUpForm md-grid" style={{ justifyContent: 'center' }}>
        <Paper zDepth={2} className="paper--background paper--padding md-cell--10">
          <h2>Welcome!</h2>
          <p>Thanks for signing up - looking forward to seeing you add new entries to the dictionary :).</p>
          <TextField
            id="username-textfield"
            value={this.username}
            onChange={(value, event) => this.setState(byPropKey('username', value))}
            type="text"
            placeholder="Full Name"
          />
          <TextField
            id="email-textfield"
            value={email}
            onChange={(value, event) => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <TextField
            id="password-one-textfield"
            value={passwordOne}
            onChange={(value, event) => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <TextField
            id="password-two-textfield"
            value={passwordTwo}
            onChange={(value, event) => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <ReCAPTCHA
            sitekey="6Ldq1nQUAAAAAKr5YiIoSr5NF148jnXhDZTH-NSt"
            onChange={this.onCaptchaChange}
            style={{ margin: '1em 0 1em 0' }}
          />
          <Button raised secondary disabled={isInvalid} type="submit">
            Sign Up
          </Button>
          {error && <p>{error.message}</p>}
        </Paper>
      </form>
    );
  }
}

export default SignUpForm;
