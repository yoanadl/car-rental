let lastScrollY = window.scrollY; 
const header = document.getElementById("header");
const sideNavbar = document.getElementById("side-navbar");
const title = document.getElementById("title");

// Initial setup
header.classList.add("hidden"); // Start hidden

window.addEventListener("scroll", function() {
    const currentScrollY = window.scrollY;

    // Check if the page is scrolled down by more than 50px
    if (currentScrollY > 50) {
        // If scrolling down
        if (currentScrollY > lastScrollY) {
            // scrolling down
            header.classList.add("visible");
            header.classList.remove("hidden");
        } else { // scrolling up
            header.classList.add("hidden");
            header.classList.remove("visible");
        }
    } else { // hide header at top
        header.classList.remove("visible");
        header.classList.add("hidden");
    }

    lastScrollY = currentScrollY; 
});

// Hover event to show the side navbar
title.addEventListener("mouseenter", function() {
    sideNavbar.classList.remove("hidden");
    sideNavbar.style.display = 'block'; // Show side navbar
});

title.addEventListener("mouseleave", function() {
    sideNavbar.classList.add("hidden");
    sideNavbar.style.display = 'none'; // Hide side navbar
});

// Hover event to show the side navbar
title.addEventListener("mouseenter", function() {
    sideNavbar.classList.remove("hidden");
    sideNavbar.style.display = 'block'; // Show side navbar
});

title.addEventListener("mouseleave", function() {
    sideNavbar.classList.add("hidden");
    sideNavbar.style.display = 'none'; // Hide side navbar
});



document.addEventListener("DOMContentLoaded", function () {
    const cardData = [
        { 
            title: "Tesla Model S", 
            type: "BEV", 
            d: "8.99",
            w: "109.99",
            m: "459.99",
            link: "https://www.tesla.com/ownersmanual/images/GUID-5543BA62-932F-46C5-B1EF-44707D4726B2-online-en-US.png"
        },
        { 
            title: "Hyundai Sonata", 
            type: "PHEV", 
            d: "10.99",
            w: "129.99",
            m: "479.99",
            link: "https://s7d1.scene7.com/is/image/hyundai/2024-sonata-n-line-serenity-white-conquest-hero:16-9?wid=640&hei=360&fmt=webp-alpha"
        },
        { 
            title: "Toyota Prius", 
            type: "HEV", 
            d: "8.99",
            w: "99.99",
            m: "439.99",
            link: "https://www.toyota.com.sg/showroom/new-models/-/media/4ec94a5afd6d4faab5973c826ef1770b.png"
        },
    ];
    
    const cardContainer = document.getElementById("cardContainer");
    let selectedCard = null; // No card selected initially
    const globalButton = document.getElementById("globalButton");
    globalButton.disabled = true; // Disabled by default

    // Clear previous selection (if any) from localStorage on page load
    localStorage.removeItem("selectedCard");

    // Function to create a card
    function createCard(card) {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.dataset.cardInfo = JSON.stringify(card); // Store card info in dataset

        const titleElement = document.createElement("div");
        titleElement.className = "card-title";
        titleElement.innerText = card.title;
        cardElement.appendChild(titleElement);

        const imageElement = document.createElement("img");
        imageElement.className = "card-image";
        imageElement.src = card.link;
        imageElement.alt = card.title;
        cardElement.appendChild(imageElement);

        const typeElement = document.createElement("div");
        typeElement.className = "card-type";
        typeElement.innerText = "Type: " + card.type;
        cardElement.appendChild(typeElement);

        cardElement.addEventListener("click", () => {
            if (selectedCard !== null) {
                selectedCard.classList.remove("selected");
            }
            cardElement.classList.add("selected");
            selectedCard = cardElement;
            
            // Enable globalButton only after a card is selected
            globalButton.disabled = false;
        });

        cardContainer.appendChild(cardElement);
    }

    // Generate cards
    cardData.forEach(createCard);

    // Click event for the global button
    globalButton.addEventListener("click", () => {
        if (selectedCard !== null) { 
            const selectedCardInfo = JSON.parse(selectedCard.dataset.cardInfo);
            localStorage.setItem("selectedCard", JSON.stringify(selectedCardInfo));

            window.location.href = 'booking.html';
        } else {
            alert("Please select a car before proceeding.");
        }
    });
});

// login logout

function loginUser() {
    localStorage.setItem("isLoggedIn", "true"); // Set login state in local storage
    window.location.reload(); // Refresh the page to reflect login status
}

// Function to simulate logout (for demo purposes)
function logoutUser() {
    localStorage.removeItem("isLoggedIn"); // Remove login state from local storage
    window.location.reload(); // Refresh the page to reflect logout status
}

document.addEventListener("DOMContentLoaded", function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn"); 
    var loginLink = document.querySelector("a[href='login.html']");
    var extraMenu = document.getElementById("extraMenu");

    if (isLoggedIn === "true") {
        loginLink.textContent = "Logout";
        loginLink.href = "#"; 
        loginLink.onclick = logoutUser; 

        // Create and add an extra menu item
        var profileLink = document.createElement("a");
        profileLink.href = "mybooking.html";
        profileLink.textContent = "My Booking";
        extraMenu.appendChild(profileLink); // Add to extraMenu
    } else {
        loginLink.onclick = loginUser; 
    }
});