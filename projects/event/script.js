const eventStatuses = ['Registration open', 'Early bird tickets available', 'Live workshop stream', 'Networking lounge active'];
const featuredSessions = [
    { title: 'AI in Action', speaker: 'Maya Chen', time: '10:00 AM' },
    { title: 'Designing Secure Systems', speaker: 'Diego Rivera', time: '11:45 AM' },
    { title: 'Cloud Native Innovations', speaker: 'Amina Patel', time: '2:00 PM' },
    { title: 'Future of Web3', speaker: 'Noah Brooks', time: '4:00 PM' }
];
const baseAttendeeCount = 2487;
const updates = [
    'Networking lounge now open with 120+ active attendees.',
    'Last-minute speaker added for the AI panel.',
    'Coffee break scheduled at 3:00 PM in the main lobby.',
    'Session capacity is filling fast—reserve your seat now.'
];

const statusElement = document.getElementById('event-status');
const attendeesElement = document.getElementById('attendee-count');
const sessionsElement = document.getElementById('sessions');
const heroText = document.querySelector('.hero p');
const registerButton = document.getElementById('register');

function updateEventStatus() {
    statusElement.textContent = eventStatuses[Math.floor(Math.random() * eventStatuses.length)];
}

function renderSessions() {
    sessionsElement.innerHTML = featuredSessions.map(session => `
        <div class="session">
            <div>
                <strong>${session.title}</strong>
                <span>${session.speaker}</span>
            </div>
            <span>${session.time}</span>
        </div>
    `).join('');
}

function refreshAttendeeCount() {
    attendeesElement.textContent = `Expected: ${baseAttendeeCount + Math.floor(Math.random() * 180)}+`;
}

function rotateUpdates() {
    if (!heroText) return;
    heroText.textContent = updates[Math.floor(Math.random() * updates.length)];
}

function registerAttendee() {
    const name = prompt('Enter your full name:');
    const email = prompt('Enter your email address:');
    if (name && email) {
        alert(`🎉 Registration confirmed!\n\nThanks ${name}, your ticket has been reserved.\nA confirmation email was sent to ${email}.`);
    } else {
        alert('Registration incomplete. Please provide your name and email.');
    }
}

registerButton.addEventListener('click', registerAttendee);
renderSessions();
updateEventStatus();
refreshAttendeeCount();
rotateUpdates();
setInterval(() => {
    updateEventStatus();
    refreshAttendeeCount();
    rotateUpdates();
}, 7000);