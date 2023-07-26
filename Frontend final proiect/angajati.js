async function openPopup() {
    await populateDropdownWithProjects2();
    await populateDropdownWithDepartments2();
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    clearForm();
    document.getElementById('popup').style.display = 'none';
}

function createTable(data) {
    const tableBody = document.getElementById('table-body-employees');
    tableBody.innerHTML = '';
    data.forEach((item) => {
        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        cell1.textContent = item.nume;
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = item.prenume;
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.textContent = item.varsta;
        row.appendChild(cell3);

        const cell4 = document.createElement('td');
        cell4.textContent = item.functie;
        row.appendChild(cell4);

        const cell5 = document.createElement('td');
        cell5.textContent = item.salariu;
        row.appendChild(cell5);

        const cell6 = document.createElement('td');
        cell6.textContent = item.email;
        row.appendChild(cell6);

        const cell7 = document.createElement('td');
        cell7.textContent = item.proiecte.nume;
        row.appendChild(cell7);
        const cell10 = document.createElement('td');
        cell10.textContent = item.departament.nume;
        row.appendChild(cell10);

        const cell8 = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        cell8.appendChild(deleteButton);
        row.appendChild(cell8);

        const cell9 = document.createElement('td');
        const updateButton = document.createElement('button');
        updateButton.classList.add('delete-button');
        updateButton.textContent = 'Update';
        cell9.appendChild(updateButton);
        row.appendChild(cell9);

        tableBody.appendChild(row);

        deleteButton.onclick = function () {
            deleteEmployeeById(item.id);
        };

        updateButton.onclick = function () {
            clickUpdate(item);
        };
    });
}

async function clickUpdate(item) {
    await openPopup();
    const form = document.getElementById('myForm');
    form.elements.lname.value = item.nume;
    form.elements.fname.value = item.prenume;
    form.elements.age.value = item.varsta;
    form.elements.function.value = item.functie;
    form.elements.salary.value = item.salariu;
    form.elements.email.value = item.email;
    form.elements.project.value = item.proiecte.id;
    form.elements.department.value = item.departament.id;
    document.getElementById('addButton').style.display = 'none';
    const updateButtonFromPopup = document.getElementById('updateButton');
    updateButtonFromPopup.style.display = 'block';
    updateButtonFromPopup.onclick = function () {
        updateData(item.id);
    };
}

function updateData(id) {
    const form = document.getElementById('myForm');

    const employee = {
        id: id,
        nume: form.elements.lname.value,
        prenume: form.elements.fname.value,
        varsta: form.elements.age.value,
        functie: form.elements.function.value,
        salariu: form.elements.salary.value,
        email: form.elements.email.value,
        proiecteId: form.elements.project.value,
        departamentId: form.elements.department.value,
    };

    const jsonData = JSON.stringify(employee);

    let endpoint = `http://localhost:8080/angajati/byId`;

    fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Error updating project`);
            }
        })
        .then((data) => {
            console.log(data);
            populateTable();
            closePopup();
        })
        .catch((error) => {
            console.error('Error:', error);

            closePopup();
        });
}

let globalData;

function populateTable() {
    fetch('http://localhost:8080/angajati/all')
        .then((response) => response.json())
        .then((data) => {
            globalData = data;
            createTable(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

populateTable();

function deleteEmployeeById(id) {
    fetch(`http://localhost:8080/angajati/byId?id=${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error deleting employee');
            }
        })
        .then((data) => {
            console.log(data);
            populateTable();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function populateDropdownWithProjects2() {
    return new Promise((resolve, reject) => {
        const selectElement = document.getElementById('select-projects');

        while (selectElement.firstChild) {
            selectElement.removeChild(selectElement.firstChild);
        }

        fetch('http://localhost:8080/proiecte/all')
            .then((response) => response.json())
            .then((data) => {
                data.forEach((project) => {
                    const option = document.createElement('option');
                    option.value = project.id;
                    option.textContent = project.nume;
                    selectElement.appendChild(option);
                });

                resolve();
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

function populateDropdownWithDepartments2() {
    return new Promise((resolve, reject) => {
        const selectElement = document.getElementById('select-departments');

        while (selectElement.firstChild) {
            selectElement.removeChild(selectElement.firstChild);
        }

        fetch('http://localhost:8080/departamente/all')
            .then((response) => response.json())
            .then((data) => {
                data.forEach((department) => {
                    const option = document.createElement('option');
                    option.value = department.id;
                    option.textContent = department.nume;
                    selectElement.appendChild(option);
                });

                resolve();
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

function populateDropdownWithProjects() {
    const filterElement = document.getElementById('filterByProject');
    filterElement.appendChild(document.createElement('option'));
    fetch('http://localhost:8080/proiecte/all')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((project) => {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = project.nume;
                filterElement.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

populateDropdownWithProjects();

function populateDropdownWithDepartment() {
    const filterElement = document.getElementById('filterByDepartment');
    filterElement.appendChild(document.createElement('option'));
    fetch('http://localhost:8080/departamente/all')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((department) => {
                const option = document.createElement('option');
                option.value = department.id;
                option.textContent = department.nume;
                filterElement.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

populateDropdownWithDepartment();

const addEmployeeBtn = document.getElementById('addEmployeeBtn');
addEmployeeBtn.addEventListener('click', function () {
    document.getElementById('addButton').style.display = 'block';
    document.getElementById('updateButton').style.display = 'none';
});

function postData() {
    const form = document.getElementById('myForm');

    const employee = {
        nume: form.elements.lname.value,
        prenume: form.elements.fname.value,
        varsta: form.elements.age.value,
        functie: form.elements.function.value,
        salariu: form.elements.salary.value,
        email: form.elements.email.value,
        proiecteId: form.elements.project.value,
        departamentId: form.elements.department.value,
    };

    const jsonData = JSON.stringify(employee);

    let endpoint = 'http://localhost:8080/angajati/add';

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Error adding employee`);
            }
        })
        .then((data) => {
            console.log(data);
            populateTable();
            closePopup();
        })
        .catch((error) => {
            console.error('Error:', error);

            closePopup();
        });
}

const sortSelect = document.getElementById('sortDropDown');
sortSelect.addEventListener('change', function () {
    const selectedValue = sortSelect.value;
    if (selectedValue === 'name') {
        globalData.sort((a, b) => a.nume.localeCompare(b.nume));
        createTable(globalData);
    } else if (selectedValue === 'age') {
        globalData.sort((a, b) => a.varsta - b.varsta);
        createTable(globalData);
    } else if (selectedValue === 'salary') {
        globalData.sort((a, b) => a.salariu - b.salariu);
        createTable(globalData);
    }
});

function filterByProject(sel) {
    const selectedValue = sel.options[sel.selectedIndex].text;
    const filteredData = globalData.filter((item) => item.proiecte.nume.includes(selectedValue));
    createTable(filteredData);
}

function filterByDepartment(sel) {
    const selectedValue = sel.options[sel.selectedIndex].text;
    const filteredData = globalData.filter((item) => item.departament.nume.includes(selectedValue));
    createTable(filteredData);
}

function clearForm() {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('age').value = '';
    document.getElementById('function').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('email').value = '';
    document.getElementById('hire-date').value = '';
}
