const properties = fetchSyncJSON("properties.json");
const categories = fetchSyncJSON("categories.json");

const categoryNameFromIds = {};
// const categoryIdsFromName = {};

categories.forEach(category => {
    categoryNameFromIds[category.id] = category.name;
    // categoryIdsFromName[category.name] = category.id;
});

function renderProperties($grid, properties) {
    $grid.empty();

    properties.forEach(property => {
        const mainImage = property.images.find(image => image.is_main) || property.images[0];

        $grid.append($(`
            <div class="listings-card"><a href="property-details.html?id=${property.id}" class="property-link">
                <div class="listings-image">
                    ${property.badge ? `<div class="property-badge">${property.badge}</div>` : ""}
                    <img src="${mainImage.full}" alt="${mainImage.description}" />
                </div>
                <div class="listings-details">
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

renderProperties($(".listings-grid"), properties);
