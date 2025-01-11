    // Data Constants and Theme Configuration remain the same
    
    // Chart Creation Functions
    function createFinancialCharts() {
        const colors = getThemeColors(document.body.classList.contains('dark-theme'));
        
        // 1. Revenue & ARR Growth - Line Chart (keep existing)
        createRevenueChart();
    
        // 2. Unit Economics - Area Chart
        new Chart(document.getElementById('unitEconomicsChart').getContext('2d'), {
            type: 'line',
            data: {
                labels: financialData.metrics.map(d => d.year),
                datasets: [
                    {
                        label: 'Gross Margin (%)',
                        data: financialData.metrics.map(d => d.margin),
                        borderColor: colors.financial.primary,
                        backgroundColor: colors.financial.primary + '40',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Rule of 40',
                        data: financialData.metrics.map(d => d.rule40),
                        borderColor: colors.financial.secondary,
                        backgroundColor: colors.financial.secondary + '40',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: { display: true, text: 'Unit Economics' }
                }
            }
        });
    
        // 3. Efficiency Metrics - Donut Chart
        new Chart(document.getElementById('efficiencyChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['ARR per Employee', 'ARR per Customer', 'Operating Efficiency'],
                datasets: [{
                    data: [449184, 33043, 95.03],
                    backgroundColor: [
                        colors.financial.primary,
                        colors.financial.secondary,
                        colors.financial.primary + '80'
                    ]
                }]
            },
            options: {
                cutout: '70%',
                plugins: {
                    title: { display: true, text: 'Efficiency Distribution' }
                }
            }
        });
    }
    
    function createOperationalCharts() {
        const colors = getThemeColors(document.body.classList.contains('dark-theme'));
    
        // 1. Implementation Timeline - Horizontal Bar
        new Chart(document.getElementById('implementationChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: operationalData.implementation.map(d => d.category),
                datasets: [{
                    label: 'Days to Implement',
                    data: operationalData.implementation.map(d => d.orderful),
                    backgroundColor: colors.operational.primary,
                    barThickness: 20
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: {
                    title: { display: true, text: 'Implementation Timeline' }
                }
            }
        });
    
        // 2. Market Coverage - Pie Chart with Exploded Segments
        new Chart(document.getElementById('marketCoverageChart').getContext('2d'), {
            type: 'pie',
            data: {
                labels: operationalData.marketCoverage.map(d => d.vertical),
                datasets: [{
                    data: operationalData.marketCoverage.map(d => d.partners),
                    backgroundColor: [
                        colors.operational.primary,
                        colors.operational.secondary,
                        colors.operational.primary + '80',
                        colors.operational.secondary + '80'
                    ],
                    offset: [20, 20, 20, 20]
                }]
            },
            options: {
                plugins: {
                    title: { display: true, text: 'Market Distribution' }
                }
            }
        });
    
        // 3. ROI Impact - Flow Chart (Simulated Sankey)
        new Chart(document.getElementById('roiChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Cost Savings', 'Time Savings', 'Efficiency'],
                datasets: [
                    {
                        label: 'Direct Impact',
                        data: [70, 80, 90],
                        backgroundColor: colors.operational.primary + '80'
                    },
                    {
                        label: 'Indirect Impact',
                        data: [30, 40, 50],
                        backgroundColor: colors.operational.secondary + '80'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: { display: true, text: 'ROI Impact Flow' }
                },
                scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                }
            }
        });
    }
    
    // Chart Navigation
    function initChartNavigation() {
        const carousel = document.querySelector('.chart-carousel');
        const slides = document.querySelectorAll('.chart-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.nav-button.prev');
        const nextBtn = document.querySelector('.nav-button.next');
        let currentIndex = 0;
    
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.opacity = 0;
            });
            indicators.forEach(ind => ind.classList.remove('active'));
    
            slides[index].classList.add('active');
            slides[index].style.opacity = 1;
            indicators[index].classList.add('active');
            currentIndex = index;
        }
    
        prevBtn?.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        });
    
        nextBtn?.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        });
    
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });
    
        // Auto-advance slides
        setInterval(() => {
            if (document.getElementById('dashboard').classList.contains('active')) {
                const newIndex = (currentIndex + 1) % slides.length;
                showSlide(newIndex);
            }
        }, 5000);
    }
    
    // Initialize Dashboard
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('dashboard').classList.contains('active')) {
            setTimeout(() => {
                createFinancialCharts();
                createOperationalCharts();
                initChartNavigation();
            }, 100);
        }
    });
