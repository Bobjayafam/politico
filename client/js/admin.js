const API_URL = 'http://localhost:4000/api/v1/';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const tableBody = document.querySelector('.table-body');
const alertBox = document.querySelector('.alert-box');
const alertBoxModal = document.querySelector('.alert-box-modal');

const { token, isAdmin } = loggedInUser;

if (!isAdmin) {
  window.location.href = 'user.html';
}

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
  parties.map((party, index) => {
    template += `
    <tr data-id="${party.id}">
      <td data-th="S/N">${index + 1}</td>
      <td data-th="Party Name">${party.name}</td>
      <td data-th="Acronym">${party.acronym}</td>
      <td data-th="Logo"><img src="${party.logo_url}" alt="logo" class="party-logo"></td>
      <td data-th="Headquarters">${party.hq_address}</td>
      <td data-th="Actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </td>
    </tr>
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
        tableBody.innerHTML = template;
      }
    })
    .catch(err => console.log(err));
};

getParties();

tableBody.addEventListener('click', (e) => {
  if (e.target.matches('.edit')) {
    const partyId = e.target.parentNode.parentNode.dataset.id;
    const partyName = e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent;
    window.location = `edit-party.html?partyName=${partyName}&partyId=${partyId}`;
  }
});

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.querySelector('.cancel');
const confirmDelete = document.querySelector('.confirm-delete');

tableBody.addEventListener('click', (e) => {
  if (e.target.matches('.delete')) {
    modal.style.display = 'block';
    overlay.style.display = 'block';

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      overlay.style.display = 'none';
    });
    cancelBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      overlay.style.display = 'none';
    });
    const partyId = e.target.parentNode.parentNode.dataset.id;
    confirmDelete.addEventListener('click', () => {
      fetch(`${API_URL}parties/${partyId}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      }).then(res => res.json())
        .then((response) => {
          if (response.status === 200) {
            const template = `
              <ul>
                <li class="alert-success">Party successfully deleted and redirecting to dashboard</li>
              </ul>
            `;

            alertBoxModal.innerHTML = template;
            setTimeout(() => {
              alertBoxModal.innerHTML = '';
              window.location.href = 'admin.html';
            }, 3000);
          }
        }).catch(err => console.log(err));
    });
  }
});
