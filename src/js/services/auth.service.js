import axios from '../plugins/axios';

/**
 * Function login. Make login request to API
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password})
    );
    return response.data;
  } catch(err) {
    console.log(err);
    return Promise.reject(err);
  }
}

/**
 * Function register. Make register request to API
 * @param {String} email
 * @param {String} password
 */
export async function register(data) {
  try {
    const response = await axios.post(
      `/auth/signup`,
      JSON.stringify(data)
    );

    if(response.error) {
      throw new SyntaxError(response.message);
    }

    return response.data;
  } catch(err) {
    return Promise.reject(err);
  }
}

