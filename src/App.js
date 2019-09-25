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
        </header>
      </div>
    );
  }
}

export default App;
