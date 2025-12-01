
    const ctx = document.getElementById('uptime-chart');

new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Sample Dataset',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 10 },
        { x: 25, y: 30 },
        { x: 40, y: 25 }
      ],
      backgroundColor: 'blue'
    }]
  },
  options: {
    scales: {
      x: { type: 'linear', position: 'bottom' },
      y: { type: 'linear' }
    }
  }
});