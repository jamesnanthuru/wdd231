//hamburger
const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
});

// current year
const currentYearSpan = document.getElementById('currentyear');
const now = new Date();
currentYearSpan.textContent = now.getFullYear();

// last modification date
const lastModifiedP = document.getElementById('lastModified');
lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;