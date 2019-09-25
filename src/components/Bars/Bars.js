import React from 'react';
import './Bars.css';
import { Bar } from 'react-chartjs-2';

const shuffle = require('../../utils/algorithms').shuffle;

class Bars extends React.Component {
  state = {
    array: shuffle([...Array(51).keys()].splice(1)),
    buttonDisabled: false
  };
  arraySorted = false;

  shuffleArray = e => {
    this.arraySorted = false;
    this.setState({ buttonDisabled: false });
    const array = [...this.state.array];
    shuffle(array);
    this.setState({ array: array });
  };

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  /*
   *
   * -------- SORTING ALGORITHMS --------
   *
   */
  bubbleSort = () => {
    this.setState({ buttonDisabled: true }, async e => {
      let chart = this.reference.chartInstance;
      const dataArray = chart.data.datasets[0].data;
      const meta = chart.getDatasetMeta(0);
      const colors = chart.data.datasets[0].backgroundColor;
      const defaltColor = 'rgb(255, 99, 132)';
      let tmp;

      for (let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < dataArray.length - i - 1; j++) {
          colors[j] = '#c941fa';
          chart.data.datasets[0].backgroundColor = colors;

          chart.update();
          await this.sleep(10);

          if (dataArray[j] > dataArray[j + 1]) {
            tmp = dataArray[j];
            dataArray[j] = dataArray[j + 1];
            dataArray[j + 1] = tmp;

            tmp = meta.data[j];
            meta.data[j] = meta.data[j + 1];
            meta.data[j + 1] = tmp;

            colors[j + 1] = '#c941fa';
          }

          colors[j] = defaltColor;
          chart.data.datasets[0].backgroundColor = colors;
        }
        colors[dataArray.length - i - 1] = '#7cc746';
        chart.data.datasets[0].backgroundColor = colors;
        chart.update();
      }
      this.arraySorted = true;
      this.setState({ buttonDisabled: false });
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

        <button onClick={this.bubbleSort} disabled={this.state.buttonDisabled}>
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
