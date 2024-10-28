document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        // Show the modal notification before redirecting
        const modal = document.getElementById("loginModal");
        modal.style.display = "block";

        // Close the modal when the user clicks on <span> (x)
        document.getElementById("modalClose").onclick = function() {
            modal.style.display = "none";
            window.location.href = 'login.html'; // Redirect to the login page
        };

        // Close the modal if the user clicks outside of the modal
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                window.location.href = 'login.html'; // Redirect to the login page
            }
        };
        return; // Exit the function
    }

    // Car data array
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

    const detailsDiv = document.getElementById("selectedCardDetails");
    const catalogContainer = document.getElementById("catalogContainer");

    // Function to display card details based on frequency
    function displayCardDetails() {
        const selectedCardData = localStorage.getItem("selectedCard");

        if (selectedCardData) {
            const card = JSON.parse(selectedCardData);
            
            // Get the selected frequency from localStorage
            const frequency = localStorage.getItem("selectedFrequency") || "daily"; // Default to "daily"
            
            // Determine the price to display based on the selected frequency
            let priceDisplay = card.d; // Default to daily rate
            let frequencyText = "Daily Rate"; // Default to daily rate text
        
            // Update the price based on the frequency
            if (frequency === "weekly") {
                priceDisplay = card.w;
                frequencyText = "Weekly Rate";
            } else if (frequency === "monthly") {
                priceDisplay = card.m;
                frequencyText = "Monthly Rate";
            }
        
            // Display the selected card's details
            detailsDiv.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${card.link}" alt="${card.title}" style="width: 500px; height: auto; margin-right: 20px;">
                    <div>
                        <h2>${card.title}</h2>
                        <p>Type: ${card.type}</p>
                        <p>${frequencyText}: $${priceDisplay}</p>
                    </div>
                </div>
            `;
        
            // Set the radio button based on the previous selection
            const frequencyRadio = document.querySelector(`input[name="frequency"][value="${frequency}"]`);
            if (frequencyRadio) {
                frequencyRadio.checked = true; // Ensure the element exists before setting checked
            }
        } else {
            detailsDiv.innerText = "No car selected. Please select a car from the type.";
        }
    }

    // Call function to display card details initially
    displayCardDetails();

    // Function to display the car catalog
    function displayCatalog() {
        const listElement = document.createElement("ul");
        listElement.style.display = "flex";
        listElement.style.listStyleType = "none";
        listElement.style.padding = "0";
        listElement.style.margin = "0";
    
        cardData.forEach(card => {
            const listItemElement = document.createElement("li");
            listItemElement.className = "card";
            listItemElement.innerText = card.title;
            listItemElement.style.marginRight = "20px";
            listItemElement.style.cursor = "pointer";
    
            listItemElement.onclick = () => {
                localStorage.setItem("selectedCard", JSON.stringify(card));
                localStorage.setItem("selectedFrequency", "daily");
                displayCardDetails();
                highlightSelectedItem(listItemElement); // Highlight the selected item
            };
    
            listElement.appendChild(listItemElement);
        });
    
        catalogContainer.appendChild(listElement);
    
        // Pre-select previously selected card if it exists
        const selectedCardData = localStorage.getItem("selectedCard");
        if (selectedCardData) {
            const selectedCardTitle = JSON.parse(selectedCardData).title;
            const selectedItem = Array.from(listElement.children).find(li => li.innerText === selectedCardTitle);
            if (selectedItem) {
                highlightSelectedItem(selectedItem);
            }
        }
    }
    
    function highlightSelectedItem(selectedItem) {
        const allItems = document.querySelectorAll('.card');
        allItems.forEach(item => {
            item.classList.remove('selected');
            item.style.fontWeight = 'normal';
            item.style.textDecoration = 'none';
        });
    
        selectedItem.classList.add('selected');
        selectedItem.style.fontWeight = 'bold';
    }
    
    // Call function to display catalog
    displayCatalog();

    const locationData = [
        { name: "Woodlands" },
        { name: "Boonlay" },
    ];
    
    // Function to display the location options as selectable buttons
    function displayLocationOptions() {
        const listElement = document.createElement("ul");
        listElement.style.display = "flex";
        listElement.style.listStyleType = "none";
        listElement.style.padding = "0";
        listElement.style.margin = "0";
    
        locationData.forEach(location => {
            const listItemElement = document.createElement("li");
            listItemElement.className = "location";
            listItemElement.innerText = location.name;
            listItemElement.style.marginRight = "20px";
            listItemElement.style.cursor = "pointer";
    
            listItemElement.onclick = () => {
                localStorage.setItem("selectedLocation", JSON.stringify(location));
                highlightSelectedLocation(listItemElement); // Highlight the selected item
            };
    
            listElement.appendChild(listItemElement);
        });
    
        const locationContainer = document.getElementById("locationContainer");
        locationContainer.appendChild(listElement);
    
        // Pre-select previously selected location if it exists
        const selectedLocationData = localStorage.getItem("selectedLocation");
        if (selectedLocationData) {
            const selectedLocationName = JSON.parse(selectedLocationData).name;
            const selectedItem = Array.from(listElement.children).find(li => li.innerText === selectedLocationName);
            if (selectedItem) {
                highlightSelectedLocation(selectedItem);
            }
        }
    }
    
    // Function to highlight the selected location
    function highlightSelectedLocation(selectedItem) {
        const allItems = document.querySelectorAll('.location');
        allItems.forEach(item => {
            item.classList.remove('selected');
            item.style.fontWeight = 'normal';
        });
    
        selectedItem.classList.add('selected');
        selectedItem.style.fontWeight = 'bold';
    }
    
    // Initialize location options
    displayLocationOptions();


        

    // Frequency change event listener
    document.querySelectorAll('input[name="frequency"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            const selectedFrequency = this.value;
            localStorage.setItem("selectedFrequency", selectedFrequency);
            displayCardDetails(); // Re-display card details with the new frequency
        });
    });




    // Confirm booking button functionality
    document.getElementById("confirmButton").addEventListener("click", function() {
        const selectedCardData = JSON.parse(localStorage.getItem("selectedCard"));
        const selectedFrequency = localStorage.getItem("selectedFrequency");
        const selectedLocationData = JSON.parse(localStorage.getItem("selectedLocation")); 

        if (selectedCardData && selectedFrequency) {
            // Add frequency-based pricing to the booking details
            const price = selectedFrequency === "daily" ? selectedCardData.d :
                        selectedFrequency === "weekly" ? selectedCardData.w :
                        selectedCardData.m;

            const bookingDetails = {
                car: selectedCardData.title,
                frequency: selectedFrequency,
                price: price,
                location:selectedLocationData.name,
            };

            // Store booking details in localStorage
            localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

            // Redirect to the confirmation page
            window.location.href = "confirmation.html";
        } else {
            alert("Please select a car and rental period before confirming your booking.");
        }
    });



    
});
