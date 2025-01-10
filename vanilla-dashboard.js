// Data
const revenueData = [
  { year: 'FY24', revenue: 7.69, arr: 10.28 },
  { year: 'FY25', revenue: 20.25, arr: 27.01 },
  { year: 'FY26', revenue: 44.81, arr: 59.74 }
];

const metricsData = [
  { year: 'FY24', margin: 74.19, rule40: 176 },
  { year: 'FY25', margin: 95.02, rule40: 258 },
  { year: 'FY26', margin: 95.03, rule40: 216 }
];

const additionalMetrics = {
  topRow: [
    { title: 'FY26 ARR', value: '$59.74M', change: '141% CAGR' },
    { title: 'Customers', value: '1,808', change: '156% CAGR' },
    { title: 'Network', value: '10,000+', change: 'Partners' },
    { title: 'Transactions', value: '265M', change: 'Annual' },
    { title: 'ARR/Employee', value: '$449K', change: '79% CAGR' },
    { title: 'ARR/Customer', value: '$33K', change: 'Expanding' },
    { title: 'Gross Margin', value: '95.03%', change: 'Elite' },
    { title: 'Rule of 40', value: '216%', change: 'Best-in-class' }
  ],
  bottomRow: [
    { title: 'LTV/CAC', value: '10x', change: 'Sustainable' },
    { title: 'NRR', value: '130%', change: 'Strong' },
    { title: 'Burn Multiple', value: '-0.24', change: 'Efficient' },
    { title: 'Implementation', value: '9 days', change: '5x faster' },
    { title: 'Labor Savings', value: '70%', change: 'vs 30%' },
    { title: 'Integration', value: '80%', change: 'Time saved' },
    { title: 'Uptime', value: '99.99%', change: 'Enterprise' },
    { title: 'Error Fix', value: 'Real-time', change: 'vs 48h' }
  ],
  marketCoverage: [
    { label: 'Retail/eComm', value: '3,000+' },
    { label: 'Logistics', value: '2,000+' },
    { label: 'Manufacturing', value: '1,500+' },
    { label: 'Healthcare', value: '1,000+' }
  ],
  implementation: [
    { label: 'Enterprise', value: '9 days' },
    { label: 'SMB', value: '5 days' },
    { label: 'Self-Service', value: 'Hours' },
    { label: 'Success Rate', value: '100%' }
  ],
  techAdvantage: [
    { label: 'Architecture', value: 'API-First' },
    { label: 'Infrastructure', value: 'Cloud-Native' },
    { label: 'Mappings', value: '90% Less' },
    { label: 'Network', value: 'Pre-Connected' }
  ],
  roiImpact: [
    { label: 'Labor Cost', value: '-70%' },
    { label: 'Integration', value: '5x Faster' },
    { label: 'Operations', value: '-30%' },
    { label: 'Time-to-Value', value: 'Days' }
  ]
};

function initDashboard() {
  const container = document.getElementById('investor-dashboard');
  if (!container) return;

  // Clear existing content
  container.innerHTML = '';
  
  // Create header
  createHeader(container);
  
  // Create metrics grid
  createMetricsGrid(container, additionalMetrics.topRow);
  createMetricsGrid(container, additionalMetrics.bottomRow);
  
  // Create charts
  const chartsContainer = document.createElement('div');
  chartsContainer.style.display = 'grid';
  chartsContainer.style.gridTemplateColumns = '1fr 1fr';
  chartsContainer.style.gap = '16px';
  chartsContainer.style.marginTop = '16px';
  container.appendChild(chartsContainer);
  
  createRevenueChart(chartsContainer);
  createMetricsChart(chartsContainer);
  
  // Create info cards
  createInfoCards(container);
}

function createHeader(container) {
  const header = document.createElement('div');
  header.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <h1 style="font-size: 24px; font-weight: bold; color: white; margin: 0;">Orderful Investment Analysis</h1>
        <p style="font-size: 14px; color: #93c5fd; margin: 4px 0;">Enterprise EDI Platform</p>
      </div>
      <div style="display: flex; gap: 8px;">
        <span style="font-size: 14px; color: #60a5fa; background: #1e3a8a; padding: 4px 12px; border-radius: 4px;">141% CAGR</span>
        <span style="font-size: 14px; color: #60a5fa; background: #1e3a8a; padding: 4px 12px; border-radius: 4px;">156% Customer Growth</span>
      </div>
    </div>
  `;
  container.appendChild(header);
}

function createMetricsGrid(container, metrics) {
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
  grid.style.gap = '12px';
  grid.style.marginBottom = '16px';

  metrics.forEach(metric => {
    const card = document.createElement('div');
    card.style.background = '#1f2937';
    card.style.padding = '12px';
    card.style.borderRadius = '8px';
    card.style.border = '1px solid #1e40af';
    card.innerHTML = `
      <p style="font-size: 12px; color: #93c5fd; margin: 0;">${metric.title}</p>
      <p style="font-size: 14px; font-weight: bold; color: white; margin: 4px 0;">${metric.value}</p>
      <p style="font-size: 12px; color: #60a5fa; margin: 0;">${metric.change}</p>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function createRevenueChart(container) {
  const chartContainer = document.createElement('div');
  chartContainer.style.background = '#1f2937';
  chartContainer.style.padding = '16px';
  chartContainer.style.borderRadius = '8px';
  
  const canvas = document.createElement('canvas');
  chartContainer.appendChild(canvas);
  container.appendChild(chartContainer);

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: revenueData.map(d => d.year),
      datasets: [
        {
          label: 'Revenue ($M)',
          data: revenueData.map(d => d.revenue),
          borderColor: '#1d4ed8',
          backgroundColor: '#1e40af80',
          fill: true
        },
        {
          label: 'ARR ($M)',
          data: revenueData.map(d => d.arr),
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f680',
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Revenue Trajectory',
          color: 'white'
        },
        legend: {
          labels: { color: 'white' }
        }
      },
      scales: {
        x: { grid: { color: '#1e40af' }, ticks: { color: 'white' } },
        y: { grid: { color: '#1e40af' }, ticks: { color: 'white' } }
      }
    }
  });
}

function createMetricsChart(container) {
  const chartContainer = document.createElement('div');
  chartContainer.style.background = '#1f2937';
  chartContainer.style.padding = '16px';
  chartContainer.style.borderRadius = '8px';
  
  const canvas = document.createElement('canvas');
  chartContainer.appendChild(canvas);
  container.appendChild(chartContainer);

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: metricsData.map(d => d.year),
      datasets: [
        {
          label: 'Margin %',
          data: metricsData.map(d => d.margin),
          borderColor: '#60a5fa',
          tension: 0.1
        },
        {
          label: 'Rule of 40',
          data: metricsData.map(d => d.rule40),
          borderColor: '#3b82f6',
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Performance Metrics',
          color: 'white'
        },
        legend: {
          labels: { color: 'white' }
        }
      },
      scales: {
        x: { grid: { color: '#1e40af' }, ticks: { color: 'white' } },
        y: { grid: { color: '#1e40af' }, ticks: { color: 'white' } }
      }
    }
  });
}

function createInfoCards(container) {
  const infoGrid = document.createElement('div');
  infoGrid.style.display = 'grid';
  infoGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
  infoGrid.style.gap = '8px';
  infoGrid.style.marginTop = '16px';

  const sections = [
    { title: 'Market Coverage', data: additionalMetrics.marketCoverage },
    { title: 'Implementation', data: additionalMetrics.implementation },
    { title: 'Tech Advantage', data: additionalMetrics.techAdvantage },
    { title: 'ROI Impact', data: additionalMetrics.roiImpact }
  ];

  sections.forEach(section => {
    const card = document.createElement('div');
    card.style.background = '#1f2937';
    card.style.padding = '12px';
    card.style.borderRadius = '8px';
    
    let html = `<h3 style="font-size: 14px; font-weight: 600; color: white; margin-bottom: 8px;">${section.title}</h3>`;
    html += '<div style="display: flex; flex-direction: column; gap: 6px;">';
    
    section.data.forEach(item => {
      html += `
        <div style="display: flex; justify-content: space-between;">
          <span style="font-size: 12px; color: #93c5fd;">${item.label}</span>
          <span style="font-size: 12px; font-weight: bold; color: white;">${item.value}</span>
        </div>
      `;
    });
    
    html += '</div>';
    card.innerHTML = html;
    infoGrid.appendChild(card);
  });

  container.appendChild(infoGrid);
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);
