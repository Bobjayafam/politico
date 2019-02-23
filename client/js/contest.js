const alertBox = document.querySelector('.alert-box');
const API_URL = 'http://localhost:4000/api/v1/';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const partySelect = document.querySelector('#party');
const officeSelect = document.querySelector('#office');
const contestForm = document.querySelector('.contest-form');

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

// const handleContest = (e) => {
//   e.preventDefault();
//   const formData = new FormData(contestForm);
//   const officeId = formData.get('office-name');
//   const partyId = formData.get('party-name');
//   const userId = payload.id;

//   const newInterestData = {
//     officeId, partyId, userId,
//   };

//   console.log(newInterestData);
// };

// contestForm.addEventListener('submit', handleContest);

getOffices();
getParties();
