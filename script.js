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

    // Background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    // Mouse glow
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

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;

        // Attraction to mouse
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.015;
            n.vx += dx * force * 0.1;
            n.vy += dy * force * 0.1;
        }
        // Speed limit
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.5) { n.vx *= 1.5 / speed; n.vy *= 1.5 / speed; }
        if (speed < 0.1) { n.vx += (Math.random() - 0.5) * 0.05; n.vy += (Math.random() - 0.5) * 0.05; }

        // Draw lines between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const ldx = n.x - m.x, ldy = n.y - m.y;
            const d = Math.sqrt(ldx * ldx + ldy * ldy);
            if (d < CONNECTION_DIST) {
                const alpha = (1 - d / CONNECTION_DIST) * 0.3;
                // Check if near mouse
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

        // Draw node
        const nearMouse = dist < MOUSE_RADIUS * 0.6;
        const color = n.isCyan ? '0,212,255,' : '30,111,255,';
        const alpha = nearMouse ? Math.min(n.baseAlpha * 2.5, 1) : n.baseAlpha;
        const r = nearMouse ? n.r * 2 : n.r;

        // Glow
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
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    const x = e.clientX, y = e.clientY;
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    ringX += (x - ringX) * 0.12;
    ringY += (y - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    label.style.left = (x + 18) + 'px';
    label.style.top = (y - 18) + 'px';
});

function lerp() {
    ringX += (parseFloat(dot.style.left) - ringX) * 0.12;
    ringY += (parseFloat(dot.style.top) - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(lerp);
}
requestAnimationFrame(lerp);

// Hover effects
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
});

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ─── PORTFOLIO DATA ───
const modulesData = [
    { name: 'E-commerce Platform', domain: 'E-commerce', category: 'Retail', description: 'Full-featured e-commerce platform with React frontend, Node.js backend, Stripe payments, and inventory management. Handles 10k+ daily users.', capabilities: ['React', 'Node.js', 'PostgreSQL', 'Stripe'], status: 'Live' },
    { name: 'Real Estate Dashboard', domain: 'Dashboard', category: 'Analytics', description: 'Interactive analytics dashboard for property listings with real-time data visualization, advanced filtering, and reporting tools.', capabilities: ['Next.js', 'Chart.js', 'Firebase', 'Tailwind'], status: 'Active' },
    { name: 'SaaS Accounting Tool', domain: 'SaaS', category: 'Finance', description: 'Cloud-based accounting software with multi-tenant architecture, invoice generation, expense tracking, and financial reports.', capabilities: ['React', 'Python', 'PostgreSQL', 'AWS'], status: 'Live' },
    { name: 'Health & Fitness App', domain: 'Web App', category: 'Healthcare', description: 'Progressive web app for fitness tracking with workout logging, meal planning, and social features. 50k+ active users.', capabilities: ['Vue.js', 'Node.js', 'MongoDB', 'WebSockets'], status: 'Live' },
    { name: 'API Integration Layer', domain: 'API', category: 'Integration', description: 'Custom GraphQL API gateway connecting 15+ microservices with authentication, rate limiting, and comprehensive documentation.', capabilities: ['GraphQL', 'Node.js', 'Redis', 'Docker'], status: 'Active' },
    { name: 'Travel Booking System', domain: 'Web App', category: 'Travel', description: 'Full-stack booking platform with real-time availability, payment processing, and email notifications. Supporting multiple currencies.', capabilities: ['React', 'Node.js', 'PostgreSQL', 'Twilio'], status: 'Live' }
];

function renderModules(modules) {
    const el = document.getElementById('module-results');
    if (!el) return;
    if (!modules.length) {
        el.innerHTML = '<p class="empty-state">No projects matched your search. Try adjusting the filters.</p>';
        return;
    }
    el.innerHTML = modules.map(item => `
        <article class="module-card reveal visible">
            <div class="module-status">${item.status}</div>
            <h3>${item.name}</h3>
            <p class="module-meta"><strong>Domain:</strong> ${item.domain}</p>
            <p class="module-meta"><strong>Category:</strong> ${item.category}</p>
            <p class="module-services">${item.description}</p>
            <span class="module-badge">${item.capabilities.join(' · ')}</span>
        </article>
    `).join('');
}

function filterModules() {
    const query = document.getElementById('module-search').value.trim().toLowerCase();
    const domain = document.getElementById('domain-filter').value;
    const filtered = modulesData.filter(item => {
        const matchesDomain = domain === 'all' || item.domain === domain;
        const matchesQuery = [item.name, item.category, item.description, item.domain].some(f => f.toLowerCase().includes(query));
        return matchesDomain && matchesQuery;
    });
    renderModules(filtered);
}

document.getElementById('module-search').addEventListener('input', filterModules);
document.getElementById('domain-filter').addEventListener('change', filterModules);
renderModules(modulesData);

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
document.getElementById('contact-form').addEventListener('submit', async e => {
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
    fb.textContent = '// Sending your message...';
    fb.style.color = 'var(--text-muted)';
    try {
        const res = await fetch('/api/contact', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject: company, message })
        });
        const result = await res.json();
        if (res.ok && result.success) {
            fb.textContent = '✓ Message sent. We\'ll be in touch shortly.';
            fb.style.color = '#00e676';
            e.target.reset();
        } else {
            fb.textContent = result.message || 'Unable to send. Please try again.';
            fb.style.color = '#4d8fff';
        }
    } catch {
        fb.textContent = '// Network error — please check your connection.';
        fb.style.color = '#4d8fff';
    }
});