const shuffle = arr => {
  var i, j, tmp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
};

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/*
 *
 * -------- SORTING ALGORITHMS --------
 *
 */
const bubbleSort = async reference => {
  let chart = reference.chartInstance;
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
      await sleep(10);

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
};

module.exports = {
  shuffle: shuffle,
  bubbleSort: bubbleSort
};
