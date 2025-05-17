import React, { useState,useEffect } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../component/Header';
import CustomButton from '../../component/Buttons';

const DetailsForm = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  // const [email, setEmail] = useState('');
  const [companyReg, setCompanyReg] = useState('');
  const [utr, setUtr] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const token = useSelector(state => state.auth.token);
  console.log(token);
  

  const handleImagePick = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo', quality: 0.5 }, response => {
            if (response.assets) {
              setImageUri(response.assets[0]);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, response => {
            if (response.assets) {
              setImageUri(response.assets[0]);
            }
          });
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };



  const handleForm = async () => {

   
      
    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));

      const formData = new FormData();
      imageUri.uri && formData.append("selfie_image", {
        uri: imageUri.uri,
        name: `${new Date().getTime()}.jpeg`,
        type: "image/jpeg",
      });
      console.log(imageUri);
      
      
      // formData.append('email', email);
      formData.append('firstname', firstname);
      formData.append('surname', surname);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('country', country);
      formData.append('postcode', postcode);
      formData.append('phone_number', phone);
      formData.append('company_registration_number', companyReg);
      formData.append('utr', utr);

      const response = await axios.post(
        'https://devapi.subbygroup.co.uk/sole-trader/update-profile',
        formData,
        {
          headers: {
            Authorization: localToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Hello",response.data.data);
      

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error.response );
      Alert.alert('Error', 'Failed to update profile.',error.response);
    }
  };
  

  useEffect(() => {
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
        );
        const data = response.data.data.SoleTraderProfile
        const data1=response.data.data
        ;
        console.log(data);
        
        console.log("Fetched Firstname:", data.firstname);
        console.log("Fetched Surname:", data.surname);
        console.log(data.phone_number);
        console.log(data.selfie_image);
        console.log(data1.email)
        
        
        
      
        setFirstname(data.firstname || '');
        setSurname(data.surname || '');
      
        setAddress(data.address || '');
        setCity(data.city || '');
        setPostcode(data.postcode || '');
        setPhone(data.phone_number|| '');
        setCountry(data.country || '');
        setCompanyReg(data.company_registration_number || '');
        setUtr(data.utr || '');

        
          if (data.selfie_image) {
            const imageUrl = `https://devapi.subbygroup.co.uk/sole_trader/onboarding/${data.selfie_image}`;
            setImageUri({ uri: imageUrl });
            console.log("Image URL:", imageUrl);  
          }

      } catch (error) {
        console.error('Error fetching profile:', error.response.data || error.message);
        Alert.alert('Error', 'Failed to load profile.',error.response);
      }
    };
    

    fetchProfile();
  }, []);

  console.log(imageUri,'//');
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
     <Header title="Your Detail"/>

      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={handleImagePick}>
            {imageUri?.uri ? (
              <Image source={{ uri: imageUri.uri }} style={styles.profileImage} />
            ) : (
                <View style={styles.iconCircle}>
                <Ionicons name="person-circle-outline" size={100} color="#bbb" /></View>
            )}
          </TouchableOpacity>
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
        <TextInput style={styles.input} placeholder="110006" value={postcode} onChangeText={setPostcode}   keyboardType="numeric"/>

        {/* <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="reyand@gmail.com" value={email} onChangeText={setEmail} /> */}

        <Text style={styles.label}>Company Registration Number</Text>
        <TextInput style={styles.input} placeholder="43209865" value={companyReg} onChangeText={setCompanyReg}   keyboardType="numeric" />

        <Text style={styles.label}>UTR (Unique Tax Reference)</Text>
        <TextInput style={styles.input} placeholder="utr" value={utr} onChangeText={setUtr} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone + ""} keyboardType='number-pad' />
      </View>

    
          
      <CustomButton 
  title="Update Details" 
  onPress={handleForm} 
/>
    </ScrollView>
  );
};

export default DetailsForm;

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
    shadowOffset: { width: 0,
       height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
    marginBottom: 30,
  },
  imageWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
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
