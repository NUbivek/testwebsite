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
  <div className="bg-gray-800 p-2 rounded-lg border border-blue-900">
    <p className="text-xs text-blue-300">{title}</p>
    <p className="text-sm font-bold text-white">{value}</p>
    {change && <p className="text-xs text-blue-400">{change}</p>}
  </div>
);

const MetricRow = ({ metrics }) => (
  <div className="grid grid-cols-4 md:grid-cols-8 gap-1 mb-2">
    {metrics.map((metric, idx) => (
      <MicroMetric key={idx} {...metric} />
    ))}
  </div>
);

const InvestorDashboard = () => {
  return (
    <div className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Orderful Investment Analysis</h1>
            <p className="text-sm text-blue-300">Enterprise EDI Platform</p>
          </div>
          <div className="flex gap-2">
            <span className="text-sm text-blue-400 bg-blue-900 px-3 py-1 rounded">141% CAGR</span>
            <span className="text-sm text-blue-400 bg-blue-900 px-3 py-1 rounded">156% Customer Growth</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div style={{ 
              background: '#1f2937', 
              padding: '16px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
              <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '8px' 
              }}>
                  <h2 style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: 'white' 
                  }}>Revenue Trajectory</h2>
                  <span style={{ 
                      fontSize: '12px', 
                      color: '#60a5fa' 
                  }}>Exponential Growth</span>
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

          <div style={{ 
              background: '#1f2937', 
              padding: '16px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
              <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '8px' 
              }}>
                  <h2 style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: 'white' 
                  }}>Performance Metrics</h2>
                  <span style={{ 
                      fontSize: '12px', 
                      color: '#60a5fa' 
                  }}>Strong Unit Economics</span>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div style={{ background: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <h3 className="text-sm font-semibold text-white mb-2">Market Coverage</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Retail/eComm</span>
                <span className="text-xs font-bold text-white">3,000+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Logistics</span>
                <span className="text-xs font-bold text-white">2,000+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Manufacturing</span>
                <span className="text-xs font-bold text-white">1,500+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Healthcare</span>
                <span className="text-xs font-bold text-white">1,000+</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <h3 className="text-sm font-semibold text-white mb-2">Implementation</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Enterprise</span>
                <span className="text-xs font-bold text-white">9 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">SMB</span>
                <span className="text-xs font-bold text-white">5 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Self-Service</span>
                <span className="text-xs font-bold text-white">Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Success Rate</span>
                <span className="text-xs font-bold text-white">100%</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <h3 className="text-sm font-semibold text-white mb-2">Tech Advantage</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Architecture</span>
                <span className="text-xs font-bold text-white">API-First</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Infrastructure</span>
                <span className="text-xs font-bold text-white">Cloud-Native</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Mappings</span>
                <span className="text-xs font-bold text-white">90% Less</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Network</span>
                <span className="text-xs font-bold text-white">Pre-Connected</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <h3 className="text-sm font-semibold text-white mb-2">ROI Impact</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Labor Cost</span>
                <span className="text-xs font-bold text-white">-70%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Integration</span>
                <span className="text-xs font-bold text-white">5x Faster</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Operations</span>
                <span className="text-xs font-bold text-white">-30%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-blue-300">Time-to-Value</span>
                <span className="text-xs font-bold text-white">Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
