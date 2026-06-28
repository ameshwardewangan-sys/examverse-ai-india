/**
 * ====================================================================
 * EXAMVERSE-AI CORE LOGIC MATRIX ENGINE
 * Chief Architect: Ameshwar Dewangan
 * Platforms Supported: Web, PWA, Play Store App (Android/iOS Android WebView)
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // Core Subsystems Initialization
    initDynamicRecruitments();
    initThemeManager();
    initPWAInstallation();
    initAnalyticsChart();
    initOwnerTelemetryStreams();
    initAdvancedFeatures();
});

// 1. CHATGPT TYPE AI CHAT UI (GEMINI CORE SIMULATOR)
function triggerAICore() {
    const chatFeed = document.getElementById("chat-feed");
    const chatInput = document.getElementById("chat-input");
    
    if (!chatInput || chatInput.value.trim() === "") return;
    
    const userQuery = chatInput.value.trim();

    // User Message Node Creation
    const userBubble = document.createElement("div");
    userBubble.className = "flex space-x-2 max-w-[85%] ml-auto justify-end";
    userBubble.innerHTML = `
        <div class="bg-indigo-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tr-none shadow-sm font-semibold text-slate-800 dark:text-slate-100">
            ${userQuery}
        </div>
    `;
    chatFeed.appendChild(userBubble);

    // Typing Loader Node
    const aiLoader = document.createElement("div");
    aiLoader.className = "flex space-x-2 max-w-[85%]";
    aiLoader.innerHTML = `
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-2xl rounded-tl-none shadow-sm font-medium animate-pulse">
            <i class="fa-solid fa-microchip-ai animate-spin mr-2"></i> Analyzing Matrix...
        </div>
    `;
    chatFeed.appendChild(aiLoader);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Reset Input Box
    chatInput.value = "";

    // Simulated Deep AI Evaluation Model Response
    setTimeout(() => {
        let aiResponse = `Hello Ameshwar Dewangan, your query verified against multiple target databases. Processing core structural analytics across relevant UPSC chapters. Status: Successful.`;
        
        // Custom intelligence hooks for fast checking
        if (userQuery.toLowerCase().includes("train") || userQuery.toLowerCase().includes("rail")) {
            aiResponse = "🚨 [TRAIN TELEMETRY ACTIVE]: Ameshwar, Current feedback indicates Train 12424 is running absolutely On-Time nearing Bilaspur (BSP). No latency recorded.";
        } else if (userQuery.toLowerCase().includes("weather") || userQuery.toLowerCase().includes("rain")) {
            aiResponse = "🌦️ [ENVIRONMENT SENSOR]: Light precipitation detected over CG-Zone. Humidity metrics stand at 82%. Perfect atmospheric conditions for indoor testing simulations.";
        }

        aiLoader.innerHTML = `
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-2xl rounded-tl-none shadow-md font-medium">
                ${aiResponse}
            </div>
        `;
        chatFeed.scrollTop = chatFeed.scrollHeight;
    }, 1200);
}

// 2. LIVE WEATHER & TRAIN TELEMETRY ALERTS HUB
function initDynamicRecruitments() {
    const notifHub = document.getElementById("notification-hub");
    if (!notifHub) return;

    const liveNotifications = [
        { text: "UPPSC Civil Services Exam Notification 2026 out.", time: "Just Now", icon: "fa-flag text-indigo-500" },
        { text: "CGPSC State Mock Answer Key compiled by AI Engine.", time: "1h ago", icon: "fa-key text-emerald-500" },
        { text: "SSC GD Recruitment Test Metrics & Current Affairs Updated.", time: "4h ago", icon: "fa-bullhorn text-amber-500" },
        { text: "BSSC CGL New Target Mock Series Live.", time: "1d ago", icon: "fa-circle-check text-purple-500" }
    ];

    notifHub.innerHTML = liveNotifications.map(item => `
        <div class="flex items-start space-x-3 p-2.5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl text-[11px] border border-black/5 dark:border-white/5 hover:scale-[1.02] transition-all cursor-pointer">
            <i class="fa-solid ${item.icon} mt-0.5 text-base"></i>
            <div class="flex-1">
                <p class="font-semibold text-slate-800 dark:text-slate-200">${item.text}</p>
                <span class="text-[9px] text-slate-400 font-mono">${item.time}</span>
            </div>
        </div>
    `).join('');
}

// 3. OWNER-ONLY TELEMETRY TRACKER LOGIC (Ameshwar's Eyes)
function initOwnerTelemetryStreams() {
    const activeCounter = document.querySelector("#owner-active-users") || { innerText: "4,912" };
    
    // Live User Activity Tick Simulation
    setInterval(() => {
        let currentCount = parseInt(activeCounter.innerText.replace(',', ''));
        let variance = Math.floor(Math.random() * 8) - 3; // Random traffic variance
        activeCounter.innerText = (currentCount + variance).toLocaleString();
    }, 3000);
}

// 4. THEME CONTROLLER MATRIX (Dark / Light Mode Toggle)
function initThemeManager() {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateThemeIcon(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateThemeIcon(false);
    }
}

function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const icon = document.getElementById("theme-icon");
    if (!icon) return;
    icon.className = isDark ? "fa-solid fa-sun text-amber-400" : "fa-solid fa-moon text-indigo-600";
}

// 5. PWA ENGINE REGISTER FOR MOBILE APP LAUNCH
function initPWAInstallation() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log("⚙️ PWA Service Worker Registered Successfully!"))
        .catch(err => console.error("❌ PWA Worker Error:", err));
    }
}

// 6. ANALYTICS CHART SUBSYSTEM (Charts.js Integration)
function initAnalyticsChart() {
    const chartCanvas = document.getElementById('perfChart');
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Ameshwar Dev Track Accuracy %',
                data: [65, 78, 72, 89, 85, 94],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#purple'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { min: 50, grid: { color: 'rgba(0,0,0,0.05)' } }
            }
        }
    });
}

// 7. HIGH-END EXP/COIN ACTION SIMULATORS
function initAdvancedFeatures() {
    // Listening to inputs for enter triggers
    const chatInput = document.getElementById("chat-input");
    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") triggerAICore();
        });
    }
}
