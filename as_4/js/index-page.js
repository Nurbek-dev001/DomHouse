const MAP_CENTER_VIEW_COORDINATES = [48.0196, 66.9237];
const MAX_SHOWN_SEARCH_SELECT_ROOMS = 3;

const properties = fetchSyncJSON("properties.json");
const categories = fetchSyncJSON("categories.json");


// Fill search form's options
for (const property of properties) {
    $("#search-select-region").append(`
        <option value="${property.location.region}">${property.location.region}</option>
    `);
}

const sortedByRoomsProperties = properties
    .filter(property => property.details.rooms !== undefined)
    .sort((a, b) => a.rooms - b.rooms)
    .slice(0, MAX_SHOWN_SEARCH_SELECT_ROOMS + 1);

for (let i = 0; i < Math.min(MAX_SHOWN_SEARCH_SELECT_ROOMS, sortedByRoomsProperties.length); i++) {
    const property = sortedByRoomsProperties[i];

    $("#search-select-rooms").append(`
        <option value="${property.details.rooms}">
            ${property.rooms}${i === MAX_SHOWN_SEARCH_SELECT_ROOMS - 1 && sortedByRoomsProperties.length > MAX_SHOWN_SEARCH_SELECT_ROOMS ? "+" : ""} 
            ${property.rooms === 1 ? "room" : "rooms"}
        </option>
    `);
}


// Render property utils
const categoryNameFromIds = Object.fromEntries(categories.map(category => [category.id, category.name]));

function renderProperties($grid, properties) {
    $grid.empty();

    properties.forEach(property => {
        const mainImage = getPropertyMainImage(property);

        $grid.append($(`
            <div class="property-card"><a href="property-details.html?id=${property.id}" class="property-link">
                <div class="property-image">
                    ${property.badge ? `<div class="property-badge">${property.badge}</div>` : ""}
                    <img src="${mainImage.full}" alt="${mainImage.description}" />
                </div>
                <div class="property-details">
                    <div class="property-type">${prettyPropertyType(property.type)}</div>
                    <h3 class="property-title">${property.title}</h3>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i> ${property.location.short}
                    </div>
                    <div class="property-price">$${prettyPrice(property.price.final)}</div>
                </div>
            </a></div>
        `));
    });
}


// Redner featured properties
renderProperties($(".featured-properties-grid"), properties.filter(property => property.is_featured === true));


// Render categories with belonging properties
const $categoryTabs = $(".category-tabs");
const $categoriesGrid = $(".categories-grid");

$categoryTabs.append(`<div class="category-tab active" data-id="all">All</div>`);

categories.forEach(category => {
    $categoryTabs.append(`<div class="category-tab" data-id="${category.id}">${category.name}</div>`);
});

renderProperties($categoriesGrid, properties);

$categoryTabs.on("click", ".category-tab", function() {
    $categoryTabs.find(".category-tab").removeClass("active");
    $(this).addClass("active");

    const key = $(this).data("id");

    if (key === "all") {
        renderProperties($categoriesGrid, properties);
    } else {
        const id = parseInt(key, 10);

        renderProperties($categoriesGrid, properties.filter(property => property.categories.includes(id)));
    }
});


// "Search on map"
let isPropertiesMapInitialized = false;

function initMap() {
    const $propertiesMapL = L.map("properties-map").setView(MAP_CENTER_VIEW_COORDINATES, 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo($propertiesMapL);

    properties.forEach(property => {
        const marker = L.marker(property.location.coordinates).addTo($propertiesMapL);
        const mainImage = getPropertyMainImage(property);

        marker.bindPopup(`
            <strong>${property.title}</strong><br>
            <b>Price:</b> ${property.price.final}<br>
            <b>Location:</b> ${property.location.short}<br>
            <img src="${mainImage.full}" alt="${mainImage.description}" width="100">
        `);
    });
}

$(".properties-map-link").on("click", function(e) {
    e.preventDefault();
    const $propertiesMap = $("#properties-map");

    if ($propertiesMap.css("display") === "none") {
        $propertiesMap.css("display", "block");

        if (!isPropertiesMapInitialized) {
            initMap();
            isPropertiesMapInitialized = true;
        }
    } else {
        $propertiesMap.css("display", "none");
    }
});
