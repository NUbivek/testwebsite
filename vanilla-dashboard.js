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

// Register Chart.js plugin
Chart.register(ChartDataLabels);



const universalChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: { display: false },
        title: {
            font: {
                size: 18,
                weight: 'bold',
                family: 'system-ui, -apple-system, sans-serif'
            }
        },
        legend: {
            labels: {
                font: {
                    size: 14,
                    weight: 'bold'
                }
            }
        }
    },
    scales: {
        x: {
            title: { 
                display: true,
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
            grid: { drawBorder: false },
            ticks: {
                font: {
                    weight: 'bold'
                }
            }
        },
        y: {
            title: { 
                display: true,
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
            grid: { drawBorder: false },
            ticks: {
                font: {
                    weight: 'bold'
                },
                callback: function(value) {
                    return '$' + Math.round(value) + 'M';
                }
            }
        }
    },
    animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
    }
};




function initDashboard() {
    // Ensure Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    try {
       const charts = [
        // Existing charts
        createRevenueChart,
        createUnitEconomicsChart,
        createEfficiencyChart,
        createImplementationChart,
        createMarketCoverageChart,
        createROIChart,
        // New charts
        createRevenueGrowthChart,
        createBurnMarginChart,
        createRevenueStreamsChart,
        createCostScalingChart,
        createHeadcountEfficiencyChart,
        createDeploymentTimelineChart,
        createSupportMetricsChart,
        createMarketPenetrationChart,
        createPartnerGrowthChart,
        createTeamCompositionChart
    ];
        
        // Initialize charts with error handling
        charts.forEach(chart => {
            try {
                chart();
            } catch (error) {
                console.error(`Error creating chart: ${error.message}`);
            }
        });

        // Initialize navigation and animations
        initChartNavigation();
        initDashboardAnimations();
        
        // Theme toggle listener
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                updateChartsTheme();
                updateThemeWithAnimation();
            });
        }
    } catch (error) {
        console.error(`Dashboard initialization failed: ${error.message}`);
    }
}



function getThemeColors(isDark) {
    return {
        background: isDark ? 'rgba(36, 44, 52, 0.9)' : 'rgba(242, 243, 245, 0.9)', // Soft dark gray vs light off-white
        text: isDark ? '#f1f5f9' : '#2d3748', // Gentle light gray vs deep charcoal
        grid: isDark ? '#4a5568' : '#e2e8f0', // Medium slate gray vs soft silver
        financial: {
            primary: isDark ? '#63b3ed' : '#2b6cb0',  // Muted slate blue-gray
            secondary: isDark ? '#3d474f' : '#5a5f65', // Delicate muted gray
            gradient: isDark ? 
                ['rgba(99, 179, 237, 0.5)', 'rgba(144, 205, 244, 0.5)'] :
                ['rgba(43, 108, 176, 0.5)', 'rgba(66, 153, 225, 0.5)'] // Smooth transition
        },
        operational: {
            primary: isDark ? '#355f7a' : '#3c8dad', // Soft navy blue vs teal
            secondary: isDark ? '#5c6671' : '#8a939e', // Subtle gray
            gradient: isDark ?
                ['rgba(53, 95, 122, 0.5)', 'rgba(92, 102, 113, 0.5)'] :
                ['rgba(60, 141, 173, 0.5)', 'rgba(138, 147, 158, 0.5)'] // Balanced blues and grays
        },
        accents: {
            brown: isDark ? '#6b4f4f' : '#8b6b6b', // Gentle mocha
            purple: isDark ? '#4c4177' : '#6e5a99', // Muted lavender
            green: isDark ? '#345e52' : '#4d8b75', // Subtle forest green
        }
    };
}






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
                    backgroundColor: colors.financial.primary + '20',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'ARR ($M)',
                    data: financialData.revenue.map(d => d.arr),
                    borderColor: colors.financial.secondary,
                    backgroundColor: colors.financial.secondary + '20',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Earnings',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true
                },
                datalabels: {
                    display: false // Hide permanent data labels
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: colors.text
                    },
                    grid: {
                        color: colors.grid + '20'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: colors.text
                    },
                    grid: {
                        color: colors.grid + '20'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
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
                    backgroundColor: colors.financial.primary + '40',
                    fill: true
                },
                {
                    label: 'Rule of 40',
                    data: financialData.metrics.map(d => d.rule40),
                    borderColor: colors.financial.secondary,
                    backgroundColor: colors.financial.secondary + '40',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Performance',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true
                },
                datalabels: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: colors.text
                    },
                    grid: {
                        color: colors.grid + '20'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: colors.text
                    },
                    grid: {
                        color: colors.grid + '20'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
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
            labels: ['ARR/Employee ($K)', 'ARR/Customer ($K)', 'NRR (%)'],
            datasets: [{
                // Add a label if you want it in the legend:
                // label: 'Efficiency Metrics',
                data: [
                    financialData.revenue[2].arrPerEmployee / 1000,
                    financialData.revenue[2].arrPerCustomer / 1000,
                    financialData.metrics[2].nrr
                ],
                backgroundColor: [
                    colors.financial.primary,
                    colors.financial.secondary,
                    colors.operational.primary
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                // Here we properly close the title bracket:
                title: {
                    display: true,
                    text: 'Efficiency',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                datalabels: {
                    display: false  // Turn off all data labels
                },
                legend: {
                    display: false  // Hide legend to avoid "undefined"
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text,
                        font: {
                            weight: '500'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
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
                    backgroundColor: colors.operational.primary,
                    borderColor: colors.operational.primary,
                    borderWidth: 1,
                    borderRadius: 6
                },
                {
                    label: 'Industry Average',
                    data: operationalData.implementation.map(d => d.industry),
                    backgroundColor: colors.operational.secondary,
                    borderColor: colors.operational.secondary,
                    borderWidth: 1,
                    borderRadius: 6
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Avg. Deployment Timeline',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true
                },
                datalabels: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: colors.text
                    },
                    grid: {
                        color: colors.grid + '20'
                    }
                },
                y: {
                    ticks: {
                        color: colors.text
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}


function createMarketCoverageChart() {
    const ctx = document.getElementById('marketCoverageChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));

    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: operationalData.marketCoverage.map(d => d.vertical),
            datasets: [{
                data: operationalData.marketCoverage.map(d => d.partners),
                backgroundColor: [
                    colors.operational.primary,
                    colors.operational.primary + '80',
                    colors.operational.secondary,
                    colors.operational.secondary + '80'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Customer Type',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    position: 'right',
                    align: 'center',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true
                },
                datalabels: {
                    display: false
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
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
            labels: [
                'Revenue Retention',
                'Integration Speed',
                'Gross Margin Efficiency',
                'Partner Adoption Rate',
                'System Uptime'
            ],
            datasets: [{
                label: 'Performance Metrics (%)',
                data: [
                    130,                            // NRR from financialData
                    operationalData.roi.integrationTime,
                    95.03,                         // Latest Gross Margin from financialData
                    85,                            // Partner Adoption Rate
                    operationalData.roi.uptime
                ],
                backgroundColor: colors.operational.primary + '40',
                borderColor: colors.operational.primary,
                pointBackgroundColor: colors.operational.secondary,
                pointBorderColor: colors.operational.primary,
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'ROI',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: '#333333'
                    },
                    grid: {
                        color: '#333333'
                    },
                    pointLabels: {
                        color: colors.text,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: colors.text,
                        backdropColor: 'transparent',
                        font: {
                            size: 10,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 140
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}



function createRevenueGrowthChart() {
    const ctx = document.getElementById('revenueGrowthChart').getContext('2d');
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
                    backgroundColor: colors.financial.primary + '20',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'ARR ($M)',
                    data: financialData.revenue.map(d => d.arr),
                    borderColor: colors.financial.secondary,
                    backgroundColor: colors.financial.secondary + '20',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue Growth',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createBurnMarginChart() {
    const ctx = document.getElementById('burnMarginChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['FY24', 'FY25', 'FY26'],
            datasets: [
                {
                    label: 'Burn Multiple',
                    data: [1.96, -0.24, -0.24],
                    borderColor: colors.financial.primary,
                    backgroundColor: colors.financial.primary + '20',
                    yAxisID: 'y',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Gross Margin (%)',
                    data: [74.19, 95.02, 95.03],
                    borderColor: colors.financial.secondary,
                    backgroundColor: colors.financial.secondary + '20',
                    yAxisID: 'y1',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Burn Margin',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    title: { 
                        display: true, 
                        text: 'Burn Multiple' 
                    },
                    ticks: { color: colors.text }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: { 
                        display: true, 
                        text: 'Gross Margin (%)' 
                    },
                    grid: { 
                        drawOnChartArea: false 
                    },
                    ticks: { color: colors.text }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}



function createRevenueStreamsChart() {
    const ctx = document.getElementById('revenueStreamsChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Base', 'Enterprise', 'Growth', 'Scale'],
            datasets: [{
                label: 'Revenue Streams',
                data: [23988, 54600, 44280, 26040],
                backgroundColor: [
                    colors.financial.primary,
                    colors.financial.primary + 'CC',
                    colors.financial.primary + '99',
                    colors.financial.primary + '66'
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue Streams',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createCostScalingChart() {
    const ctx = document.getElementById('costScalingChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['FY24', 'FY25', 'FY26'],
            datasets: [
                {
                    label: 'Engineering',
                    data: [5.18, 7.62, 9.03],
                    borderColor: colors.financial.primary,
                    backgroundColor: colors.financial.primary + '40',
                    fill: true
                },
                {
                    label: 'Sales',
                    data: [2.80, 4.53, 5.94],
                    borderColor: colors.financial.secondary,
                    backgroundColor: colors.financial.secondary + '40',
                    fill: true
                },
                {
                    label: 'Customer Success',
                    data: [2.08, 3.21, 3.86],
                    borderColor: colors.operational.primary,
                    backgroundColor: colors.operational.primary + '40',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Cost Scaling',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createHeadcountEfficiencyChart() {
    const ctx = document.getElementById('headcountEfficiencyChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['FY24', 'FY25', 'FY26'],
            datasets: [{
                label: 'Revenue per Employee ($K)',
                data: [140.8, 245.5, 449.2],
                backgroundColor: colors.financial.primary,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue per Employee',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createDeploymentTimelineChart() {
    const ctx = document.getElementById('deploymentTimelineChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Enterprise', 'SMB', 'Self-Service'],
            datasets: [
                {
                    label: 'Base',
                    data: [95, 85, 75],
                    backgroundColor: colors.operational.primary,
                    borderRadius: 4
                },
                {
                    label: 'Enterprise',
                    data: [80, 75, 65],
                    backgroundColor: colors.operational.primary + 'CC',
                    borderRadius: 4
                },
                {
                    label: 'Growth',
                    data: [70, 65, 55],
                    backgroundColor: colors.operational.primary + '99',
                    borderRadius: 4
                },
                {
                    label: 'Scale',
                    data: [60, 50, 40],
                    backgroundColor: colors.operational.primary + '66',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Feature Adoption by Segment',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    position: 'right',
                    align: 'start',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: colors.grid + '20'
                    },
                    ticks: {
                        color: colors.text,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}



function createSupportMetricsChart() {
    const ctx = document.getElementById('supportMetricsChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Response Time',
                'Resolution Time',
                'Customer Satisfaction',
                'Support Efficiency'
            ],
            datasets: [{
                label: 'Support Metrics',
                data: [99, 95, 98, 95],
                // Change background opacity for better visibility
                backgroundColor: colors.operational.primary + '10', // Change from '40' to '20'
                // Increase border width for more prominence
                borderColor: colors.operational.primary,
                borderWidth: 3, // Change from 2 to 3
                // Add point styling for better visibility
                pointBackgroundColor: colors.operational.primary,
                pointBorderColor: colors.background,
                pointHoverBackgroundColor: colors.operational.secondary,
                pointHoverBorderColor: colors.operational.primary,
                // Add point size configurations
                pointRadius: 4,
                pointHoverRadius: 6,
                // Add line tension for smoother curves
                lineTension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Support Metrics',
                    align: 'start',
                    color: colors.text,
                    // Increase title size
                    font: {
                        size: 18, // Change from 16 to 18
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    },
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    // Adjust angle lines for better visibility
                    angleLines: {
                        color: colors.grid + '90', // Change from '40' to '30'
                        lineWidth: 1
                    },
                    // Customize grid lines
                    grid: {
                        color: colors.grid + '95', // Change from '20' to '15'
                        circular: true
                    },
                    // Improve point labels
                    pointLabels: {
                        color: colors.text,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    // Customize ticks
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        stepSize: 20,
                        color: colors.text,
                        backdropColor: 'transparent',
                        // Add padding for better spacing
                        padding: 10,
                        font: {
                            size: 10,
                            weight: 'bold'
                        }
                    },
                    // Add minimum value to prevent chart from looking empty
                    min: 0
                }
            },
            // Add custom animation
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart',
                // Add sequential animation
                delay: (context) => context.dataIndex * 100
            }
        }
    });
}




function createMarketPenetrationChart() {
    const ctx = document.getElementById('marketPenetrationChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Retail/eComm', 'Logistics', 'Manufacturing', 'Healthcare'],
            datasets: [{
                data: [3000, 2000, 1500, 1000],
                backgroundColor: [
                    colors.operational.primary,
                    colors.operational.primary + 'CC',
                    colors.operational.primary + '99',
                    colors.operational.primary + '66'
                ],
                borderWidth: 2,
                borderColor: colors.background
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Market Penetration',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        color: colors.text,
                        boxWidth: 12,
                        padding: 20
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createPartnerGrowthChart() {
    const ctx = document.getElementById('partnerGrowthChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'sankey',
        data: {
            datasets: [{
                data: [
                    // Retail/eComm flows
                    { from: 'Retail/eComm', to: 'Base', flow: 1200 },
                    { from: 'Retail/eComm', to: 'Enterprise', flow: 800 },
                    { from: 'Retail/eComm', to: 'Growth', flow: 600 },
                    { from: 'Retail/eComm', to: 'Scale', flow: 400 },
                    
                    // Logistics flows
                    { from: 'Logistics', to: 'Base', flow: 800 },
                    { from: 'Logistics', to: 'Enterprise', flow: 600 },
                    { from: 'Logistics', to: 'Growth', flow: 400 },
                    { from: 'Logistics', to: 'Scale', flow: 200 },
                    
                    // Manufacturing flows
                    { from: 'Manufacturing', to: 'Base', flow: 600 },
                    { from: 'Manufacturing', to: 'Enterprise', flow: 400 },
                    { from: 'Manufacturing', to: 'Growth', flow: 300 },
                    { from: 'Manufacturing', to: 'Scale', flow: 200 },
                    
                    // Healthcare flows
                    { from: 'Healthcare', to: 'Base', flow: 400 },
                    { from: 'Healthcare', to: 'Enterprise', flow: 300 },
                    { from: 'Healthcare', to: 'Growth', flow: 200 },
                    { from: 'Healthcare', to: 'Scale', flow: 100 }
                ],
                colorFrom: (c) => colors.operational.primary + '80',
                colorTo: (c) => colors.operational.secondary + '80',
                colorMode: 'gradient',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Partner Distribution',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    display: false
                },
                // CHANGED: Modified tooltip to show flow value on hover
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            return `${items[0].raw.from} → ${items[0].raw.to}`;
                        },
                        label: (item) => {
                            return `Flow: ${item.raw.flow}`;
                        }
                    }
                },
                // CHANGED: Disable permanent data labels
                datalabels: {
                    display: false
                }
            }
        }
    });
}




function createTeamCompositionChart() {
    const ctx = document.getElementById('teamCompositionChart').getContext('2d');
    
    // Ensure getThemeColors returns an object with keys: 
    //   operational.primary, text, grid, etc.
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Leads', 'Qualified Prospects', 'Trials', 'Conversions'],
            datasets: [{
                label: 'Customer Journey',
                data: [5000, 2000, 828, 276],
                borderColor: colors.operational.primary,
                // 40 at the end translates to roughly 25% opacity in hex (e.g., #RRGGBB40)
                backgroundColor: colors.operational.primary + '40',
                fill: true,
                stepped: true,          // Creates a stepped line
                tension: 0.4            // Smooth line tension (ignored if stepped is true)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Customer Acquisition Journey',
                    align: 'start',
                    color: colors.text,
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'system-ui, -apple-system, sans-serif'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.grid + '20'
                    },
                    ticks: {
                        color: colors.text
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text
                    }
                }
            }
        }
    });
}



///////
function initChartNavigation() {
    const sections = ['financial', 'operational'];
    
    sections.forEach(section => {
        const container = document.querySelector(`.section.${section} .chart-container`);
        const dotsContainer = document.querySelector(`.section.${section} .slide-dots`);
        const charts = container.querySelectorAll('canvas');
        const prevBtn = document.querySelector(`.section.${section} .nav-arrow.left`);
        const nextBtn = document.querySelector(`.section.${section} .nav-arrow.right`);
        let currentIndex = 0;

        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Create dots dynamically
        charts.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                showChart(index, section);
                currentIndex = index;
            });
            dotsContainer.appendChild(dot);
        });

        function nextChart() {
            const nextIndex = (currentIndex + 1) % charts.length;
            showChart(nextIndex, section);
            currentIndex = nextIndex;
        }
        
        function prevChart() {
            const prevIndex = (currentIndex - 1 + charts.length) % charts.length;
            showChart(prevIndex, section);
            currentIndex = prevIndex;
        }
        
        // Initialize first chart
        showChart(0, section);

        // Add event listeners
        prevBtn.addEventListener('click', prevChart);
        nextBtn.addEventListener('click', nextChart);

        // Update arrow states
        function updateArrowStates() {
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex === charts.length - 1 ? '0.5' : '1';
        }

        // Initial arrow states
        updateArrowStates();
    });
}

function getChartFunction(chartId) {
    const chartFunctions = {
        'revenueChart': createRevenueChart,
        'unitEconomicsChart': createUnitEconomicsChart,
        'efficiencyChart': createEfficiencyChart,
        'implementationChart': createImplementationChart,
        'marketCoverageChart': createMarketCoverageChart,
        'roiChart': createROIChart,
        'revenueGrowthChart': createRevenueGrowthChart,
        'burnMarginChart': createBurnMarginChart,
        'revenueStreamsChart': createRevenueStreamsChart,
        'costScalingChart': createCostScalingChart,
        'headcountEfficiencyChart': createHeadcountEfficiencyChart,
        'deploymentTimelineChart': createDeploymentTimelineChart,
        'supportMetricsChart': createSupportMetricsChart,
        'marketPenetrationChart': createMarketPenetrationChart,
        'partnerGrowthChart': createPartnerGrowthChart,
        'teamCompositionChart': createTeamCompositionChart,


        
    };
    
    return chartFunctions[chartId];
}



function showChart(index, section) {
    const container = document.querySelector(`.section.${section} .chart-container`);
    if (!container) return;
    
    const charts = container.querySelectorAll('canvas');
    const dots = document.querySelector(`.section.${section} .slide-dots`).children;
    
    charts.forEach((chart, i) => {
        chart.style.display = i === index ? 'block' : 'none';
        chart.classList.toggle('active', i === index);
        
        // Only destroy/recreate the active chart
        const chartInstance = Chart.getChart(chart);
        if (chartInstance) {
            chartInstance.destroy();
        }
        if (i === index) {
            const chartFunction = getChartFunction(chart.id);
            if (chartFunction) {
                chartFunction();
            }
        }
    });
    
    Array.from(dots).forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}



function updateChartsTheme() {
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    Chart.instances.forEach(chart => {
        // Base theme updates
        chart.options.plugins.legend.labels.color = colors.text;
        chart.options.plugins.title.color = colors.text;
        
        // Update scales based on chart type
        if (chart.config.type === 'radar') {
            chart.options.scales.r.angleLines.color = colors.grid + '40';
            chart.options.scales.r.grid.color = colors.grid + '20';
            chart.options.scales.r.pointLabels.color = colors.text;
            chart.options.scales.r.ticks.color = colors.text;
            chart.options.scales.r.ticks.backdropColor = 'transparent';
        } else {
            chart.options.scales.x.grid.color = colors.grid + '20';
            chart.options.scales.y.grid.color = colors.grid + '20';
            chart.options.scales.x.ticks.color = colors.text;
            chart.options.scales.y.ticks.color = colors.text;
        }
        
        // Enhanced color palette with more nuanced color handling
        switch(chart.config.type) {
            case 'line':
            case 'area':
                chart.data.datasets.forEach((dataset, index) => {
                    dataset.borderColor = index === 0 
                        ? colors.financial.primary 
                        : colors.financial.secondary;
                    dataset.backgroundColor = index === 0 
                        ? colors.financial.gradient[0] 
                        : colors.financial.gradient[1];
                });
                break;
            
            case 'doughnut':
            case 'pie':
                chart.data.datasets[0].backgroundColor = [
                    colors.operational.primary,
                    colors.operational.primary + '80',
                    colors.operational.secondary,
                    colors.operational.secondary + '80'
                ];
                chart.data.datasets[0].borderColor = colors.background;
                break;
            
            case 'bar':
                chart.data.datasets.forEach((dataset, index) => {
                    dataset.backgroundColor = index === 0 
                        ? colors.operational.primary 
                        : colors.operational.secondary;
                });
                break;
            
            case 'radar':
                chart.data.datasets[0].backgroundColor = colors.operational.gradient[0] + '40';
                chart.data.datasets[0].borderColor = colors.operational.primary;
                chart.data.datasets[0].pointBackgroundColor = colors.operational.secondary;
                chart.data.datasets[0].pointBorderColor = colors.operational.primary;
                break;
        }
        
        chart.update('none'); // Prevents re-animation
    });

    // Refined theme transition with GSAP
    gsap.to('body', {
        duration: 0.4,
        backgroundColor: document.body.classList.contains('dark-theme') ? '#1a202c' : '#ffffff',
        color: document.body.classList.contains('dark-theme') ? '#e2e8f0' : '#2d3748',
        ease: 'power2.inOut'
    });

    // Optional: Additional subtle transitions
    gsap.to('.metric-card', {
        duration: 0.3,
        backgroundColor: document.body.classList.contains('dark-theme') ? '#2d3748' : '#f7fafc',
        color: document.body.classList.contains('dark-theme') ? '#e2e8f0' : '#2d3748',
        stagger: 0.05,
        ease: 'power1.inOut'
    });
}





// Initialize when DOM is loaded
// Update the initialization code
document.addEventListener('DOMContentLoaded', function() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard?.classList.contains('active')) {
        setTimeout(() => {
            try {
                 // CHANGE: Move plugin registration before initDashboard
                // Register required Chart.js plugins first
                Chart.register(ChartDataLabels);

                // CHANGE: Update Funnel plugin registration to use correct object
                if (typeof Chart.Funnel !== 'undefined') {  // Changed from window.Chart.Funnel
                    Chart.register(Chart.Funnel);
                } else {
                    console.error('Funnel plugin not loaded');
                }
                
                // CHANGE: Update Graph plugin registration to use correct object
                if (typeof Chart.Graph !== 'undefined') {  // Changed from window.Chart.Graph
                    Chart.register(Chart.Graph);
                } else {
                    console.error('Graph plugin not loaded');
                }

                // ADD: Console log to verify plugin registration
                console.log('Chart plugins registered:', {
                    funnel: typeof Chart.Funnel !== 'undefined',
                    graph: typeof Chart.Graph !== 'undefined'
                });
                
                // MOVE: initDashboard after plugin registration
                initDashboard();
                
                // Wait for charts to be created
                setTimeout(() => {
                    // Initialize navigation
                    initChartNavigation();
                    
                    // Then show initial charts
                    showChart(0, 'financial');
                    showChart(0, 'operational');
                }, 300);
                
            } catch (error) {
                console.error('Dashboard initialization failed:', error);
            }
        }, 100);
    }
});




// Update switchSubtab
function switchSubtab(subtabId) {
    document.querySelectorAll('.subtab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.subtab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(subtabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Enhanced dashboard animations
function initDashboardAnimations() {
    // Staggered entry animation for metric cards
    gsap.from('.metric-card', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Enhanced chart reveal animations with scaling
    gsap.from('.chart-container', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        scale: 0.95,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        delay: 0.3
    });
}
