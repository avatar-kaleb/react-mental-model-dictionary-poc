import React from 'react';
import { Button } from 'react-md';

/**
 * Button wrapper for mental model summary cards that shows favorite button as
 * empty for non favorites, or filled for favorited
 * @param {Function} onClick - OnClick handler for edit button
 */
const MentalModelFavoriteBtn = ({ onClick, isFavorite }) => {
  return isFavorite ? (
    <Button icon secondary onClick={onClick}>
      favorite
    </Button>
  ) : (
    <Button icon secondary onClick={onClick}>
      favorite_border
    </Button>
  );
};

export default MentalModelFavoriteBtn;
