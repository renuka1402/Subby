import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const PaymentForm = ({ navigation }) => {
  const token = useSelector(state => state.auth.token);
  const email = useSelector(state => state.auth.email);

  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);


  
  const handleSubmit = async () => {
    if (!bankName || !accountName || !sortCode || !accountNumber) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));
      const localEmail = email || (await AsyncStorage.getItem('userEmail'));

      const response = await axios.get(
        'https://devapi.subbygroup.co.uk/sole-trader/otp_send',
        {
          params: {
            email: localEmail,
          },
          headers: {
            Authorization: localToken,
          },
        }
      );

      if (response.data) {
        console.log('OTP Response:', response.data); 
        if (response.data.otp) {
          console.log('Received OTP:', response.data.otp);
        }

        Alert.alert('Success', 'Bank details submitted. Please verify with OTP.');
        setShowOtpInput(true);
      } else {
        Alert.alert('Failed', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('API error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to submit data');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Please enter OTP');
      return;
    }
  
    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));
  
      const payload = {
        account_name: accountName,
        bank_name: bankName,
        account_sort_code: sortCode,
        account_number: accountNumber,
        otpValue: otp,
      };
  
      const response = await axios.post(
        'https://devapi.subbygroup.co.uk/sole-trader/add-account-details',
        payload,
        {
          headers: {
            Authorization: localToken,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('POST response:', response.data);
      Alert.alert('Success', 'Account details submitted successfully!');
      setShowOtpInput(false);
    } catch (error) {
      console.error('OTP Submit Error:', error.response?.data || error.message);
      Alert.alert('Failed', 'OTP verification failed or account details submission failed');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={25} color="#F47C25" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bank name"
          value={bankName}
          onChangeText={setBankName}
        />

        <Text style={styles.label}>Name On Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account name"
          value={accountName}
          onChangeText={setAccountName}
        />

        <Text style={styles.label}>Sort Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter sort code"
          value={sortCode}
          onChangeText={setSortCode}
            keyboardType="numeric"
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
            keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleSubmit}>
        <Text style={styles.logoutText}>Verify Details</Text>
      </TouchableOpacity>

      {showOtpInput && (
        <View style={styles.otpContainer}>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleVerifyOtp}>
            <Text style={styles.logoutText}>Submit OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 90,
    marginBottom: 10,
    padding: 10,
  },
  otpContainer: {
    paddingHorizontal: 40,
    marginBottom: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 120,
  },
  card: {
    backgroundColor: '#fff',
    padding: 40,
    elevation: 5,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 4,
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  logoutButton: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: '#F27024',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    margin: 24,
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
