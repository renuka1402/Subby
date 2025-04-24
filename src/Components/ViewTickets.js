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



const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ViewTimesheetScreen = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState(months);
  const [selectedYear, setSelectedYear] = useState('');
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

      const url = `devapi.subbygroup.co.uk/sole-trader/get-current-week-timesheet?company_id=${storedCompanyId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: storedToken,
        },
      });

      console.log('Fetched Timesheets:', response.data.data);
      setTimesheets(response.data.data || []);
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
      <View style={styles.header}>
        <Text style={styles.headerText}>YOUR PAYMENT HISTORY</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={25} color="#F47C25" />
        </TouchableOpacity>
      </View>

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
          {timesheets.length > 0 ? (
            timesheets.map((sheet, index) => (
              <View key={index}>
                <Text style={styles.weekText}>Week {sheet.week_number || index + 1}</Text>
                <Text style={styles.weekText}>Date: {new Date(sheet.date).toLocaleDateString()}</Text>
                <Text style={styles.weekText}>Type: {sheet.type}</Text>
                <Text style={styles.weekText}>Approved: {sheet.status === 'APPROVED' ? 'Yes' : 'No'}</Text>
                <Text style={styles.weekText}>Status: {sheet.status}</Text>
                <TouchableOpacity style={styles.downloadBtn}>
                  <Text style={styles.downloadText}>Download</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noTimesheet}>No Timesheet Found</Text>
          )}
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
  header: {
    flexDirection: 'row',
    marginLeft: 80,
    gap: 70,
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15
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
    width: "60%",
    marginLeft: 5,
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
