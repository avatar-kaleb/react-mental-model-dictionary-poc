import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import './App.css';

// TODO
// add new mental model
// edit / add mental model picture
// profile page for user
// better form validations
// dictionary tabs for discover / favorites
// fix routing on mental models that dont exist erroring out
// progress for loading on main page
// update secondary color
// hover effects on summary card
class App extends Component {
  render() {
    return (
      <Route render={({ location }) => <Navigation location={location} />} />
    );
  }
}

export default App;
