const projects = [
    {
        name: 'E-Commerce Platform',
        desc: 'A full-featured online store built with React and Node.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard.',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        status: 'Live'
    },
    {
        name: 'Task Management App',
        desc: 'Collaborative project management tool with real-time updates, team communication features, and comprehensive reporting capabilities.',
        tech: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
        status: 'Beta'
    },
    {
        name: 'AI-Powered Chatbot',
        desc: 'Intelligent conversational AI assistant for customer support, built with machine learning models and natural language processing.',
        tech: ['Python', 'TensorFlow', 'Flask', 'React'],
        status: 'In Development'
    },
    {
        name: 'Weather Analytics Dashboard',
        desc: 'Interactive data visualization platform for meteorological data, featuring predictive modeling and historical trend analysis.',
        tech: ['D3.js', 'Python', 'FastAPI', 'InfluxDB'],
        status: 'Completed'
    }
];

document.getElementById('project-list').innerHTML = projects.map(p => `
    <div class="project">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div style="margin-top: 1rem;">
            <strong>Technologies:</strong> ${p.tech.join(' • ')}
        </div>
        <div style="margin-top: 0.5rem; color: ${p.status === 'Live' ? '#28a745' : p.status === 'Beta' ? '#ffc107' : '#6c757d'};">
            <strong>Status:</strong> ${p.status}
        </div>
    </div>
`).join('');