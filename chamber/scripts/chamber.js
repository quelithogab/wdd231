// JavaScript to dynamically populate the current year
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

    const navItems = document.querySelectorAll('.nav-item'); // Select all nav items

    navItems.forEach(item => {
        if (window.location.href.includes(item.getAttribute('href'))) {
            item.classList.add('active'); // Add the active class to the current link
        }
    });

    const toggleButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    toggleButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggleButton.classList.toggle('active');
    });

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved user preference in localStorage
    const darkMode = localStorage.getItem('darkMode');

    // If dark mode was previously enabled, set it when page loads
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Save the user's preference in localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    

    const membersContainer = document.getElementById("members-container");
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");

    let members = [];

    // Fetch the JSON data from the chamber/data folder
    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json'); // remove 'chamber/' if already inside the chamber folder
            members = await response.json();
            displayMembers(members, 'grid');  // Default to grid view
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    // Function to create member cards or list items
    function displayMembers(members, viewType) {
        membersContainer.innerHTML = ''; // Clear the container

        members.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.classList.add ('member', viewType);

            memberElement.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            membersContainer.appendChild(memberElement);
        });

        // Apply class for the selected view type
        membersContainer.className = viewType === 'grid' ? 'grid-view' : 'list-view';
    }

    // Event listeners for buttons to toggle views
    gridViewButton.addEventListener('click', () => {
        displayMembers(members, 'grid');
    });

    listViewButton.addEventListener('click', () => {
        displayMembers(members, 'list');
    });

    fetchMembers();
});


// Home JS


// Replace with your OpenWeatherMap API key
const apiKey = '67ab91ce2316c9e9cb76fbc0f7b4ab72';
const city = 'Haiti'; // Replace with your city name
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
});

function fetchWeatherData() {
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayWeatherForecast(data);
        })
        .catch(error => console.log('Error fetching weather data:', error));
}

function displayCurrentWeather(data) {
    // Getting current weather data (first object in list)
    const currentWeather = data.list[0];
    
    // Displaying current temperature and weather description
    document.getElementById('temp').textContent = `${Math.round(currentWeather.main.temp)}°F`;
    document.getElementById('weather-description').textContent = currentWeather.weather[0].description;
    document.getElementById('high').textContent = `${Math.round(currentWeather.main.temp_max)}°F`;
    document.getElementById('low').textContent = `${Math.round(currentWeather.main.temp_min)}°F`;
    document.getElementById('humidity').textContent = `${currentWeather.main.humidity}%`;
    
    // Optional: Sunrise/Sunset (converting from Unix timestamp)
    const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;

    // Display weather icon (if available)
    const weatherIcon = currentWeather.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
}

function displayWeatherForecast(data) {
    // Display 3-day forecast (at 12:00 PM each day)
    const forecastList = data.list;
    
    // Filtering forecast data to get entries around 12:00 PM each day
    const forecastToday = forecastList.find(item => item.dt_txt.includes("12:00:00"));
    const forecastWed = forecastList.find(item => item.dt_txt.includes("2024-10-09 12:00:00"));
    const forecastThu = forecastList.find(item => item.dt_txt.includes("2024-10-10 12:00:00"));

    // Displaying temperatures for the 3-day forecast
    document.getElementById('forecast-today').textContent = `${Math.round(forecastToday.main.temp)}°F`;
    document.getElementById('forecast-wed').textContent = `${Math.round(forecastWed.main.temp)}°F`;
    document.getElementById('forecast-thu').textContent = `${Math.round(forecastThu.main.temp)}°F`;
}


// Function to shuffle and pick random members from the array
function getRandomMembers(members, count) {
    const qualifiedMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
    const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
    return shuffledMembers.slice(0, count);
}

// Function to display the spotlight members
function displaySpotlightMembers(members) {
    const membersContainer = document.getElementById('members-container');
    const randomMembers = getRandomMembers(members, 3);

    randomMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('spotlight-member');

        memberDiv.innerHTML = `
            <h3>${member.name}</h3>
            <p class="membership-level">${member.membershipLevel === 2 ? 'Silver' : 'Gold'} Member</p>
            <img src="${member.image}" alt="${member.name}">
            <p>${member.address}</p>
            <p><strong>Email:</strong> ${member.email}</p>
            <p><strong>Phone::</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        membersContainer.appendChild(memberDiv);
    });
}

// Fetch members data from the JSON file located in the /data folder
fetch('data/members.json')
    .then(response => response.json())
    .then(members => {
        displaySpotlightMembers(members);
    })
    .catch(error => console.error('Error fetching the members:', error));