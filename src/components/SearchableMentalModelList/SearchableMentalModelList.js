import React, { Component } from 'react';
import { db } from '../../firebase';
import DictionaryAutoComplete from '../../components/DictionaryAutoComplete/DictionaryAutoComplete';
import MentalModelSummaryList from '../../components/MentalModelSummaryLst/MentalModelSummaryList';
import { Cell, Grid } from 'react-md';
import { createMentalModelListsOnDbResponse, filterMentalModels } from '../../utilities';
import './SearchableMentalModelList.css';

/**
 * State component that combines autocomplete and mental model summary list to
 * allow users to search for a specific mental model
 */
class SearchableMentalModelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMentalModels: [], // all ret
      allMentalModelTitles: [], // for auto complete
      filteredMentalModels: [], // what we show on the screen
      favoritedMentalModels: {} //TODO logic to get this from user object for favorites
    };

    this._isMounted = false;
  }

  /**
   * Get the mental models from firebase when we mount
   */
  componentDidMount() {
    this._isMounted = true;
    db.onGetMentalModels(this.onGetMentalModelsCb.bind(this));
    db.onGetUserFavorites(this.props.authUser.uid, this.onGetUserFavoritesCb.bind(this));
  }

  /**
   * Turn off the listener for firebase on unmount
   */
  componentWillUnmount() {
    this._isMounted = false;

    // Un-register the listener
    db.offGetMentalModels(this.onGetMentalModelsCb);
    db.offGetUserFavorites(this.onGetUserFavoritesCb);
  }

  /**
   *  When the firebase snapshot changes for user favorites, reset state
   * @param {Object} snap - snapshot from firebase
   */
  onGetUserFavoritesCb(snap) {
    // cant set state unless we're mounted, let's prevent the leak :D
    if (this._isMounted) {
      let favoritedMentalModels = snap.val();
      this.setState({ favoritedMentalModels });
    }
  }

  /**
   *  When the firebase mental modls snapshot changes , we have some state to update through
   * one of our utility functions!
   * @param {Object} snap - snapshot from firebase
   */
  onGetMentalModelsCb(snap) {
    // cant set state unless we're mounted, let's prevent the leak :D
    if (this._isMounted) {
      this.setState({ ...createMentalModelListsOnDbResponse(snap) });
    }
  }

  render() {
    const { authUser, match, history, isAdmin } = this.props;
    return (
      <Grid className="SearchableMentalModelList grid--margin">
        <Cell size={12}>
          <DictionaryAutoComplete
            allMentalModelTitles={this.state.allMentalModelTitles}
            filterMentalModels={event =>
              this.setState({
                filteredMentalModels: filterMentalModels(this.state.allMentalModels, event)
              })
            }
            placeholder="Authority Bias"
          />
        </Cell>
        <MentalModelSummaryList
          authUser={authUser}
          favoritedMentalModels={this.state.favoritedMentalModels}
          filteredMentalModels={this.state.filteredMentalModels}
          match={match}
          history={history}
          isAdmin={isAdmin}
        />
      </Grid>
    );
  }
}

export default SearchableMentalModelList;
