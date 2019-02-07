/* eslint-disable no-undef */
console.log('connected');
const signupForm = document.querySelector('.signup-form');
const alertBox = document.querySelector('.alert-box');

const API_URL = 'http://localhost:4000/api/v1/';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpuyyqxnl/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'zk8ssipf';

async function submitForm(e) {
  e.preventDefault();
  const fileUpload = document.getElementById('passportUrl').files[0];
  const image = new FormData();
  image.append('file', fileUpload);
  image.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const result = await fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: image,
  })
    .then(response => response.json())
    .then(data => data.secure_url)
    .catch(err => err);

  const passportUrl = result;
  const formData = new FormData(signupForm);
  const firstname = formData.get('firstname');
  const lastname = formData.get('lastname');
  const othername = formData.get('othername');
  const email = formData.get('email');
  const password = formData.get('password');
  const phoneNumber = formData.get('phoneNumber');
  const newUser = {
    firstname, lastname, othername, email, password, phoneNumber, passportUrl,
  };

  fetch(`${API_URL}auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  }).then(res => res.json())
    .then((signupResponse) => {
      if (signupResponse.status === 201) {
        const { email, token, isAdmin } = signupResponse;
        const user = {
          email, token, isAdmin,
        };
        localStorage.setItem('user', JSON.stringify(user));
        if (isAdmin) {
          window.location = 'admin.html';
        } else {
          window.location = 'user.html';
        }
      } else {
        const template = `
            <ul>
              ${signupResponse.error.map(err => `<li class="alert-danger">${err}</li>`).join('')}
            </ul>
          `;
        alertBox.innerHTML = template;
      }
    })
    .catch(err => console.log(err));
}

signupForm.addEventListener('submit', submitForm);
