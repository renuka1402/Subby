import React, { useState, useEffect } from 'react';
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
import Header from '../../component/Header';
import CustomButton from '../../component/Buttons';
import { verifyBankDetails, sendOtp} from '../../services/api/profileService'

const PaymentForm = ({ navigation, route }) => {
  const token = useSelector(state => state.auth.token);
  const email = useSelector(state => state.auth.email);



  const { bankName, accountName, sortCode, accountNumber } = route.params || {};
  console.log(bankName);

  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [sort, setSort] = useState('');
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);


  useEffect(() => {
    setBank(bankName || '');
    setAccount(accountName || '');
    setSort(sortCode || '');
    setNumber(accountNumber .toString()|| '');
  }, [bankName, accountName, sortCode, accountNumber]);




  const handleSubmit = async () => {
    try {
      const response = await sendOtp(email);
  
      if (response) {
        console.log('OTP Response:', response);
        if (response.otp) {
          console.log('Received OTP:', response.otp);
        }
        Alert.alert('Success', 'Bank details submitted. Please verify with OTP.');
        setShowOtpInput(true);
      } else {
        Alert.alert('Failed', response.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('API error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to submit data', error.message);
    }
  };
  
  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Please enter OTP');
      return;
    }
  
    const payload = {
      account_name: account,
      bank_name: bank,
      account_sort_code: sort,
      account_number: number,
      otpValue: otp,
    };
  
    try {
      const response = await verifyBankDetails(payload);
      console.log(payload);
      
  
      console.log('POST response:', response);
      Alert.alert('Success', 'Account details submitted successfully!');
      setShowOtpInput(false);
    } catch (error) {
      console.error('OTP Submit Error:', error.response?.data || error.message);
      Alert.alert('Failed', 'OTP verification failed or account details submission failed');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <StatusBar backgroundColor="#fff" barStyle="dark-content" /> */}
      <Header title="Your Detail" />

      <View style={styles.card}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bank name"
          value={bank}
          onChangeText={setBank}
        />

        <Text style={styles.label}>Name On Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account name"
          value={account}
          onChangeText={setAccount}
        />

        <Text style={styles.label}>Sort Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter sort code"
          value={sort}
          onChangeText={setSort}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
      </View>

      <CustomButton
        title="Verify Details"
        onPress={handleSubmit}
      />


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
          <CustomButton
            title="Submit OTP"
            onPress={handleVerifyOtp}
          />
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

});
