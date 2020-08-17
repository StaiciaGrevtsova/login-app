import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';
// const $ = require( "jquery" )( window );
import 'jquery';
import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError, inputAutocompleteCreate } from './views/form';
import { login, register } from './services/auth.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';
import { getCountriesList, getCitiesList } from './store/locations';
import { masked } from './helpers/masked';
import { serialize } from './helpers/serialize';

const {
  formLogin, formLoginInputs, formRegister, formRegisterInputs,
} = UI;
const { inputEmail, inputPassword } = formLoginInputs;
const inputsLogin = [inputEmail, inputPassword];

const inputsRegister = Object.values(formRegisterInputs).map((el) => {
  if (el instanceof NodeList) {
    return Array.prototype.slice.call(el);
  }
  return el;
}).flat(Infinity);

const inputs = inputsLogin.concat(inputsRegister);

// Events
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});

formRegister.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmitRegister();
});

inputs.forEach((el) => el.addEventListener('focus', () => removeInputError(el)));

document.addEventListener('DOMContentLoaded', () => {
  const inputsMasked = document.querySelectorAll('[data-mask]');
  inputsMasked.forEach((el) => {
    masked(el);
  });
});

formRegisterInputs.inputCountry.addEventListener('focus', () => {
  getCountriesList().then((countries) => {
    inputAutocompleteCreate(formRegisterInputs.inputCountry, countries);
  });
});

formRegisterInputs.inputCountry.addEventListener('input', (e) => {
  formRegisterInputs.inputCity.disabled = !e.target.value;
});

formRegisterInputs.inputCity.addEventListener('focus', () => {
  const countryID = formRegisterInputs.inputCountry.dataset.id;
  if (countryID) {
    getCitiesList(countryID).then((cities) => {
      inputAutocompleteCreate(formRegisterInputs.inputCity, cities);
    });
  }
});

// Handlers
async function onSubmit() {
  const isFormValid = inputsLogin.every((el) => {
    const isInputValid = validate(el);
    if (!isInputValid) {
      showInputError(el);
    }
    return isInputValid;
  });

  if (!isFormValid) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    formLogin.reset();
    // show success notify
    notify({ msg: 'Login success', className: 'alert-success' });
  } catch (err) {
    // show error notify
    notify({ msg: 'Login failed', className: 'alert-danger' });
  }
}

async function onSubmitRegister() {
  let isFormValid = true;
  inputsRegister.forEach((el) => {
    const isInputValid = validate(el);
    if (!isInputValid) {
      isFormValid = false;
      showInputError(el);
    }
    return isInputValid;
  });

  if (!isFormValid) return;

  const formData = serialize(formRegister);

  if (formData.date_of_birth) {
    const [dateOfBirthDay, dateOfBirthMonth, dateOfBirthYear] = formData.date_of_birth.split('.');
    formData.date_of_birth_day = dateOfBirthDay;
    formData.date_of_birth_month = dateOfBirthMonth;
    formData.date_of_birth_year = dateOfBirthYear;
  }

  try {
    await register(formData);
    formRegister.reset();
    // show success notify
    notify({ msg: 'Registration success', className: 'alert-success' });
  } catch (err) {
    // show error notify
    let message = '';
    if (err.hasOwnProperty('response')) {
      message = err.response.data.message;
    } else {
      message = err.message || 'Registration failed';
    }
    notify({ msg: message, className: 'alert-danger' });
  }
}

// denis.m.pcspace@gmail.com
// dmgame12345
