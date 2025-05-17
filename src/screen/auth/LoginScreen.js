// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Alert,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { login } from '../Redux/AuthSlice';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail]       = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading]   = useState(false);
//   const dispatch = useDispatch();

//   const validateAndLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       return Alert.alert('Validation', 'Email and Password field empty');
//     }

//     setLoading(true);
//     try {
//       console.log('Logging in with:', { email, password });

//       const res = await axios.post(
//         'https://devapi.subbygroup.co.uk/sole-trader/sign-in',
//         { email, password }
//       );

//       const data = res.data.data;
//       const token=data.token
//       const companyId = data.Contractors[0].company_id;
//       const Email = email;

//       if (!token) {
//         return Alert.alert('Login Failed', 'Invalid email or password');
//       }


//       await AsyncStorage.setItem('authToken', token);
//       await AsyncStorage.setItem('userEmail', Email);
//       if (companyId != '') {
//         await AsyncStorage.setItem('companyId', `${companyId}`); 
//       }
//       dispatch(login({email:Email,  token,  companyId:`${companyId}` , }));

//       Alert.alert('Success', 'Login Successful!', [
//         { text: 'OK', onPress: () => navigation.replace('Home') },
//       ]);
//     } catch (err) {
//       const msg = err.response.data.message || 'Something went wrong. Please try again.';
//       Alert.alert('Login Failed', msg);
//       console.log(msg);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#fff" barStyle="dark-content" />
//       <View style={styles.logoContainer}>
//       {/* <Image source={require('../../assets/images/logo2.jpg')} style={styles.thumbnail} /> */}
//         <Text style={styles.logoText}>Subby</Text>
//       </View>

//       <Text style={styles.welcome}>Welcome Back!</Text>
//       <Text style={styles.subTitle}>Sign in to your account.</Text>

//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholderTextColor="#000"
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           placeholder="Password"
//           secureTextEntry={!showPassword}
//           style={styles.passwordInput}
//           placeholderTextColor="#000"
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={styles.forgotContainer}
//         onPress={() => navigation.navigate('Password')}
//       >
//         <Text style={styles.forgotText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={validateAndLogin}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Sign in My Account</Text>
//         )}
//       </TouchableOpacity>


//       <TouchableOpacity style={styles.button} disabled>
//         <Text style={styles.buttonText}>Sign in using Finger Print</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 34,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 80,
//     marginBottom: 16,
//   },
//   logoText: { 
//     fontSize: 20,
//      color: 'gray'
//      },
//   welcome: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#111',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   thumbnail: {
//     width: 25,
//     height: 25,
//     resizeMode: 'contain',
//   },
//   subTitle: {
//     fontSize: 12,
//     color: 'gray',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   input: {
//     marginTop: 40,
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     marginBottom: 10,
//     fontSize: 14,
//     color: '#000',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     marginBottom: 13,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: 10,
//     fontSize: 14,
//     color: '#000',
//   },
//   forgotContainer: { alignItems: 'flex-end', marginBottom: 50 },
//   forgotText: { color: '#aaa', fontSize: 14 },
//   button: {
//     backgroundColor: '#EB6A2B',
//     paddingVertical: 13,
//     borderRadius: 14,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../../services/redux/AuthSlice';
import { loginApi } from '../../services/api/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validateAndLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return Alert.alert('Validation', 'Email and Password field empty');
    }

    setLoading(true);
    try {
      console.log('Logging in with:', { email, password });

      const data = await loginApi(email, password);
      const token = data.data.token;
      const companyId = data.data.Contractors[0].company_id;
      const Email = email;

      if (!token) {
        return Alert.alert('Login Failed', 'Invalid email or password');
      }


      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userEmail', Email);
      if (companyId != '') {
        await AsyncStorage.setItem('companyId', `${companyId}`);
      }
      dispatch(login({ email: Email, token, companyId: `${companyId}` }));

      Alert.alert('Success', 'Login Successful!', [
        { text: 'OK', onPress: () => navigation.replace('Home') },
      ]);
    } catch (err) {
      const msg = err.message || 'Something went wrong. Please try again.';
      Alert.alert('Login Failed', msg);
      console.log(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.logoContainer}>
        {/* <Image source={require('../../assets/images/logo2.jpg')} style={styles.thumbnail} /> */}
        <Text style={styles.logoText}>Subby</Text>
      </View>

      <Text style={styles.welcome}>Welcome Back!</Text>
      <Text style={styles.subTitle}>Sign in to your account.</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#000"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          placeholderTextColor="#000"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.forgotContainer}
        onPress={() => navigation.navigate('Password')}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={validateAndLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign in My Account</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} disabled>
        <Text style={styles.buttonText}>Sign in using Finger Print</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 34,
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 16,
  },
  logoText: { fontSize: 20, color: 'gray' },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  subTitle: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 13,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  forgotContainer: { alignItems: 'flex-end', marginBottom: 50 },
  forgotText: { color: '#aaa', fontSize: 14 },
  button: {
    backgroundColor: '#EB6A2B',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});
