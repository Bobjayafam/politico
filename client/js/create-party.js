const alertBox = document.querySelector('.alert-box');
const API_URL = 'http://localhost:4000/api/v1/';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const loader = document.querySelector('.lds-hourglass');
const name = document.querySelector('.name');
const acronym = document.querySelector('.acronym');
const hqAddress = document.querySelector('.hqAddress');

const createPartyForm = document.querySelector('.create-party-form');

loader.style.display = 'none';

if (!loggedInUser) {
  window.location = 'login.html';
}

const { token, isAdmin } = loggedInUser;

if (!isAdmin) {
  window.location.href = 'user.html';
}

const handleCreateParty = (e) => {
  e.preventDefault();
  const errors = [];
  let error = '';

  if (name.value === '') {
    error = 'Party name is required';
    errors.push(error);
  }

  if (acronym.value === '') {
    error = 'Party acronym is required';
    errors.push(error);
  }

  if (hqAddress.value === '') {
    error = 'Party address is required';
    errors.push(error);
  }

  if (errors.length > 0) {
    const template = `
              <ul>
                ${errors.map(err => `<li class="alert-danger">${err}</li>`).join('')}
              </ul>
            `;
    alertBox.innerHTML = template;
  } else {
    alertBox.innerHTML = '';
    loader.style.display = 'inline-block';
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('acronym', acronym.value);
    formData.append('hqAddress', hqAddress.value);

    const file = document.querySelector('.logo').files[0];
    formData.append('logoUrl', file);


    fetch(`${API_URL}parties`, {
      mode: 'cors',
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'x-access-token': token,
      },
      body: formData,
    }).then(res => res.json())
      .then((result) => {
        loader.style.display = 'none';
        if (result.status === 201) {
          const template = `
              <ul>
                <li class="alert-success">Party successfully created</li>
              </ul>
            `;

          alertBox.innerHTML = template;
        } else {
          alertBox.innerHTML = `<li class="alert-danger">${result.error}</li>`;
        }
      })
      .catch(err => console.log(err));
  }
};

createPartyForm.addEventListener('submit', handleCreateParty);
