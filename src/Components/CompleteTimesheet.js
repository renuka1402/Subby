import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView ,Alert,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const TimesheetForm = () => {
  const [measure, setMeasure] = useState('');
  const [rate, setRate] = useState('');
  const [total, setTotal] = useState('0.00');
  const [siteOpen, setSiteOpen] = useState(false);
  const [siteValue, setSiteValue] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [unitOpen, setUnitOpen] = useState(false);
  const [unitValue, setUnitValue] = useState(null);

  const [items, setItems] = useState([
    { label: 'Card', value: 'card' },
    { label: 'Unit', value: 'unit' },
    { label: 'Meter', value: 'meter' },
  ]);
  useEffect(() => {
    setTotal((measure * rate).toFixed(2));

  }, [measure, rate]);
  const handleSelectImage = () => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({ mediaType: 'photo' }, response => {
              if (!response.didCancel && !response.errorCode) {
                setImageUri(response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo' }, response => {
              if (!response.didCancel && !response.errorCode) {
                setImageUri(response.assets[0].uri);
              }
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const removeImage = () => {
    setImageUri(null);
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>Your Timesheets</Text>
      <View style={styles.homeIcon}>
         <TouchableOpacity  onPress={()=>navigation.navigate("Home")}>  
                    <Ionicons name="home" size={25} color="#F47C25" />
                    </TouchableOpacity>
      </View>

      <Text style={styles.subText}>COMPLETE YOUR NEXT TIMESHEET (MEASURED WORKS)</Text>
      <Text style={styles.dateRange}>2025-04-07 to 2025-04-13</Text>

      <Text style={styles.warningText}>
        THIS TIMESHEET WILL BE SENT TO THE <Text style={{ fontWeight: 'bold' }}>[Test company by yash]</Text> FOR
        APPROVAL. IF THIS IS NOT YOUR CURRENT PLACE OF WORKS PLEASE CONTACT SUBBY IMMEDIATELY
      </Text>

      <Text style={styles.infoText}>
        THIS CLAIM IS FOR LABOUR ONLY (SUBJECT TO CIS TAX). ANY MATERIAL OR PLANT HERE CLAIMS MUST BE SUBMITTED VIA A
        SEPARATE EXPENSE CLAIM
      </Text>

      <Text style={styles.infoText}>
        COMPLETE THE FORM AND UPLOAD A COPY OF YOUR CLAIM / INVOICE OR ANY BACK UP DOCUMENTS
      </Text>

   
      <View style={styles.siteRow}>
        <Text style={styles.labelInline}>SITE</Text>
        <View style={styles.sitePickerContainer}>
          <View style={styles.dropdownWrapInline}>
            <DropDownPicker
              placeholder="Select option"
              open={siteOpen}
              value={siteValue}
              items={items}
              setOpen={setSiteOpen}
              setValue={setSiteValue}
              setItems={setItems}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer1}
              placeholderStyle={{ color: '#888' }}
              listMode="SCROLLVIEW"
              listItemContainerStyle={styles.cardItemContainer1}
              listItemLabelStyle={styles.cardItemLabel1}
            />
            {siteOpen && <View style={{ height: 80 }} />}
          </View>
        
            <TouchableOpacity onPress={() => setSiteValue('')} style={styles.crossIcon}>
              <Ionicons name="close" size={25} color="#f27c24" />
            </TouchableOpacity>
         
        </View>
      </View>

    
      <Text style={styles.label}>DESCRIPTION OF WORKS</Text>
      <TextInput style={styles.inputLarge} multiline />

     
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label1}>MEASURE</Text>
          <TextInput style={styles.sameSizeInput} keyboardType="numeric"   value={measure}
  onChangeText={setMeasure} />
        </View>

        <View style={styles.columnWide}>
          <Text style={styles.label1}>UNIT</Text>
          <View style={styles.dropdownWrapInline1}>
          <DropDownPicker
            placeholder="Select"
            open={unitOpen}
            value={unitValue}
            items={items}
            setOpen={setUnitOpen}
            setValue={setUnitValue}
            setItems={setItems}
            style={styles.dropdown1}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholderStyle={{ color: '#888' }}
            listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
            listItemContainerStyle={styles.cardItemContainer}
            listItemLabelStyle={styles.cardItemLabel}
          />
          {unitOpen && <View style={{ height: 180 }} />}
        </View></View>
        

        <View style={styles.columnWide}>
          <Text style={styles.label1}>RATE £</Text>
          <TextInput style={styles.sameSizeInput} keyboardType="numeric" value={rate}
  onChangeText={setRate} />
        </View>

        <View style={styles.column}>
          <Text style={styles.label2}>TOTAL GROSS CLAIM £</Text>
          <TextInput  value={total} style={styles.sameSizeInput2} editable={false} />
        </View>
      </View>

      <View style={styles.commentUploadRow}>
        <View style={styles.commentColumn}>
          <Text style={styles.label}>OTHER COMMENTS</Text>
          <TextInput style={styles.commentBox} multiline />
        </View>

        <TouchableOpacity style={styles.uploadBox} onPress={handleSelectImage}>
  {imageUri ? (
    <>
      <Image source={{ uri: imageUri }} style={styles.uploadedImg} />
      <TouchableOpacity style={styles.crossButton} onPress={removeImage}>
        <Ionicons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </>
  ) : (
    <>
      <MaterialCommunityIcons name="cloud-upload-outline" size={30} color="#f57c00" />
      <Text style={styles.uploadText}>Upload Image</Text>
    </>
  )}
</TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.buttonOutline}>
        <Text style={styles.buttonOutlineText}>ADD ANOTHER LINE TO YOUR TIMESHEET</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SUBMIT COMPLETED TIMESHEET</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TimesheetForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop:10,
  },
  homeIcon: {
    position: 'absolute',
    top: 5,
    right: 15,
  },
  subText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 11,

  },
  dateRange: {
    textAlign: 'center',
    fontSize: 11,
    marginBottom: 20,
  },
  warningText: {
    color: '#f27c24',
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 9,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  siteRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,
  },
  labelInline: {
    fontSize: 10,
    color: '#000',
    marginTop: 12,
  },
  sitePickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  crossIcon: {
    marginLeft: 8,
  },
  dropdownWrapInline: {
width:"70%",
    borderWidth: 1,
    borderColor: '#f27c24',
    borderRadius: 8,
    overflow: 'hidden',
  },

  dropdownWrapInline1: {
    width:"100%",
        borderWidth: 1,
        borderColor: '#f27c24',
        borderRadius: 8,
        overflow: 'hidden',
      },
  dropdown: {
    height: 35,
    width: '100%',
  },
  dropdown1: {
    height: 30,
    width: '100%',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
   
    paddingVertical: 4,
  },
  cardItemContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardItemLabel: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },

  dropdownContainer1: {
    backgroundColor: '#fff',
   
    paddingVertical: 4,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadedImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  crossButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#f27c24',
    borderRadius: 12,
    padding: 2,
    zIndex: 10,
  },

  cardItemContainer1: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardItemLabel1: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },

  label: {
    fontSize: 10,
    marginBottom: 4,
    marginTop: 20,
    color: '#000',
  },
  label1: {
    fontSize: 9,
    marginBottom: 24,

    color: '#000',
  },
  label2: {
    fontSize: 9,
    marginBottom: 15,
   
    color: '#000',
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: '#f27c24',
    borderRadius: 8,
    height: 40,
    padding: 8,
    marginBottom: 10,
  },
  sameSizeInput: {
    borderWidth: 1,
    borderColor: '#f27c24',
    borderRadius: 8,
    height: 40,
  
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
  sameSizeInput2: {
    borderWidth: 1,
    borderColor: '#f27c24',
    borderRadius: 8,
    height: 30,

  padding:10,
    fontSize:8,
    
  },
  row: {
    flexDirection: 'row',
    gap: 10,

    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
  },
  columnWide: {
    flex: 1.3,
  },
  commentUploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,

  },
  commentColumn: {
    flex: 1,
  },
  commentBox: {
    borderWidth: 1,
    borderColor: '#f27c24',
    borderRadius: 8,
    height: 80,
    padding: 8,
    marginBottom: 10,
  },
  uploadBox: {
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#f57c00',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 37,
    width: 170,
    height: 80,
    position: 'relative',
    overflow: 'hidden',
  },
  
  uploadedImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  
  uploadText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  
  crossButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 2,
    zIndex: 1,
  },
  
  buttonOutline: {
    backgroundColor: '#f27c24',
  width:"60%",
  alignSelf:"center",
    paddingVertical: 5,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonOutlineText: {
    textAlign: 'center',
    color: '#fff',
    fontSize:12,
  },
  button: {
    backgroundColor: '#f27c24',
    paddingVertical: 8,
    borderRadius: 8,
    width:"60%",
    alignSelf:"center",
    marginTop:10,
    marginBottom:100,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
   
  },
});