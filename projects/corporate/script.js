const activities = [
    '✅ New project inquiry received',
    '📞 Client call scheduled for tomorrow',
    '🎯 Project #148 milestone achieved',
    '👥 New team member joined',
    '💼 Enterprise contract signed',
    '🚀 Product launch successful',
    '📊 Q4 targets exceeded',
    '🔧 System maintenance completed',
    '⭐ Client satisfaction rating: 98%',
    '📈 Revenue growth: +25% YoY'
];

let formSubmitCount = parseInt(localStorage.getItem('formSubmits')) || 0;

function updateActivityFeed() {
    const feed = document.getElementById('activity-feed');
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const activityEl = document.createElement('div');
    activityEl.className = 'activity-item';
    activityEl.textContent = randomActivity;
    feed.insertBefore(activityEl, feed.firstChild);
    if (feed.children.length > 5) {
        feed.removeChild(feed.lastChild);
    }
}

// Generate activity every 8-12 seconds
setInterval(updateActivityFeed, Math.random() * 4000 + 8000);

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Show loading state
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = '📤 Processing...';
    button.disabled = true;

    // Simulate backend processing
    setTimeout(() => {
        button.textContent = '💾 Saving data...';
    }, 800);

    setTimeout(() => {
        button.textContent = '📧 Sending confirmation...';
    }, 1600);

    setTimeout(() => {
        formSubmitCount++;
        localStorage.setItem('formSubmits', formSubmitCount);
        
        // Add to activity feed
        const feed = document.getElementById('activity-feed');
        const activityEl = document.createElement('div');
        activityEl.className = 'activity-item';
        activityEl.textContent = `📬 New inquiry from ${data.company}`;
        feed.insertBefore(activityEl, feed.firstChild);

        const notification = document.createElement('div');
        notification.textContent = '✅ Thank you! Our team will contact you within 24 hours.';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #22c55e, #16a34a);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 2000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);

        form.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 2400);
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});