function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    const form = document.getElementById('myForm');
    form.elements.name.value = '';
    form.elements.description.value = '';
    form.elements.cost.value = '';
    document.getElementById('popup').style.display = 'none';
}

function populateTable() {
    const tableBody = document.getElementById('table-body-projects');

    fetch('http://localhost:8080/proiecte/all')
        .then((response) => response.json())
        .then((data) => {
            tableBody.innerHTML = '';
            data.forEach((item) => {
                const row = document.createElement('tr');

                const cell1 = document.createElement('td');
                cell1.textContent = item.nume;
                row.appendChild(cell1);

                const cell2 = document.createElement('td');
                cell2.textContent = item.descriere;
                row.appendChild(cell2);

                const cell3 = document.createElement('td');
                cell3.textContent = item.alteCosturi;
                row.appendChild(cell3);

                const cell4 = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button');
                deleteButton.textContent = 'Delete';
                cell4.appendChild(deleteButton);
                row.appendChild(cell4);

                const cell5 = document.createElement('td');
                const updateButton = document.createElement('button');
                updateButton.classList.add('delete-button');
                updateButton.textContent = 'Update';
                cell5.appendChild(updateButton);
                row.appendChild(cell5);

                tableBody.appendChild(row);

                deleteButton.onclick = function () {
                    deleteDepartmentById(item.id);
                };

                updateButton.onclick = function () {
                    clickUpdate(item.id, item.nume, item.descriere, item.alteCosturi);
                };
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

populateTable();

function clickUpdate(id, nume, descriere, alteCosturi) {
    const form = document.getElementById('myForm');
    form.elements.name.value = nume;
    form.elements.description.value = descriere;
    form.elements.cost.value = alteCosturi;
    openPopup();

    document.getElementById('addButton').style.display = 'none';
    const updateButtonFromPopup = document.getElementById('updateButton');
    updateButtonFromPopup.style.display = 'block';
    updateButtonFromPopup.onclick = function () {
        updateData(id);
    };
}

function deleteDepartmentById(id) {
    fetch(`http://localhost:8080/proiecte/byId?id=${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error deleting project');
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

function postData() {
    const form = document.getElementById('myForm');
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    const costInput = form.elements.cost;

    const project = {
        nume: nameInput.value,
        descriere: descriptionInput.value,
        alteCosturi: costInput.value,
    };

    const jsonData = JSON.stringify(project);

    let endpoint = 'http://localhost:8080/proiecte/add';

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
                throw new Error(`Error adding project`);
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

function updateData(id) {
    const form = document.getElementById('myForm');
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    const costInput = form.elements.cost;

    const project = {
        id: id,
        nume: nameInput.value,
        descriere: descriptionInput.value,
        alteCosturi: costInput.value,
    };

    const jsonData = JSON.stringify(project);

    let endpoint = `http://localhost:8080/proiecte/byId`;

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

const addProjectBtn = document.getElementById('addProjectBtn');
addProjectBtn.addEventListener('click', function () {
    document.getElementById('addButton').style.display = 'block';
    document.getElementById('updateButton').style.display = 'none';
});
