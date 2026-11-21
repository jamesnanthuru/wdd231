const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const detailsList = document.getElementById('submission-details');

// Fields to display (required fields + timestamp)
const fieldsToDisplay = [
    { key: 'fname', label: 'First Name' },
    { key: 'lname', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Mobile Phone' },
    { key: 'orgname', label: 'Business Name' },
    { key: 'timestamp', label: 'Application Date' }
];

// Populate the list
fieldsToDisplay.forEach(field => {
    const value = params.get(field.key);
    if (value) {
        const li = document.createElement('li');
        // the decodeURIComponent inserted below is needed because the URL encodes spaces as %20
        li.innerHTML = `<strong>${field.label}:</strong> ${decodeURIComponent(value)}`;
        detailsList.appendChild(li);
    }
});