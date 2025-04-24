import React, { useState } from 'react';
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

const ContactForm = ({ navigation }) => {
  const [emergencyName, setEmergencyName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async () => {
    if (!emergencyName || !relationship || !phoneNumber) {
      Alert.alert('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://devapi.subbygroup.co.uk/sole-trader/add-emergency-details',
        {
          emergency_name: emergencyName,
          emergency_relationship: relationship,
          emergency_phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      console.log(token);
      
      

      Alert.alert('Success', 'Emergency details updated successfully');
    } catch (error) {
      console.error(error.response);
      Alert.alert('Error', 'Failed to update emergency details');
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
      <View style={styles.header}>
        <Text style={styles.title}>Your Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color="#F47C25" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.edit}>
          <Text style={styles.subTitle}>Emergency Contact Details</Text>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
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
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.logoutText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ContactForm;

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
    marginLeft: 70,
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
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#F27024',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    margin: 24,
    marginBottom: 100,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
