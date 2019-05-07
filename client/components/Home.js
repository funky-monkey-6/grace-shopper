import React from 'react';
import MostPopular from './MostPopular';

class Home extends React.Component {
  divStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1335&q=80)',
    height: '500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#FFF',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    fontSize: '84px',
  };

  render() {
    return (
      <div>
        <div style={this.divStyle}>
          <p>Welcome!</p>
        </div>
        <MostPopular />
      </div>
    );
  }
}

export default Home;
