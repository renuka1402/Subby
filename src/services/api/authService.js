
import axios from 'axios';
import { BASE_URL } from '../../constants/baseURL';
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sole-trader/sign-in`,
      { email, password } 
    );
    return response.data; 
  } catch (error) {
    console.log(error.response.data.message || 'Login failed');
  }
};
