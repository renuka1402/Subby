import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTicketScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const token = useSelector(state => state.auth.token);
  const [ticketFront, setTicketFront] = useState(null);
  const [ticketBack, setTicketBack] = useState(null);

  const [currentDate, setCurrentDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const date = new Date();
    const formattedDate =
      `${date.getDate()}/` + `${date.getMonth() + 1}/` + `${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleImagePick = (type) => {
    Alert.alert('Upload Image', 'Choose image source', [
      {
        text: 'Camera',
        onPress: () =>
          launchCamera({ mediaType: 'photo' }, (res) => {
            if (res.assets) {
              if (type === 'front') setTicketFront(res.assets[0]);
              else setTicketBack(res.assets[0]);
            }
          }),
      },
      {
        text: 'Gallery',
        onPress: () =>
          launchImageLibrary({ mediaType: 'photo' }, (res) => {
            if (res.assets) {
              if (type === 'front') setTicketFront(res.assets[0]);
              else setTicketBack(res.assets[0]);
            }
          }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const submitTicket = async () => {
    const selectedDateObj = new Date(currentDate.split('/').reverse().join('/'));
    const today = new Date();

    // Clear the time portion for accurate comparison
    today.setHours(0, 0, 0, 0);

    if (selectedDateObj < today) {
      Alert.alert("Invalid Date", "Please choose a future date!");
      return;
    }

    const formData = new FormData();
    formData.append('ticket_id', value);
    formData.append('expiry_date', currentDate);
    formData.append('front_image', {
      uri: ticketFront.uri,
      name: ticketFront.fileName || 'front.jpg',
      type: ticketFront.type || 'image/jpeg',
    });
    formData.append('rear_image', {
      uri: ticketBack.uri,
      name: ticketBack.fileName || 'rear.jpg',
      type: ticketBack.type || 'image/jpeg',
    });

    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));
      const response = await axios.post(
        'https://devapi.subbygroup.co.uk/sole-trader/add-ticket',
        formData,
        {
          headers: {
            Authorization: localToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Server response:', response.data);

      if (response.status === 200) {
        Alert.alert('Success', 'Ticket submitted successfully!');
        setTicketFront(null);
        setTicketBack(null);
        setValue(null);
      } else {
        Alert.alert('Error', response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong. Try again later.'
      );
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get(
          'https://devapi.subbygroup.co.uk/sole-trader/get-all-tickets',
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log('Fetched response:', response.data.data.rows);

        if (response.status === 200) {
          const dropdownOptions = response.data.data.rows.map(ticket => ({
            label: ticket.Ticket.name,
            value: ticket.Ticket.id,
          }));
          setItems(dropdownOptions);
          setTickets(response.data.data.rows);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add A New Ticket</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color="#F47C25" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Name of Ticket</Text>
        <DropDownPicker
          placeholder="Select option"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholderStyle={{ color: '#888' }}
          listMode="SCROLLVIEW"
          listItemContainerStyle={styles.cardItemContainer}
          listItemLabelStyle={styles.cardItemLabel}
        />
        {open && <View style={{ height: 100 }} />}

        <Text style={[styles.label, { marginTop: 54 }]}>Expiry Date</Text>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{currentDate || 'Select Expiry Date'}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            minimumDate={new Date()} // This ensures only current or future dates
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                const formatted = selectedDate.toLocaleDateString('en-GB');
                setCurrentDate(formatted);
              }
            }}
          />
        )}

        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={[styles.uploadBox, { height: ticketFront ? 220 : 180 }]}
            onPress={() => !ticketFront && handleImagePick('front')}
          >
            {ticketFront ? (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: ticketFront.uri }}
                  style={styles.uploadedImg}
                />
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => setTicketFront(null)}
                >
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
               <Image source={require('../assets/icons/uploadImage.png')} style={styles.thumbnail} />,
                <Text style={styles.uploadText}>
                  Upload Your{'\n'}Ticket Front
                </Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.uploadBox, { height: ticketBack ? 220 : 180 }]}
            onPress={() => !ticketBack && handleImagePick('back')}
          >
            {ticketBack ? (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: ticketBack.uri }}
                  style={styles.uploadedImg}
                />
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => setTicketBack(null)}
                >
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                 <Image source={require('../assets/icons/uploadImage.png')} style={styles.thumbnail} />,
                <Text style={styles.uploadText}>
                  Upload Your{'\n'}Ticket Back
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={submitTicket}>
          <Text style={styles.saveButtonText}>Save and Add Another</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.addTicketContainer}
        onPress={() => navigation.navigate('AddTicket')}
      >
        <Icon name="file-document" size={24} color="#000" />
        <Text style={styles.addTicketText}>Submit Expense Invoice</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 90,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 25,
    marginTop: -10,
  },
  thumbnail:{
    width:50,
    height:50,
    alignSelf:'center'
      },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    fontWeight: 'bold',
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
  dateText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 6,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 54,
  },
  uploadBox: {
    width: '38%',
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#f57c00',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'center',
  },
  uploadedImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  uploadText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#444',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTicketContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 70,
  },
  addTicketText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#f57c00',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 50,
    width: 190,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default AddTicketScreen;
