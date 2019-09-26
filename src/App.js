import React from 'react';
import './App.css';

import Container from './components/Container/Container';
import Chart from './components/Chart/Chart';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Container>
            <Chart />
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
