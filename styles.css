/* Base styles */
html {
    scroll-behavior: smooth;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    background: #f8f9fa;
    color: #2d3748;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
}

.title-slide {
    position: relative;
    text-align: center;
}

.highlight-text {
    font-size: 2em; /* Larger font size for emphasis */
    color: #ffcc00; /* Highlight color */
    animation: fadeIn 1s ease-in-out; /* Animation for dramatic entry */
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.blur-background {
    filter: blur(5px); /* Blur effect for background */
    transition: filter 0.5s ease; /* Smooth transition */
}


.card ul ul {
    margin-top: 8px;
    margin-bottom: 0;
    padding-left: 20px;
}

.card ul ul li {
    margin-bottom: 4px;
    list-style-type: circle;
}


/* Theme Variables */
:root {
    --financial-primary: #1e40af;
    --financial-secondary: #60a5fa;
    --financial-gradient: linear-gradient(145deg, #1e40af26, #60a5fa26);
    --operational-primary: #0f172a;
    --operational-secondary: #475569;
    --operational-gradient: linear-gradient(145deg, #0f172a26, #47556926);
    --bg-primary: #ebf2f1;
    --text-primary: #0c111c;
    --card-bg: #f7fafc;
}

/* Dark Theme Overrides */
[data-theme="dark"], body.dark-theme {
   --bg-primary: #0f172a;           /* Darker background */
    --card-bg: #1e293b;             /* Deeper card color */
    --financial-gradient: linear-gradient(145deg, #1e40af66, #60a5fa66);
    --operational-gradient: linear-gradient(145deg, #0f172a66, #47556966);
    --border-color: #2d3748;
    --text-primary: #f1f5f9;         /* Increase brightness for main text */
    --text-secondary: #cbd5e0;       /* Lighter subtext */
    --text-tertiary: #a0aec0;        /* Even lighter tertiary text */
}

          /* Dashboard Base */
                #investor-dashboard {
                min-height: 600px;
                width: 100%;
                max-width: 1440px; /* Added */
                margin: 0 auto; /* Added */
                padding: 0.5rem;
                border-radius: 0.5rem;
                background: var(--bg-primary);
                color: var(--text-primary);
                transition: all 0.3s ease;
            }
            
            .dashboard-container {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem 2rem; /* Modified */
                max-width: 100%; /* Added */
                margin: 0 auto; /* Added */
            }
                
                /* Metrics Grid Layout */
                .metrics-section {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                
              .section {
                    padding: 1rem;
                    border-radius: 0.5rem;
                    transition: background 0.3s ease;
                    position: relative;
                  display: flex;  /* Add this for proper content alignment */
                flex-direction: column;  /* Add this for proper content alignment */
                    
                }
                
                .section.financial {
                    background: var(--financial-gradient);
                }
                
                .section.operational {
                    background: var(--operational-gradient);
                }
                
                /* KPI Cards Grid */
                .kpi-grid,
                .metrics-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: repeat(3, minmax(65px, auto));
                    gap: 0.75rem;
                    align-items: stretch;
                }
                
               /* Update metric card layout */
                    .metric-card {
                        background: var(--card-bg);
                        padding: 0.75rem 2rem 0.75rem 1rem;
                        border-radius: 0.5rem;
                        border: 1px solid var(--border-color);
                        box-shadow: 0 10px 16px rgba(0, 0, 0, 0.15);
                        animation: fadeIn 0.3s ease-in-out;
                        display: grid;
                        grid-template-columns: 65% 35%;
                        grid-template-areas: 
                            "title trend"
                            "value trend";
                        align-items: center;
                        gap: 0.25rem 0.75rem;
                        min-height: 65px;
                        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                                    box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                /* Enhanced Animations for Metric Cards */
                .metric-card {
                    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                                box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

               .metric-card:hover {
                    Y(-2px) scale(1.02);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                }
                
                .metric-card h3 {
                    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
                    margin: 0;
                    color: var(--text-secondary);
                    font-weight: 500;
                    grid-area: title;
                    line-height: 1.2;
                }
            
            .metric-card .value {
                font-size: clamp(1rem, 2vw, 1.2rem);
                font-weight: bold;
                margin: 0;
                color: var(--text-primary);
                grid-area: value;
                line-height: 1.2;
            }
            
            .metric-card .trend {
                font-size: clamp(0.7rem, 1.3vw, 0.8rem);
                color: var(--text-tertiary);
                grid-area: trend;
                text-align: right;
                align-self: center;
                line-height: 1.1;
            }
                
                /* Charts Section */
                .charts-section {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin: 1.5rem 0;
                    height: 400px;
                }
                
                .chart-slider {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                
                .chart-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    position: relative;
                }

                .chart-container canvas[id="roiChart"] {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 90%;
                    max-height: 90%;
                }
                

.chart-container canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 90%;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    display: none;  // Add this line
}

.chart-container canvas.active {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    display: block;  // Add this line
}

.chart-container canvas {
    display: none;
}

.chart-container canvas.active {
    display: block;
}


/* Add these to your existing CSS */
.top-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.middle-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

/* Update chart container for better visibility */
.chart-container {
    min-height: 400px;
    width: 100%;
}

/* Ensure proper chart scaling */
.chart-container canvas.active {
    max-width: 100%;
    height: auto;
}

                /* Chart-specific animations */
               @keyframes chartFadeIn {
                from { 
                    opacity: 0; 
                    transform: translate(-50%, -40%) scale(0.95); 
                }
                to { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1); 
                }
            }

                
                @keyframes donutRotate {
                    from { transform: translate(-50%, -50%) rotate(-90deg); }
                    to { transform: translate(-50%, -50%) rotate(0); }
                }
                
                @keyframes barGrow {
                    from { transform: translate(-50%, -50%) scaleX(0); }
                    to { transform: translate(-50%, -50%) scaleX(1); }
                }
                
                @keyframes sankeyFlow {
                    from { stroke-dashoffset: 1000; }
                    to { stroke-dashoffset: 0; }
                }

                


                /* Navigation Controls */
                .nav-arrow {
                    position: absolute;
                    bottom: 1px;  /* Changed from top: 50% */
                    transform: translateX(0);  /* Changed from translateY(-50%) */
                    z-index: 10;
                    background: var(--bg-primary);
                    opacity: 0.8;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    opacity: 0.9;
                    transition: opacity 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: var(--text-primary);
                }
                
                .nav-arrow:hover {
                    opacity: 1;
                    background: var(--card-bg);
                }
                
                .nav-arrow.left {
                    left: 10px;
                }
                
                .nav-arrow.right {
                    right: 10px;
                }
                
                .slide-dots {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 8px;
                    z-index: 10;
                }
                
                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--text-secondary);
                    opacity: 0.5;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                }
                
                .dot.active {
                    opacity: 1;
                    background: var(--text-primary);
                }
                
                /* Theme Variables */
                :root {
                    --bg-primary: #ffffff;
                    --card-bg: #ffffff;
                    --financial-gradient: linear-gradient(145deg, #1e40af22, #60a5fa22);
                    --operational-gradient: linear-gradient(145deg, #0f172a22, #47556922);
                    --border-color: #e2e8f0;
                    --text-primary: #1a202c;
                    --text-secondary: #4a5568;
                    --text-tertiary: #718096;
                }
                
                [data-theme="dark"] {
                    --bg-primary: #1a202c;
                    --card-bg: #2d3748;
                    --financial-gradient: linear-gradient(145deg, #1e40af44, #60a5fa44);
                    --operational-gradient: linear-gradient(145deg, #0f172a44, #47556944);
                    --border-color: #2d3748;
                    --text-primary: #f7fafc;
                    --text-secondary: #e2e8f0;
                    --text-tertiary: #cbd5e0;
                }
                
                /* Responsive Design */
                @media (max-width: 768px) {
                    .metrics-section,
                    .charts-section {
                        grid-template-columns: 1fr;
                    }
                    
                    .kpi-grid,
                    .metrics-container {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto;
                    }
                    
                    .chart-container {
                        height: 250px;
                    }
                }
                
                /* Animations */
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }



/* Main container and shared styles */
.container,
.title-slide,
.tabs,
.tab-content,
.pdf-container,
#investment-memo,
.memo-content,
.dashboard-container,
.grid-2,
.experience-container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 20px;
    box-sizing: border-box;
}

/* Title Slide */
.title-slide {
    background: linear-gradient(-45deg, #1a365d, #2a4365, #2c5282, #2b6cb0);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    color: white;
    text-align: center;
    padding: 60px 40px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.title-slide:hover {
    transform: translateY(-5px);
}

.title-slide h1 {
    color: white;
    font-size: 3em;
    margin-bottom: 10px;
    animation: slideInUp 1s ease-out;
}

.subtitle {
    font-size: 1.2em;
    margin-bottom: 30px;
    animation: slideInUp 1s ease-out 0.2s backwards;
}

/* Tab System */
.tabs {
    margin-top: 20px;
    animation: slideInUp 1s ease-out 0.4s backwards;
}

.tab-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.tab-button {
    padding: 12px 24px;
    background: #e2e8f0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.tab-button:hover {
    background: #cbd5e0;
    transform: translateY(-2px);
}

.tab-button.active {
    background: #4299e1;
    color: white;
    animation: pulse 2s infinite;
}

/* Tab Content */
.tab-content {
    display: none;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-content.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

h2 {
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

/* Dark mode support */
body.dark-theme h2 {
    border-bottom-color: #4a5568;
}


/* PDF Container and Navigation */
.pdf-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    margin: 20px auto;
    overflow: hidden;
    width: 100%;
    max-width: 1200px;
}

.pdf-navigation {
    background: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 16px 24px;
    position: sticky;
    top: 0;
    z-index: 10;
}

.pdf-selector {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scrollbar-width: thin;
    padding-bottom: 4px;
}

.pdf-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #edf2f7;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    color: #4a5568;
    font-size: 0.9em;
}

.pdf-tab:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
}

.pdf-tab.active {
    background: #4299e1;
    color: white;
}

/* PDF Viewer and Frame */
.pdf-viewer {
    background: #f8f9fa;
    padding: 24px;
    min-height: 800px;
    position: relative;
}

.pdf-viewer::before {
    content: "Loading...";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #4a5568;
    font-size: 1.1em;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.pdf-viewer.loading::before {
    opacity: 1;
}

.pdf-frame {
    width: 100%;
    height: 800px;
    border: none;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: none;
    visibility: hidden;
}

.pdf-frame.active {
    display: block;
    visibility: visible;
    opacity: 1;
}

/* LinkedIn Embed Optimization */
iframe[src*="linkedin.com"] {
    width: 100%;
    min-height: 800px;
    border: none;
    border-radius: 8px;
    background: transparent;
    transition: opacity 0.3s ease;
}

/* Dark Mode Adjustments */
body.dark-theme .pdf-container {
    background: #1a202c;
}

body.dark-theme .pdf-navigation {
    background: #2d3748;
    border-bottom: 1px solid #4a5568;
}

body.dark-theme .pdf-viewer {
    background: #1a202c;
}

body.dark-theme .pdf-frame {
    background: #2d3748;
    box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
    .pdf-frame,
    iframe[src*="linkedin.com"] {
        height: 600px;
    }
    
    .pdf-viewer {
        padding: 16px;
    }
}


/* Experience Boxes */
.experience-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.experience-box {
    background: #f7fafc;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    border-left: 4px solid #4299e1;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.experience-category:nth-child(1) .experience-box {
    border-left: 4px solid #1a365d;
}

.experience-category:nth-child(2) .experience-box {
    border-left: none;
}

.experience-box h3 {
    margin-top: 2px;
    margin-bottom: 8px;
    padding-top: 2px;
    padding-bottom: 0;
}

.experience-box ul {
    margin-top: 0;
    padding-top: 2px;
}

.experience-box.visible {
    opacity: 1;
    transform: translateY(0);
}

.experience-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.experience-date {
    position: absolute;
    top: -10px;
    right: 10px;
    background: #4299e1;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8em;
}

/* Strategic Notes */
.strategic-note {
    position: relative;
    font-size: 0.85em;
    color: #4a5568;
    padding: 4px 12px;
    margin: 0 0 4px 0;
    display: inline-block;
    background: linear-gradient(120deg, #f7fafc 0%, #edf2f7 100%);
    border-left: 3px solid #4299e1;
    opacity: 0.85;
    font-style: italic;
    letter-spacing: 0.02em;
    border-radius: 0 4px 4px 0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.strategic-note:before {
    content: "";
    position: absolute;
    left: -3px;
    top: 0;
    width: 100%;
    height: 100%;
    background: #4299e1;
    opacity: 0.05;
    z-index: -1;
}

/* Memo Content and Subtabs */
        .memo-content {
            display: none;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .memo-content.active {
            display: block;
        }
        
        .subtab-navigation {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 10px;
        }
        
        .subtab-button {
            padding: 8px 16px;
            background: #edf2f7;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9em;
            color: #4a5568;
        }
        
        .subtab-button:hover {
            background: #e2e8f0;
            transform: translateY(-1px);
        }
        
        .subtab-button.active {
            background: #4299e1;
            color: white;
        }
        
        .subtab-content {
            display: none;
            padding: 20px 0;
        }
        
        .subtab-content.active {
            display: block;
        }
        
        /* Dark Mode Additions for Subtabs */
        body.dark-theme .memo-content {
            background: #1a202c;
        }
        
        body.dark-theme .subtab-button {
            background: #2d3748;
            color: #e2e8f0;
        }
        
        body.dark-theme .subtab-button:hover {
            background: #4a5568;
        }
        
        body.dark-theme .subtab-button.active {
            background: #4299e1;
        }


/* Cards and Market Stats */
.card {
    background: #edf2f7;
    padding: 20px;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(20px);
    will-change: transform;
}

.card.visible {
    opacity: 1;
    transform: translateY(0);
}

.market-stat {
    background: #ebf8ff;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
    transition: all 0.3s ease;
}

.market-stat:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.stat-number {
    font-size: 2em;
    font-weight: bold;
    color: #2b6cb0;
    opacity: 0;
    animation: slideInUp 1s forwards;
    animation-delay: 0.3s;
}


/* Quote */
.quote {
    position: relative;
    opacity: 0;
    animation: slideInUp 1s forwards;
    animation-delay: 0.2s;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    border-left: 4px solid #4299e1;
    padding: 30px;
    margin: 40px 0;
    font-style: italic;
    text-align: center;
    font-size: 1.2em;
    color: #4a5568;
}

.quote:before, .quote:after {
    content: '"';
    position: absolute;
    font-size: 4em;
    opacity: 0.1;
    font-family: Georgia, serif;
    color: #4299e1;
}

.quote:before {
    left: 10px;
    top: -20px;
}

.quote:after {
    right: 10px;
    bottom: -40px;
}

/* Grid Layout */
.grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.blue-bold {
    color: #2b6cb0;
    font-weight: bold;
}

/* Dark Mode */
body.dark-theme {
    background: #121212;
    color: #e2e8f0;
}

body.dark-theme .tab-content,
body.dark-theme .card,
body.dark-theme .market-stat,
body.dark-theme .pdf-navigation {
    background: #2d3748;
}

body.dark-theme .tab-button,
body.dark-theme .pdf-tab {
    background: #4a5568;
    color: #e2e8f0;
}

body.dark-theme .tab-button:hover,
body.dark-theme .pdf-tab:hover {
    background: #718096;
}

body.dark-theme .tab-button.active,
body.dark-theme .pdf-tab.active {
    background: #4299e1;
    color: #fff;
}

body.dark-theme .experience-box {
    background: #1a202c;
    border-left-color: rgba(66, 153, 225, 0.6);
}

body.dark-theme .experience-box:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

body.dark-theme .experience-category h3[style*="color: #4a5568"] {
    color: #63b3ed !important;
}

body.dark-theme .strategic-note {
    background: rgba(66, 153, 225, 0.03);
    color: #a0aec0;
    border-left: 2px solid rgba(66, 153, 225, 0.3);
    font-weight: 350;
    box-shadow: none;
    opacity: 0.75;
}

body.dark-theme h1, 
body.dark-theme h2, 
body.dark-theme h3 {
    color: #e2e8f0;
    font-weight: 350;
}

body.dark-theme p, 
body.dark-theme li {
    color: #cbd5e0;
    font-weight: 350;
}


body.dark-theme .stat-number {
    color: #63b3ed;
}

.theme-toggle {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
}

.title-slide {
    position: relative;  /* Ensure the banner acts as positioning context */
}



.toggle-button {
    width: 48px;
    height: 24px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 2px;
    position: relative;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.toggle-button::before {
    content: '🌙';
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-button.dark::before {
    content: '☀️';
    transform: translate(24px, -50%);
}

/* Animation Keyframes */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

/* Responsive Design */
@media (max-width: 1024px) {
    .experience-container,
    .grid-2 {
        grid-template-columns: 1fr;
    }
    
    .pdf-frame {
        height: 600px;
    }
}

/* Hardware Acceleration */
.experience-box,
.card,
.market-stat,
.tab-button {
    transform: translateZ(0);
    backface-visibility: hidden;

/* Hardware Acceleration for Smooth Animations */
.metric-card,
.chart-container {
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform;
}
