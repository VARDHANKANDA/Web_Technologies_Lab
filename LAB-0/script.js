document.getElementById("regForm").addEventListener("submit", function(event) {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let phone = document.getElementById("phone").value.trim();

    // Name validation
    if (name.length < 3) {
        alert("Name must be at least 3 characters long.");
        event.preventDefault();
        return;
    }

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
    }

    // Password validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        event.preventDefault();
        return;
    }

    // Phone number validation
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        event.preventDefault();
        return;
    }

    alert("Registration Successful!");
});

// Cancel button returns to index page
document.getElementById("cancelBtn").addEventListener("click", function() {
    window.location.href = "index.html";
});
