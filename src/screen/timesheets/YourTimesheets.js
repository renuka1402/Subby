import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import CustomButton from '../../component/Buttons';

const YourTimesheetScreen = () => {

  const [days, setDays] = useState({
    MON: [{ site: '', hours: '', comment: '' }],
    TUE: [{ site: '', hours: '', comment: '' }],
    WED: [{ site: '', hours: '', comment: '' }],
    THU: [{ site: '', hours: '', comment: '' }],
    FRI: [{ site: '', hours: '', comment: '' }],
    SAT: [{ site: '', hours: '', comment: '' }],
    SUN: [{ site: '', hours: '', comment: '' }],
  });


  const dropdownOptions = [
    { label: 'abc', value: 1 },
  ];

  const [selectedSites, setSelectedSites] = useState({}); 

  const addRow = (day) => {
    const updatedDays = { ...days };
    updatedDays[day].push({ site: '', hours: '', comment: '' });
    setDays(updatedDays);
  };


  const updateField = (day, rowIndex, field, value) => {
    const updatedDays = { ...days };
    updatedDays[day][rowIndex][field] = value;
    setDays(updatedDays);
  };


  const updateSite = (key, value) => {
    setSelectedSites({ ...selectedSites, [key]: value });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
 <Header title='Your Timesheets'/>
      <Text style={styles.subheading}>COMPLETE YOUR NEXT TIMESHEET</Text>
      <Text style={styles.dates}>2025-04-07 to 2025-04-13</Text>

      <Text style={styles.notice}>
        THIS TIMESHEET WILL BE SENT TO THE [Test company by yash] FOR APPROVAL. IF THIS IS NOT YOUR CURRENT PLACE OF WORKS PLEASE CONTACT SUBBY IMMEDIATELY
      </Text>

 
      {Object.keys(days).map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day}</Text>


          {days[day].map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={styles.row}>
                <Text style={styles.label1}>SITE</Text>
                <View style={styles.pickerWrapper}>
                  <DropDownPicker
                    placeholder="Select option"
                    value={selectedSites[`${day}-${rowIndex}`] || null}
                    items={dropdownOptions}
                    setValue={(callback) => {
                      const value = callback(selectedSites[`${day}-${rowIndex}`]);
                      updateSite(`${day}-${rowIndex}`, value);
                    }}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    placeholderStyle={{ color: '#888' }}
                    dropDownDirection="BOTTOM"
                    listMode="SCROLLVIEW"
                    listItemContainerStyle={styles.cardItemContainer}
                    listItemLabelStyle={styles.cardItemLabel}
                  />
                </View>

                <Text style={styles.label}>HOURS</Text>
                <TextInput
                  style={styles.inputSmall}
                  placeholder="0"
                  keyboardType="numeric"
                  value={row.hours}
                  onChangeText={(text) => updateField(day, rowIndex, 'hours', text)}
                />
              </View>

              <View style={styles.commentRow}>
                <Text style={styles.label}>COMMENT</Text>
                <TextInput
                  style={styles.commentInput}
                  placeholder=""
                  value={row.comment}
                  onChangeText={(text) => updateField(day, rowIndex, 'comment', text)}
                />
                <TouchableOpacity onPress={() => addRow(day)}>
                  <Text style={styles.addSiteTextInline}>+ ADD SITE</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ))}

  

      
      <CustomButton
        title="Submit For Approval"
      
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  dates: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notice: {
    fontSize: 12,
    color: '#F58025',
    textAlign: 'center',
    marginBottom: 15,
  },
  dayContainer: {
    marginBottom: 30,
  },
  dayText: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginLeft: 30,
    gap: 6,
  },
  label: {
    fontWeight: '600',
    fontSize: 11,
  },
  label1: {
    fontSize: 12,
    fontWeight: '600',
  },
  pickerWrapper: {
    width: 135,
    fontSize: 10,
  },
  dropdown: {
    borderColor: '#f97316',
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  dropdownContainer: {
    borderColor: '#f97316',
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
  inputSmall: {
    width: 100,
    height: 35,
    borderWidth: 1,
    borderColor: '#f97316',
    borderRadius: 6,
    paddingHorizontal: 8,
    fontSize: 13,
    textAlign: 'center',
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#f97316',
    borderRadius: 6,
    paddingHorizontal: 8,
    fontSize: 13,
  },
  addSiteTextInline: {
    color: '#f97316',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 10,
  },
 
});

export default YourTimesheetScreen;
