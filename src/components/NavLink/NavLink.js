import React from 'react';
import { Link as RouterLink, Route } from 'react-router-dom';
import { FontIcon, ListItem } from 'react-md';

/**
 * Taken from here: https://github.com/mlaursen/react-md/blob/master/examples/with-react-router-v4/src/NavLink.js
 * Makes working with react router correct with react MD - wraps nav items for our navigation drawer
 */
const NavLink = ({ label, to, exact, icon }) => (
  <Route path={to} exact={exact}>
    {({ match }) => {
      let leftIcon;
      if (icon) {
        leftIcon = <FontIcon>{icon}</FontIcon>;
      }

      return <ListItem component={RouterLink} active={!!match} to={to} primaryText={label} leftIcon={leftIcon} />;
    }}
  </Route>
);

export default NavLink;
