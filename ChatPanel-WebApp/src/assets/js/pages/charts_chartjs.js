$(function() {
  // Wrap charts
  $('.chartjs-demo').each(function() {
    $(this).wrap($('<div style="height:' + this.getAttribute('height') + 'px"></div>'));
  });


  var graphChart = new Chart(document.getElementById('chart-graph').getContext("2d"), {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label:           'My First dataset',
        data:            [43, 91, 89, 16, 21, 79, 28],
        borderWidth:     1,
        backgroundColor: 'rgba(113, 106, 202, 0.3)',
        borderColor:     '#ff4a00',
        borderDash:      [5, 5],
        fill: false
      }, {
        label:           'My Second dataset',
        data:            [24, 63, 29, 75, 28, 54, 38],
        borderWidth:     1,
        backgroundColor: 'rgba(40, 208, 148, 0.3)',
        borderColor:     '#62d493',
      }],
    },

    // Demo
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  var barsChart = new Chart(document.getElementById('chart-bars').getContext("2d"), {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Revenue',
        data: [53, 99, 14, 10, 43, 27, 20],
        borderWidth: 1,
        backgroundColor: '#A4A1FB',
        borderColor: '#A4A1FB'
      }, {
        label: 'Billing',
        data: [55, 74, 20, 90, 67, 97, 30],
        borderWidth: 1,
        backgroundColor: '#56D9FE',
        borderColor: '#56D9FE'
      },
      {
        label: 'Expenses',
        data: [55, 74, 20, 90, 67, 97, 19],
        borderWidth: 1,
        backgroundColor: '#5FE3A1',
        borderColor: '#5FE3A1'
      }]
    },

    // Demo
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  var radarChart = new Chart(document.getElementById('chart-radar').getContext("2d"), {
    type: 'radar',
    data: {
      labels: ['Funnel Metrics', 'Trials in progress', 'Quota per sales rep', 'No of FTE Sales reps', 'FTE sales rep'],
      datasets: [{
        label: 'First',
        backgroundColor: '#A3A0FB4D ',
        borderColor: '#A3A0FB',
        pointBackgroundColor: '#A3A0FB',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#A3A0FB',
        data: [39, 99, 77, 38, 52, 24, 89],
        borderWidth: 1
      }, {
        label: 'Second',
        backgroundColor: 'rgba(255, 73, 97, 0.3)',
        borderColor: '#FF4961',
        pointBackgroundColor: '#FF4961',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FF4961',
        data: [6, 33, 14, 70, 58, 90, 26],
        borderWidth: 1
      }]
    },

    // Demo
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  var polarAreaChart = new Chart(document.getElementById('chart-polar-area').getContext("2d"), {
    type: 'polarArea',
    data: {
      datasets: [{
        data: [ 12, 10, 14, 6, 15 ],
        backgroundColor: [ '#FF4961', '#62d493', '#f4ab55', '#E7E9ED', '#55a3f4' ],
        label: 'My dataset'
      }],
      labels: [ 'Red', 'Green', 'Yellow', 'Grey', 'Blue' ]
    },

    // Demo
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });

  var pieChart = new Chart(document.getElementById('chart-pie').getContext("2d"), {
    type: 'pie',
    data: {
      // labels: [ 'Office Users', 'Industrial Users' ],
      datasets: [{
        data: [ 400, 100 ],
        backgroundColor: [ '#FFDA83', '#55D8FE' ],
        hoverBackgroundColor: [ '#FFDA83', '#55D8FE' ]
      }]
    },

    // Demo
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  var doughnutChart = new Chart(document.getElementById('chart-doughnut').getContext("2d"), {
    type: 'doughnut',
    data: {
      labels: [ 'Red', 'Blue', 'Yellow' ],
      datasets: [{
        data: [ 137, 296, 213 ],
        backgroundColor: [ '#FF4961', '#ff4a00', '#f4ab55' ],
        hoverBackgroundColor: [ '#FF4961', '#ff4a00', '#f4ab55' ]
      }]
    },

    // Demo
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Resizing charts

  function resizeCharts() {
    graphChart.resize();
    barsChart.resize();
    radarChart.resize();
    polarAreaChart.resize();
    pieChart.resize();
    doughnutChart.resize();
  }

  // Initial resize
  resizeCharts();

  // For performance reasons resize charts on delayed resize event
  window.layoutHelpers.on('resize.charts-demo', resizeCharts);
});
