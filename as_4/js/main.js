// Проверка авторизации при загрузке ЛЮБОЙ страницы
document.addEventListener("DOMContentLoaded", function() {
    updateAuthStatus();
});

// Обновлённая функция проверки статуса
function updateAuthStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const postListingBtn = document.querySelector('.btn-post-listing');
    const loginLink = document.getElementById('login-link');
    const userProfile = document.getElementById('user-profile');

    if (user) {
        // Для авторизованных пользователей
        if (postListingBtn) postListingBtn.style.display = 'inline-block';
        if (loginLink) loginLink.style.display = 'none';
        if (userProfile) {
            userProfile.style.display = 'flex';
            document.getElementById('user-name').textContent = user.name;
        }
    } else {
        // Для гостей
        if (postListingBtn) postListingBtn.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    }
}
function fetchSyncJSON(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            return JSON.parse(xhr.responseText);
        } catch (e) {
            throw new Error("Invalid JSON: " + e.message);
        }
    } else {
        throw new Error("Request failed: " + xhr.status + " " + xhr.statusText);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Display user-submitted listings
    const listingsGrid = document.querySelector('.listings-grid');
    const userListings = JSON.parse(localStorage.getItem('listings')) || [];
    
    if (userListings.length > 0 && listingsGrid) {
        userListings.forEach(listing => {
            const listingCard = document.createElement('div');
            listingCard.className = 'listings-card';
            listingCard.innerHTML = `
                <div class="listings-image">
                    <div class="property-badge">New</div>
                    <img src="images/properties/default.jpg" alt="${listing.title}">
                </div>
                <div class="listings-details">
                    <h3 class="property-title">${listing.title}</h3>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i> ${listing.location}
                    </div>
                    <div class="property-features">
                        <span class="property-feature">
                            <i class="fas fa-tag"></i> ${listing.category}
                        </span>
                        <span class="property-feature">
                            <i class="fas fa-phone"></i> ${listing.phone}
                        </span>
                    </div>
                    <div class="property-price">$${Number(listing.price).toLocaleString()}</div>
                </div>
            `;
            listingsGrid.prepend(listingCard);
        });
    }
});
// Add this to your main.js
document.addEventListener("DOMContentLoaded", function() {
    // ... existing code ...
    
    // Handle logout
    document.getElementById('logout-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        updateAuthStatus();
        window.location.href = 'index.html';
    });
    
    // Initialize auth status
    updateAuthStatus();
});
document.addEventListener("DOMContentLoaded", function() {
    // Проверяем статус авторизации при загрузке страницы
    updateAuthStatus();
    
    // Обработчик выхода
    document.getElementById('logout-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        updateAuthStatus();
        window.location.href = 'index.html';
    });
});
document.getElementById('logout-link')?.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    updateAuthStatus();
    window.location.href = 'index.html';
});