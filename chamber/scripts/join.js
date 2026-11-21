const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const timestampField = document.getElementById('timestamp');
const now = new Date();
timestampField.value = now.toLocaleString();

// Modal Logic
const modalLinks = document.querySelectorAll('.modal-link');
const closeButtons = document.querySelectorAll('.close-modal');

modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});