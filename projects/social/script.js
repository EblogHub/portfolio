const posts = [
    {
        id: 1,
        user: 'Sarah Johnson',
        avatar: 'SJ',
        time: '2 hours ago',
        content: 'Just finished an amazing hike in the mountains! The views were absolutely breathtaking. Nature never ceases to amaze me. 🏔️✨',
        likes: 24,
        comments: 8,
        category: 'Lifestyle'
    },
    {
        id: 2,
        user: 'Mike Chen',
        avatar: 'MC',
        time: '4 hours ago',
        content: 'Excited to announce that our new app is now available on all platforms! Thanks to everyone who supported us during development. Your feedback means everything! 🚀📱',
        likes: 156,
        comments: 23,
        category: 'Launch'
    },
    {
        id: 3,
        user: 'Emma Davis',
        avatar: 'ED',
        time: '6 hours ago',
        content: 'Coffee and coding session in progress ☕💻 Working on some exciting new features. The creative process is so rewarding!',
        likes: 42,
        comments: 12,
        category: 'Work'
    },
    {
        id: 4,
        user: 'Noah Tan',
        avatar: 'NT',
        time: 'just now',
        content: 'Live Q&A happening now! Join the discussion and ask about the new UI toolset.',
        likes: 89,
        comments: 29,
        category: 'Live'
    }
];

const activities = [
    '👥 1,218 users active in the last 5 minutes',
    '💬 14 new comments posted',
    '⭐ 98% engagement on today’s top story',
    '📲 523 shares across feeds',
    '🔔 26 live reactions received'
];

function renderPosts() {
    const feed = document.getElementById('feed');
    feed.innerHTML = posts.map(p => `
        <div class="post">
            <div class="post-header">
                <div class="avatar">${p.avatar}</div>
                <div class="user-info">
                    <h3>${p.user}</h3>
                    <p>${p.time} • ${p.category}</p>
                </div>
            </div>
            <div class="post-content">${p.content}</div>
            <div class="post-actions">
                <button class="like-btn" onclick="toggleLike(${p.id})">👍 Like (${p.likes})</button>
                <button class="comment-btn" onclick="showComments(${p.id})">💬 Comment (${p.comments})</button>
                <button class="share-btn" onclick="sharePost(${p.id})">🔗 Share</button>
            </div>
        </div>
    `).join('');
}

function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    const button = event.target;
    if (button.classList.contains('liked')) {
        post.likes -= 1;
        button.classList.remove('liked');
    } else {
        post.likes += 1;
        button.classList.add('liked');
    }
    renderPosts();
}

function showComments(id) {
    const post = posts.find(p => p.id === id);
    alert(`Comments for "${post.user} – ${post.category}"\n\nThis demo would open a live comments panel in a real social app.`);
}

function sharePost(id) {
    const post = posts.find(p => p.id === id);
    if (navigator.share) {
        navigator.share({
            title: `Post by ${post.user}`,
            text: post.content,
            url: window.location.href
        });
    } else {
        alert('Share functionality would copy a share link in a real app.');
    }
}

function updateActivityFeed() {
    const feed = document.getElementById('activity-feed');
    const message = activities[Math.floor(Math.random() * activities.length)];
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.textContent = message;
    feed.prepend(item);
    if (feed.children.length > 4) {
        feed.removeChild(feed.lastChild);
    }
}

setInterval(updateActivityFeed, 8000);
renderPosts();
updateActivityFeed();