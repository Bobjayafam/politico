const API_URL = 'http://localhost:4000/api/v1/';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const cards = document.querySelector('.cards');
const alertBox = document.querySelector('.alert-box');

if (!loggedInUser) {
  window.location = 'login.html';
}

const { token } = loggedInUser;


const createTemplate = (parties) => {
  let template = '';
  parties.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  parties.map((party) => {
    template += `
        <div class="card">
          <img src="${party.logo_url}" alt="${party.acronym}">
          <div class="card-label">
            <h1>${party.acronym}</h1>
            <p>${party.name}</p>
          </div>
        </div>
    `;
  });
  return template;
};

const getParties = () => {
  fetch(`${API_URL}parties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (data.data.length === 0) {
        const template1 = `
              <ul>
                <li class="alert-success">No party is currently registered on this platform</li>
              </ul>
            `;

        alertBox.innerHTML = template1;
      } else {
        const template = createTemplate(data.data);
        cards.innerHTML = template;
      }
    })
    .catch(err => console.log(err));
};

getParties();
