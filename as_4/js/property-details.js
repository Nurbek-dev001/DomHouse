const properties = fetchSyncJSON("properties.json");

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get("id");
    const property = getPropertyById(properties, propertyId);

    if (!property) {
        window.history.back();

        return;
    }

    renderPropertyDetails(property);
    initImageGallery();
    initMap(property.title, property.location);
    initContactForm();
});

function renderPropertyDetails(property) {
    const $container = $("#property-container");

    $container.html(`
        <div class="property-header">
            <h1 class="property-title">${property.title}</h1>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i> ${property.location.short}
            </div>
            <div class="property-price">$${prettyPrice(property.price.final)}</div>
        </div>

        <div class="property-gallery">
            <div class="main-image">
                <img src="${property.images[0].full}" alt="${property.title}" id="main-image">
            </div>
            <div class="thumbnail-container" id="thumbnails-container">
                ${property.images.map((image, index) => `
                    <img src="${image.thumbnail}" alt="${image.description}" class="thumbnail ${index === 0 ? "active" : ""}" data-full-image="${image.full}">
                `).join("")}
            </div>
        </div>

        <div class="property-content">
            <div class="property-info">
                <h2 class="section-title">Property Details</h2>
                <div class="details-grid">
                    ${Object.entries(property.details).map(([label, value]) => `
                        <div class="detail-item">
                            <span class="detail-label">${prettyPropertyDetailLabel(label)}</span>
                            <span class="detail-value">${value}</span>
                        </div>
                    `).join("")}
                </div>

                <h2 class="section-title">Description</h2>
                <div class="property-description">
                    <p>${property.description}</p>
                </div>

                <h2 class="section-title">Amenities</h2>
                <div class="amenities-grid">
                    ${property.amenities.map(amenity => `
                        <div class="amenity-item">
                            <i class="fas fa-${getPropertyAmenityIcon(amenity)}"></i> <span>${getPropertyAmenityLabel(amenity)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

            <div class="property-sidebar">
                <div class="agent-card">
                    <div class="agent-photo">
                        <img src="${property.agent.photo}" alt="${property.agent.name}">
                    </div>
                    <h3 class="agent-name">${property.agent.name}</h3>
                    <div class="agent-title">${property.agent.title}</div>
                    <div class="agent-contact">
                        <i class="fas fa-phone"></i> ${property.agent.phone}
                    </div>
                    <div class="agent-contact">
                        <i class="fas fa-envelope"></i> ${property.agent.email}
                    </div>
                    <button class="contact-btn">Contact Agent</button>
                </div>

                <div class="schedule-form">
                    <h3>Schedule a Viewing</h3>
                    <form id="viewing-form">
                        <div class="form-group">
                            <input type="text" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" placeholder="Phone Number" required>
                        </div>
                        <div class="form-group">
                            <input type="date" placeholder="Preferred Date" required>
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Message (optional)"></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Request Viewing</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="property-map">
            <h2 class="section-title">Location</h2>
            <div id="property-map"></div>
        </div>
    `);
}

function initImageGallery() {
    $(".thumbnail").on("click", function() {
        $this = $(this);
        $(".thumbnail").removeClass("active");
        $this.addClass("active");
        $("#main-image").attr("src", $this.data("full-image"));
    });
}

function initMap(title, location) {
    const $propertyMapL = L.map("property-map").setView(location.coordinates, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo($propertyMapL);

    L.marker(location.coordinates).addTo($propertyMapL)
        .bindPopup(`<b>${title}</b><br>${location.short}`)
        .openPopup();
}

function initContactForm() {
    const $form = $("#viewing-form");

    if ($form.length) {
        $form.on("submit", function(e) {
            e.preventDefault();

            alert("Thank you! Your viewing request has been submitted. The agent will contact you shortly.");

            this.reset();
        });
    }

    const $contactBtn = $(".contact-btn");

    if ($contactBtn) {
        $contactBtn.on("click", function() {
            const agentPhone = $(".agent-contact:nth-of-type(1)").text().trim();

            window.location.href = `tel:${agentPhone.replace(/\D/g, "")}`;
        });
    }
}
