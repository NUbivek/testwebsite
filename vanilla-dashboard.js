// Data Constants
const financialData = {
    revenue: [
        { year: 'FY24', revenue: 7.69, arr: 10.28, customers: 276, arrPerEmployee: 140795, arrPerCustomer: 37246 },
        { year: 'FY25', revenue: 20.25, arr: 27.01, customers: 828, arrPerEmployee: 245503, arrPerCustomer: 32621 },
        { year: 'FY26', revenue: 44.81, arr: 59.74, customers: 1808, arrPerEmployee: 449184, arrPerCustomer: 33043 }
    ],
    metrics: [
        { year: 'FY24', margin: 74.19, nrr: 130, rule40: 176, burnMultiple: 1.96 },
        { year: 'FY25', margin: 95.02, nrr: 130, rule40: 258, burnMultiple: -0.24 },
        { year: 'FY26', margin: 95.03, nrr: 130, rule40: 216, burnMultiple: -0.24 }
    ]
};

const operationalData = {
    implementation: [
        { category: 'Enterprise', orderful: 9, industry: 45 },
        { category: 'SMB', orderful: 5, industry: 30 },
        { category: 'Self-Service', orderful: 1, industry: 14 }
    ],
    marketCoverage: [
        { vertical: 'Retail/eComm', partners: 3000, growth: 'High' },
        { vertical: 'Logistics', partners: 2000, growth: 'High' },
        { vertical: 'Manufacturing', partners: 1500, growth: 'Medium' },
        { vertical: 'Healthcare', partners: 1000, growth: 'Emerging' }
    ],
    roi: {
        laborCost: 70,
        integrationTime: 80,
        operationalCost: 30,
        successRate: 100,
        uptime: 99.99,
        errorResolution: 0.1
    }
};

// Theme Configuration
function getThemeColors(isDark) {
    return {
        background: isDark ? '#1f2937' : '#ffffff',
        text: isDark ? '#f7fafc' : '#1f2937',
        grid: isDark ? '#374151' : '#e2e8f0',
        financial: {
            primary: isDark ? '#60a5fa' : '#1e40af',
            secondary: isDark ? '#93c5fd' : '#3b82f6'
        },
        operational: {
            primary: isDark ? '#475569' : '#0f172a',
            secondary: isDark ? '#64748b' : '#1f2937'
        }
    };
}

// Chart Creation Functions
function createRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: financialData.revenue.map(d => d.year),
            datasets: [
                {
                    label: 'Revenue ($M)',
                    data: financialData.revenue.map(d => d.revenue),
                    borderColor: colors.financial.primary,
                    backgroundColor: colors.financial.primary + '40',
                    fill: true
                },
                {
                    label: 'ARR ($M)',
                    data: financialData.revenue.map(d => d.arr),
                    borderColor: colors.financial.secondary,
                    backgroundColor: colors.financial.secondary + '40',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue & ARR Growth',
                    color: colors.text
                },
                legend: {
                    labels: { color: colors.text }
                }
            },
            scales: {
                x: {
                    grid: { color: colors.grid },
                    ticks: { color: colors.text }
                },
                y: {
                    grid: { color: colors.grid },
                    ticks: { color: colors.text }
                }
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear'
                }
            }
        }
    });
}

function createUnitEconomicsChart() {
    const ctx = document.getElementById('unitEconomicsChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: financialData.metrics.map(d => d.year),
            datasets: [
                {
                    label: 'Gross Margin (%)',
                    data: financialData.metrics.map(d => d.margin),
                    borderColor: colors.financial.primary,
                    yAxisID: 'y'
                },
                {
                    label: 'Rule of 40',
                    data: financialData.metrics.map(d => d.rule40),
                    borderColor: colors.financial.secondary,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Unit Economics',
                    color: colors.text
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            animations: {
                y: {
                    duration: 2000
                }
            }
        }
    });
}

function createEfficiencyChart() {
    const ctx = document.getElementById('efficiencyChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: financialData.metrics.map(d => d.year),
            datasets: [
                {
                    label: 'ARR per Employee ($K)',
                    data: financialData.revenue.map(d => d.arrPerEmployee/1000),
                    backgroundColor: colors.financial.primary
                },
                {
                    label: 'ARR per Customer ($K)',
                    data: financialData.revenue.map(d => d.arrPerCustomer/1000),
                    backgroundColor: colors.financial.secondary
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Efficiency Metrics',
                    color: colors.text
                }
            },
            animations: {
                y: {
                    duration: 2000
                }
            }
        }
    });
}

function createImplementationChart() {
    const ctx = document.getElementById('implementationChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: operationalData.implementation.map(d => d.category),
            datasets: [
                {
                    label: 'Orderful (Days)',
                    data: operationalData.implementation.map(d => d.orderful),
                    backgroundColor: colors.operational.primary
                },
                {
                    label: 'Industry Average',
                    data: operationalData.implementation.map(d => d.industry),
                    backgroundColor: colors.operational.secondary
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Implementation Timeline',
                    color: colors.text
                }
            },
            animations: {
                y: {
                    duration: 2000
                }
            }
        }
    });
}

function createMarketCoverageChart() {
    const ctx = document.getElementById('marketCoverageChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: operationalData.marketCoverage.map(d => d.vertical),
            datasets: [{
                data: operationalData.marketCoverage.map(d => d.partners),
                backgroundColor: [
                    colors.operational.primary + '80',
                    colors.operational.primary + '60',
                    colors.operational.secondary + '80',
                    colors.operational.secondary + '60'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Market Coverage',
                    color: colors.text
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
}

function createROIChart() {
    const ctx = document.getElementById('roiChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Labor Cost', 'Integration Time', 'Error Resolution', 'Implementation', 'Success Rate'],
            datasets: [{
                label: 'Improvement (%)',
                data: [
                    operationalData.roi.laborCost,
                    operationalData.roi.integrationTime,
                    operationalData.roi.operationalCost,
                    operationalData.roi.successRate,
                    operationalData.roi.uptime
                ],
                backgroundColor: colors.operational.primary + '40',
                borderColor: colors.operational.primary
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'ROI Impact',
                    color: colors.text
                }
            },
            animation: {
                duration: 2000
            }
        }
    });
}

// Theme Switching
function updateChartsTheme() {
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    Chart.instances.forEach(chart => {
        chart.options.plugins.legend.labels.color = colors.text;
        chart.options.plugins.title.color = colors.text;
        chart.options.scales.x.grid.color = colors.grid;
        chart.options.scales.y.grid.color = colors.grid;
        chart.options.scales.x.ticks.color = colors.text;
        chart.options.scales.y.ticks.color = colors.text;
        chart.update();
    });
}

// Initialization
function initDashboard() {
    createRevenueChart();
    createUnitEconomicsChart();
    createEfficiencyChart();
    createImplementationChart();
    createMarketCoverageChart();
    createROIChart();
    
    // Theme change listener
    document.getElementById('themeToggle').addEventListener('click', updateChartsTheme);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('dashboard').classList.contains('active')) {
        setTimeout(initDashboard, 100);
    }
});

// Tab switching
function switchSubtab(subtabId) {
    document.querySelectorAll('.subtab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.subtab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(subtabId).classList.add('active');
    event.currentTarget.classList.add('active');
    
    if (subtabId === 'dashboard') {
        setTimeout(initDashboard, 100);
    }
}
