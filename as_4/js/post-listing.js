document.addEventListener("DOMContentLoaded", function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Please login to post a listing.');
        window.location.href = 'login.html';
        return;
    }

    // Form submission
    document.getElementById('listingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const listing = {
            id: Date.now().toString(),
            title: document.getElementById('propertyTitle').value,
            category: document.querySelector('input[name="category"]:checked').value,
            price: document.getElementById('propertyPrice').value,
            location: document.getElementById('propertyLocation').value,
            phone: document.getElementById('propertyPhone').value,
            description: document.getElementById('propertyDescription').value,
            userId: user.id,
            date: new Date().toISOString(),
            status: 'pending'
        };

        // Save to pending listings
        const pendingListings = JSON.parse(localStorage.getItem('pendingListings') || '[]');
        pendingListings.push(listing);
        localStorage.setItem('pendingListings', JSON.stringify(pendingListings));
        
        alert('Thank you! Your listing has been submitted for admin approval.');
        window.location.href = 'listings.html';
    });
});