import React from 'react';
import { Autocomplete } from 'react-md';

/**
 * Wrapper for the MD autocomplete used for mental model dictionary views
 * @param {Object} props - Props passed in to component: array -allMentalModels, function - filterMentalModels, String - placeholder
 */
const DictionaryAutoComplete = ({ allMentalModelTitles = [], filterMentalModels, placeholder = '' }) => {
  return (
    <Autocomplete
      id="mental-model-autocomplete"
      label="Search mental models"
      onAutocomplete={filterMentalModels}
      onChange={filterMentalModels}
      placeholder={placeholder}
      data={allMentalModelTitles}
    />
  );
};

export default DictionaryAutoComplete;
