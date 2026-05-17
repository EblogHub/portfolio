const threads = [
    {
        title: 'Best practices for React component architecture?',
        content: 'I have been building React apps and would love to hear how others structure components for scalability and maintainability.',
        author: 'ReactDev2024',
        replies: 23,
        views: 1456,
        lastActivity: '2 hours ago'
    },
    {
        title: 'Database design for a social media platform',
        content: 'Planning the schema for a social app and debating between relational and NoSQL options. What do you recommend for performance and flexibility?',
        author: 'DataArchitect',
        replies: 18,
        views: 892,
        lastActivity: '5 hours ago'
    },
    {
        title: 'Transitioning from junior to senior developer',
        content: 'Looking for advice on leveling up beyond coding: leadership, architecture discussions, mentoring, and improving team collaboration.',
        author: 'CodeNewbie',
        replies: 31,
        views: 2103,
        lastActivity: '1 day ago'
    },
    {
        title: 'Microservices vs Monolithic architecture',
        content: 'Our product team is considering a migration to microservices. What challenges should we expect, and what are the real benefits?',
        author: 'SystemArchitect',
        replies: 27,
        views: 1789,
        lastActivity: '3 hours ago'
    }
];

const activities = [
    'New answer posted to the AI panel thread.',
    'Design review tips shared for responsive dashboards.',
    'Community member announced a live coding session.',
    'Database schema discussion updated with examples.'
];

const threadsContainer = document.getElementById('threads');
const activityList = document.getElementById('activityList');

function renderThreads() {
    threadsContainer.innerHTML = threads.map(thread => `
        <div class="thread">
            <h3>${thread.title}</h3>
            <p>${thread.content}</p>
            <div class="thread-meta">
                <span>By ${thread.author}</span>
                <span>${thread.replies} replies • ${thread.views} views • ${thread.lastActivity}</span>
            </div>
        </div>
    `).join('');
}

function renderActivity() {
    activityList.innerHTML = activities.map((activity, index) => `
        <li class="activity-item">
            <h4>Community update ${index + 1}</h4>
            <p>${activity}</p>
            <span>${Math.floor(Math.random() * 15) + 1} new interactions</span>
        </li>
    `).join('');
}

renderThreads();
renderActivity();
setInterval(() => {
    activities.push(activities.shift());
    renderActivity();
}, 7000);
