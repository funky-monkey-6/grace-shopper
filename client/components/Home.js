/* eslint-disable max-len */
import React from 'react';
import MostPopular from './MostPopular';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="most-popular">
          <p>Welcome!</p>
        </div>
        <MostPopular />
      </div>
    );
  }
}

export default Home;
