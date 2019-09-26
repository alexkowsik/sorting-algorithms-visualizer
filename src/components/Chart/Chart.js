import React from 'react';
import './Chart.css';
import { Bar } from 'react-chartjs-2';

const algorithms = require('../../utils/algorithms');

class Bars extends React.Component {
  state = {
    array: algorithms.shuffle([...Array(51).keys()].splice(1)),
    buttonDisabled: false
  };
  arraySorted = false;

  shuffleArray = e => {
    this.arraySorted = false;
    const array = [...this.state.array];
    algorithms.shuffle(array);
    this.setState({ array: array, buttonDisabled: false });
  };

  bubbleSort = reference => {
    this.setState({ buttonDisabled: true }, () => {
      algorithms.bubbleSort(reference).then(() => {
        this.arraySorted = true;
        this.setState({ buttonDisabled: false });
      });
    });
  };

  render() {
    return (
      <>
        <Bar
          data={{
            labels: this.state.array,
            datasets: [
              {
                data: this.state.array,
                backgroundColor: [...Array(this.state.array.length).keys()].map(() => {
                  return this.arraySorted ? '#7cc746' : 'rgb(255, 99, 132)';
                })
              }
            ]
          }}
          options={{
            legend: {
              display: false
            },
            scales: {
              yAxes: [{ display: false }],
              xAxes: [{ gridLines: { color: 'rgba(255, 99, 132, 0.2)' } }]
            },
            animation: {
              duration: 80,
              xAxes: true,
              yAxes: true
            }
          }}
          ref={reference => (this.reference = reference)}
          redraw
        />

        <button
          onClick={() => this.bubbleSort(this.reference)}
          disabled={this.state.buttonDisabled}
        >
          Sort
        </button>
        <button onClick={this.shuffleArray} disabled={this.state.buttonDisabled}>
          Shuffle
        </button>
      </>
    );
  }
}

export default Bars;
