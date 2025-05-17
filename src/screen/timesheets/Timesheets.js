import React,{ useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TimesheetsScreen = () => {
  const navigation = useNavigation();

  const checkUserType = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      console.log('User email:', savedEmail);
  
      if (savedEmail === 'admin@gmail.com') {
        // navigation.navigate('CompletePage');  
      } else {
        navigation.navigate('YourTimesheet');
      }
    } catch (error) {
      console.error('Failed to get userEmail from storage:', error);
    }
  };
  
  return (
    <View style={styles.container}>
 
 <Header title=" Timesheets"/>

      <ScrollView>
 
        <TouchableOpacity style={styles.sectionContainer1} onPress={checkUserType}>
          <View style={styles.sectionIconWrapper}>
            <Icon name="calendar-edit" size={30} color="#f17300" />
          </View>
          <View style={styles.sectionContentRow}>
            <View style={styles.sectionTextBlock}>
              <Text style={styles.sectionTitle}>Complete Next Timesheet</Text>
              <Text style={styles.dateRange}>07/04/2025 - 13/04/2025</Text>
              <Text style={styles.sectionDesc}>Claim for daywork and measured works</Text>
              <Text style={styles.warning}>This timesheet needs to be completed by 14/04/2025</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} onPress={() => navigation.navigate("Expense")}>
          <View style={styles.sectionIconWrapper}>
            <Icon name="file-document" size={30} color="#f17300" />
          </View>
          <View style={styles.sectionContentRow}>
            <View style={styles.sectionTextBlock}>
              <Text style={styles.sectionTitle}>Add An Expenses Invoice</Text>
              <Text style={styles.sectionDesc}>Claim for materials, plant and general expenses</Text>
              <Text style={styles.sectionDesc}>Paid to you directly from your current workplace</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        <View style={styles.paymentHistorySection}>
          <Text style={styles.paymentTitle}>Payment History</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>TIMESHEETS</Text>
            <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate("ViewTickets")}>
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>EXPENSE CLAIMS</Text>
            <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate("ExpenseClaims")}>
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,
     backgroundColor: '#fff' 
    },


  sectionContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1, 
    borderColor: '#eee',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  sectionContainer1: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
 
  },

  sectionIconWrapper: {
    marginRight: 12,
    justifyContent: 'center',
  },

  sectionContentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    

   

  },

  sectionTextBlock: {
    flex: 1,
    paddingRight: 10,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  dateRange: {
    color: '#555',
  },

  sectionDesc: {
    color: '#555',
    fontSize: 13,
  },

  warning: {
    color: '#f17300',
    fontSize: 13,
    marginTop: 4,
  },

  paymentHistorySection: {
    padding: 38,
    marginBottom: 40,
  },

  paymentTitle: {
    fontWeight: 'bold',
    marginBottom: 22,
  },

  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  paymentLabel: {
    fontSize: 13,
  },

  viewButton: {
    borderWidth: 1,
    borderColor: '#f17300',
    paddingVertical: 3,
    paddingHorizontal: 19,
    borderRadius: 6,
  },

  viewText: {
    color: '#f17300',
    fontWeight: '600',
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
});

export default TimesheetsScreen;
