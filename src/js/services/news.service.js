import axios from '../plugins/axios';

export default async function getNews() {
  try {
    const response = await axios.get('/news');
    console.log(response);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
}
