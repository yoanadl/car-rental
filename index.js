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


// Data for the cards
const cardData = [
    { title: "Card 1" },
    { title: "Card 2" },
    { title: "Card 3" }
  ];
  
  // Reference to the card container
  const cardContainer = document.getElementById("cardContainer");
  
  let selectedCard = null; // To store the selected card
  
  // Function to create a card
  function createCard(card, cardIndex) {
    // Create card element
    const cardElement = document.createElement("div");
    cardElement.className = "card";
  
    // Create title element
    const titleElement = document.createElement("div");
    titleElement.className = "card-title";
    titleElement.innerText = card.title;
    cardElement.appendChild(titleElement);
  
    // Create indicator at the bottom
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    const indicatorBullet = document.createElement("span");
    indicatorBullet.className = "bullet"; // Unselected bullet
    const indicatorText = document.createElement("span");
    indicatorText.innerText = "Select";
  
    indicator.appendChild(indicatorBullet);
    indicator.appendChild(indicatorText);
  
    // Add click event to the indicator
    indicator.addEventListener("click", () => {
      // Clear the previously selected card
      if (selectedCard !== null) {
        selectedCard.classList.remove("selected");
      }
      // Set the new selected card
      cardElement.classList.add("selected");
      selectedCard = cardElement;
  
      // Update the global button text
      globalButton.disabled = false;
    });
  
    // Append indicator to card
    cardElement.appendChild(indicator);
  
    // Append card to card container
    cardContainer.appendChild(cardElement);
  }
  
  // Generate cards based on the data
  cardData.forEach((card, index) => createCard(card, index));
  
  // Create single global button below all cards
  const globalButton = document.createElement("button");
  globalButton.className = "global-button";
  globalButton.innerText = "This One";
  globalButton.disabled = true; // Initially disabled
  
  // Add global event listener for button
  globalButton.addEventListener("click", () => {
    if (selectedCard !== null) {
      const selectedCardTitle = selectedCard.querySelector(".card-title").innerText;
      console.log("Selected card:", selectedCardTitle);
    }
  });
  
  // Append global button below card container
  document.body.appendChild(globalButton);
  