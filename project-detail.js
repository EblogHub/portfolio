function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function createProjectId(name, suffix) {
    const baseId = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    return suffix ? `${baseId}-${suffix}` : baseId;
}

function createProjectDetails(item) {
    return {
        overview: item.description || 'A polished project built to support modern business workflows.',
        features: [
            'Responsive interface for desktop and mobile',
            'Modern user experience with accessible design',
            'Built to be reliable and scalable',
            'Detailed documentation and deployment guidance'
        ],
        technologies: item.capabilities || [],
        outcome: `Delivered a polished ${item.domain || 'web'} solution with strong performance and clean user experience.`,
        year: item.year || '2024',
        status: item.status || 'Active',
        demoUrl: item.url || null,
        client: item.domain === 'Demo' ? 'Demo client' : 'Private client',
    };
}

function augmentProjectData() {
    if (!Array.isArray(allProjects)) return;

    const seenIds = {};
    allProjects.forEach((project, index) => {
        if (!project.id) {
            const candidate = createProjectId(project.name || `project-${index + 1}`);
            const count = seenIds[candidate] || 0;
            project.id = count ? `${candidate}-${count + 1}` : candidate;
            seenIds[candidate] = count + 1;
        }

        if (!project.details) {
            project.details = createProjectDetails(project);
        }
    });
}

function renderNotFound(message) {
    const notice = document.getElementById('detail-notice');
    const content = document.getElementById('detail-content');
    notice.style.display = 'block';
    notice.textContent = message || 'Project not found.';
    if (content) content.style.display = 'none';
}

function renderProjectDetail() {
    if (typeof allProjects === 'undefined') {
        setTimeout(renderProjectDetail, 100);
        return;
    }

    augmentProjectData();
    const projectId = getQueryParam('id');
    const project = allProjects.find(item => item.id === projectId);

    if (!project) {
        renderNotFound('Project not found. Please return to the portfolio and select a valid project.');
        return;
    }

    const title = document.getElementById('detail-title');
    const overview = document.getElementById('detail-overview');
    const stats = document.getElementById('detail-stats');
    const tech = document.getElementById('detail-tech');
    const features = document.getElementById('detail-features');
    const outcome = document.getElementById('detail-outcome');
    const links = document.getElementById('detail-links');

    if (!title || !overview || !stats || !tech || !features || !outcome || !links) return;

    const details = project.details;

    // Render hero area: attempt to use a project-specific image, fall back to gradient
    const hero = document.getElementById('detail-hero');
    if (hero) {
        const imgPath = `asset/${project.id}.jpg`;
        hero.style.backgroundImage = `linear-gradient(90deg, rgba(4,8,16,0.78), rgba(4,8,16,0.45)), url('${imgPath}')`;
        hero.innerHTML = `<div style="padding:1rem 1.25rem;"><h2 style="margin:0; font-size:1.25rem;">${project.name}</h2><p style="margin:0.25rem 0 0; color:var(--text-muted);">${project.domain} · ${project.category}</p></div>`;
    }

    document.title = `${project.name} | EblogHub`;
    title.textContent = project.name;
    overview.textContent = details.overview;

    stats.innerHTML = `
        <div class="detail-stat">
            <span>${details.year}</span>
            <p>Year</p>
        </div>
        <div class="detail-stat">
            <span>${details.status}</span>
            <p>Status</p>
        </div>
        <div class="detail-stat">
            <span>${details.client}</span>
            <p>Client</p>
        </div>
    `;

    tech.innerHTML = details.technologies.map(techItem => `<span class="tech-tag">${techItem}</span>`).join('');
    features.innerHTML = details.features.map(feature => `<li>${feature}</li>`).join('');
    outcome.textContent = details.outcome;

    links.innerHTML = `
        <a class="detail-link" href="index.html">Back to portfolio</a>
        ${details.demoUrl ? `<a class="detail-link" href="${details.demoUrl}" target="_blank" rel="noreferrer noopener">Open live demo</a>` : ''}
        ${project.repo || project.github ? `<a class="detail-link" href="${project.repo || project.github}" target="_blank" rel="noreferrer noopener">Source</a>` : ''}
    `;
}

document.addEventListener('DOMContentLoaded', renderProjectDetail);
