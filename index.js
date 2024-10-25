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


// Data for the cards (more than 3 to test the carousel)
const cardData = [
    { title: "Tesla Models S", type: "BEV" },
    { title: "Hyundai Sonata", type: "PHEV" },
    { title: "Chevrolet Bolt", type: "BEV" },
    { title: "Toyota Prius", type: "HEV" },
    { title: "Ford E-Transit", type: "BEV" },
    { title: "Audi A3 E-Tron", type: "PHEV" },
    { title: "Land Rover Range Rover PHEV", type: "PHEV" },
    { title: "Ford Fusion Hybrid", type: "HEV" }
  ];
  
  // Reference to the card container
  const cardCarousel = document.getElementById("cardCarousel");
  
  let selectedCard = null; // To store the selected card
  let currentIndex = 0; // Current index of the carousel
  
  // Function to create a card
  function createCard(card, cardIndex) {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
  
    const titleElement = document.createElement("div");
    titleElement.className = "card-title";
    titleElement.innerText = card.title;
    cardElement.appendChild(titleElement);

    const typeElement = document.createElement("div");
    typeElement.className = "card-type";
    typeElement.innerText = card.type;
    cardElement.appendChild(typeElement);
  
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    const indicatorBullet = document.createElement("span");
    indicatorBullet.className = "bullet"; // Unselected bullet
    const indicatorText = document.createElement("span");
    indicatorText.innerText = "Select";
  
    indicator.appendChild(indicatorBullet);
    indicator.appendChild(indicatorText);
  
    indicator.addEventListener("click", () => {
      if (selectedCard !== null) {
        selectedCard.classList.remove("selected");
      }
      cardElement.classList.add("selected");
      selectedCard = cardElement;
  
      globalButton.disabled = false;
    });
  
    cardElement.appendChild(indicator);
  
    cardCarousel.appendChild(cardElement);
  }
  
  // Generate the cards
  cardData.forEach((card, index) => createCard(card, index));
  
  // Create a function to scroll the carousel
  function scrollCarousel(direction) {
    const cardWidth = cardCarousel.querySelector(".card").offsetWidth;
    const totalCards = cardData.length;
    const maxVisibleCards = Math.floor(cardCarousel.offsetWidth / cardWidth);
  
    // Calculate new index based on direction
    if (direction === "next" && currentIndex < totalCards - maxVisibleCards) {
      currentIndex += maxVisibleCards;
    } else if (direction === "prev" && currentIndex > 0) {
      currentIndex -= maxVisibleCards;
    }
  
    // Scroll to the new index
    cardCarousel.scrollLeft = currentIndex * (cardWidth + 20); // 20 is margin
  }
  
  // Event listeners for the carousel navigation buttons
  document.getElementById("prevBtn").addEventListener("click", () => scrollCarousel("prev"));
  document.getElementById("nextBtn").addEventListener("click", () => scrollCarousel("next"));
  
  // Reference to the global button
  const globalButton = document.getElementById("globalButton");
  globalButton.disabled = true; // Initially disabled
  
  // Event listener for the global button
  globalButton.addEventListener("click", () => {
    if (selectedCard !== null) {
        const selectedCardTitle = selectedCard.querySelector(".card-title").innerText;
        console.log("Selected card:", selectedCardTitle);

        // Redirect to booking.html
        window.location.href = 'booking.html';
    }
  });
  