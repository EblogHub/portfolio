// Personal website interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's an internal link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add hover effects to interest items
    const interestItems = document.querySelectorAll('ul li');
    interestItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Add typing animation to the about section
    const aboutText = document.querySelector('#about p');
    if (aboutText) {
        const originalText = aboutText.textContent;
        aboutText.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                aboutText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }
});