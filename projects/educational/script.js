const courses = [
    {
        name: 'Advanced Web Development',
        desc: 'Master modern web technologies including React, Node.js, and cloud deployment. Learn to build scalable web applications from scratch.',
        instructor: 'Dr. Sarah Mitchell',
        duration: '12 weeks',
        students: 2847
    },
    {
        name: 'Data Science Fundamentals',
        desc: 'Introduction to data analysis, statistical methods, and machine learning. Learn Python, pandas, and scikit-learn for data science projects.',
        instructor: 'Prof. Michael Chen',
        duration: '10 weeks',
        students: 1923
    },
    {
        name: 'UX/UI Design Principles',
        desc: 'Learn user-centered design, prototyping, and user research methods. Create intuitive and beautiful digital experiences.',
        instructor: 'Emma Rodriguez',
        duration: '8 weeks',
        students: 1546
    },
    {
        name: 'Cloud Computing with AWS',
        desc: 'Comprehensive guide to Amazon Web Services. Learn EC2, S3, Lambda, and build serverless applications in the cloud.',
        instructor: 'James Wilson',
        duration: '14 weeks',
        students: 3217
    }
];

const activityEvents = [
    'Just enrolled in Advanced Web Development',
    'Completed a live workshop on UX/UI design',
    'Joined the next Cloud Computing live session',
    'Left feedback for the Data Science Fundamentals course',
    'Started a new project in the Live Classroom'
];

function renderCourses() {
    document.getElementById('course-list').innerHTML = courses.map(c => `
        <div class="course">
            <h3>${c.name}</h3>
            <p>${c.desc}</p>
            <div style="margin-bottom: 1rem; color: #94a3b8; font-size: 0.95rem;">
                <strong>Instructor:</strong> ${c.instructor}<br>
                <strong>Duration:</strong> ${c.duration}<br>
                <strong>Students:</strong> ${c.students.toLocaleString()}
            </div>
            <button onclick="enroll('${c.name}')">Enroll Now</button>
        </div>
    `).join('');
}

function renderActivity() {
    const recent = document.getElementById('recent-activity');
    let items = '';
    for (let i = 0; i < 4; i++) {
        const eventText = activityEvents[Math.floor(Math.random() * activityEvents.length)];
        const course = courses[Math.floor(Math.random() * courses.length)].name;
        items += `<li>${eventText} in <strong>${course}</strong>.</li>`;
    }
    recent.innerHTML = items;
}

function updateDashboard() {
    const learners = Math.floor(2600 + Math.random() * 1800);
    const liveClasses = Math.floor(3 + Math.random() * 4);
    document.getElementById('active-learners').textContent = `${learners.toLocaleString()} learners active`;
    document.getElementById('live-classes').textContent = `${liveClasses} live classes`;
    renderActivity();
}

function enroll(name) {
    alert(`🎓 Enrollment simulation: You have successfully enrolled in "${name}"!\n\nIn a real platform, you would be redirected to payment and course access.`);
}

window.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    updateDashboard();
    setInterval(updateDashboard, 5000);
});