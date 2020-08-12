const UI = {
  formLogin: document.forms['loginForm'],
  formLoginInputs: {
    inputEmail: document.getElementById('email'),
    inputPassword: document.getElementById('password'),
  },
  formRegister: document.forms['regForm'],
  formRegisterInputs: {
    inputEmailReg: document.getElementById('reg_email'),
    inputPasswordReg: document.getElementById('reg_password'),
    inputNickname: document.getElementById('nickname'),
    inputFirstName: document.getElementById('first_name'),
    inputLastName: document.getElementById('last_name'),
    inputPhone: document.getElementById('phone'),
    inputGender: document.getElementsByName('gender_orientation'),
    inputCountry: document.getElementById('country'),
    inputCity: document.getElementById('city'),
    inputDateOfBirth: document.getElementById('date_of_birth'),
  },
};

export default UI;
