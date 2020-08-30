import axios from 'axios';

const instance =  axios.create({
  baseURL: 'https://icecream-orders.firebaseio.com/'
})

export default instance;