import axios from '../plugins/axios';

export async function getCountries() {
  try {
    const response = await axios.get('/location/get-countries');
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getCities(countryID) {
  try {
    const response = await axios.get(`/location/get-cities/${countryID}`);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
}
