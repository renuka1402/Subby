import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
  Linking,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const ExpenseClaims = ({ navigation }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector(state => state.auth.token);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));

      const response = await axios.get(
        'https://devapi.subbygroup.co.uk/sole-trader/get-expense-claims',
        {
          headers: {
            Authorization: localToken,
          },
        }
      );

      setClaims(response.data.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
      alert('Failed to load expense claims.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleFromDateChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (selectedDate) setFromDate(new Date(selectedDate));
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (selectedDate) setToDate(new Date(selectedDate));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>YOUR PAYMENT HISTORY</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={25} color="#F47C25" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>EXPENSE CLAIMS</Text>
      <Text style={styles.desc}>Paid to you directly from your workspace</Text>

      <Text style={styles.subHeader1}>EXPENSE CLAIMS</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableText}>DATE</Text>
        <Text style={styles.tableText}>VALUE</Text>
        <Text style={styles.tableText}>TYPE</Text>
        <Text style={styles.tableText}>APPROVED?</Text>
      </View>

      <Text style={styles.searchLabel}>Search Settled Claims</Text>
      <View style={styles.searchRow}>
        <Text style={styles.searchText}>Search</Text>

        <TouchableOpacity style={styles.dateBox} onPress={() => setShowFromPicker(true)}>
          <Text style={styles.dateText}>
            {fromDate ? fromDate.toDateString() : 'From Date'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.toText}>To</Text>

        <TouchableOpacity style={styles.dateBox} onPress={() => setShowToPicker(true)}>
          <Text style={styles.dateText}>
            {toDate ? toDate.toDateString() : 'To Date'}
          </Text>
        </TouchableOpacity>
      </View>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleFromDateChange}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleToDateChange}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#f27c24" style={{ marginTop: 30 }} />
      ) : claims.length > 0 ? (
        claims.map((claim, index) => (
          <View key={index} style={styles.claimWrapper}>
            <View style={styles.claimRow}>
              <Text style={styles.claimText}>{claim.amount_claimed_date || 'N/A'}</Text>
              <Text style={styles.claimText}>£{claim.amount_claimed}</Text>
              <Text style={styles.claimText}>{claim.type || '-'}</Text>
              <Text style={styles.claimText}>
                {claim.status === 'APPROVED' || claim.approved_by_id ? 'Yes' : 'No'}
              </Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusText}>Status: {claim.status}</Text>
              {claim.image && (
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => Linking.openURL(`https://subbygroup-files.s3.amazonaws.com/${claim.image}`)}
                >
                  <Text style={styles.downloadText}>Download</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      ) : (
        <Text style={{ marginTop: 20, textAlign: 'center', color: 'gray' }}>
          No claims found.
        </Text>
      )}
    </ScrollView>
  );
};

export default ExpenseClaims;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  headerRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 30,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111',
    marginLeft: 70,
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 22,
    color: '#444',
  },
  subHeader1: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 25,
    color: '#444',
  },
  desc: {
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 12,
    color: '#666',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 15,
  },
  tableText: {
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
    color: '#333',
    flex: 1,
  },
  claimWrapper: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 8,
  },
  claimRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  claimText: {
    fontSize: 11,
    flex: 1,
    color: '#333',
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  statusText: {
    fontSize: 11,
    color: '#555',
  },
  downloadButton: {
    backgroundColor: '#f47c25',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  downloadText: {
    fontSize: 11,
    color: '#fff',
  },
  searchLabel: {
    marginTop: 24,
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  searchText: {
    fontSize: 12,
    marginRight: 10,
    fontWeight: '600',
    color: '#444',
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    minWidth: 60,
    alignItems: 'center',
    marginLeft: 5,
  },
  dateText: {
    fontSize: 11,
    color: '#000',
  },
  toText: {
    fontSize: 14,
    marginRight: 10,
    color: '#444',
  },
});
