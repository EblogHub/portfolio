// ─── CANVAS INTERACTIVE BACKGROUND ───
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, mouse = { x: -9999, y: -9999 }, animId;

const COLORS = {
    nodeBlue: '#1e6fff',
    nodeCyan: '#00d4ff',
    nodeBlueAlpha: 'rgba(30,111,255,',
    nodeCyanAlpha: 'rgba(0,212,255,',
    lineDim: 'rgba(30,111,255,0.12)',
    lineActive: 'rgba(30,111,255,0.5)',
    lineActiveCyan: 'rgba(0,212,255,0.35)',
    bg: '#040810',
};

let nodes = [];
const NODE_COUNT = 80;
const CONNECTION_DIST = 140;
const MOUSE_RADIUS = 180;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function createNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2.5 + 0.5,
            isCyan: Math.random() < 0.15,
            baseAlpha: Math.random() * 0.5 + 0.2,
        });
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    if (mouse.x > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        grad.addColorStop(0, 'rgba(30,111,255,0.08)');
        grad.addColorStop(0.5, 'rgba(0,212,255,0.04)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;

        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.015;
            n.vx += dx * force * 0.1;
            n.vy += dy * force * 0.1;
        }
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.5) { n.vx *= 1.5 / speed; n.vy *= 1.5 / speed; }
        if (speed < 0.1) { n.vx += (Math.random() - 0.5) * 0.05; n.vy += (Math.random() - 0.5) * 0.05; }

        for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const ldx = n.x - m.x, ldy = n.y - m.y;
            const d = Math.sqrt(ldx * ldx + ldy * ldy);
            if (d < CONNECTION_DIST) {
                const alpha = (1 - d / CONNECTION_DIST) * 0.3;
                const midX = (n.x + m.x) / 2, midY = (n.y + m.y) / 2;
                const mdx = mouse.x - midX, mdy = mouse.y - midY;
                const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
                const nearMouse = mouseDist < MOUSE_RADIUS;
                ctx.strokeStyle = nearMouse ? `rgba(30,111,255,${alpha * 3})` : `rgba(30,111,255,${alpha})`;
                ctx.lineWidth = nearMouse ? 0.8 : 0.5;
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(m.x, m.y);
                ctx.stroke();
            }
        }

        const nearMouse = dist < MOUSE_RADIUS * 0.6;
        const color = n.isCyan ? '0,212,255,' : '30,111,255,';
        const alpha = nearMouse ? Math.min(n.baseAlpha * 2.5, 1) : n.baseAlpha;
        const r = nearMouse ? n.r * 2 : n.r;

        if (nearMouse) {
            const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
            glowGrad.addColorStop(0, `rgba(${color}0.4)`);
            glowGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = `rgba(${color}${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    animId = requestAnimationFrame(drawFrame);
}

resize();
createNodes();
drawFrame();
window.addEventListener('resize', () => { resize(); createNodes(); });
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

// ─── CUSTOM CURSOR ───
const ring = document.getElementById('cursor-ring');
const dot = document.getElementById('cursor-dot');
const label = document.getElementById('cursor-label');
let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

document.addEventListener('mousemove', e => {
    dotX = e.clientX;
    dotY = e.clientY;
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    label.style.left = (dotX + 18) + 'px';
    label.style.top = (dotY - 18) + 'px';
});

// FIX: single lerp loop — original code had two competing loops both trying to
// move the ring, causing jitter and a broken cursor trail.
function lerpRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(lerpRing);
}
requestAnimationFrame(lerpRing);

document.querySelectorAll('a, button, .service-card, .module-card, .stat-card, .tech-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        const tip = el.dataset.tip;
        if (tip) { label.textContent = tip; label.style.opacity = '1'; }
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        label.style.opacity = '0';
    });
});

// ─── SCROLL PROGRESS ───
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    progressBar.style.width = pct + '%';
}, { passive: true });

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ─── PORTFOLIO DATA & PAGINATION ───
const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredProjects = [];
let modulesData = [];

function createProjectId(name, suffix) {
    const baseId = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    return suffix ? `${baseId}-${suffix}` : baseId;
}

function createProjectDetails(item) {
    return {
        overview: item.description || 'A solid project built with a focus on performance and usability.',
        features: [
            'Responsive design across desktop and mobile',
            'Clean architecture and modular components',
            'Performance optimizations and accessible UI',
            'Robust handoff-ready documentation'
        ],
        technologies: item.capabilities || [],
        outcome: `Delivered a modern ${item.domain || 'web'} solution with scalable architecture and polished UX.`,
        year: item.year || '2024',
        status: item.status || 'Active',
        demoUrl: item.url || null,
        client: item.domain === 'Demo' ? 'Portfolio demo client' : 'Private client',
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

        // Normalize status to 'Live' so all projects show the same green badge
        project.status = 'Live';

        if (!project.details) {
            project.details = createProjectDetails(project);
        }

        // Ensure each project has a demoUrl — prefer explicit url, otherwise map domain to a demo folder
        const domainSlug = (project.domain || 'demo')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        project.details.demoUrl = project.url || `projects/${domainSlug}/index.html`;
    });
}

// Initialize projects data - waits for allProjects from projects.js
function initializeProjects() {
    if (typeof allProjects !== 'undefined') {
        augmentProjectData();
        modulesData = allProjects;
        filteredProjects = [...modulesData];
        setupPagination();
        renderProjects();
    } else {
        // Fallback if allProjects isn't loaded
        setTimeout(initializeProjects, 100);
    }
}

function setupPagination() {
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    updatePaginationUI(totalPages);
}

function updatePaginationUI(totalPages) {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');
    const resultsCount = document.getElementById('results-count');

    currentPageEl.textContent = `Page ${currentPage}`;
    totalPagesEl.textContent = `of ${totalPages}`;
    resultsCount.textContent = `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
}

function renderProjects() {
    const el = document.getElementById('module-results');
    if (!el) return;

    if (!filteredProjects.length) {
        el.innerHTML = '<p class="empty-state">No projects matched your search. Try adjusting the filters.</p>';
        setupPagination();
        return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageProjects = filteredProjects.slice(startIndex, endIndex);

    el.innerHTML = pageProjects.map(item => {
        const detailLink = `project-detail.html?id=${encodeURIComponent(item.id)}`;
        const statusClass = item.status === 'Live' || item.status === 'Active' ? 'live' : item.status === 'Demo' ? 'demo' : 'other';
        const statusIcon = item.status === 'Live' || item.status === 'Active' ? '🟢' : item.status === 'Demo' ? '🔗' : '📋';
        return `
        <a href="${detailLink}" style="text-decoration: none; color: inherit;">
            <article class="module-card reveal visible ${statusClass}">
                <div class="module-status ${statusClass}">
                    <span class="status-icon">${statusIcon}</span>
                    ${item.status}
                </div>
                <h3>${item.name}</h3>
                <p class="module-meta"><strong>Domain:</strong> ${item.domain}</p>
                <p class="module-meta"><strong>Category:</strong> ${item.category}</p>
                <p class="module-services">${item.description}</p>
                <span class="module-badge">${item.capabilities.join(' · ')}</span>
                ${item.url ? '<div class="demo-pill">Live demo available</div>' : ''}
            </article>
        </a>
    `;
    }).join('');

    updatePaginationUI(totalPages);
}

function filterAndRenderProjects() {
    const query = document.getElementById('module-search').value.trim().toLowerCase();
    const domain = document.getElementById('domain-filter').value;

    filteredProjects = modulesData.filter(item => {
        const matchesDomain = domain === 'all' || item.domain === domain;
        const matchesQuery = !query || [item.name, item.category, item.description, item.domain]
            .some(f => f.toLowerCase().includes(query));
        return matchesDomain && matchesQuery;
    });

    currentPage = 1; // Reset to first page on filter change
    renderProjects();
}

// Event listeners
document.getElementById('module-search').addEventListener('input', filterAndRenderProjects);
document.getElementById('domain-filter').addEventListener('change', filterAndRenderProjects);
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProjects();
        document.getElementById('module-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderProjects();
        document.getElementById('module-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Initialize projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
    initializeProjects();
}

// ─── LIVE DEMO ACTIVITY ───
function updateDemoActivity() {
    const demoCards = document.querySelectorAll('.module-card.demo');
    demoCards.forEach(card => {
        const activityEl = card.querySelector('.demo-activity');
        if (activityEl && Math.random() < 0.3) { // 30% chance to update
            const activities = [
                'Live demo with interactive features',
                'Real-time data simulation active',
                'User interactions being processed',
                'Dynamic content updates running',
                'API calls and responses simulated'
            ];
            activityEl.textContent = activities[Math.floor(Math.random() * activities.length)];
        }
    });
}

setInterval(updateDemoActivity, 8000); // Update every 8 seconds

// ─── HERO STATUS UPDATES ───
const heroStatuses = [
    'All systems operational — available for new projects',
    'Processing latest project inquiries',
    'Demo environments running smoothly',
    'Code reviews and deployments active',
    'Innovation labs open for collaboration'
];

function updateHeroStatus() {
    const statusEl = document.getElementById('hero-status');
    if (statusEl) {
        statusEl.textContent = heroStatuses[Math.floor(Math.random() * heroStatuses.length)];
    }
}

setInterval(updateHeroStatus, 10000); // Update every 10 seconds

// ─── NAV TOGGLE ───
document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
});
document.querySelectorAll('#nav-menu a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('nav-menu').classList.remove('active'));
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const t = document.querySelector(link.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ─── CONTACT FORM ───
// FIX: The original code posted to /api/contact which does not exist on a
// static Vercel deployment, causing all form submissions to fail with a 404.
// Solution: validate fields client-side, then open a pre-filled mailto link
// so messages are delivered directly to the owner's email without a backend.
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const fb = document.getElementById('form-feedback');
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const company = e.target.company.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !company || !message) {
        fb.textContent = 'Please complete all fields.';
        fb.style.color = '#4d8fff';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        fb.textContent = 'Please enter a valid email address.';
        fb.style.color = '#4d8fff';
        return;
    }

    // Build a mailto: link with all form data pre-filled
    const subject = encodeURIComponent(`[EblogHub] Project enquiry from ${name} (${company})`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
    );
    const mailtoLink = `mailto:talktoelishaanthonylive@gmail.com?subject=${subject}&body=${body}`;

    // Open the user's mail client
    window.location.href = mailtoLink;

    // Show success feedback
    fb.textContent = '✓ Opening your email client — message pre-filled and ready to send.';
    fb.style.color = '#00e676';
    e.target.reset();
});
