import React from 'react';
import { Button } from 'react-md';

/**
 * Button wrapper for mental model summary cards
 * @param {Function} onClick - OnClick handler for edit button
 */
const MentalModelEditBtn = ({ onClick }) => {
  return (
    <Button icon secondary onClick={onClick}>
      edit
    </Button>
  );
};

export default MentalModelEditBtn;
