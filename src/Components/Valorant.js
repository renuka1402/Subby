import React, { useState } from 'react';
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
const ValorantScreen = ({ route }) => {
  const { id, name, expiry_date, frontImage, rearImage } = route.params;
  console.log(frontImage);
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: name, value: id },

  ]);

  const [ticketFront, setTicketFront] = useState(null);
  const [ticketBack, setTicketBack] = useState(null);

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

  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Tickets</Text>
  <TouchableOpacity  onPress={()=>navigation.navigate("Home")}>  
             <Ionicons name="home" size={25} color="#F47C25" />
             </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
    
        <Text style={styles.label}>Name of Ticket</Text>
        <DropDownPicker
          placeholder={name}
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
                {open  && (
                              <View style={{ height: 80 }} />
                            )}

  
        <Text style={[styles.label, { marginTop: 54 }]}>Expiry Date</Text>
        <Text style={styles.dateText}>{expiry_date}</Text>

      
        <View style={styles.uploadContainer}>
      
          <TouchableOpacity
            style={[styles.uploadBox, { height: ticketFront ? 220 : 180 }]}
            onPress={() => !ticketFront && handleImagePick('front')}
            activeOpacity={ticketFront ? 1 : 0.7}
          >
            {frontImage ? (
              <View style={styles.imageWrapper}>
                <Image source={{ uri:frontImage }}style={styles.uploadedImg} />
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => setTicketFront(null)}
                >
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <MaterialCommunityIcons name="cloud-upload-outline" size={30} color="#f57c00" />
                <Text style={styles.uploadText}>Upload Your{'\n'}Ticket Front</Text>
              </>
            )}
          </TouchableOpacity>

      
          <TouchableOpacity
            style={[styles.uploadBox, { height: ticketBack ? 220 : 180 }]}
            onPress={() => !ticketBack && handleImagePick('back')}
         
          >
            {rearImage ? (
              <View style={styles.imageWrapper}>
                <Image source={{ uri:rearImage }} style={styles.uploadedImg} />
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => setTicketBack(null)}
                >
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <MaterialCommunityIcons name="cloud-upload-outline" size={30} color="#f57c00" />
                <Text style={styles.uploadText}>Upload Your{'\n'}Ticket Back</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save </Text>
        </TouchableOpacity>
  

      </ScrollView>
      
      
      
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
    gap:90,
    alignItems: 'center',

    padding:20,
  },
  headerTitle: {
     fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
      marginLeft:110,
      fontWeight:"bold",
     },
     scrollContent:{
 padding:25,
 marginTop:-10,
     },
  label: {
     fontSize: 14,
      fontFamily: 'Poppins-Medium',
       marginBottom: 6, 
       fontWeight:"bold",
      },
      dropdown: {
        borderColor: '#000',
        height: 20,            
        paddingHorizontal: 5,
        borderRadius: 8,
        justifyContent: 'center',
      },
      
      dropdownContainer: {
        borderColor: '#000',
        height: 20,  
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
        elevation: 4, // Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      
      cardItemLabel: {
        color: '#333', // Darker text
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
    gap:20,
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
    alignSelf:"center"
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
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
       

  },
  addTicketText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight:'bold'
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
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ValorantScreen;

// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// const Valorant = ({ route }) => {
//   const { id, name, expiry_date, frontImage, rearImage } = route.params;
// console.log(frontImage);
// console.log(rearImage );



//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Ticket ID: {id}</Text>
//       <Text>Name: {name}</Text>
//       <Text>Expiry Date: {expiry_date}</Text>

//       <Image source={{ uri:frontImage }} style={styles.image} />
//       <Image source={{ uri:rearImage }} style={styles.image} />
//     </View>
//   );
// };

// export default Valorant;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   image: {
//     width: '50%',
//     height: 200,
//     marginTop: 10,
//   },
// });

