const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } = Recharts;

const revenueData = [
  { year: 'FY24', revenue: 7.69, arr: 10.28, customers: 276, arrPerCustomer: 37.246, arrPerEmployee: 140.795 },
  { year: 'FY25', revenue: 20.25, arr: 27.01, customers: 828, arrPerCustomer: 32.621, arrPerEmployee: 245.503 },
  { year: 'FY26', revenue: 44.81, arr: 59.74, customers: 1808, arrPerCustomer: 33.043, arrPerEmployee: 449.184 }
];

const metricsData = [
  { year: 'FY24', margin: 74.19, nrr: 130, ltvcac: 10, rule40: 176, burnMultiple: 1.96 },
  { year: 'FY25', margin: 95.02, nrr: 130, ltvcac: 10, rule40: 258, burnMultiple: -0.24 },
  { year: 'FY26', margin: 95.03, nrr: 130, ltvcac: 10, rule40: 216, burnMultiple: -0.24 }
];

const MicroMetric = ({ title, value, change }) => (
  <div style={{ 
    background: '#1f2937', 
    padding: '8px', 
    borderRadius: '8px', 
    border: '1px solid #1e40af',
    marginBottom: '4px'
  }}>
    <p style={{ fontSize: '12px', color: '#93c5fd', margin: '0' }}>{title}</p>
    <p style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', margin: '4px 0' }}>{value}</p>
    {change && <p style={{ fontSize: '12px', color: '#60a5fa', margin: '0' }}>{change}</p>}
  </div>
);

const MetricRow = ({ metrics }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
    gap: '8px', 
    marginBottom: '16px' 
  }}>
    {metrics.map((metric, idx) => (
      <MicroMetric key={idx} {...metric} />
    ))}
  </div>
);

const InvestorDashboard = () => {
  return (
    <div style={{ background: '#111827', padding: '16px', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>Orderful Investment Analysis</h1>
            <p style={{ fontSize: '14px', color: '#93c5fd', margin: '4px 0' }}>Enterprise EDI Platform</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '14px', color: '#60a5fa', background: '#1e3a8a', padding: '4px 12px', borderRadius: '4px' }}>141% CAGR</span>
            <span style={{ fontSize: '14px', color: '#60a5fa', background: '#1e3a8a', padding: '4px 12px', borderRadius: '4px' }}>156% Customer Growth</span>
          </div>
        </div>

        <MetricRow 
          metrics={[
            { title: 'FY26 ARR', value: '$59.74M', change: '141% CAGR' },
            { title: 'Customers', value: '1,808', change: '156% CAGR' },
            { title: 'Network', value: '10,000+', change: 'Partners' },
            { title: 'Transactions', value: '265M', change: 'Annual' },
            { title: 'ARR/Employee', value: '$449K', change: '79% CAGR' },
            { title: 'ARR/Customer', value: '$33K', change: 'Expanding' },
            { title: 'Gross Margin', value: '95.03%', change: 'Elite' },
            { title: 'Rule of 40', value: '216%', change: 'Best-in-class' }
          ]}
        />

        <MetricRow 
          metrics={[
            { title: 'LTV/CAC', value: '10x', change: 'Sustainable' },
            { title: 'NRR', value: '130%', change: 'Strong' },
            { title: 'Burn Multiple', value: '-0.24', change: 'Efficient' },
            { title: 'Implementation', value: '9 days', change: '5x faster' },
            { title: 'Labor Savings', value: '70%', change: 'vs 30%' },
            { title: 'Integration', value: '80%', change: 'Time saved' },
            { title: 'Uptime', value: '99.99%', change: 'Enterprise' },
            { title: 'Error Fix', value: 'Real-time', change: 'vs 48h' }
          ]}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <div style={{ background: '#1f2937', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: '0' }}>Revenue Trajectory</h2>
              <span style={{ fontSize: '12px', color: '#60a5fa' }}>Exponential Growth</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                <XAxis dataKey="year" stroke="#93c5fd" />
                <YAxis stroke="#93c5fd" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue ($M)" stroke="#1d4ed8" fill="#1e40af" fillOpacity={0.6} />
                <Area type="monotone" dataKey="arr" name="ARR ($M)" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#1f2937', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: '0' }}>Performance Metrics</h2>
              <span style={{ fontSize: '12px', color: '#60a5fa' }}>Strong Unit Economics</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                <XAxis dataKey="year" stroke="#93c5fd" />
                <YAxis stroke="#93c5fd" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Legend />
                <Line type="monotone" dataKey="margin" name="Margin %" stroke="#60a5fa" />
                <Line type="monotone" dataKey="rule40" name="Rule of 40" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '16px' }}>
          <div style={{ background: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Market Coverage</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Retail/eComm</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>3,000+</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Logistics</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>2,000+</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Manufacturing</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>1,500+</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Healthcare</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>1,000+</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Implementation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Enterprise</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>9 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>SMB</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>5 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Self-Service</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>Hours</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Success Rate</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>100%</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Tech Advantage</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Architecture</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>API-First</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Infrastructure</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>Cloud-Native</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#93c5fd' }}>Mappings</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>90% Less</span>
              </div>
