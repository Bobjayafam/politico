const alertBox = document.querySelector('.alert-box');
const API_URL = 'http://localhost:4000/api/v1/';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const loader = document.querySelector('.lds-hourglass');
const createOfficeForm = document.querySelector('.create-office');

loader.style.display = 'none';

if (!loggedInUser) {
  window.location = 'login.html';
}

const { token, isAdmin } = loggedInUser;

if (!isAdmin) {
  window.location.href = 'user.html';
}

const handleCreateOffice = (e) => {
  e.preventDefault();
  const formData = new FormData(createOfficeForm);
  const type = formData.get('office-type');
  const name = formData.get('office-name');
  const errors = [];
  let error = '';

  const validTypes = ['federal', 'state', 'legislative', 'local government'];

  if (name === '') {
    error = 'Office name cannot be empty';
    errors.push(error);
  }

  if (validTypes.indexOf(type) === -1) {
    error = 'office type can only be either federal, state, legislative or local government';
    errors.push(error);
  }

  if (errors.length > 0) {
    const template = `
              <ul>
                ${errors.map(err => `<li class="alert-danger">${err}</li>`).join('')}
              </ul>
            `;
    alertBox.innerHTML = template;
    setTimeout(() => {
      alertBox.innerHTML = '';
    }, 3000);
  } else {
    loader.style.display = 'inline-block';
    alertBox.innerHTML = '';
    const newOffice = {
      type, name,
    };

    fetch(`${API_URL}offices`, {
      mode: 'cors',
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOffice),
    }).then(res => res.json())
      .then((result) => {
        loader.style.display = 'none';
        if (result.status === 201) {
          const template = `
            <ul>
              <li class="alert-success">Office successfully created</li>
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

createOfficeForm.addEventListener('submit', handleCreateOffice);
