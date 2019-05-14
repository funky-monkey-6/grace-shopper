/* eslint-disable max-len */
import React from 'react';
import MostPopular from './MostPopular';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="most-popular">
          <p>Welcome!</p>
          <MostPopular className="most-popular-container" />
        </div>
      </div>
    );
  }
}

export default Home;
