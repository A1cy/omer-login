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
    approved: false,
    idSent: false
  };

  fetchUsersData()
    .then(users => {
      users.push(userData);
      return saveUsersData(users);
    })
    .then(() => {
      alert('Registration submitted for approval.');
      signupForm.reset();
    })
    .catch(error => {
      console.error('Error saving user data:', error);
    });
}

// Admin Page
const userList = document.getElementById('user-list');
const approveButton = document.getElementById('approve-button');
approveButton.addEventListener('click', handleApprove);

function displayPendingUsers() {
  fetchUsersData()
    .then(users => {
      userList.innerHTML = '';

      users.forEach(user => {
        if (user.status === 'pending') {
          const listItem = document.createElement('li');
          const checkboxContainer = document.createElement('div');
          checkboxContainer.classList.add('checkbox-container');

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = user.email;
          checkbox.checked = user.approved;

          const label = document.createElement('label');
          label.textContent = `${user.name} - ${user.email}`;

          checkboxContainer.appendChild(checkbox);
          checkboxContainer.appendChild(label);
          listItem.appendChild(checkboxContainer);
          userList.appendChild(listItem);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function handleApprove() {
  const checkboxes = Array.from(document.querySelectorAll('#user-list input[type="checkbox"]'));
  const approvedEmails = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

  fetchUsersData()
    .then(users => {
      users.forEach(user => {
        if (approvedEmails.includes(user.email)) {
          user.approved = true;
        }
      });

      return saveUsersData(users);
    })
    .then(() => {
      alert('Selected users have been approved.');
      displayPendingUsers();
    })
    .catch(error => {
      console.error('Error approving users:', error);
    });
}

// Super Admin Page
const approvedUserList = document.getElementById('approved-user-list');
const sendIdButton = document.getElementById('send-id-button');
sendIdButton.addEventListener('click', handleSendId);

function displayApprovedUsers() {
  fetchUsersData()
    .then(users => {
      approvedUserList.innerHTML = '';

      users.forEach(user => {
        if (user.status === 'pending' && user.approved && !user.idSent) {
          const listItem = document.createElement('li');
          listItem.textContent = `${user.name} - ${user.email}`;
          approvedUserList.appendChild(listItem);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function handleSendId() {
  fetchUsersData()
    .then(users => {
      const usersToSendId = users.filter(user => user.status === 'pending' && user.approved && !user.idSent);

      usersToSendId.forEach(user => {
        // Generate and send the ID to the user
        const generatedId = generateId();
        // Here, you can implement the logic to send the ID to the user, such as via email or any other method.

        // Mark the user as ID sent
        user.idSent = true;
      });

      return saveUsersData(users);
    })
    .then(() => {
      alert('IDs have been sent to approved users.');
      displayApprovedUsers();
    })
    .catch(error => {
      console.error('Error sending IDs:', error);
    });
}

// Helper Functions
function fetchUsersData() {
  return fetch('users.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data.');
      }
      return response.json();
    });
}

function saveUsersData(users) {
  return fetch('users.json', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(users)
  });
}

function generateId() {
  // Generate a unique ID
  // Implement your own logic to generate IDs
  // This is just a simple example
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ID-${timestamp}-${random}`;
}

// Initial page load
displayPendingUsers();
displayApprovedUsers();
