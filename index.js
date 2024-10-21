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
    // Activate Carousel
    $("#myCarousel").carousel();
    
    // Generate carousel items dynamically from the cars array
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

    // Reference to the carousel inner div
    const carouselInner = $(".carousel-inner");
    const cardDescription = document.getElementById("cardDescription");
    
    // Loop through each car and create an item for the carousel
    cars.forEach((car, index) => {
        const isActive = index === 0 ? ' active' : ''; // Set the first item as active
        
        const imageUrl = `https://via.placeholder.com/1600x1200?text=${encodeURIComponent(car.name)}`;

        const itemHtml = `
            <div class="item${isActive}">
                    <img src="${imageUrl}" alt="${car.name}" >                
                    <div class="carousel-caption">
                    <h3>${car.name}</h3>
                </div>
            </div>
        `;

        carouselInner.append(itemHtml);

        if (isActive) {
            cardDescription.textContent = car.msg; 
        }    
    });

    function updateDescription() {
        const activeIndex = $(".carousel-inner .item.active").index(); // Get index of active item
        cardDescription.textContent = cars[activeIndex].msg; // Update the message
    }

    // Initial description update
    updateDescription();

    // Update description on carousel slide change
    $('#myCarousel').on('slid.bs.carousel', function() {
        updateDescription(); // Call the update function
    });

    

    // Enable Carousel Indicators
    $(".item1").click(function() {
        $("#myCarousel").carousel(0);
    });
    $(".item2").click(function() {
        $("#myCarousel").carousel(1);
    });
    $(".item3").click(function() {
        $("#myCarousel").carousel(2);
    });

    // Enable Carousel Controls
    $(".left").click(function(event) {
        event.preventDefault();
        $("#myCarousel").carousel("prev");
    });
    $(".right").click(function() {
        event.preventDefault();
        $("#myCarousel").carousel("next");
    });
});
