const directoryContainer = document.getElementById('directoryContainer');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

const msToDays = 84600000;
const today = Date.now();
const lastVisit = Number(window.localStorage.getItem("lastVisit-ls")) || 0;

if (lastVisit !== 0) {
    const daysBetween = (today - lastVisit) / msToDays;
    if (daysBetween < 1) {
        alert("Back so soon! Awesome!");
    } else {
        const days = Math.round(daysBetween);
        alert(`You last visited ${days} day${days > 1 ? 's' : ''} ago.`);
    }
} else {
    alert("Welcome to Blantyre Commerce Chambers! Let us know if you have any questions.");
}
localStorage.setItem("lastVisit-ls", today);

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        directoryContainer.innerHTML = '<p style="text-align:center;">Sorry, the directory could not be loaded at this time.</p>';
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = ''; 

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        
        let badgeClass = 'member';
        let badgeText = 'Member';
        if (member.membership === 3) {
            badgeClass = 'gold';
            badgeText = 'Gold Member';
        } else if (member.membership === 2) {
            badgeClass = 'silver';
            badgeText = 'Silver Member';
        }

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <div class="card-details">
                <h2>${member.name}</h2>
                <p class="tagline">${member.tagline}</p>
                <p class="description">${member.description}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
            </div>
            <a href="${member.url}" class="learn-more-btn" target="_blank">Learn More</a>
            <span class="badge ${badgeClass}">${badgeText}</span>
        `;
        directoryContainer.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    directoryContainer.classList.replace('list-view', 'grid-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    directoryContainer.classList.replace('grid-view', 'list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

getMembers();