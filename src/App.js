import React from 'react';
import './App.css';

import Container from './components/Container/Container';
import Bars from './components/Bars/Bars';

const shuffle = require('./utils/algorithms').shuffle;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: shuffle([...Array(51).keys()].splice(1))
    };
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Container>
            <Bars array={this.state.array} />
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
