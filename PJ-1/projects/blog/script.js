const posts = [
    {
        title: 'The Future of Artificial Intelligence in Web Development',
        content: 'Artificial Intelligence is revolutionizing the way we build and maintain web applications. From automated testing to intelligent code completion, AI tools are becoming indispensable in modern development workflows. In this post, we explore the current state of AI in web development and what the future holds.',
        date: 'December 15, 2024',
        readTime: '5 min read',
        tags: ['AI', 'Web Dev'],
        views: 2400,
        likes: 210
    },
    {
        title: 'Building Scalable React Applications: Best Practices',
        content: 'As React applications grow in complexity, maintaining performance and code quality becomes increasingly challenging. This comprehensive guide covers essential patterns and practices for building scalable React applications that can handle thousands of users and millions of interactions.',
        date: 'December 10, 2024',
        readTime: '8 min read',
        tags: ['React', 'Architecture'],
        views: 1870,
        likes: 176
    },
    {
        title: 'The Rise of Serverless Architecture',
        content: 'Serverless computing is changing how we think about backend infrastructure. No more server management, automatic scaling, and pay-per-use pricing make serverless an attractive option for modern applications. Learn about the benefits, challenges, and when to choose serverless for your next project.',
        date: 'December 5, 2024',
        readTime: '6 min read',
        tags: ['Serverless', 'Cloud'],
        views: 1320,
        likes: 145
    }
];

const activityMessages = [
    '📈 230 new readers joined the newsletter today',
    '⭐ Top post "The Future of Artificial Intelligence" is trending',
    '📝 New draft article added: "Designing Modern APIs"',
    '💬 18 new comments on the latest post',
    '🚀 Updated with a fresh case study on performance optimization'
];

function renderPosts(filteredPosts = posts) {
    const list = document.getElementById('post-list');
    list.innerHTML = filteredPosts.map(p => `
        <div class="post">
            <h3>${p.title}</h3>
            <div class="post-meta">${p.date} • ${p.readTime} • ${p.views} views</div>
            <p>${p.content}</p>
            <div class="post-actions">
                <button onclick="likePost('${p.title}')">👍 Like (${p.likes})</button>
                <button onclick="readMore('${p.title}')">Continue Reading</button>
            </div>
        </div>
    `).join('');
}

function likePost(title) {
    const post = posts.find(p => p.title === title);
    if (!post) return;
    post.likes += 1;
    renderPosts(currentPosts);
}

function readMore(title) {
    const post = posts.find(p => p.title === title);
    if (!post) return;
    alert(`Read more: ${post.title}\n\n${post.content}\n\nThis demo simulates an expanded article view.`);
}

const currentPosts = [...posts];

function updateActivityFeed() {
    const feed = document.getElementById('activity-feed');
    const message = activityMessages[Math.floor(Math.random() * activityMessages.length)];
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.textContent = message;
    feed.prepend(item);
    if (feed.children.length > 5) {
        feed.removeChild(feed.lastChild);
    }
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const filtered = posts.filter(post => post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query) || post.tags.some(tag => tag.toLowerCase().includes(query)));
    renderPosts(filtered);
}

renderPosts();
updateActivityFeed();
setInterval(updateActivityFeed, 9000);

document.getElementById('search').addEventListener('input', handleSearch);