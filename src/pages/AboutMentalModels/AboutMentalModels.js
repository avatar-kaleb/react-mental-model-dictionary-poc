import React, { PureComponent } from 'react';
import { Grid, Cell, Paper } from 'react-md';

import './AboutMentalModels.css';

class AboutMentalModels extends PureComponent {
  render() {
    return (
      <Grid className="AboutMentalModels transition-item">
        <Cell size={10}>
          <Paper zDepth={2} className="paper--background paper--padding">
            <h1>What Are Mental Models?</h1>
            <h3>A Construct...</h3>
            <p>
              Mental models help you analyze data objectively, categorize thought processes, study, document, and
              reflect on how our our world works.
            </p>
            <p>
              By taking time to truly learn and comprehend different mental models, we can objectively learn and make
              rational decisions based on facts by avoiding the common biases. Further, we can use the different mental
              models to create better proceses in our businesses and in our life!
            </p>
            <h3>The History...</h3>
            <p>
              One of the greatest thinkers in our modern world, Charlie Munger, coined the term Mental Models as a way
              he learns different big ideas from various disciplines. He believes that utilizing these big ideas from
              different disciplines, you become less like the man with the hammer, who sees every problem as a nail.
            </p>
            <p>
              In my humble opinion, the easiest example to illustrate what in the world I mean comes from the Margin of
              Safety mental model. Charlie mentions this one in his speech, which basically describes that engineers who
              create the design for bridges may state the weight limit for those bridges - like a bridge that can only
              hold 10,000 lbs of cars. In my experience, it has been quite rare for anyone to actually check the weight
              of each car driving on the bridge. Gratefully, engineers build the bridge with a margin of safety, meaning
              it may actually be able to hold 30,000 lbs, but not expecting it to ever actually need to.
            </p>
          </Paper>
        </Cell>
        <br />
        <Cell size={10}>
          <Paper zDepth={2} className="paper--background paper--padding">
            <h1>Why Should I Use Mental Models?</h1>
            <h3>An Independent Thinking Tool...</h3>
            <p>
              Our interlocked universe requires transdisciplined rational thinking to best understand it. Joshua Kennon
              has stated the importance of independent thinking as a key component of success. Mental models give you
              the ideas you need to make better decisions, and just as imperative, avoid bad ones!
            </p>

            <h3>Avoid Biases...</h3>
            <p>
              Charlie Munger gave a famous speech on human misjudgement, where he listed out many biases ingrained into
              our psychological shortcuts. By running through a checklist of these biases and asking the right questions
              before making a decision, we can better guard against them.
            </p>

            <h3>Raise the bar...</h3>
            <p>
              Be different by thinking differently. Charlie Munger has raised the bar for those of us wanting to think
              rationally. We are the sum of the decisions we've made in our life, it is time to control each new
              addition. Take personal responsibility for where you are, reflect on how you got there, and decide today
              to make decisions as a rational thinker does in the future!
            </p>
          </Paper>
        </Cell>
      </Grid>
    );
  }
}

export default AboutMentalModels;
