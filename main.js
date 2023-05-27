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
  };

  // Send the user data to the server for processing (backend)
  // You can use the Fetch API or Axios library to make a POST request to the "/api/signup" endpoint
  // Example using Fetch API:
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      // You can display a success message or redirect the user to another page
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });

  // Reset the form inputs
  nameInput.value = '';
  emailInput.value = '';
}

// Admin Page
const userList = document.getElementById('user-list');

// Fetch the list of pending user registrations from the server (backend)
// You can use the Fetch API or Axios library to make a GET request to the "/api/admin/registrations" endpoint
// Example using Fetch API:
fetch('/api/admin/registrations')
  .then(response => response.json())
  .then(data => {
    // Display the list of pending user registrations
    data.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(listItem);
    });
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error('Error:', error);
  });

// Super Admin Page
const approvedUserList = document.getElementById('approved-user-list');

// Fetch the list of approved users from the server (backend)
// You can use the Fetch API or Axios library to make a GET request to the "/api/superadmin/approved-users" endpoint
// Example using Fetch API:
fetch('/api/superadmin/approved-users')
  .then(response => response.json())
  .then(data => {
    // Display the list of approved users
    data.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.name} - ${user.email}`;
      approvedUserList.appendChild(listItem);
    });
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error('Error:', error);
  });
