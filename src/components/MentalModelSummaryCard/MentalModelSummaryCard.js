import React, { PureComponent } from 'react';
import { Card, CardActions, CardTitle, CardText, Media, MediaOverlay } from 'react-md';
import AuthUserContext from '../AuthUserContext/AuthUserContext';
import MentalModelEditBtn from '../../components/MentalModelEditBtn/MentalModelEditBtn';
import MentalModelFavoriteBtn from '../../components/MentalModelFavoriteBtn/MentalModelFavoriteBtn';
import MentalModelLearnMoreBtn from '../../components/MentalModelLearnMoreBtn/MentalModelLearnMoreBtn';
import { db, storage } from '../../firebase';
import withAuthentication from '../../hoc/withAuthentication';
import './MentalModelSummaryCard.css';

// using this to cache images so we dont keep trying to download them from
// firebase on auto complete changes
// we want to keep this between mounting of the components as well, shouldn't
// be larger than ~100 for awhile, so no big mem usage forseeable
const memoizedImageUrls = {};

/**
 * Summary card to show the mental model image, title, and summary text in
 * TODO -> add logic for favorites
 */
class MentalModelSummaryCard extends PureComponent {
  /**
   * Given an image key (stored on mental model db entry) and a mental id,
   * download the image from firebase by update the card img src to the download url
   *
   * @param {String} imgKey - Mental Model Image Key
   * @param {String} mmId - The mental model id
   */
  _getAndSetSrcUrlFromFirebase(imgKey, mmId) {
    if (memoizedImageUrls[mmId]) {
      return memoizedImageUrls[mmId];
    } else {
      // callback used to update dom on firebase storage callback
      const updateImageSource = url => {
        // cache the url for this id for next time
        memoizedImageUrls[mmId] = url;

        // set the image src
        const imgElement = document.querySelector(`#${mmId} > section > img`);
        if (imgElement) {
          imgElement.src = url;
        }
      };
      // firebase function to get image
      storage.getMentalModelImageUrl(imgKey, updateImageSource);
    }
  }

  /**
   * Sets the correct card actions on the summary card based on the auth
   * user state:
   * 1. if no auth, => learn more
   * 2. if auth, but not admin => learn more and favorite
   * 3. if auth and admin => learn more, favorite, and edit
   *
   * @param {Object} authUser - Firebase Auth User
   * @param {String} mmId - Mental Model ID in Firebase
   */
  _getCardActions(authUser, mmId) {
    if (authUser) {
      return (
        // always do learn more
        <div className="card-actions--alignment">
          <MentalModelLearnMoreBtn
            onClick={() => {
              this._learnMoreBtnClicked(mmId);
            }}
          />

          {/* Edit for admin */}
          {this.props.isAdmin ? (
            <div>
              <MentalModelFavoriteBtn
                isFavorite={this._isMentalModelFavorited(mmId)}
                onClick={() => {
                  this._favoriteBtnClicked(mmId);
                }}
              />
              <MentalModelEditBtn
                onClick={() => {
                  this._editMentalModelClicked(mmId);
                }}
              />
            </div>
          ) : (
            <MentalModelFavoriteBtn
              isFavorite={this._isMentalModelFavorited(mmId)}
              onClick={() => {
                this._favoriteBtnClicked(mmId);
              }}
            />
          )}
        </div>
      );
    } else {
      return (
        <MentalModelLearnMoreBtn
          onClick={() => {
            this._learnMoreBtnClicked(mmId);
          }}
        />
      );
    }
  }

  /**
   * Navigate to admin mental model page on edit click
   */
  _editMentalModelClicked = event => {
    this.props.history.push(`/admin/mental-model/${event}`);
  };

  /**
   * When favorite button is clicked, update the ui and add it in firebase
   */
  _favoriteBtnClicked = mmId => {
    // set updated object
    let updatedFavorites = { ...this.props.favoritedMentalModels };
    updatedFavorites[mmId] ? (updatedFavorites[mmId] = false) : (updatedFavorites[mmId] = true);

    // update in db
    const uid = this.props.authUser.uid;
    db.setGetUserFavorites(uid, updatedFavorites);
  };

  /**
   * Determines if the mental model id given is in the favorited object. This
   * is used to determine which type of favorite icon to show on the card
   * @param {String} mmId
   */
  _isMentalModelFavorited(mmId) {
    return this.props.favoritedMentalModels && this.props.favoritedMentalModels[mmId];
  }

  /**
   * When learn more is clicked, navigate to mental model view to see contents
   */
  _learnMoreBtnClicked = event => {
    this.props.history.push(`mental-model/${event}`);
  };

  render() {
    const { mentalModel } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Card id={mentalModel.id} className="card-height--100 md-block-centered">
            <Media aspectRatio="16-9">
              {/* TODO add ALT for images */}
              <img src={this._getAndSetSrcUrlFromFirebase(mentalModel.img, mentalModel.id)} alt={mentalModel.alt} />
              <MediaOverlay>
                <CardTitle title={mentalModel.title} />
              </MediaOverlay>
            </Media>
            <CardText className="card-text--min-height card-text--padding">{mentalModel.summary}</CardText>
            <CardActions className="md-divider-border md-divider-border--top ">
              {this._getCardActions(authUser, mentalModel.id)}
            </CardActions>
          </Card>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withAuthentication(MentalModelSummaryCard);
