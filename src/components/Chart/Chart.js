import React from 'react';
import './Chart.css';
import { Bar } from 'react-chartjs-2';
import Select from 'react-select';

import algorithms from '../../utils/algorithms';

class Bars extends React.Component {
  state = {
    array: algorithms.shuffle([...Array(51).keys()].splice(1)),
    buttonDisabled: false,
    selectedAlgorithm: algorithms.bubbleSort,
    algorithms: [
      { name: algorithms.bubbleSort, label: 'Bubble Sort' },
      { name: 'strawberry', label: 'Quick Sort' },
      { name: 'vanilla', label: 'Merge Sort' }
    ]
  };
  arraySorted = false;

  shuffleArray = e => {
    this.arraySorted = false;
    const array = [...this.state.array];
    algorithms.shuffle(array);
    this.setState({ array: array, buttonDisabled: false });
  };

  startSorting = reference => {
    this.setState({ buttonDisabled: true }, () => {
      this.state.selectedAlgorithm(reference).then(() => {
        this.arraySorted = true;
        this.setState({ buttonDisabled: false });
      });
    });
  };

  changeAlgorithm = algorithm => {
    this.setState({ selectedAlgorithm: algorithm.name });
  };

  render() {
    const customStyles = {
      option: provided => ({
        ...provided,
        backgroundColor: '#FFFFFF',
        color: '#000000'
      })
    };

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
            },
            tooltips: {
              enabled: false
            }
          }}
          ref={reference => (this.reference = reference)}
          redraw
        />

        <Select
          styles={customStyles}
          className='dropdown'
          defaultValue={this.state.algorithms[0]}
          options={this.state.algorithms}
          onChange={this.changeAlgorithm}
          isDisabled={this.state.buttonDisabled}
        />

        <button
          onClick={() => this.startSorting(this.reference)}
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
