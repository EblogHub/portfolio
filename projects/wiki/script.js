const articles = [
    {
        title: 'Introduction to Machine Learning',
        content: 'Machine Learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. This comprehensive guide covers the fundamentals of ML algorithms, training data, and practical applications in modern software development.'
    },
    {
        title: 'RESTful API Design Principles',
        content: 'REST (Representational State Transfer) is an architectural style for designing networked applications. Learn about HTTP methods, status codes, resource naming conventions, and best practices for building scalable and maintainable APIs that power modern web applications.'
    },
    {
        title: 'Database Normalization Techniques',
        content: 'Database normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. This article explores the different normal forms (1NF, 2NF, 3NF, BCNF) and provides practical examples of how to apply normalization in real-world database design.'
    },
    {
        title: 'Container Orchestration with Kubernetes',
        content: 'Kubernetes is an open-source platform for automating deployment, scaling, and management of containerized applications. Discover pods, services, deployments, and how Kubernetes revolutionizes modern application deployment and scaling strategies.'
    },
    {
        title: 'Cybersecurity Best Practices',
        content: 'In an increasingly connected world, cybersecurity is paramount. This guide covers essential security principles including encryption, authentication, access control, and common vulnerabilities. Learn how to protect your applications and user data from modern threats.'
    }
];

const trendingTopics = [
    'Machine learning algorithms',
    'Kubernetes pipelines',
    'Secure API design',
    'Data normalization',
    'Cloud-native architecture'
];

function renderArticles(arts = articles) {
    document.getElementById('articles').innerHTML = arts.map(a => `
        <div class="article">
            <h3>${a.title}</h3>
            <p>${a.content}</p>
        </div>
    `).join('');
}

function renderTrendingTopics() {
    document.getElementById('trending-topics').innerHTML = trendingTopics.map(topic => `<li>${topic}</li>`).join('');
}

function updateEditorCount() {
    const count = Math.floor(18 + Math.random() * 18);
    document.getElementById('editor-count').textContent = `${count} editors online`;
}

function filterArticles(e) {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
        renderArticles();
        return;
    }
    const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.content.toLowerCase().includes(query)
    );
    renderArticles(filtered);
}

document.getElementById('search').addEventListener('input', filterArticles);

window.addEventListener('DOMContentLoaded', () => {
    renderArticles();
    renderTrendingTopics();
    updateEditorCount();
    setInterval(updateEditorCount, 4500);
});