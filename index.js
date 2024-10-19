
window.addEventListener("scroll", function() {
    var header = document.getElementById("header");
    // Check if the page is scrolled down by 50px or more
    if (window.scrollY > 50) {
        header.classList.remove("hidden"); 
    } else {
        header.classList.add("hidden"); 
    }
});



const cars = [
    { 
        name: "Car Type 1", 
        type: "Compact City EV", 
        msg: "Perfect for Your Daily Drives! Our compact EV is designed to get you through the city with ease, offering efficiency, low costs, and eco-friendly commuting" 
    },
    { 
        name: "Car Type 2", 
        type: "Long-Range EV", 
        msg: "Built for the Long Haul! Our spacious EV is perfect for extended journeys, offering exceptional range, comfort, and advanced safety features to ensure you travel far with peace of mind and zero emissions" 
    },
    { 
        name: "Car Type 3", 
        type: "Family EV",
        msg: "The Ideal Family EV! Designed with families in mind, our EV provides ample space, advanced safety systems, and kid-friendly features, ensuring comfortable and stress-free trips for everyone" 
    }
];

const cardContainer = document.getElementById('cardContainer');
const cardDescription = document.getElementById('cardDescription');

// Loop through each car and create a card for it
cars.forEach((car, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-border-top"></div>
        <div class="img"></div>
        <span>${car.name}</span>
        <p class="job">${car.type}</p>
        <button id="btn-${index}">Click</button>
    `;

    // Append the card to the card container
    cardContainer.appendChild(card);

    // Add event listener to the button to update the description
    const button = card.querySelector('button');
    button.addEventListener('click', () => {
        // Set the card description to the car's message when clicked
        cardDescription.textContent = car.msg;
    });

    if (index === 0) {
        cardDescription.textContent = car.msg;  // Display the first car's message on page load
    }
});
