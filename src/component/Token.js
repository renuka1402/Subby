import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux'; 

export const getToken = async () => {

  const token = useSelector(state => state.auth.token);
  console.log(token);
  
  if (!token) {
    token = await AsyncStorage.getItem('authToken');
  }
  return token;
};
