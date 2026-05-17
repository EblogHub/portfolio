const ctaButton = document.getElementById('cta');
const demoButton = document.getElementById('demo');
const contactForm = document.getElementById('contact-form');

ctaButton.addEventListener('click', () => {
    const email = prompt('Enter your email to start the free trial:');
    if (email && email.includes('@')) {
        alert(`Thank you! A confirmation email has been sent to ${email}. Your free trial starts now!`);
    } else if (email) {
        alert('Please enter a valid email address.');
    }
});

demoButton.addEventListener('click', () => {
    alert('Launching your interactive demo experience...\n\nThis demo simulates a real product walkthrough with live collaboration.');
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    const submitButton = contactForm.querySelector('button');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    setTimeout(() => {
        alert(`Thanks ${data.name}! We received your message and will reach out to ${data.email} shortly.`);
        contactForm.reset();
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
    }, 1800);
});