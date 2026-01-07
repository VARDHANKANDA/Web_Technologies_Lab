// DOM Elements
const form = document.getElementById('registrationForm');
const tableBody = document.getElementById('tableBody');
const clearAllBtn = document.getElementById('clearAllBtn');

// Key for LocalStorage
const STORAGE_KEY = 'user_management_system_data';

// --- EVENT LISTENERS ---

// 1. Load users when page opens
document.addEventListener('DOMContentLoaded', loadUsers);

// 2. Handle Form Submission
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload

    // Get values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('password').value.trim();

    // --- VALIDATIONS ---
    
    // Mobile Validation (Must be exactly 10 digits)
    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Error: Mobile number must be exactly 10 digits.");
        return;
    }

    // Password Validation (Min 6 chars)
    if (password.length < 6) {
        alert("Error: Password must be at least 6 characters long.");
        return;
    }

    // Duplicate Email Validation
    const users = getUsersFromStorage();
    const emailExists = users.some(user => user.email === email);
    
    if (emailExists) {
        alert("Error: This email is already registered!");
        return;
    }

    // --- SAVE DATA ---
    
    const newUser = {
        name: name,
        email: email,
        mobile: mobile,
        password: password
    };

    users.push(newUser);
    saveUsersToStorage(users);
    
    // Update UI and Reset Form
    loadUsers();
    form.reset();
    alert("User registered successfully!");
});

// 3. Handle Clear All Button
clearAllBtn.addEventListener('click', function() {
    if(confirm("Are you sure you want to delete ALL users?")) {
        localStorage.removeItem(STORAGE_KEY);
        loadUsers(); // Refresh table
    }
});

// --- HELPER FUNCTIONS ---

// Get users from LocalStorage
function getUsersFromStorage() {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// Save users to LocalStorage
function saveUsersToStorage(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Load and Render Table
function loadUsers() {
    const users = getUsersFromStorage();
    tableBody.innerHTML = ''; // Clear current table rows

    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No users registered yet.</td></tr>';
        return;
    }

    // Loop through users and create rows
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>
                <button class="btn delete-btn" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Delete specific user
// Note: This function is called directly from the HTML onClick attribute generated above
window.deleteUser = function(index) {
    if(confirm("Are you sure you want to delete this user?")) {
        const users = getUsersFromStorage();
        
        // Remove user at the specific index
        users.splice(index, 1);
        
        // Update storage and refresh UI
        saveUsersToStorage(users);
        loadUsers();
    }
};