const trendingTitles = ['Midnight Chase', 'Office Shenanigans', 'Ocean Mysteries', 'Family Bonds', 'Future Worlds', 'The Haunting'];
const viewerCounts = [124000, 162500, 187000, 204300, 230100];

function updateLiveStatus() {
    const title = trendingTitles[Math.floor(Math.random() * trendingTitles.length)];
    const viewers = viewerCounts[Math.floor(Math.random() * viewerCounts.length)];
    const streamCount = Math.floor(Math.random() * 4) + 4;

    document.getElementById('stream-status-text').textContent = `${streamCount} streams currently live`;
    document.getElementById('viewer-count').textContent = `${viewers.toLocaleString()} viewers watching now`;
    document.getElementById('stream-trending').textContent = `Trending now: ${title} with ${Math.floor(Math.random() * 24) + 8}K viewers`;
}

function playVideo(event, title) {
    const videoElement = event.target.closest('.video');
    const originalButton = event.target;

    originalButton.textContent = 'Loading...';
    originalButton.disabled = true;

    setTimeout(() => {
        originalButton.textContent = 'Playing...';
        originalButton.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        videoElement.style.transform = 'scale(1.02)';
        videoElement.style.boxShadow = '0 15px 45px rgba(76, 175, 80, 0.3)';

        setTimeout(() => {
            originalButton.textContent = 'Watch Again';
            originalButton.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            originalButton.disabled = false;
            videoElement.style.transform = '';
            videoElement.style.boxShadow = '';
        }, 5000);
    }, 1500);
}

function attachHoverEffects() {
    document.querySelectorAll('.video').forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.style.transform = 'translateY(-10px) scale(1.02)';
        });

        video.addEventListener('mouseleave', () => {
            const buttonText = video.querySelector('button').textContent;
            if (!buttonText.includes('Playing')) {
                video.style.transform = '';
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    updateLiveStatus();
    attachHoverEffects();
    setInterval(updateLiveStatus, 4500);
});