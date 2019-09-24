import React from 'react';
import './Bars.css';

import { Bar } from 'react-chartjs-2';

const Bars = props => {
  return (
    <Bar
      data={{
        labels: props.array,
        datasets: [
          {
            backgroundColor: 'rgb(255, 99, 132)',
            data: props.array
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
        animation: {}
      }}
    />
  );
};

export default Bars;
