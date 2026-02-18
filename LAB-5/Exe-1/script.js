let editingId = null;

window.onload = loadEmployees;

function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'employees.xml', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.responseXML) {
                displayEmployees(xhr.responseXML);
            } else {
                showMessage('XML file not found. Please create employees.xml', 'error');
            }
        }
    };
    xhr.send();
}

function displayEmployees(xmlDoc) {
    const tbody = document.getElementById('employeeTableBody');
    const employees = xmlDoc.getElementsByTagName('employee');
    tbody.innerHTML = '';
    
    for (let i = 0; i < employees.length; i++) {
        const emp = employees[i];
        const id = emp.getAttribute('id');
        const name = emp.getElementsByTagName('name')[0].textContent;
        const dept = emp.getElementsByTagName('department')[0].textContent;
        const salary = parseInt(emp.getElementsByTagName('salary')[0].textContent).toLocaleString();
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${dept}</td>
            <td>₹${salary}</td>
            <td>
                <button class="edit-btn" onclick="editEmployee('${id}')">Edit</button>
                <button class="delete-btn" onclick="deleteEmployee('${id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    }
}

function saveEmployee() {
    const id = document.getElementById('editId').value;
    const name = document.getElementById('empName').value.trim();
    const dept = document.getElementById('empDept').value.trim();
    const salary = document.getElementById('empSalary').value;

    if (!name || !dept || !salary) {
        showMessage('Please fill all fields', 'error');
        return;
    }

    // Load existing XML
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'employees.xml', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseXML) {
            const xmlDoc = xhr.responseXML;
            const newId = id ? parseInt(id) : getNextId(xmlDoc);
            updateXMLAndSave(newId, name, dept, salary, xmlDoc);
        }
    };
    xhr.send();
}

function getNextId(xmlDoc) {
    const employees = xmlDoc.getElementsByTagName('employee');
    let maxId = 0;
    for (let emp of employees) {
        const id = parseInt(emp.getAttribute('id'));
        if (id > maxId) maxId = id;
    }
    return maxId + 1;
}

function updateXMLAndSave(id, name, dept, salary, xmlDoc) {
    let employeeNode = null;
    const employees = xmlDoc.getElementsByTagName('employee');
    
    // Find or create employee
    for (let emp of employees) {
        if (parseInt(emp.getAttribute('id')) === id) {
            employeeNode = emp;
            break;
        }
    }
    
    if (!employeeNode) {
        employeeNode = xmlDoc.createElement('employee');
        employeeNode.setAttribute('id', id);
        xmlDoc.getElementsByTagName('employees')[0].appendChild(employeeNode);
    }
    
    // Update fields using DOM
    setTextContent(xmlDoc, employeeNode, 'name', name);
    setTextContent(xmlDoc, employeeNode, 'department', dept);
    setTextContent(xmlDoc, employeeNode, 'salary', salary);
    
    // Save (download) updated XML
    const serializer = new XMLSerializer();
    const xmlString = '<?xml version="1.0" encoding="UTF-8"?>' + 
                      serializer.serializeToString(xmlDoc);
    
    downloadXML(xmlString, id ? 'updated' : 'added');
}

function setTextContent(xmlDoc, parent, tagName, text) {
    let node = parent.getElementsByTagName(tagName)[0];
    if (!node) {
        node = xmlDoc.createElement(tagName);
        parent.appendChild(node);
    }
    node.textContent = text;
}

function deleteEmployee(id) {
    if (!confirm('Delete this employee?')) return;
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'employees.xml', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseXML) {
            const xmlDoc = xhr.responseXML;
            const employees = xmlDoc.getElementsByTagName('employee');
            
            for (let emp of employees) {
                if (parseInt(emp.getAttribute('id')) === parseInt(id)) {
                    emp.parentNode.removeChild(emp);
                    break;
                }
            }
            
            const serializer = new XMLSerializer();
            const xmlString = '<?xml version="1.0" encoding="UTF-8"?>' + 
                            serializer.serializeToString(xmlDoc);
            downloadXML(xmlString, 'deleted');
        }
    };
    xhr.send();
}

function editEmployee(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'employees.xml', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseXML) {
            const employees = xhr.responseXML.getElementsByTagName('employee');
            for (let emp of employees) {
                if (parseInt(emp.getAttribute('id')) === parseInt(id)) {
                    document.getElementById('editId').value = id;
                    document.getElementById('empName').value = emp.getElementsByTagName('name')[0].textContent;
                    document.getElementById('empDept').value = emp.getElementsByTagName('department')[0].textContent;
                    document.getElementById('empSalary').value = emp.getElementsByTagName('salary')[0].textContent;
                    document.getElementById('formTitle').textContent = 'Edit Employee';
                    document.getElementById('cancelBtn').style.display = 'inline-block';
                    return;
                }
            }
        }
    };
    xhr.send();
}

function cancelEdit() {
    document.getElementById('editId').value = '';
    document.querySelectorAll('#formTitle + .form-group input:not([type=hidden])').forEach(input => input.value = '');
    document.getElementById('formTitle').textContent = 'Add Employee';
    document.getElementById('cancelBtn').style.display = 'none';
}

function downloadXML(xmlString, action) {
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.xml';
    a.click();
    URL.revokeObjectURL(url);
    
    showMessage(`Employee ${action}! Replace employees.xml with downloaded file.`, 'success');
    setTimeout(loadEmployees, 1000);
}

function showMessage(text, type) {
    const msg = document.getElementById('message');
    msg.innerHTML = `<div class="message ${type}">${text}</div>`;
    setTimeout(() => msg.innerHTML = '', 4000);
}
