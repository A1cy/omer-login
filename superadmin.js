// Super Admin Page
const approvedUserList = document.getElementById('approved-user-list');

function displayApprovedUsers() {
  approvedUserList.innerHTML = '';

  // Retrieve approved users from local storage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  users.forEach(user => {
    if (user.status === 'approved') {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.name} - ${user.email}`;
      approvedUserList.appendChild(listItem);
    }
  });
}

// Display approved users when the page loads
displayApprovedUsers();
