/* chart-specific.js */
const chartConfigs = {
    revenue: {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue Growth',
                data: [30, 45, 60, 70, 85, 100],
                borderColor: '#1e40af',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    },
    // Add more chart configurations
};

// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCharts();
    initMetricAnimations();
});

function initThemeToggle() {
    const checkbox = document.querySelector('#checkbox');
    const theme = localStorage.getItem('theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        checkbox.checked = true;
    }

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        updateChartsTheme();
    });
}

function initCharts() {
    // Initialize chart instances using chartConfigs
    Object.entries(chartConfigs).forEach(([id, config]) => {
        const ctx = document.querySelector(`#${id}Chart canvas`).getContext('2d');
        new Chart(ctx, config);
    });
}

function initMetricAnimations() {
    const cards = document.querySelectorAll('.metric-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateValue(entry.target);
            }
        });
    });

    cards.forEach(card => observer.observe(card));
}

function animateValue(card) {
    const valueDisplay = card.querySelector('.value');
    const endValue = parseFloat(valueDisplay.getAttribute('data-value'));
    
    anime({
        targets: { value: 0 },
        value: endValue,
        duration: 2000,
        easing: 'easeOutCubic',
        update: function(anim) {
            valueDisplay.textContent = anim.animations[0].currentValue.toFixed(1) + '%';
        }
    });
}
