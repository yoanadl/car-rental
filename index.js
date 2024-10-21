let lastScrollY = window.scrollY; 
const header = document.getElementById("header");

// Initial setup
header.classList.add("hidden"); // Start hidden

window.addEventListener("scroll", function() {
    const currentScrollY = window.scrollY;

    // Check if the page is scrolled down by more than 50px
    if (currentScrollY > 50) {
        // If scrolling down
        if (currentScrollY > lastScrollY) {
            //scrolling down
            header.classList.add("visible");
            header.classList.remove("hidden");
        } else { //scrolling up
            header.classList.add("hidden");
            header.classList.remove("visible");
        }
    } else { //hide header at top
        header.classList.remove("visible");
        header.classList.add("hidden");
    }

    lastScrollY = currentScrollY; 
});





$(document).ready(function() {
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

    const cardDescription = document.getElementById('cardDescription');
    const carouselInner = document.getElementById('carouselInner');
    const carouselIndicators = document.getElementById('carouselIndicators');

    cars.forEach((car, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        if (index === 0) itemDiv.classList.add('active'); 

        // Create image URL for each car
        const imageUrl = `https://via.placeholder.com/1600x1200?text=${encodeURIComponent(car.name)}`;
        console.log('Car 3 Name:', cars[2].name);


        itemDiv.innerHTML = `
            <div class="card">
                <div class="img">
                    <img src="${imageUrl}" alt="${car.name}">
                </div>
                <span>${car.name}</span>
                <p class="job">${car.type}</p>
                <button>Book Now</button>
            </div>
        `;

        carouselInner.appendChild(itemDiv);

        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#cardCarousel');
        indicator.setAttribute('data-slide-to', index); 
        if (index === 0) {
            indicator.classList.add('active');
            cardDescription.textContent = car.msg;
        }

        carouselIndicators.appendChild(indicator);
    });

    $('#cardCarousel').on('slide.bs.carousel', function (event) {
        const nextIndex = $(event.relatedTarget).index();  
        const nextCar = cars[nextIndex];  
        cardDescription.textContent = nextCar.msg;  
    });

    $("#cardCarousel").carousel();

    $(".left").click(function(event) {
        event.preventDefault();
        $("#cardCarousel").carousel("prev");
    });

    $(".right").click(function(event) {
        event.preventDefault();
        $("#cardCarousel").carousel("next");
    });
});
