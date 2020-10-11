import axios from 'axios';

const axiosInit = axios.create({
  baseURL: 'https://icecream-orders.firebaseio.com/'
});

export default axiosInit;