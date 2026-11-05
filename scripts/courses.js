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
const progressPercentageText = document.getElementById('progressPercentageText');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderCourses(filter = 'all') {
    let filtered = courses;
    if (filter === 'wdd') filtered = courses.filter(c => c.subject === 'WDD');
    else if (filter === 'cse') filtered = courses.filter(c => c.subject === 'CSE');

    let html = '';
    filtered.forEach(course => {
        const label = `${course.subject} ${course.number}`;
        const statusClass = course.completed ? 'completed' : 'in-progress';
        html += `
            <div class="course-circle ${statusClass}">
                <span class="course-code">${label}</span>
            </div>
        `;
    });
    courseGrid.innerHTML = html;

    const totalFilteredCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
    totalCreditsSpan.textContent = totalFilteredCredits;

    const totalOverallCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const completedOverallCredits = courses
        .filter(c => c.completed)
        .reduce((sum, c) => sum + c.credits, 0);
    const progressPercentage = totalOverallCredits ? Math.round((completedOverallCredits / totalOverallCredits) * 100) : 0;

    progressPercentageText.textContent = `${progressPercentage}% Completed`;
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCourses(btn.dataset.filter);
    });
});

renderCourses('all');
