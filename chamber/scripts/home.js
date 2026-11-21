const apiKey = '1ffdea39f8dfd0822a259e33673b4085';
const city = 'Blantyre';
const country = 'MW';

const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-content').innerHTML = '<p>Weather data currently unavailable.</p>';
    }
}

function displayWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.getElementById('forecast');

    const currentTemp = Math.round(data.list[0].main.temp);
    const currentDesc = data.list[0].weather[0].description;
    const iconCode = data.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    currentWeatherDiv.innerHTML = `
        <div class="weather-current">
            <img src="${iconUrl}" alt="${currentDesc}">
            <div>
                <h3>${currentTemp}&deg;C</h3>
                <p style="text-transform: capitalize;">${currentDesc}</p>
            </div>
        </div>
    `;

    let forecastHTML = '<h4>3-Day Forecast</h4><div class="forecast-grid">';
    
    // OpenWeatherMap gives 3-hour intervals. We step by 8 to get roughly one reading per day.
    for (let i = 8; i <= 24; i += 8) {
        if (data.list[i]) {
            const date = new Date(data.list[i].dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(data.list[i].main.temp);
            
            forecastHTML += `
                <div class="forecast-day">
                    <p>${dayName}</p>
                    <p><strong>${temp}&deg;C</strong></p>
                </div>
            `;
        }
    }
    forecastHTML += '</div>';
    forecastDiv.innerHTML = forecastHTML;
}

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Data not found');
        const members = await response.json();

        // Filter for Gold (3) and Silver (2) members
        const qualifiedMembers = members.filter(m => m.membership === 3 || m.membership === 2);
        
        // Shuffle and pick 3 random members
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const spotlights = shuffled.slice(0, 3);

        displaySpotlights(spotlights);
    } catch (error) {
        console.error('Error fetching spotlights:', error);
    }
}

function displaySpotlights(spotlights) {
    const container = document.getElementById('spotlightContainer');
    container.innerHTML = '';

    spotlights.forEach(member => {
        let badgeText = member.membership === 3 ? 'Gold Member' : 'Silver Member';
        let badgeClass = member.membership === 3 ? 'gold' : 'silver';

        const card = document.createElement('div');
        card.classList.add('business-card', 'spotlight-card');
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <div class="card-details">
                <h3>${member.name}</h3>
                <p class="tagline">${member.tagline}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.url}" target="_blank">${member.url}</a></p>
            </div>
            <span class="badge ${badgeClass}">${badgeText}</span>
        `;
        container.appendChild(card);
    });
}

getWeather();
getSpotlights();