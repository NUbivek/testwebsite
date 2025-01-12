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
        background: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        text: isDark ? '#e2e8f0' : '#2d3748',
        grid: isDark ? '#475569' : '#e2e8f0',
        financial: {
            primary: isDark ? '#60a5fa' : '#3b82f6',
            secondary: isDark ? '#93c5fd' : '#60a5fa',
            gradient: isDark ? 
                ['rgba(96, 165, 250, 0.8)', 'rgba(147, 197, 253, 0.8)'] :
                ['rgba(59, 130, 246, 0.8)', 'rgba(96, 165, 250, 0.8)']
        },
        operational: {
            primary: isDark ? '#818cf8' : '#4f46e5',
            secondary: isDark ? '#a5b4fc' : '#818cf8',
            gradient: isDark ?
                ['rgba(129, 140, 248, 0.8)', 'rgba(165, 180, 252, 0.8)'] :
                ['rgba(79, 70, 229, 0.8)', 'rgba(129, 140, 248, 0.8)']
        }
    };
}



// Chart Navigation Functions
function initChartNavigation() {
    const sections = ['financial', 'operational'];
    
    sections.forEach(section => {
        const container = document.querySelector(`.section.${section} .chart-container`);
        const charts = container.querySelectorAll('canvas');
        const dots = document.querySelectorAll(`.section.${section} .dot`);
        const prevBtn = document.querySelector(`.section.${section} .nav-arrow.left`);
        const nextBtn = document.querySelector(`.section.${section} .nav-arrow.right`);
        let currentIndex = 0;

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

        // Add in initChartNavigation
        prevBtn.addEventListener('click', prevChart);
        nextBtn.addEventListener('click', nextChart);

        
        // Event listeners
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showChart(index, section));
        });

    });
}

// Standalone function outside any other function
function showChart(index, section) {
    const container = document.querySelector(`.section.${section} .chart-container`);
    const charts = container.querySelectorAll('canvas');
    const dots = document.querySelectorAll(`.section.${section} .dot`);
    
    // Reset all charts and dots
    charts.forEach(chart => {
        chart.style.display = 'none';
        chart.classList.remove('active');
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected chart and dot
    if (charts[index]) {
        charts[index].style.display = 'block';
        charts[index].classList.add('active');
        dots[index]?.classList.add('active');
        
        // Force chart redraw
        const chartInstance = Chart.getChart(charts[index]);
        if (chartInstance) {
            chartInstance.update();
        }
    }
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
                'Labor Cost Savings',
                'Integration Speed',
                'Operational Efficiency',
                'Success Rate',
                'System Uptime'
            ],
            datasets: [{
                label: 'Performance Metrics (%)',
                data: [
                    operationalData.roi.laborCost,
                    operationalData.roi.integrationTime,
                    operationalData.roi.operationalCost,
                    operationalData.roi.successRate,
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
                },
                datalabels: {
                    display: false
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: colors.grid + '40'
                    },
                    grid: {
                        color: colors.grid + '20'
                    },
                    pointLabels: {
                        color: colors.text,
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        color: colors.text,
                        backdropColor: 'transparent',
                        font: {
                            size: 10
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
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Burn Multiple vs Margin',
                data: [
                    {x: 1.96, y: 74.19},
                    {x: -0.24, y: 95.02},
                    {x: -0.24, y: 95.03}
                ],
                backgroundColor: colors.financial.primary,
                borderColor: colors.financial.secondary,
                pointRadius: 8,
                pointHoverRadius: 12
            }]
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
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Burn Multiple'
                    },
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Gross Margin (%)'
                    },
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
                    text: 'Headcount Efficiency',
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
                    label: 'Orderful (Days)',
                    data: [9, 5, 1],
                    backgroundColor: colors.operational.primary,
                    borderRadius: 6
                },
                {
                    label: 'Industry Average',
                    data: [45, 30, 14],
                    backgroundColor: colors.operational.secondary,
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
                    text: 'Deployment Timeline',
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
                    beginAtZero: true,
                    ticks: { color: colors.text },
                    grid: { color: colors.grid + '20' }
                },
                y: {
                    ticks: { color: colors.text },
                    grid: { display: false }
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
                backgroundColor: colors.operational.primary + '40',
                borderColor: colors.operational.primary,
                pointBackgroundColor: colors.operational.secondary,
                pointBorderColor: colors.operational.primary,
                borderWidth: 2
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
                r: {
                    angleLines: {
                        color: colors.grid + '40'
                    },
                    grid: {
                        color: colors.grid + '20'
                    },
                    pointLabels: {
                        color: colors.text
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        color: colors.text
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
        type: 'bar',
        data: {
            labels: ['FY24', 'FY25', 'FY26'],
            datasets: [
                {
                    label: 'Partners',
                    type: 'bar',
                    data: [5000, 6500, 8000],
                    backgroundColor: colors.operational.primary,
                    borderRadius: 6,
                    order: 2
                },
                {
                    label: 'Growth Rate (%)',
                    type: 'line',
                    data: [156, 130, 123],
                    borderColor: colors.operational.secondary,
                    backgroundColor: colors.operational.secondary + '20',
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Partner Growth',
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

function createTeamCompositionChart() {
    const ctx = document.getElementById('teamCompositionChart').getContext('2d');
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Engineering', 'Sales', 'Customer Success', 'Product'],
            datasets: [{
                data: [28, 18, 15, 12],
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
                    text: 'Team Scaling',
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


// Update chart navigation system
function initChartNavigation() {
    const financialCharts = document.querySelectorAll('.section.financial .chart-container canvas');
    const operationalCharts = document.querySelectorAll('.section.operational .chart-container canvas');
    
    // Initialize navigation for both sections
    initSectionNavigation('financial', financialCharts);
    initSectionNavigation('operational', operationalCharts);
}

function initSectionNavigation(section, charts) {
    const container = document.querySelector(`.section.${section}`);
    const leftArrow = container.querySelector('.nav-arrow.left');
    const rightArrow = container.querySelector('.nav-arrow.right');
    const dotsContainer = container.querySelector('.slide-dots');
    
    let currentIndex = 0;
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots based on number of charts
    charts.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showChart(index));
        dotsContainer.appendChild(dot);
    });

    // Show initial chart
    showChart(0);

    // Navigation functions
    function showChart(index) {
        charts.forEach((chart, i) => {
            chart.style.display = i === index ? 'block' : 'none';
            dotsContainer.children[i].classList.toggle('active', i === index);
        });
        currentIndex = index;
        
        // Update arrow states
        leftArrow.style.opacity = currentIndex === 0 ? '0.5' : '1';
        rightArrow.style.opacity = currentIndex === charts.length - 1 ? '0.5' : '1';
    }

    // Event listeners
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            showChart(currentIndex - 1);
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < charts.length - 1) {
            showChart(currentIndex + 1);
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showChart(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < charts.length - 1) {
            showChart(currentIndex + 1);
        }
    });

    // Add swipe navigation
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < charts.length - 1) {
                // Swipe left
                showChart(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right
                showChart(currentIndex - 1);
            }
        }
    }
}

// Call this function after all charts are initialized
function updateDashboard() {
    initChartNavigation();
    // Add any additional dashboard updates here
}


function updateChartsTheme() {
    const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
    Chart.instances.forEach(chart => {
        // Base theme updates
        chart.options.plugins.legend.labels.color = colors.text;
        chart.options.plugins.title.color = colors.text;
        
        // Update scales based on chart type
        if (chart.config.type === 'radar') {
            chart.options.scales.r.angleLines.color = colors.grid;
            chart.options.scales.r.grid.color = colors.grid;
            chart.options.scales.r.pointLabels.color = colors.text;
            chart.options.scales.r.ticks.color = colors.text;
            chart.options.scales.r.ticks.backdropColor = 'transparent';
        } else {
            chart.options.scales.x.grid.color = colors.grid;
            chart.options.scales.y.grid.color = colors.grid;
            chart.options.scales.x.ticks.color = colors.text;
            chart.options.scales.y.ticks.color = colors.text;
        }
        
        // Update chart-specific colors
        if (chart.config.type === 'line' || chart.config.type === 'area') {
            chart.data.datasets.forEach((dataset, index) => {
                dataset.borderColor = index === 0 ? colors.financial.primary : colors.financial.secondary;
                dataset.backgroundColor = index === 0 ? colors.financial.primary + '40' : colors.financial.secondary + '40';
            });
        } else if (chart.config.type === 'doughnut' || chart.config.type === 'pie') {
            chart.data.datasets[0].backgroundColor = [
                colors.operational.primary,
                colors.operational.primary + '80',
                colors.operational.secondary,
                colors.operational.secondary + '80'
            ];
        } else if (chart.config.type === 'bar') {
            chart.data.datasets.forEach((dataset, index) => {
                dataset.backgroundColor = index === 0 ? colors.operational.primary : colors.operational.secondary;
            });
        } else if (chart.config.type === 'radar') {
            chart.data.datasets[0].backgroundColor = colors.operational.primary + '40';
            chart.data.datasets[0].borderColor = colors.operational.primary;
            chart.data.datasets[0].pointBackgroundColor = colors.operational.secondary;
            chart.data.datasets[0].pointBorderColor = colors.operational.primary;
        }
        
        chart.update();
    });


    // Animate theme transition
    gsap.to('body', {
        duration: 0.3,
        backgroundColor: document.body.classList.contains('dark-theme') ? '#1a202c' : '#ffffff',
        ease: 'power2.inOut'
    });
}



// Initialize when DOM is loaded
// Update the initialization code
document.addEventListener('DOMContentLoaded', function() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard?.classList.contains('active')) {
        // Increase timeout to ensure DOM is ready
        setTimeout(() => {
            try {
                // Verify elements exist before initialization
                const financialSection = document.querySelector('.section.financial');
                const operationalSection = document.querySelector('.section.operational');
                
                if (financialSection && operationalSection) {
                    initDashboard();
                    showChart(0, 'financial');
                    showChart(0, 'operational');
                } else {
                    console.error('Required dashboard sections not found');
                }
            } catch (error) {
                console.error('Dashboard initialization failed:', error);
            }
        }, 300); // Increased timeout
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



