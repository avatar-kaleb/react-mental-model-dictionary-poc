import _ from 'lodash';

export const filterMentalModels = function filterMentalModels(
  mentalModels,
  autocompleteText
) {
  return _.filter(mentalModels, mm => {
    return mm.title.includes(autocompleteText);
  });
};

export function createMentalModelListsOnDbResponse(snap) {
  let mmObject = snap.val();
  let allMentalModels = [];
  let allMentalModelTitles = [];
  Object.values(mmObject).forEach(mm => {
    allMentalModels.push(mm);
    allMentalModelTitles.push(mm.title);
  });

  return {
    allMentalModels,
    allMentalModelTitles,
    filteredMentalModels: [...allMentalModels]
  };
}
