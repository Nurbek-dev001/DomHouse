const PROPERTY_AMENITY_ICONS = {
    "internet": "wifi",
    "parking": "parking",
    "pool": "swimming-pool",
    "gym": "dumbbell",
    "laundry": "tshirt",
    "concierge": "concierge-bell",
    "garden": "tree",
    "security_system": "shield-alt",
    "fireplace": "fire"
};


function getPropertyById(properties, id) {
    return properties.find(property => property.id === parseInt(id));
}


function getPropertyMainImage(property) {
    return property.images.find(image => image.is_main) || property.images[0];
}

function titleCase(str) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function prettyPropertyType(type) {
    return titleCase(type);
}

function prettyPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function prettyPropertyDetailLabel(label) {
    return titleCase(label.replace(/_/g, " "));
}

function getPropertyAmenityIcon(amenity) {
    return PROPERTY_AMENITY_ICONS[amenity] || "check";
}

function getPropertyAmenityLabel(label) {
    return titleCase(label.replace(/_/g, " "));
}
