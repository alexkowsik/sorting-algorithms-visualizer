import React from 'react';
import './Bars.css';
import { Bar } from 'react-chartjs-2';

const shuffle = require('../../utils/algorithms').shuffle;

class Bars extends React.Component {
  state = {
    array: shuffle([...Array(51).keys()].splice(1)),
    buttonDisabled: false
  };
  stoppage = false;
  arraySorted = false;

  shuffleArray = e => {
    this.arraySorted = false;
    this.stoppage = true;
    this.setState({ buttonDisabled: false });
    const array = [...this.state.array];
    shuffle(array);
    this.setState({ array: array });
  };

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  bubbleSort = e => {
    this.stoppage = false;

    this.setState({ buttonDisabled: true }, async e => {
      console.log(this.state.array);
      console.log(this.stoppage);
      let chart = this.reference.chartInstance;

      const defaltColor = 'rgb(255, 99, 132)';
      const dataArray = chart.data.datasets[0].data;
      const meta = chart.getDatasetMeta(0);
      const colors = chart.data.datasets[0].backgroundColor;

      console.log(colors);

      let tmp;

      for (let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < dataArray.length - i - 1; j++) {
          if (this.stoppage) {
            this.stoppage = false;
            return;
          }

          colors[j] = 'rgb(123, 42, 412)';
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

            colors[j + 1] = 'rgb(123, 42, 412)';
          }

          colors[j] = defaltColor;
          chart.data.datasets[0].backgroundColor = colors;
        }
        colors[dataArray.length - i - 1] = 'green';
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
                  return this.arraySorted ? 'green' : 'rgb(255, 99, 132)';
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
          redraw={!this.arraySorted}
        />

        <button onClick={this.bubbleSort} disabled={this.state.buttonDisabled}>
          Sort
        </button>
        <button onClick={this.shuffleArray}>Shuffle</button>
      </>
    );
  }
}

export default Bars;
