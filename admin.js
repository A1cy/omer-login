// Admin Page
const userList = document.getElementById('user-list');

function displayPendingUsers() {
  userList.innerHTML = '';

  // Retrieve pending users from local storage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  users.forEach(user => {
    if (user.status === 'pending') {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(listItem);
    }
  });
}

// Display pending users when the page loads
displayPendingUsers();
