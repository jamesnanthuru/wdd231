// James Nanthuru Course data
// CSE210 and WDD231 are 'in progress' (completed: false)
// All others are 'completed' (completed: true)
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseGrid = document.getElementById('courseGrid');
const totalCreditsSpan = document.getElementById('totalCredits');
const filterBtns = document.querySelectorAll('.filter-btn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

function updateProgress() {
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const completedCredits = courses
        .filter(c => c.completed)
        .reduce((sum, c) => sum + c.credits, 0);
    const percentage = totalCredits ? (completedCredits / totalCredits) * 100 : 0;
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}%`;
}

function renderCourses(filter = 'all') {
    let filtered = courses;
    if (filter === 'wdd') filtered = courses.filter(c => c.subject === 'WDD');
    else if (filter === 'cse') filtered = courses.filter(c => c.subject === 'CSE');

    let html = '';
    filtered.forEach(course => {
        const statusClass = course.completed ? 'completed' : 'in-progress';
        const label = `${course.subject} ${course.number}`;
        const statusText = course.completed ? 'Completed' : 'In Progress';
        html += `
            <div class="course-circle ${statusClass}">
                <span class="course-code">${label}</span>
                <span class="course-title">${course.title}</span>
                <span class="course-status-label">${statusText}</span>
            </div>
        `;
    });
    courseGrid.innerHTML = html;

    const total = filtered.reduce((sum, c) => sum + c.credits, 0);
    totalCreditsSpan.textContent = total;
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCourses(btn.dataset.filter);
    });
});

renderCourses('all');
updateProgress();