
function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const usersDiv = document.getElementById('users');
            usersDiv.innerHTML = '';
            users.forEach(user => {
                usersDiv.innerHTML += `<div class="user-entry">
                                      <p>${user.name} - ${user.email}</p>
                                      <button onclick="deleteUser(${user.id})">Delete</button>
                                      <button onclick="promptUpdateUser(${user.id}, '${user.name}', '${user.email}')">Update</button>
                                   </div>`;
            });
        });
}


function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            fetchUsers(); // Refresh the list
        });
}

function deleteUser(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE'
    })
        .then(() => {
            fetchUsers(); // Refresh the list
        });
}

function promptUpdateUser(userId, name, email) {
    const newName = prompt("Enter new name", name);
    const newEmail = prompt("Enter new email", email);
    if (newName && newEmail) {
        updateUser(userId, newName, newEmail);
    }
}

function updateUser(userId, name, email) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ name: name, email: email }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            fetchUsers(); // Refresh the list
        });
}
