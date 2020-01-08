import React from 'react';
import MentalModelSummaryCard from '../../components/MentalModelSummaryCard/MentalModelSummaryCard';
import { Cell, Grid } from 'react-md';
import './MentalModelSummaryList.css';

/**
 * Functional component that lists out mental model summary cards in a grid view
 */
const MentalModelSummaryList = ({
  authUser,
  favoritedMentalModels,
  filteredMentalModels,
  history,
  isAdmin = false,
  match,
  mentalModel = {}
}) => {
  return (
    <Grid className="MentalModelSummaryList grid--width grid-content">
      {filteredMentalModels.map(mentalModel => (
        <Cell
          className="cell-margin-bottom--small"
          desktopSize={3}
          tabletSize={4}
          phoneSize={6}
          key={mentalModel.id}
        >
          <MentalModelSummaryCard
            authUser={authUser}
            favoritedMentalModels={favoritedMentalModels}
            history={history}
            match={match}
            isAdmin={isAdmin}
            mentalModel={mentalModel}
          />
        </Cell>
      ))}
    </Grid>
  );
};

export default MentalModelSummaryList;
