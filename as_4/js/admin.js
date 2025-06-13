// admin.js
document.addEventListener("DOMContentLoaded", function() {
    // Check admin status
    checkAdminAccess();
    
    // Tab switching
    document.querySelectorAll('[data-tab]').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Load initial data
    loadUsers();
    loadProperties();
    loadPendingListings();
    
    // Logout
    document.getElementById('logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});

function checkAdminAccess() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'admin') {
        alert('Access denied. Only admins can view this page.');
        window.location.href = 'index.html';
    }
}

function switchTab(tabId) {
    // Update active tab in navigation
    document.querySelectorAll('[data-tab]').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update active content tab
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabId}-tab`).classList.add('active');
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-badge ${user.isVerified ? 'status-approved' : 'status-pending'}">
                ${user.isVerified ? 'Verified' : 'Pending'}
            </span></td>
            <td>
                <button class="action-btn edit-btn" data-id="${user.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${user.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            editUser(this.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteUser(this.getAttribute('data-id'));
        });
    });
}

function loadProperties() {
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const tbody = document.getElementById('properties-table-body');
    tbody.innerHTML = '';
    
    properties.forEach(property => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${property.id}</td>
            <td>${property.title}</td>
            <td>${property.type}</td>
            <td>$${property.price.final.toLocaleString()}</td>
            <td><span class="status-badge status-approved">Published</span></td>
            <td>
                <button class="action-btn edit-btn" data-id="${property.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${property.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function loadPendingListings() {
    const listings = JSON.parse(localStorage.getItem('pendingListings') || '[]');
    const tbody = document.getElementById('pending-table-body');
    tbody.innerHTML = '';
    
    listings.forEach(listing => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${listing.id}</td>
            <td>${listing.title}</td>
            <td>${listing.category}</td>
            <td>$${Number(listing.price).toLocaleString()}</td>
            <td>${new Date(listing.date).toLocaleDateString()}</td>
            <td>
                <button class="action-btn approve-btn" data-id="${listing.id}">Approve</button>
                <button class="action-btn reject-btn" data-id="${listing.id}">Reject</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            approveListing(this.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            rejectListing(this.getAttribute('data-id'));
        });
    });
}

function editUser(userId) {
    // Implementation for editing user
    alert(`Edit user with ID: ${userId}`);
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.filter(user => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        loadUsers();
    }
}

function approveListing(listingId) {
    const pendingListings = JSON.parse(localStorage.getItem('pendingListings') || '[]');
    const listing = pendingListings.find(l => l.id === listingId);
    
    if (listing) {
        // Add to properties
        const properties = JSON.parse(localStorage.getItem('properties') || '[]');
        properties.push({
            ...listing,
            status: 'published',
            publishedAt: new Date().toISOString()
        });
        localStorage.setItem('properties', JSON.stringify(properties));
        
        // Remove from pending
        const updatedPending = pendingListings.filter(l => l.id !== listingId);
        localStorage.setItem('pendingListings', JSON.stringify(updatedPending));
        
        loadPendingListings();
        loadProperties();
    }
}

function rejectListing(listingId) {
    if (confirm('Are you sure you want to reject this listing?')) {
        const pendingListings = JSON.parse(localStorage.getItem('pendingListings') || '[]');
        const updatedPending = pendingListings.filter(l => l.id !== listingId);
        localStorage.setItem('pendingListings', JSON.stringify(updatedPending));
        loadPendingListings();
    }
}