const fs = require('fs');
const path = require('path');
const projects = require('./projects');

const outRoot = path.join(__dirname, 'project-pages');
if (!fs.existsSync(outRoot)) fs.mkdirSync(outRoot);

function escapeHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

projects.forEach(proj => {
  const id = proj.id || proj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g,'');
  const dir = path.join(outRoot, id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const title = escapeHtml(proj.name);
  const domain = escapeHtml(proj.domain || 'Web App');
  const category = escapeHtml(proj.category || 'General');
  const description = escapeHtml(proj.description || 'No description provided.');
  const tech = (proj.capabilities || []).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join(' ');
  const year = proj.year || '';
  const demo = proj.url || `../projects/${(proj.domain||'demo').toLowerCase()}/index.html`;
  const repo = proj.repo || proj.github || '';

  const heroPath = `/asset/${id}.jpg`;
  const heroStyle = fs.existsSync(path.join(__dirname, 'asset', `${id}.jpg`))
    ? `background-image: linear-gradient(180deg, rgba(4, 8, 16, 0.7), rgba(4, 8, 16, 0.28)), url('${heroPath}'); background-size: cover; background-position: center;`
    : `background: linear-gradient(135deg,#06202b,#08304a);`;

  const status = escapeHtml(proj.status || 'Live');
  const features = proj.details?.features || [
    'Responsive layout with mobile-first design',
    'Performance and accessibility optimized',
    'SEO-friendly static delivery',
    'Professional presentation for every project',
  ];

  const featuresHtml = features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('');

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="Professional project landing page for ${title}, a responsive website showcase by EblogHub." />
    <title>${title} — EblogHub</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="page-container project-page">
      <header class="project-page-header">
        <a class="button secondary back-button" href="/index.html">← Back to Portfolio</a>
        <div class="page-breadcrumb">Project Showcase • ${domain}</div>
      </header>

      <section class="detail-card page-banner fade-up" style="${heroStyle}">
        <div class="page-banner-copy">
          <p class="eyebrow">Professional project showcase</p>
          <h1>${title}</h1>
          <p class="hero-copy">${domain} · ${category} · ${year} · ${status}</p>
          <div class="detail-links">
            <a class="detail-link" href="${escapeHtml(demo)}" target="_blank" rel="noreferrer noopener">Live Demo</a>
            ${repo ? `<a class="detail-link" href="${escapeHtml(repo)}" target="_blank" rel="noreferrer noopener">View Source</a>` : ''}
          </div>
        </div>
      </section>

      <main class="project-grid">
        <article class="detail-card fade-up">
          <h2>Project Overview</h2>
          <p>${description}</p>

          <div class="detail-summary">
            <div class="detail-summary-card">
              <h3>Category</h3>
              <p>${category}</p>
            </div>
            <div class="detail-summary-card">
              <h3>Domain</h3>
              <p>${domain}</p>
            </div>
            <div class="detail-summary-card">
              <h3>Status</h3>
              <p>${status}</p>
            </div>
          </div>

          <h3>Key Features</h3>
          <ul class="detail-features">
            ${featuresHtml}
          </ul>
        </article>

        <aside>
          <div class="detail-card fade-up">
            <h3>Tech Stack</h3>
            <div class="tech-grid">${tech || '<span class="tech-tag">HTML</span><span class="tech-tag">CSS</span><span class="tech-tag">JavaScript</span>'}</div>

            <h3 style="margin-top:1.5rem">Project Stats</h3>
            <div class="detail-stats">
              <div class="detail-stat"><span>${year}</span><p>Year</p></div>
              <div class="detail-stat"><span>${status}</span><p>Status</p></div>
            </div>
          </div>
        </aside>
      </main>

      <footer class="detail-card page-footer fade-up">
        <div>
          <h3>Explore more projects</h3>
          <p>Every page is designed to look and feel like a professional responsive website.</p>
        </div>
        <div>
          <a class="button primary" href="../../index.html">Back to Portfolio</a>
        </div>
      </footer>
    </div>
  </body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
});

console.log('Generated', projects.length, 'project pages into', outRoot);
