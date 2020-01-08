import React, { Component } from 'react';
import { Grid, Cell, Paper } from 'react-md';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

import './AboutProject.css';

class AboutProject extends Component {
  constructor() {
    super();

    this.state = {
      tableData: [
        {
          'feature-name': 'Updated to React!',
          'feature-details':
            'Recreated the app using create react app V2, added the ability to favorite mental models, sign up for a new account, and now read images from firebase instead of static!',
          'release-date': '10/13/2018'
        },
        {
          'feature-name': 'Admin & MM Editing',
          'feature-details':
            'Added the ability to login to google and use my admin account to edit mental models faster. If you see mental models changing while your reading them, you have Google Firebase to thank for that :).',
          'release-date': '03/13/2018'
        },
        {
          'feature-name': 'Basic Seach Functionality',
          'feature-details':
            "Added basic search functionality to dictionary page, as I've added a few more mental models.",
          'release-date': '02/23/2018'
        },
        {
          'feature-name': 'MVP 1 Completed',
          'feature-details': 'Developed MVP with Polymer 2 and basic paper elements.',
          'release-date': '08/30/2017'
        }
      ]
    };
  }
  render() {
    return (
      <Grid className="AboutProject transition-item">
        <Cell size={10}>
          <Paper zDepth={2} className="paper--background paper--padding">
            <h1>About the Project</h1>
            <p>
              Hello there and welcome! <br />
              <br /> I'm Kaleb, a young professional who has accepted my dual life between social millenial and nerdy
              software engineer. I love playing sports, watching Marvel shows on Netflix, reading Fantasy novels in my
              spare time, meeting new people on random adventures, and learning new ways to grow throughout my journey
              to achievement.
            </p>
            <p>
              I hope you enjoy learning about mental models and as they turn you into a rational thinking machine!
              Interested in learning more about my journey?{' '}
              <a href="https://kalebmckelvey.com">Check out my personal blog!</a>
            </p>
            <p>
              In my first POC with Polymer 2 I was able to get this site up and running quickly. I reused code from
              examples and utilized components for a quick "do something" type of start. Since then, I've upgraded to
              React when the Create-React-App v2 was released! The the WIP masterpiece continues!
            </p>
          </Paper>
        </Cell>
        <Cell size={10}>
          <Paper zDepth={2} className="paper--background paper--padding">
            <h1>Why Create a Mental Model Dictionary?</h1>
            <h3>My Passion</h3>
            <p>
              Many mental models have been written and discovered by people worldwide, who like me are interested in
              becoming the best thinker they can. Currently, I find mental models in blog posts, videos, or other
              mediums that each describe their version and understanding of the concepts - many with repeated content. I
              created a notebook in OneNote to better organize, but
              <strong> decided it was time to let others use those notes</strong> and modernize the approach.
            </p>
            <h3>PWA / Polymer 2 / React Investigation</h3>
            <p>
              At work I consistently work with the Polymer Components from the Predix Design System team to develop
              consistent UI design for our users. Currently these are built in Polymer 1, eventually being transitioned
              to Polymer 2/3. In order to prepare for the change, I decided to use Polymer 2 and develop the dictionary
              as a PWA to learn it now for the future.
            </p>
            <h3>Say Hello to React in Version 2!</h3>
            <p>
              I recently decided to change this project over to React, letting me get a bit more experience with the
              most popular library and in the future add more features! Checkout the releases below and see what's new
              :).
            </p>
          </Paper>
        </Cell>
        <Cell size={10}>
          <Paper zDepth={2} className="paper--background paper--padding">
            <h1>Roadmap</h1>
            <p>
              I hope to gain feedback and request from users on the future of the project. Although this is my passion,
              and also a side project for an idea that would be helpful in my own life - I look forward to making it
              useful for all!!
            </p>
            <p>
              Below are release updates. I will be creating a feedback form for the site soon, in the meantime please
              email me at{' '}
              <a href="mailto:kalebmckelvey3@gmail.com?Subject=Mental Model Dictionary Suggestion" target="_top">
                kalebmckelvey3@gmail.com
              </a>{' '}
              for suggestions.
            </p>
            <DataTable plain>
              <TableHeader>
                <TableRow>
                  <TableColumn>Feature Name</TableColumn>
                  <TableColumn>Feature Details</TableColumn>
                  <TableColumn>Release Date</TableColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.tableData.map(feature => (
                  <TableRow key={feature['feature-name']}>
                    <TableColumn>{feature['feature-name']}</TableColumn>
                    <TableColumn>{feature['feature-details']}</TableColumn>
                    <TableColumn>{feature['release-date']}</TableColumn>
                  </TableRow>
                ))}
              </TableBody>
            </DataTable>
          </Paper>
        </Cell>
      </Grid>
    );
  }
}

export default AboutProject;
