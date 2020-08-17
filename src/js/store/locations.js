import { getCountries, getCities } from '../services/location.service';

export async function getCountriesList() {
  try {
    let serializedCountries = [];
    await getCountries().then((response) => {
      serializedCountries = Object.entries(response).map(
        (element) => ({
          id: element[0],
          value: element[1],
        }),
      );
    });

    return serializedCountries;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getCitiesList(countryID) {
  try {
    let serializedCities = [];
    await getCities(countryID).then((response) => {
      serializedCities = Object.entries(response).map(
        (element) => ({
          id: element[0],
          value: element[1],
        }),
      );
    });

    return serializedCities;
  } catch (error) {
    return Promise.reject(error);
  }
}
