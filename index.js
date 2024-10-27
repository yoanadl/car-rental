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
  { title: "Tesla Models S", type: "BEV", link: "https://www.tesla.com/ownersmanual/images/GUID-5543BA62-932F-46C5-B1EF-44707D4726B2-online-en-US.png"},
  { title: "Hyundai Sonata", type: "PHEV", link: "https://s7d1.scene7.com/is/image/hyundai/2024-sonata-n-line-serenity-white-conquest-hero:16-9?wid=640&hei=360&fmt=webp-alpha"},
  { title: "Chevrolet Bolt", type: "BEV", link: "https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Bolt-EV/2021/LT.jpg" },
  { title: "Toyota Prius", type: "HEV", link: "https://www.toyota.com.sg/showroom/new-models/-/media/4ec94a5afd6d4faab5973c826ef1770b.png" },
  { title: "Ford E-Transit", type: "BEV", link: "https://cdn-www.pod-point.com/e1480704-1220-4fe1-a57a-28449caef137.png?v=1678889705"},
  { title: "Audi A3 E-Tron", type: "PHEV", link: "https://platform.cstatic-images.com/large/in/v2/stock_photos/1bb05e0f-b6b2-44bd-93cb-93237755b458/e8c1ca57-cb5e-4aea-84a7-69b8376871de.png" },
  { title: "Land Rover Range Rover PHEV", type: "PHEV", link: "https://cdn-www.pod-point.com/range-rover-velar-white-background.jpg?v=1639669195" },
  { title: "Ford Fusion Hybrid", type: "HEV", link: "https://platform.cstatic-images.com/large/in/v2/stock_photos/3b081463-cf95-495f-9aad-d0ab8f97484f/687b006b-592e-41aa-b3aa-5508a60d1487.png" }
];

// Reference to the card container
const cardCarousel = document.getElementById("cardCarousel");

let selectedCard = null; // To store the selected card
let currentIndex = 0; // Current index of the carousel

const cardWidth = 240;

// Function to create a card
function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

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
  typeElement.innerText = card.type;
  cardElement.appendChild(typeElement);

  const indicator = document.createElement("div");
  indicator.className = "indicator";
  const indicatorBullet = document.createElement("span");
  indicatorBullet.className = "bullet";
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
cardData.forEach((card) => createCard(card));

// Scroll function to display 3 cards at a time
function scrollCarousel(direction) {
  const totalCards = cardData.length;
  const maxVisibleCards = 3;

  // Calculate new index based on direction
  if (direction === "next" && currentIndex < totalCards - maxVisibleCards) {
    currentIndex += 1; // Move one card at a time
  } else if (direction === "prev" && currentIndex > 0) {
    currentIndex -= 1;
  }

  // Scroll to the new index
  cardCarousel.scrollLeft = currentIndex * cardWidth;
}

// Event listeners for carousel navigation buttons
document.getElementById("prevBtn").addEventListener("click", () => scrollCarousel("prev"));
document.getElementById("nextBtn").addEventListener("click", () => scrollCarousel("next"));

// Reference to the global button
const globalButton = document.getElementById("globalButton");
globalButton.disabled = true;

// Event listener for the global button
globalButton.addEventListener("click", () => {
  if (selectedCard !== null) {
    const selectedCardTitle = selectedCard.querySelector(".card-title").innerText;
    console.log("Selected card:", selectedCardTitle);

    // Redirect to booking.html
    window.location.href = 'booking.html';
  }
});