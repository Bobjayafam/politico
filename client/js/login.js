const loginForm = document.querySelector('.login-form');
const alertBox = document.querySelector('.alert-box');
const API_URL = 'http://localhost:4000/api/v1/';
const loader = document.querySelector('.lds-hourglass');
loader.style.display = 'none';

const handleLogin = (e) => {
  e.preventDefault();

  console.log('loading');
  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const password = formData.get('password');

  const errors = [];
  let error = '';

  if (email === '') {
    error = 'Email field is required';
    errors.push(error);
  }

  if (password === '') {
    error = 'Password field is required';
    errors.push(error);
  }

  if (password && password.length < 6) {
    error = 'Password must be at least 6 characters';
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
    const loginData = {
      email, password,
    };

    fetch(`${API_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    }).then(res => res.json())
      .then((loginResponse) => {
        loader.style.display = 'none';
        if (loginResponse.status === 200) {
          const template = `
              <ul>
                <li class="alert-success">Login Successful</li>
              </ul>
            `;

          alertBox.innerHTML = template;
          const token = loginResponse.data[0].token;
          const isAdmin = loginResponse.data[0].user.isAdmin;
          const firstName = loginResponse.data[0].user.firstname;
          const user = { token, isAdmin, firstName };

          localStorage.setItem('user', JSON.stringify(user));

          if (isAdmin) {
            setTimeout(() => {
              window.location.href = 'admin.html';
            }, 2000);
          } else {
            setTimeout(() => {
              window.location.href = 'user.html';
            }, 2000);
          }
        } else if (Array.isArray(loginResponse)) {
          const template = `
              <ul>
                ${loginResponse.error.map(err => `<li class="alert-danger">${err}</li>`).join('')}
              </ul>
            `;
          alertBox.innerHTML = template;
          setTimeout(() => {
            alertBox.innerHTML = '';
          }, 3000);
        } else {
          alertBox.innerHTML = `<li class="alert-danger">${loginResponse.error}</li>`;
          setTimeout(() => {
            alertBox.innerHTML = '';
          }, 3000);
        }
      }).catch(err => console.log(err));
  }
};

loginForm.addEventListener('submit', handleLogin);
