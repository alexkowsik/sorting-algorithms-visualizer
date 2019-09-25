import React from 'react';
import './App.css';

import Container from './components/Container/Container';
import Bars from './components/Bars/Bars';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Container>
            <Bars />
          </Container>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
