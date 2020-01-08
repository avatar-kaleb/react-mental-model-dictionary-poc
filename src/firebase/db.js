import { db } from './firebase';

// ---------------User API--------------------

/**
 * Create a new user
 * @param {Object} userObject
 */
export const doCreateUser = userObject => {
  return db.ref(`users/${userObject.id}`).set({
    ...userObject
  });
};

let getUserFavoritesRef;
/**
 * Get a users favorite object from firebase based on id, set listener call bacl
 * for changes
 * @param {String} userId
 * @param {Function} cb
 */
export const onGetUserFavorites = (userId, cb) => {
  if (getUserFavoritesRef) getUserFavoritesRef = null;
  getUserFavoritesRef = db.ref(`users/${userId}/favorites`);
  getUserFavoritesRef.on('value', cb);
};

/**
 * Get a users favorite object from firebase based on id, set listener call bacl
 * for changes
 * @param {String} userId
 * @param {Function} cb
 */
export const setGetUserFavorites = (userId, updatedFavorites) => {
  if (getUserFavoritesRef) getUserFavoritesRef = null;
  getUserFavoritesRef = db.ref(`users/${userId}/favorites`).set(updatedFavorites);
};

/**
 * Turn off user favorite listener
 * @param {Function} cb
 */
export const offGetUserFavorites = cb => {
  if (mentalModelRef) {
    mentalModelRef.off('value', cb);
  }
};

export const onceGetUsers = () => db.ref('users').once('value');

// --------------Mental Models API-----------------
const mentalModelsRef = db.ref('/mental-models');
export const onGetMentalModels = cb => mentalModelsRef.on('value', cb);
export const offGetMentalModels = cb => mentalModelsRef.off('value', cb);

let mentalModelRef;
export const onGetMentalModel = (mentalModelId, cb) => {
  if (mentalModelRef) mentalModelRef = null;
  mentalModelRef = db.ref(`/mental-models/${mentalModelId}`);
  mentalModelRef.on('value', cb);
};

export const offGetMentalModel = cb => {
  if (mentalModelRef) {
    mentalModelRef.off('value', cb);
  }
};

export const doUpdateMentalModel = (mentalModelId, updatedMentalModel) => {
  db.ref(`/mental-models/${mentalModelId}`).set(updatedMentalModel);
};
