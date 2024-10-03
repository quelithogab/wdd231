// JavaScript to dynamically populate the current year
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

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
