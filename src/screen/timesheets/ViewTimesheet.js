import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Header from '../../component/Header';


const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ViewTimesheetScreen = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isLoading, setIsLoading] = useState(false);
  const [timesheets, setTimesheets] = useState([]);

  const token = useSelector(state => state.auth.token);
  const reduxCompanyId = useSelector(state => state.auth.companyId);
  console.log(12,reduxCompanyId);
  
  const fetchTimesheets = async () => {
    setIsLoading(true);
    try {
      const storedToken = token || await AsyncStorage.getItem('authToken');
      const storedCompanyId = reduxCompanyId || await AsyncStorage.getItem('companyId');
  
      if (!storedToken || !storedCompanyId) {
        console.warn('Missing token or companyId');
        return;
      }
  
      const url = `https://devapi.subbygroup.co.uk/sole-trader/get-week-wise-timesheets?company_id=${storedCompanyId}&month=${selectedMonth}&year=${selectedYear}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: storedToken,
        },
      });
  
      console.log('Fetched Timesheets:', response.data.data);
      setTimesheets(response.data.data);
    } catch (error) {
      console.error('Error fetching timesheets:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchTimesheets();
  }, [selectedMonth, selectedYear])

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <View style={styles.container}>
  <Header title='Your Timesheets'/>

      <Text style={styles.title}>TIMESHEETS</Text>

      <View>
        <View style={styles.row}>
          <Text style={styles.columnTitle}>YEAR</Text>
          <Text style={styles.columnTitle}>MONTH</Text>
        </View>
        <View style={styles.week}>
          <Text style={styles.columnTitle1}>WEEK</Text>
        </View>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.yearText}>{selectedYear}</Text>

        <ScrollView contentContainerStyle={styles.monthContainer}>
          {months.map((month) => (
            <TouchableOpacity key={month} onPress={() => handleMonthChange(month)}>
              <Text style={[
                styles.monthText,
                selectedMonth === month && styles.selectedMonth
              ]}>
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.weekContainer}>
          
             
           
           
         
        </ScrollView>
      </View>

      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#f57c00" />
        </View>
      )}
    </View>
  );
};

export default ViewTimesheetScreen;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  weekContent: {
    alignItems: 'flex-start',
    flexDirection: "row",
    gap: 8
  },
  title: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 40,
    marginLeft: 17,
    paddingHorizontal: 5,
  },
  columnTitle: {
    fontWeight: '600',
    fontSize: 12,
  },
  columnTitle1: {
    fontWeight: '600',
    fontSize: 12,
  },
  week: {
    flexDirection: "row",
    marginLeft: 200,
    marginTop: -15
  },
  dataRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  weekContainer: {
    flexDirection: "column",
    padding: 5,
    width: "50%",
  },
  weekText: {
    fontSize: 9,
    fontWeight: '600',
    paddingVertical: 5,
  },
  yearText: {
    width: '16%',
    paddingVertical: 12,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 25,
  },
  monthContainer: {
    width: "30%",
    marginRight:40,
  },
  monthText: {
    paddingVertical: 13,
    fontSize: 10,
    textAlign: "center",
    fontWeight: '600',
  },
  selectedMonth: {
    color: '#f57c00',
    borderBottomWidth: 2,
    borderBottomColor: '#f57c00'
  },
  downloadBtn: {
    borderWidth: 1,
    padding: 2,
    width: 70,
    borderRadius: 3,
    height: 20,
    marginTop: 5,
  },
  downloadText: {
    fontSize: 11,
    textAlign: "center",
  },
  noTimesheet: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 12,
    marginRight: 95
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
