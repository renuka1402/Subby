import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { logout } from '../../services/redux/AuthSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../component/Header';
import CustomButton from '../../component/Buttons';
const DetailsPage = ({ navigation }) => {

  const [imageUri, setImageUri] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [email, setEmail] = useState('');
  const [companyReg, setCompanyReg] = useState('');
  const [utr, setUtr] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [emergencyName, setEmergencyName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const token = useSelector(state => state.auth.token);


  const dispatch = useDispatch();

  const handleImagePick = () => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({ mediaType: 'photo', quality: 1 }, response => {
              if (response.assets) {
                setImageUri(response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
              if (response.assets) {
                setImageUri(response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userEmail');
              dispatch(logout());
              navigation.navigate('Login');
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };



  
  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const localToken = token || (await AsyncStorage.getItem('authToken'));
          const response = await axios.get(
            'https://devapi.subbygroup.co.uk/sole-trader/get-profile',
            {
              headers: {
                Authorization: localToken,
              },
            }
          )
          const data = response.data.data.SoleTraderProfile;
          const data1 = response.data.data;
          setFirstname(data.firstname || '');
          setSurname(data.surname || '');
          setEmail(data1.email || '');
          setAddress(data.address || '');
          setCity(data.city || '');
          setPostcode(data.postcode || '');
          setPhone(data.phone_number.toString() || '');
          setCountry(data.country || '');
          setCompanyReg(data.company_registration_number || '');
          setUtr(data.utr || '');
          setBankName(data.bank_name || '');
          setAccountName(data.account_name || '');
          setSortCode(data.account_sort_code || '');
          setAccountNumber(data.account_number || '');
          setEmergencyName(data.emergency_name || '');
          setRelationship(data.emergency_relationship || '');
          setPhoneNumber((data.emergency_phone_number || '').toString());
          console.log('Emergency phone:', (data.emergency_phone_number || '').toString());
          
          
          
  
          if (data.selfie_image) {
            const imageUrl = `https://devapi.subbygroup.co.uk/sole_trader/onboarding/${data.selfie_image}`;
            setImageUri({ uri: imageUrl });
          }
  
        } catch (error) {
          console.error('Error fetching profile:', error?.response?.data || error.message);
          Alert.alert('Error', 'Failed to load profile.', error.message);
        }
      };
  
      fetchProfile();
    }, [])
  );
  
  return (
    <ScrollView contentContainerStyle={styles.container}>

   
      <Header title="Your Detail"/>

      <View style={styles.card}>
        <View style={styles.icon}>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('DetailForm')}>
            <AntDesign name="edit" size={23} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageWrapper}>

          {imageUri ? (
            <TouchableOpacity onPress={handleImagePick}>
              {imageUri?.uri ? (
                <Image source={{ uri: imageUri.uri }} style={styles.profileImage} />
              ) : (
                <View style={styles.iconCircle}>
                  <Ionicons name="person-circle-outline" size={100} color="#bbb" /></View>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.iconCircle}>
              <Ionicons name="person-circle-outline" size={100} color="#bbb" />
            </View>
          )}



        </View>

        <Text style={styles.name}>{firstname} {surname}</Text>


        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} placeholder="reyand" value={firstname} onChangeText={setFirstname} />

        <Text style={styles.label}>Surname</Text>
        <TextInput style={styles.input} placeholder="sharma" value={surname} onChangeText={setSurname} />

        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} placeholder="Gb road" value={address} onChangeText={setAddress} />

        <Text style={styles.label}>City</Text>
        <TextInput style={styles.input} placeholder="Delhi" value={city} onChangeText={setCity} />

        <Text style={styles.label}>Country</Text>
        <TextInput style={styles.input} placeholder="India" value={country} onChangeText={setCountry} />

        <Text style={styles.label}>Postcode</Text>
        <TextInput style={styles.input} placeholder="110006" value={postcode} onChangeText={setPostcode} keyboardType="numeric" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="reyand@gmail.com" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Company Registration Number</Text>
        <TextInput style={styles.input} placeholder="43209865" value={companyReg} onChangeText={setCompanyReg} keyboardType="numeric" />

        <Text style={styles.label}>UTR (Unique Tax Reference)</Text>
        <TextInput style={styles.input} placeholder="utr" value={utr} onChangeText={setUtr} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone + ""} keyboardType='number-pad' />

      </View>
      <View style={styles.card}>
        <View style={styles.edit}>
          <Text style={styles.subTitle}>Payment Details</Text>
          <TouchableOpacity style={styles.editIcon1} onPress={() => navigation.navigate('PaymentForm', {
            bankName,
            accountName,
            sortCode,
            accountNumber,
          })
          }>
            <AntDesign name="edit" size={23} color="white" />
          </TouchableOpacity></View>


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

      <View style={styles.card}>
        <View style={styles.edit}>
          <Text style={styles.subTitle}>Emergency Contact Details</Text>
          <TouchableOpacity style={styles.editIcon1} onPress={() => navigation.navigate('EmergencyForm', {
            emergencyName,
            relationship,
            phoneNumber

          }

          )}>
            <AntDesign name="edit" size={23} color="white" />
          </TouchableOpacity></View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Sabita bhabhi"
          value={emergencyName}
          onChangeText={setEmergencyName}
        />

        <Text style={styles.label}>Relationship</Text>
        <TextInput
          style={styles.input}
          placeholder="Bhabhi"
          value={relationship}
          onChangeText={setRelationship}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="06969696969"
          value={phoneNumber + ""}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />


      </View>
      <CustomButton 
  title="Logout" 
  onPress={handleLogout} 
/>
   
    </ScrollView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
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
  imageWrapper: {
    width: 100,
    height: 100,
    position: 'relative',
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: 'center',
    borderRadius: 60,
    gap: 10,
  },


  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,

    marginBottom: 15,
  },



  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#eee',

    justifyContent: 'center',
    alignItems: 'center',


  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 60
  },

  editIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 35,
    height: 35,
    backgroundColor: '#f97316',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  edit: {
    flexDirection: "row",
  },

  editIcon1: {
    width: 30,
    height: 30,
    backgroundColor: '#f97316',
    padding: 2,
    borderRadius: 20,
    elevation: 4,
    marginLeft: 40,


  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
    color: '#333',
    fontWeight: 'bold'
  },
  input: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 4,
    marginBottom: 8,
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  homeIcon: {
    position: 'absolute',
    right: 16
  },


  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 70,
  },
  editIcon1: {
    width: 30,
    height: 30,
    backgroundColor: '#f97316',
    padding: 2,
    borderRadius: 20,
    elevation: 4,
    marginLeft: 50,


  },

});