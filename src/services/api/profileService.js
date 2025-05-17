import axios from 'axios';
import { getToken } from '../token/token';
import { BASE_URL } from '../../constants/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export const fetchProfile = async () => {

  try {

    const token = useSelector(state => state.auth.token);
    console.log(token);

    const response = await axios.get(`${BASE_URL}/sole-trader/get-profile`, {
      headers: {
        Authorization: token,
      },
    });
    console.log('API Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.log('API fetchProfile error:', error.response.data || error.message);
    throw error;
  }
};



export const addEmergencyDetails = async ({ name, relationship, number }) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log(token);
    const response = await axios.post(
      `${BASE_URL}/sole-trader/add-emergency-details`,
      {
        emergency_name: name,
        emergency_relationship: relationship,
        emergency_phone_number: number,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(name);
    console.log(number);


    return response.data;
  } catch (error) {
    console.log('API fetchProfile error:', error.response.data || error.message)
  }
};

export const sendOtp = async (email) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const localEmail = email || await AsyncStorage.getItem('userEmail');

    const response = await axios.get(`${BASE_URL}/sole-trader/otp_send`, {
      params: { email: localEmail },
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error sending OTP:', error.response.data || error.message);

  }
};


export const verifyBankDetails = async ({ account, bank, sort, otp, number }) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.post(`${BASE_URL}/sole-trader/add-account-details`,
      {

        account_name: account,
        bank_name: bank,
        account_sort_code: sort,
        account_number: number,
        otpValue: otp,
      },
      {
        headers: {
          Authorization: token,
        },
      }

    )
    return response.data
  }
  catch (error) {
    console.log('API fetchProfile error:', error.response.data || error.message)
  }
}
