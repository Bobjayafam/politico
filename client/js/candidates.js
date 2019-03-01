const API_URL = 'http://localhost:4000/api/v1/';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const tableBody = document.querySelector('.table-body');
const alertBox = document.querySelector('.alert-box');

const { token, isAdmin } = loggedInUser;

if (!isAdmin) {
  window.location.href = 'user.html';
}

const createTemplate = (candidates) => {
  let template = '';
  candidates.sort((a, b) => {
    if (a.first_name > b.first_name) {
      return 1;
    }
    if (a.first_name < b.first_name) {
      return -1;
    }
    return 0;
  });
  candidates.map((candidate, index) => {
    template += `
    <tr data-id="${candidate.id}">
      <td data-th="S/N">${index + 1}</td>
      <td data-th="First Name">${candidate.first_name}</td>
      <td data-th="Last Name">${candidate.last_name}</td>
      <td data-th="Office">${candidate.office_name}</td>
      <td data-th="Party">${candidate.party_name}</td>
      <td data-th="Status">${candidate.current_status}</td>
      <td data-th="Action">
        <div class="input-group">
          <select name="change-status" id="change-status" required>
            <option value="">--choose--</option>
            <option value="registered">Register</option>
            <option value="rejected">Reject</option>
          </select>
        </div>
        <button class="delete">Change Status</button>
      </td>
    </tr>
    `;
  });
  return template;
};

const getCandidates = () => {
  fetch(`${API_URL}candidates`, {
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
                <li class="alert-success">No candidate has submitted an application</li>
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

getCandidates();

tableBody.addEventListener('click', (e) => {
  if (e.target.matches('.delete')) {
    const candidateId = e.target.parentNode.parentNode.dataset.id;
    const status = e.target.previousSibling.previousSibling.firstChild.nextElementSibling.value;
    let error;
    const errors = [];

    const availableStatus = ['registered', 'rejected'];
    if (availableStatus.indexOf(status) === -1) {
      error = 'Please choose from the provided options';
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
      const newStatus = { status };
      fetch(`${API_URL}offices/${candidateId}/register`, {
        mode: 'cors',
        method: 'PATCH',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(newStatus),
      }).then(res => res.json())
        .then((result) => {
          if (result.status === 200) {
            const template = `
              <ul>
                <li class="alert-success">Status successfully changed</li>
              </ul>
            `;

            alertBox.innerHTML = template;
            getCandidates();
            setTimeout(() => {
              alertBox.innerHTML = '';
            }, 3000);
          }
        })
        .catch(error => console.log(error));
    }
  }
});
