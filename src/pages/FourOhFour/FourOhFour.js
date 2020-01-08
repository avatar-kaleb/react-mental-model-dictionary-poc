import React from 'react';
import { Link } from 'react-router-dom';
import { Cell, Grid, Media } from 'react-md';
import { ROUTES } from '../../constants/enums';
import CharlieMungerQuoteImg from '../../images/CharlieMungerQuote.jpg';

/**
 * Functional page component for 404s
 */
const FourOhFour = () => {
  return (
    <Grid className="FourOhFour">
      <Cell phoneOffset={1} phoneSize={2} offset={4} size={4}>
        <h4>
          Uh no! Can't Find Page! Navigate <Link to={ROUTES.INDEX_PATH}>Home</Link>
        </h4>
      </Cell>
      <Cell phoneOffset={1} phoneSize={2} offset={2} size={6}>
        <Media aspectRatio="16-9">
          <img src={CharlieMungerQuoteImg} alt="Charlie Munger quote meme" />
        </Media>
      </Cell>
    </Grid>
  );
};

export default FourOhFour;
