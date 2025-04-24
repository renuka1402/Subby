import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);

  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [imageUri, setImageUri] = useState(null);

  // Add a state to select currency
  const [currency, setCurrency] = useState('USD'); // You can change 'USD' to any default or dynamic currency

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(
          'https://devapi.subbygroup.co.uk/sole-trader/get-timesheet-sites',
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const siteItems = response.data.data.map((site) => ({
          label: site.name,
          value: site.id,
        }));
        setItems(siteItems);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch sites. Please try again.');
      }
    };

    fetchSites();
  }, [token]);

  const handleUpload = () => {
    Alert.alert('Upload Receipt', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets?.length > 0) {
              setImageUri(response.assets[0].uri);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets?.length > 0) {
              setImageUri(response.assets[0].uri);
            }
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleRemoveImage = () => {
    setImageUri(null);
  };

  const handleSubmitExpense = async () => {
    if (!expenseName || !amount || !value || !date) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('type', expenseName);
    formData.append('amount_claimed', amount);
    formData.append('amount_claimed_date', moment(date).format('YYYY-MM-DD'));
    formData.append('site_id', value);
    formData.append('amount_claimed_currency', currency); 

    if (imageUri?.uri) {
      formData.append('selfie_image', {
        uri: imageUri.uri,
        name: `${new Date().getTime()}.jpeg`,
        type: 'image/jpeg',
      });
    }

    try {
      const res = await axios.post(
        'https://devapi.subbygroup.co.uk/sole-trader/add-expense-claims',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );
      console.log(res);
      
      Alert.alert('Success', 'Expense submitted successfully!');
      navigation.goBack();
    } catch (error) {
      console.error(error.response || error.message);
      Alert.alert('Error', 'Failed to submit expense. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add A New Expense</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color="#F47C25" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Name Of Expense</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name Of Expense"
          placeholderTextColor="#000"
          value={expenseName}
          onChangeText={setExpenseName}
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={[styles.input, styles.fullWidthBorder]}
            value={moment(date).format('YYYY-MM-DD')}
            editable={false}
            placeholder="Select Date"
            placeholderTextColor="#000"
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor="#000"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Sites/Projects</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select Site"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholderStyle={{ color: '#888' }}
          listMode="SCROLLVIEW"
          listItemContainerStyle={styles.cardItemContainer}
          listItemLabelStyle={styles.cardItemLabel}
        />
      </View>

      {open && <View style={{ height: 150 }} />}

      <TouchableOpacity
        style={[styles.uploadBox, { height: imageUri ? 220 : 190 }]}
        onPress={handleUpload}
      >
        {!imageUri ? (
          <>
            <MaterialCommunityIcons
              name="cloud-upload-outline"
              size={40}
              color="#f57c00"
              style={styles.icon}
            />
            <Text style={styles.uploadText}>Upload Your Receipt</Text>
          </>
        ) : (
          <>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <TouchableOpacity style={styles.removeIcon} onPress={handleRemoveImage}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.addTicketContainer} onPress={handleSubmitExpense}>
        <Icon name="file-document" size={24} color="#000" />
        <Text style={styles.addTicketText}>Submit Expense Invoice</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 90,
  },
  card: {
    width: '100%',
    padding: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  dropdown: {
    borderColor: '#000',
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#000',
    paddingVertical: 4,
  },
  cardItemContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 12,
    elevation: 4,
  },
  cardItemLabel: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
    color: '#555',
    fontWeight: 'bold',
  },
  icon: {
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 4,
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  fullWidthBorder: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
  },
  uploadBox: {
    borderWidth: 3,
    borderColor: '#f27c24',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    marginTop: 45,
    width: '38%',
    alignSelf: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 14,
    color: '#f27c24',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  removeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  addTicketContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    marginBottom: 60,
  },
  addTicketText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
