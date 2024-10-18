document.addEventListener('DOMContentLoaded', () => {
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
                <img src="${supermarket.image}" alt="${supermarket.name}" class="supermarket-image"><br>
                <strong>${supermarket.name}</strong><br>
                Address: ${supermarket.address}<br>
                Phone: ${supermarket.phone}<br>
                Website: <a href="${supermarket.website}" target="_blank">${supermarket.website}</a><br>
                Email: <a href="mailto:${supermarket.email}">${supermarket.email}</a>
            `;
            
            // Add click event to display products
            supermarketItem.addEventListener('click', () => {
                showProducts(supermarket);
            });

            supermarketList.appendChild(supermarketItem);
        });
    }

    function showProducts(supermarket) {
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
                        <img src="${product.image}" alt="${product.name}" style="width:100px; height:auto;"><br>
                        Price: ${product.price}<br>
                    </li>
                `).join('')}
            </ul>
        `;

        document.body.appendChild(detailsDiv);
    }
});
