document.addEventListener('DOMContentLoaded', () => {
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

    // Js for weather forecast
    // Replace with your OpenWeatherMap API key
    const apiKey = '67ab91ce2316c9e9cb76fbc0f7b4ab72';
    const city = 'Haiti'; // Replace with your city name
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

        fetchWeatherData();

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


    // Js for weather forecast

    // Fetch the JSON from the data folder
    fetch('data/supermarkets.json')

        .then(response => response.json())
        .then(data => displaySupermarkets(data.supermarkets))
        .catch(error => console.error('Error loading JSON:', error));


    function displaySupermarkets(supermarkets) {
        const supermarketList = document.getElementById('supermarketList');

        supermarkets.forEach((supermarket) => {
            // Create a div for each supermarket
            const supermarketItem = document.createElement('div');
            supermarketItem.className = 'supermarket-item';
            supermarketItem.innerHTML = `
                <strong>${supermarket.name}</strong><br>
                <img src="${supermarket.image}" alt="${supermarket.name}" class="supermarket-image" loading="lazy"><br>
                <strong>Address: </strong>${supermarket.address}<br>
                <strong>Phone: </strong>${supermarket.phone}<br>
                <strong>Website: </strong><a href="${supermarket.website}" target="_blank">Visit Website</a><br>
                <strong>Email: </strong><a href="mailto:${supermarket.email}">${supermarket.email}</a>
            `;

            supermarketList.appendChild(supermarketItem);
        });
    }



        // Remove any existing product details
        const existingDetails = document.querySelector('.supermarket-details');
        if (existingDetails) {
            existingDetails.remove();
        }

        // Create a new div for product details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'supermarket-details';
        detailsDiv.innerHTML = `
            <h3>Products Available at ${supermarket.name}</h3>
            <ul class="product-list">
                ${supermarket.products.map(product => `
                    <li>
                        <strong>${product.name}</strong><br>
                        <img src="${product.image}" alt="${product.name}" style="width:150px; height:auto;" loading="lazy"><br>
                        Price: ${product.price}<br>
                    </li>
                `).join('')}
            </ul>
        `;

        document.body.appendChild(detailsDiv);
    
});

// js for supermarkets to display the products and modal functions
document.addEventListener('DOMContentLoaded', function() { 
    const marketName = document.title;

    // Fetch the supermarket data and display products
    fetch('./data/supermarkets.json')
        .then(response => response.json())
        .then(data => {
            const market = data.supermarkets.find(m => m.name === marketName);
            displayMarket(market);
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Function to display the market and products
    function displayMarket(market) {
        document.getElementById('marketName').textContent = market.name;

        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = ''; // Clear existing content before adding new products

        market.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="view-details">View Details</button>
                <button class="add-to-cart">Add to Cart</button>
            `;

            // Add event listener to "View Details" button
            productCard.querySelector('.view-details').addEventListener('click', () => {
                showProductModal(product);
            });

            // Add event listener to "Add to Cart" button
            productCard.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart(product);
            });

            productGrid.appendChild(productCard);
        });
    }

    // Function to show the product modal with product details
    function showProductModal(product) {
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalPrice').textContent = `Price: ${product.price}`;
        
        const modal = document.getElementById('productModal');
        modal.style.display = 'block'; // Display the modal
    }

    // Close the modal when the "X" button is clicked
    const closeModalBtn = document.getElementById('close-btn');
    closeModalBtn.onclick = function () {
        document.getElementById('productModal').style.display = 'none'; // Hide modal when "X" is clicked
    };

    // Initialize an empty cart array
    let cart = [];

    // Function to show "Product added to cart!" message
    function showCartMessage() {
        const cartMessage = document.getElementById('cartMessage');
        const viewCartButton = document.getElementById('viewCartButton');

        // Display the cart message
        cartMessage.style.display = 'block';
        setTimeout(() => {
            cartMessage.style.display = 'none'; // Hide the message after 2 seconds
        }, 2000);

        // Show the "View Cart" button if there are items in the cart
        if (cart.length > 0) {
            viewCartButton.style.display = 'inline'; // Show "View Cart" button
        }
    }

    // Function to add product to the cart
    function addToCart(product) {
        cart.push(product); // Add product to the cart array
        showCartMessage();  // Show "Product added" message
    }

    // Function to display the cart items when "View Cart" is clicked
    function displayCart() {
        const cartList = document.getElementById('cartItems');
        const totalCostElement = document.getElementById('totalCost');
        cartList.innerHTML = ''; // Clear the cart list
        let totalCost = 0;

        // Display each product in the cart
        cart.forEach((product, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${product.name} - ${product.price}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartList.appendChild(listItem);

            // Calculate total cost by parsing price string (assuming price format is "$XX.XX")
            totalCost += parseFloat(product.price.replace('$', ''));
        });

        // Display the total cost
        totalCostElement.textContent = `Total: $${totalCost.toFixed(2)}`;

        // Add event listeners to each "Remove" button
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index); // Remove item from cart
            });
        });
    }

    // Function to remove product from the cart
    function removeFromCart(index) {
        cart.splice(index, 1); // Remove the product at the given index
        displayCart(); // Update the cart display

        // Hide "View Cart" button if cart is empty
        if (cart.length === 0) {
            document.getElementById('viewCartButton').style.display = 'none';
        }
    }

    // Show the cart modal when the "View Cart" button is clicked
    const viewCartButton = document.getElementById('viewCartButton');
    viewCartButton.addEventListener('click', function () {
        const cartModal = document.getElementById('cartModal');
        cartModal.style.display = 'block'; // Display the cart modal
        displayCart(); // Display the cart items in the modal
    });

    // Close the cart modal when the "X" button is clicked
    const closeCartBtn = document.getElementById('close-cart');
    closeCartBtn.onclick = function () {
        document.getElementById('cartModal').style.display = 'none'; // Hide modal when "X" is clicked
    };
});


// Js for the about.html
// Js for the About us 
document.addEventListener("DOMContentLoaded", function() {
    const learnMoreBtn = document.getElementById("learnMoreBtn");
    const learnMoreModal = document.getElementById("learnMoreModal");
    const closeModal = document.getElementById("closeModal");

    // Open modal when "Learn More" button is clicked
    learnMoreBtn.addEventListener("click", () => {
        learnMoreModal.style.display = "block";
    });

    // Close modal when "X" button is clicked
    closeModal.addEventListener("click", () => {
        learnMoreModal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target == learnMoreModal) {
            learnMoreModal.style.display = "none";
        }
    });
});

// Thankyou Js
// Function to get query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        firstName: params.get('firstName'),
        lastName: params.get('lastName'),
        email: params.get('email'),
        phone: params.get('phone'),
        organization: params.get('organization'),
        timestamp: params.get('timestamp')
    };
}

// Function to display the submitted data
function displaySubmittedData() {
    const formData = getQueryParams();

    // Populate the spans with the form data
    document.getElementById('firstName').textContent = formData.firstName || 'N/A';
    document.getElementById('lastName').textContent = formData.lastName || 'N/A';
    document.getElementById('email').textContent = formData.email || 'N/A';
    document.getElementById('phone').textContent = formData.phone || 'N/A';
    document.getElementById('organization').textContent = formData.organization || 'N/A';
    document.getElementById('timestamp').textContent = formData.timestamp || 'N/A';
}

// Call the function to display data when the page loads
document.addEventListener('DOMContentLoaded', displaySubmittedData);



 
