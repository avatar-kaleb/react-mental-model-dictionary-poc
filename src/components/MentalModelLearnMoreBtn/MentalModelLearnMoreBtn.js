import React from 'react';
import { Button } from 'react-md';

/**
 * Button wrapper for mental model summary cards
 * @param {Function} onClick - OnClick handler for edit button
 */
const MentalModelLearnMoreBtn = ({ onClick }) => {
  return (
    <Button flat secondary onClick={onClick}>
      Learn More!
    </Button>
  );
};

export default MentalModelLearnMoreBtn;
