const alertBox = document.querySelector('.alert-box');
const API_URL = 'http://localhost:4000/api/v1/';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const loader = document.querySelector('.lds-hourglass');
loader.style.display = 'none';

const { token, isAdmin } = loggedInUser;

if (!isAdmin) {
  window.location.href = 'user.html';
}

const getQueryStrings = () => {
  const url = window.location.search;
  const queryStringsArray = url.substring(url.indexOf('?') + 1).split('&');
  const queryStrings = {};
  for (let i = 0; i < queryStringsArray.length; i++) {
    queryStringsArray[i] = queryStringsArray[i].split('=');
    queryStrings[queryStringsArray[i][0]] = decodeURIComponent(queryStringsArray[i][1]);
  }
  return queryStrings;
};

const queryStrings = getQueryStrings();

const { partyName, partyId } = queryStrings;

const partyNameField = document.querySelector('.party-name');

partyNameField.value = partyName;

const updateForm = document.querySelector('.update-form');


const handleUpdate = (e) => {
  e.preventDefault();
  const formData = new FormData(updateForm);

  const name = formData.get('name');
  let error = '';
  const errors = [];
  if (name === '') {
    error = 'Name cannnot be empty';
    errors.push(error);
  }

  if (name && name.trim() === '') {
    error = 'Name cannnot be empty';
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
    const newData = { name };
    fetch(`${API_URL}parties/${partyId}/name`, {
      mode: 'cors',
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(newData),
    }).then(res => res.json())
      .then((result) => {
        loader.style.display = 'none';
        if (result.status === 200) {
          const template = `
              <ul>
                <li class="alert-success">Party name successfully changed and redirecting to dashboard</li>
              </ul>
            `;

          alertBox.innerHTML = template;
          setTimeout(() => {
            alertBox.innerHTML = '';
            window.location.href = 'admin.html';
          }, 3000);
        }
      })
      .catch(error => console.log(error));
  }
};

updateForm.addEventListener('submit', handleUpdate);
