let xmlDoc;

// LOAD (AJAX GET)
function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                xmlDoc = xhr.responseXML;

                if (!xmlDoc) {
                    showMessage("Malformed XML file!", "red");
                    return;
                }

                displayBooks();
                showMessage("Books loaded successfully!", "green");

            } catch (error) {
                showMessage("Error parsing XML!", "red");
            }
        } else {
            showMessage("Failed to load XML file.", "red");
        }
    };

    xhr.send();
}

// DISPLAY TABLE
function displayBooks() {
    const tableBody = document.querySelector("#bookTable tbody");
    tableBody.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    if (books.length === 0) {
        showMessage("Library is empty!", "orange");
        return;
    }

    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;

        tableBody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${status}</td>
            </tr>
        `;
    }
}

// VALIDATION
function validateInputs(requireFullData = true) {
    const id = bookId.value.trim();
    const titleVal = title.value.trim();
    const authorVal = author.value.trim();
    const statusVal = status.value;

    if (!id) {
        showMessage("Book ID is required!", "red");
        return false;
    }

    if (requireFullData && (!titleVal || !authorVal || !statusVal)) {
        showMessage("All fields are required!", "red");
        return false;
    }

    return true;
}

// ADD BOOK
function addBook() {
    if (!xmlDoc) {
        showMessage("Load XML first!", "red");
        return;
    }

    if (!validateInputs(true)) return;

    const books = xmlDoc.getElementsByTagName("book");

    // Check duplicate ID
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === bookId.value) {
            showMessage("Book ID already exists!", "red");
            return;
        }
    }

    const newBook = xmlDoc.createElement("book");

    newBook.innerHTML = `
        <id>${bookId.value}</id>
        <title>${title.value}</title>
        <author>${author.value}</author>
        <status>${status.value}</status>
    `;

    xmlDoc.getElementsByTagName("library")[0].appendChild(newBook);

    displayBooks();
    showMessage("Book added successfully!", "green");
}

// UPDATE STATUS
function updateBook() {
    if (!xmlDoc) {
        showMessage("Load XML first!", "red");
        return;
    }

    if (!validateInputs(false)) return;

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === bookId.value) {

            if (!status.value) {
                showMessage("Select new availability status!", "red");
                return;
            }

            books[i].getElementsByTagName("status")[0].textContent = status.value;

            displayBooks();
            showMessage("Book status updated!", "green");
            return;
        }
    }

    showMessage("Book not found!", "red");
}

// DELETE BOOK
function deleteBook() {
    if (!xmlDoc) {
        showMessage("Load XML first!", "red");
        return;
    }

    if (!validateInputs(false)) return;

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === bookId.value) {

            books[i].parentNode.removeChild(books[i]);

            displayBooks();
            showMessage("Book deleted successfully!", "green");
            return;
        }
    }

    showMessage("Book not found!", "red");
}

// MESSAGE FUNCTION
function showMessage(msg, color) {
    const messageDiv = document.getElementById("message");
    messageDiv.style.color = color;
    messageDiv.textContent = msg;
}