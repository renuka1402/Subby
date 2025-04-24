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

const YourTimesheetScreen = () => {
  const days = [
    { key: 'MON', label: 'MONDAY' },
    { key: 'TUE', label: 'TUESDAY' },
    { key: 'WED', label: 'WEDNESDAY' },
    { key: 'THU', label: 'THURSDAY' },
    { key: 'FRI', label: 'FRIDAY' },
    { key: 'SAT', label: 'SATURDAY' },
    { key: 'SUN', label: 'SUNDAY' },
  ];

  const dropdownOptions = [
    { label: 'abc', value: 'savita' },
  ];

  const [dayRows, setDayRows] = useState({
    MON: [{ site: '', hours: '', comment: '' }],
    TUE: [{ site: '', hours: '', comment: '' }],
    WED: [{ site: '', hours: '', comment: '' }],
    THU: [{ site: '', hours: '', comment: '' }],
    FRI: [{ site: '', hours: '', comment: '' }],
    SAT: [{ site: '', hours: '', comment: '' }],
    SUN: [{ site: '', hours: '', comment: '' }],
  });

  const [selectedSites, setSelectedSites] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleOpen = (key) => {
    setOpenDropdown(key);
  };

  const handleSelect = (key, value) => {
    setSelectedSites((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addRowForDay = (dayKey) => {
    setDayRows((prev) => ({
      ...prev,
      [dayKey]: [...prev[dayKey], { site: '', hours: '', comment: '' }],
    }));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>Your Timesheets</Text>
        <TouchableOpacity  onPress={()=>navigation.navigate("Home")}>  
                   <Ionicons name="home" size={25} color="#F47C25" />
                   </TouchableOpacity>
      <Text style={styles.subheading}>COMPLETE YOUR NEXT TIMESHEET</Text>
      <Text style={styles.dates}>2025-04-07 to 2025-04-13</Text>

      <Text style={styles.notice}>
        THIS TIMESHEET WILL BE SENT TO THE [Test company by yash] FOR APPROVAL. IF THIS IS NOT YOUR CURRENT PLACE OF WORKS PLEASE CONTACT SUBBY IMMEDIATELY
      </Text>

      {days.map((day) => (
        <View key={day.key} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day.label}</Text>

          {dayRows[day.key].map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={styles.row}>
                <Text style={styles.label1}>SITE</Text>
                <View style={styles.pickerWrapper}>
                  <DropDownPicker
                    placeholder="Select option"
                    open={openDropdown === `${day.key}-${rowIndex}`}
                    value={selectedSites[`${day.key}-${rowIndex}`] || null}
                    items={dropdownOptions}
                    setOpen={(open) =>
                      handleOpen(open ? `${day.key}-${rowIndex}` : null)
                    }
                    setValue={(callback) => {
                      const value = callback(
                        selectedSites[`${day.key}-${rowIndex}`]
                      );
                      handleSelect(`${day.key}-${rowIndex}`, value);
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
                  onChangeText={(text) => {
                    const updated = [...dayRows[day.key]];
                    updated[rowIndex].hours = text;
                    setDayRows({ ...dayRows, [day.key]: updated });
                  }}
                />
              </View>

              {/* {openDropdown === `${day.key}-${rowIndex}` && (
                <View style={{ height: 80 }} /> */}
              {/* )} */}

              <View style={styles.commentRow}>
                <Text style={styles.label}>COMMENT</Text>
                <TextInput
                  style={styles.commentInput}
                  placeholder=""
                  value={row.comment}
                  onChangeText={(text) => {
                    const updated = [...dayRows[day.key]];
                    updated[rowIndex].comment = text;
                    setDayRows({ ...dayRows, [day.key]: updated });
                  }}
                />
                <TouchableOpacity onPress={() => addRowForDay(day.key)}>
                  <Text style={styles.addSiteTextInline}>+ ADD SITE</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit For Approval</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  dropdownContainer: {
    borderColor: '#f97316',
    borderColor: '#f97316',
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
  submitButton: {
    backgroundColor: '#F58025',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 130,
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default YourTimesheetScreen;
