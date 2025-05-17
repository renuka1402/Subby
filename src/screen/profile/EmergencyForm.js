import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../../component/Header';
import CustomButton from '../../component/Buttons';
import {addEmergencyDetails} from '../../services/api/profileService'

const EmergencyForm= ({ navigation,route }) => {
  const { emergencyName, relationship,phoneNumber } = route.params || {};
  const [name, setName] = useState('');
  const [relationship1, setRelationship1] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  

  useEffect(()=>{
    setName(emergencyName || '')
    setNumber(phoneNumber || '')
    setRelationship1(relationship || '')
  },[emergencyName,phoneNumber,relationship])
  console.log(number);
  console.log(emergencyName);
  console.log(relationship);
  
  
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await addEmergencyDetails({
        name,
        relationship: relationship1, 
        number,
      });
      console.log(data);
      Alert.alert('Success', 'Emergency details updated successfully');
    } catch (error) {
      console.error(error.response.data || error.message);
      Alert.alert('Error', error.response.data.error_message || 'Failed to update emergency details');
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <View style={styles.whiteLoaderContainer}>
        <ActivityIndicator size="large" color="#F27024" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Header title="Your Update Details"/>

      <View style={styles.card}>
        <View style={styles.edit}>
          <Text style={styles.subTitle}>Emergency Contact Details</Text>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Relationship</Text>
        <TextInput
          style={styles.input}
          placeholder="Bhabhi"
          value={relationship1}
          onChangeText={setRelationship1}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="06969696969"
          value={number+ ""}
          onChangeText={setNumber}
          keyboardType="phone-pad"
        />
      </View>

      <CustomButton 
  title="Update Profile" 
  onPress={handleSubmit} 
/>

 
    </ScrollView>
  );
};

export default EmergencyForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom:100,
  },
  whiteLoaderContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 80,
    marginBottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 80,
  },
  card: {
    backgroundColor: '#fff',
    padding: 40,
    elevation: 5,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 2,
    shadowRadius: 6,
    alignItems: 'center',
    marginBottom: 30,
  },
  edit: {
    flexDirection: 'row',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
   textAlign:'center',
   marginBottom:10,
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
