// Highpoint Studio Dashboard V2 - Logic & Dynamic Server Context Switching

document.addEventListener('DOMContentLoaded', () => {
    // Navigation & Tabs
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = item.getAttribute('data-tab');

            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');

            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
            }
        });
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Server Selection Context Switching
    const serverSelect = document.getElementById('serverSelect');
    const currentServerName = document.getElementById('current-server-name');

    const serverData = {
        scp: {
            name: "SCP: Site Operations",
            members: "1,248",
            sessions: "4 Active",
            robloxStatus: "Verified",
            activity: [20, 35, 45, 30, 55, 60, 75],
            recentActivity: [
                "Admin John demoted Agent_99 to Level 2",
                "Session 'SCP Patrol Training' ended",
                "Discord Audit Log synced with #server-logs"
            ]
        },
        community: {
            name: "Highpoint Community",
            members: "4,892",
            sessions: "1 Active",
            robloxStatus: "Sync Pending",
            activity: [60, 50, 70, 85, 90, 110, 130],
            recentActivity: [
                "New Member Event started by Staff_Alex",
                "Community guidelines updated in Settings",
                "Discord Integration refreshed"
            ]
        }
    };

    function updateDashboard(serverKey) {
        const data = serverData[serverKey];
        if (!data) return;

        currentServerName.textContent = data.name;
        document.getElementById('stat-members').textContent = data.members;
        document.getElementById('stat-sessions').textContent = data.sessions;
        document.getElementById('stat-roblox-status').textContent = data.robloxStatus;

        // Render Recent Activity
        const activityList = document.getElementById('recent-activity-list');
        if (activityList) {
            activityList.innerHTML = data.recentActivity.map(act => `
                <li style="padding: 10px 0; border-bottom: 1px solid var(--border-color); font-size: 0.9rem;">
                    <i class="fa-solid fa-angle-right" style="color: var(--primary-blue);"></i> ${act}
                </li>
            `).join('');
        }

        updateChart(data.activity);
    }

    // Chart.js Setup
    const ctx = document.getElementById('activityChart');
    let activityChart;

    function initChart() {
        if (!ctx) return;
        activityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users',
                    data: serverData.scp.activity,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: '#2a364f' }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: '#2a364f' }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    function updateChart(newData) {
        if (activityChart) {
            activityChart.data.datasets[0].data = newData;
            activityChart.update();
        }
    }

    serverSelect.addEventListener('change', (e) => {
        updateDashboard(e.target.value);
    });

    // Initial Load
    initChart();
    updateDashboard('scp');
});
