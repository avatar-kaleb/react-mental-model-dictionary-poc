// absolute
import _ from 'lodash';
import { NavigationDrawer } from 'react-md';
import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

// relatives
import { ADMIN_EMAIL } from '../../constants/user';
import { PAGE_TITLES, ROUTES } from '../../constants/enums';
import { ADMIN_NAV_ITEMS, AUTH_NAV_ITEMS, PUBLIC_NAV_ITEMS } from '../../constants/navItems';
import AuthUserContext from '../AuthUserContext/AuthUserContext';
import NavLink from '../NavLink/NavLink';
import PageTransition from 'react-router-page-transition';
import SignInButton from '../../components/SignInButton/SignInButton';
import SignUpButton from '../../components/SignUpButton/SignUpButton';
import SignOutButton from '../../components/SignOutButton/SignOutButton';
import withAuthentication from '../../hoc/withAuthentication';

// styles
import './Navigation.css';

// pages
import AdminDictionaryPage from '../../pages/AdminDictionary/AdminDictionary';
import AdminMentalModelPage from '../../pages/AdminMentalModel/AdminMentalModel';
import DictionaryPage from '../../pages/Dictionary/Dictionary';
import FourOhFourPage from '../../pages/FourOhFour/FourOhFour';
import AboutMentalModelsPage from '../../pages/AboutMentalModels/AboutMentalModels';
import AboutProjectPage from '../../pages/AboutProject/AboutProject';
import MentalModelPage from '../../pages/MentalModel/MentalModel';
import SignInPage from '../../pages/SignIn/SignIn';
import SignUpPage from '../../pages/SignUp/SignUp';

/**
 * Pure component that handles routing via react router, sets up the navigation
 * drawer from react-md library, and sets nav items, toolbar actions based on
 * the user access
 */
class Navigation extends PureComponent {
  /**
   * Based on the location the user is viewing, get the correct title
   * for our nav toolbar
   * @param {String} locationPath
   * @returns {String}
   */
  _getToolbarTitleFromLocation(locationPath) {
    if (locationPath === ROUTES.INDEX_PATH) {
      return PAGE_TITLES.INDEX;
    } else if (locationPath === ROUTES.ABOUT_MM_PATH) {
      return PAGE_TITLES.ABOUT_MMS;
    } else if (locationPath === ROUTES.ABOUT_PROJECT_PATH) {
      return PAGE_TITLES.ABOUT_PROJECT;
    } else if (locationPath.includes(ROUTES.VIEW_MENTAL_MODEL_PATH)) {
      const splitString = locationPath.split('/');
      return _.startCase(splitString[splitString.length - 1]);
    } else {
      return PAGE_TITLES.DEFAULT;
    }
  }

  /**
   * Gets the correct nav items array based on the auth user credentials
   * 1. If no auth, return public nav items
   * 2. if auth but not admin, return auth nav items
   * 3. if auth and admin, return admin nav items
   * @param {Object} authUser - auth user from firebase
   * @returns {Array}
   */
  _getNavItems(authUser) {
    if (!authUser) return PUBLIC_NAV_ITEMS;

    return authUser.email === ADMIN_EMAIL ? ADMIN_NAV_ITEMS : AUTH_NAV_ITEMS;
  }

  /**
   * Based on the auth user credentials, set up our tool bar action items correctly
   * 1. if there is an auth user, show sign out button
   * 2. if there is not, show sign up / sign in buttons
   * @param {Object} authUser - auth user from firebase
   */
  _getToolbarAction(authUser) {
    if (authUser) {
      return <SignOutButton />;
    }

    const actions = [];
    actions.push(<SignUpButton />);
    actions.push(<SignInButton />);
    return actions;
  }

  render() {
    const { location } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <NavigationDrawer
            drawerTitle="Menu"
            toolbarActions={this._getToolbarAction(authUser)}
            toolbarTitle={this._getToolbarTitleFromLocation(location.pathname)}
            navItems={this._getNavItems(authUser).map(props => (
              <NavLink {...props} key={props.to} />
            ))}
          >
            {/* <PageTransition timeout={250}> -- TODO: will add this back when fixing flickers*/}
            <Switch key={location.key}>
              <Route exact path={ROUTES.INDEX_PATH} location={location} component={DictionaryPage} />
              <Route exact path={ROUTES.ABOUT_MM_PATH} location={location} component={AboutMentalModelsPage} />
              <Route exact path={ROUTES.ABOUT_PROJECT_PATH} location={location} component={AboutProjectPage} />
              <Route exact path={ROUTES.SIGN_IN_PATH} location={location} component={SignInPage} />
              <Route exact path={ROUTES.SIGN_UP_PATH} location={location} component={SignUpPage} />
              <Route path="/mental-model/:mentalModalId" location={location} component={MentalModelPage} />
              <Route path="/admin/mental-model/:mentalModalId" location={location} component={AdminMentalModelPage} />
              <Route exact path={ROUTES.ADMIN_PATH} location={location} component={AdminDictionaryPage} />
              <Route component={FourOhFourPage} />
            </Switch>
            {/* </PageTransition> */}
          </NavigationDrawer>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withAuthentication(Navigation);
