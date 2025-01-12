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

function initDashboard() {
    // Ensure Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    try {
        const charts = [
            createRevenueChart,
            createUnitEconomicsChart,
            createEfficiencyChart,
            createImplementationChart,
            createMarketCoverageChart,
            createROIChart
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





// Updated Chart Creation Functions with new chart types
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
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'ARR ($M)',
                    data: financialData.revenue.map(d => d.arr),
                    borderColor: colors.financial.secondary,
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: colors.text }
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
                    backgroundColor: colors.financial.primary + '40',
                    borderColor: colors.financial.primary,
                    fill: true
                },
                {
                    label: 'Rule of 40',
                    data: financialData.metrics.map(d => d.rule40),
                    backgroundColor: colors.financial.secondary + '40',
                    borderColor: colors.financial.secondary,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: colors.text }
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
        type: 'doughnut',
        data: {
            labels: ['ARR/Employee', 'ARR/Customer', 'NRR'],
            datasets: [{
                data: [
                    financialData.revenue[2].arrPerEmployee/1000,
                    financialData.revenue[2].arrPerCustomer/1000,
                    financialData.metrics[2].nrr
                ],
                backgroundColor: [
                    colors.financial.primary,
                    colors.financial.secondary,
                    colors.financial.primary + '80'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: colors.text }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000
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
                    borderRadius: 8
                },
                {
                    label: 'Industry Average',
                    data: operationalData.implementation.map(d => d.industry),
                    backgroundColor: colors.operational.secondary,
                    borderRadius: 8
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: colors.text }
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
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: colors.text }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000
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
            labels: ['Labor Cost Savings', 'Integration Speed', 'Operational Efficiency', 'Success Rate', 'System Uptime'],
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
                lineTension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: colors.text }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: colors.text + '40'
                    },
                    grid: {
                        color: colors.text + '20'
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
document.addEventListener('DOMContentLoaded', function() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard?.classList.contains('active')) {
        // Ensure proper initialization timing
        setTimeout(() => {
            try {
                initDashboard();
            } catch (error) {
                console.error('Dashboard initialization failed:', error);
            }
        }, 100);
    }
});




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
