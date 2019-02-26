/* eslint-disable no-undef */
const alertBox = document.querySelector('.alert-box');
const API_URL = 'http://localhost:4000/api/v1/';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const partySelect = document.querySelector('#party');
const officeSelect = document.querySelector('#office');
const contestForm = document.querySelector('.contest-form');
const loader = document.querySelector('.lds-hourglass');


loader.style.display = 'none';

if (!loggedInUser) {
  window.location = 'login.html';
}

const { token, isAdmin } = loggedInUser;

const parseJwt = token => JSON.parse(atob(token.split('.')[1]));

const payload = parseJwt(token);

const createPartyTemplate = (parties) => {
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
      <option value="${party.id}">${party.name}, ${party.acronym}</option>
    `;
  });
  return template;
};

const createOfficeTemplate = (offices) => {
  let template = '';
  offices.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  offices.map((office) => {
    template += `
      <option value="${office.id}">${office.name}</option>
    `;
  });
  return template;
};

const getOffices = () => {
  fetch(`${API_URL}offices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      const template = createOfficeTemplate(data.data);
      officeSelect.innerHTML += template;
    }).catch(err => console.log(err));
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
      const template = createPartyTemplate(data.data);
      partySelect.innerHTML += template;
    }).catch(err => console.log(err));
};

const handleContest = (e) => {
  e.preventDefault();
  loader.style.display = 'inline-block';
  const formData = new FormData(contestForm);
  const office = formData.get('office-name');
  const party = formData.get('party-name');
  const userId = payload.id;

  const newInterestData = {
    party,
  };

  fetch(`${API_URL}offices/${office}/contest`, {
    mode: 'cors',
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newInterestData),
  }).then(res => res.json())
    .then((result) => {
      loader.style.display = 'none';
      if (result.status === 201) {
        const template = `
            <ul>
              <li class="alert-success">Candidate nomination form has been successfully submitted and redirecting to User dashboard</li>
            </ul>
          `;

        alertBox.innerHTML = template;
        setTimeout(() => {
          window.location = 'user.html';
        }, 3000);
      } else {
        alertBox.innerHTML = `<li class="alert-danger">${result.error}</li>`;
        setTimeout(() => {
          window.location = 'user.html';
        }, 3000);
      }
    }).catch(err => console.log(err));
};

contestForm.addEventListener('submit', handleContest);

getOffices();
getParties();
