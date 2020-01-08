import React from 'react';
import { Paper, TabsContainer, Tabs, Tab } from 'react-md';
import { TAB_LABELS } from '../../constants/enums';
import './MentalModelViewer.css';

/**
 * Function component that shows mental model entry content in tabular view
 */
export default ({ mentalModel }) => {
  return (
    <TabsContainer colored panelClassName="md-grid MentalModelViewer">
      <Tabs tabId="mm-viewer-tab">
        <Tab label={TAB_LABELS.DEFINITION}>
          <Paper
            className="paper--background paper--padding md-cell--10 paper--margin"
            dangerouslySetInnerHTML={{
              __html: mentalModel.definition
            }}
            zDepth={2}
          />
        </Tab>
        <Tab label={TAB_LABELS.EXAMPLE}>
          <Paper
            className="paper--background paper--padding md-cell--10 paper--margin"
            dangerouslySetInnerHTML={{
              __html: mentalModel.example
            }}
            zDepth={2}
          />
        </Tab>
        <Tab label={TAB_LABELS.DEFENSE}>
          <Paper
            className="paper--background paper--padding md-cell--10 paper--margin"
            dangerouslySetInnerHTML={{
              __html: mentalModel.defense
            }}
            zDepth={2}
          />
        </Tab>
        <Tab label={TAB_LABELS.RESOURCES}>
          <Paper
            className="paper--background paper--padding md-cell--10 paper--margin"
            dangerouslySetInnerHTML={{
              __html: mentalModel.moreResources
            }}
            zDepth={2}
          />
        </Tab>
      </Tabs>
    </TabsContainer>
  );
};
