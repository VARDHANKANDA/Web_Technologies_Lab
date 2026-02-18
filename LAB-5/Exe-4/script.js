let products = [];

// AUTO LOAD ON PAGE START
window.onload = function () {
    loadProducts();
};

// LOAD DATA
function loadProducts() {
    fetch("inventory.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load inventory.json");
            }
            return response.json();
        })
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => {
            showMessage("JSON Error: " + error.message, "red");
        });
}

// DISPLAY PRODUCTS
function displayProducts(data) {
    const tbody = document.querySelector("#inventoryTable tbody");
    tbody.innerHTML = "";

    let totalInventoryValue = 0;

    if (data.length === 0) {
        showMessage("No products found.", "orange");
        document.getElementById("totalInventory").innerText = "";
        return;
    }

    data.forEach(product => {
        const row = document.createElement("tr");

        const productTotal = product.price * product.stock;
        totalInventoryValue += productTotal;

        if (product.stock <= 5) {
            row.style.backgroundColor = "#ffdddd";
            row.style.fontWeight = "bold";
        }

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td>${productTotal.toLocaleString()}</td>
        `;

        tbody.appendChild(row);
    });

    document.getElementById("totalInventory").innerText =
        "Total Inventory Value: ₹ " + totalInventoryValue.toLocaleString();
}

// VALIDATION
function validateInputs(requireAll = true) {
    const id = productId.value.trim();
    const name = productName.value.trim();
    const cat = category.value.trim();
    const pr = price.value.trim();
    const st = stock.value.trim();

    if (!id) {
        showMessage("Product ID is required!", "red");
        return false;
    }

    if (requireAll && (!name || !cat || !pr || !st)) {
        showMessage("All fields are required!", "red");
        return false;
    }

    if (pr && (isNaN(pr) || pr < 0)) {
        showMessage("Price must be a positive number!", "red");
        return false;
    }

    if (st && (isNaN(st) || st < 0)) {
        showMessage("Stock must be a positive number!", "red");
        return false;
    }

    return true;
}

// ADD PRODUCT
function addProduct() {
    if (!validateInputs(true)) return;

    const id = parseInt(productId.value);
    const existingProduct = products.find(p => p.id === id);

    if (existingProduct) {
        // Increase stock instead of showing error
        existingProduct.stock += parseInt(stock.value);
        showMessage("Stock updated for existing product!", "green");
    } else {
        const newProduct = {
            id: id,
            name: productName.value,
            category: category.value,
            price: parseFloat(price.value),
            stock: parseInt(stock.value)
        };

        products.push(newProduct);
        showMessage("New product added successfully!", "green");
    }

    displayProducts(products);
    clearForm();
}

// UPDATE PRODUCT
function updateProduct() {
    if (!validateInputs(false)) return;

    const id = parseInt(productId.value);
    const product = products.find(p => p.id === id);

    if (!product) {
        showMessage("Product not found!", "red");
        return;
    }

    if (price.value) product.price = parseFloat(price.value);
    if (stock.value) product.stock = parseInt(stock.value);
    if (category.value) product.category = category.value;
    if (productName.value) product.name = productName.value;

    displayProducts(products);
    clearForm();
    showMessage("Product updated successfully!", "green");
}

// DELETE PRODUCT
function deleteProduct() {
    if (!validateInputs(false)) return;

    const id = parseInt(productId.value);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        showMessage("Product not found!", "red");
        return;
    }

    products.splice(index, 1);
    displayProducts(products);
    clearForm();
    showMessage("Product deleted successfully!", "green");
}

// SEARCH CATEGORY (CASE INSENSITIVE)
function searchByCategory() {
    const searchCat = searchCategory.value.trim().toLowerCase();

    if (!searchCat) {
        showMessage("Enter category to search!", "red");
        return;
    }

    const filtered = products.filter(p =>
        p.category.toLowerCase().includes(searchCat)
    );

    displayProducts(filtered);
}

// CLEAR FORM
function clearForm() {
    productId.value = "";
    productName.value = "";
    category.value = "";
    price.value = "";
    stock.value = "";
}

// MESSAGE FUNCTION
function showMessage(msg, color) {
    const messageDiv = document.getElementById("message");
    messageDiv.style.color = color;
    messageDiv.textContent = msg;
}