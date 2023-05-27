// Home Page
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', handleSignup);

function handleSignup(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    status: 'pending',
  };

  // Store user data in local storage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration submitted for approval.');
  signupForm.reset();
}

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
