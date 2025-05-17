import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
  StatusBar,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Header from '../../component/Header';

const ExpenseClaims = ({ navigation }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [claims, setClaims] = useState([]);
  const [settledClaims, setSettledClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const token = useSelector(state => state.auth.token);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));
      const response = await axios.get(
        'https://devapi.subbygroup.co.uk/sole-trader/get-expense-claims',
        { headers:
           {
             Authorization: localToken 
            } 
          }
      );
      setClaims(response.data.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load expense claims.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const renderHeaderRow = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeadText, styles.colDate]}>DATE</Text>
      <Text style={[styles.tableHeadText, styles.colValue]}>VALUE</Text>
      <Text style={[styles.tableHeadText, styles.colDesc]}>DISCRIPTION</Text>
      <Text style={[styles.tableHeadText, styles.colStatus]}>APPROVED?</Text>
    </View>
  );

  const renderButtons = claim => (
    <View style={styles.btnWrap}>
      <TouchableOpacity style={styles.btnOrange} disabled>
        <Text style={styles.btnOrangeTxt}>PENDING</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnOutline}>
        <Text style={styles.btnOutlineTxt}>DOWNLOAD</Text>
      </TouchableOpacity>
    </View>
  );

  const renderClaimRow = (claim, i) => (
    <View key={i} style={styles.claimRow}>
      <Text style={[styles.claimTxt, styles.colDate]}>{claim.amount_claimed_date}</Text>
      <Text style={[styles.claimTxt, styles.colValue]}>{claim.amount_claimed}.00</Text>
      <Text style={[styles.claimTxt, styles.colDesc]}>{claim.type}</Text>
      <View style={[styles.colStatus, { alignItems: 'center' }]}>
        {renderButtons(claim)}
      </View>
    </View>
  );

 

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
<Header title="Your Payment  History"/>

      <Text style={styles.subHeader}>EXPENSE CLAIMS</Text>
      <Text style={styles.desc}>PAID TO YOU DIRECTLY FROM YOUR WORKSPACE</Text>
      <Text style={styles.sectionCaption}>EXPENSE CLAIMS</Text>

      {renderHeaderRow()}
      {loading ? (
        <ActivityIndicator size="large" color="#F47C25" style={{ marginTop: 25 }} />
      ) : claims.length ? (
        claims.map(renderClaimRow)
      ) : (
        <Text style={styles.emptyTxt}>No claims found.</Text>
      )}

      <Text style={styles.searchLabel}>SEARCH SETTLED CLAIMS</Text>
      <View style={styles.searchRow}>
        <Text style={styles.searchTxt}>Search</Text>

        <TouchableOpacity style={styles.dateBox} onPress={() => setShowFromPicker(true)}>
          <Text style={styles.dateTxt}>
            {fromDate ? fromDate.toLocaleDateString() : 'DD/MM/YYYY'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.toTxt}>To</Text>

        <TouchableOpacity style={styles.dateBox1} onPress={() => setShowToPicker(true)}>
          <Text style={styles.dateTxt}>
            {toDate ? toDate.toLocaleDateString() : 'DD/MM/YYYY'}                                  
          </Text>
        </TouchableOpacity>
      </View>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display={'default'}
          onChange={(_, d) => {
            setShowFromPicker(false);
            d && setFromDate(d);
          }}
        />
      )}
      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display={'default'}
          onChange={(_, d) => {
            setShowToPicker(false);
            d && setToDate(d);
          }}
        />
      )}

     
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>SEARCH</Text>
     

      {searchLoading && (
        <ActivityIndicator size="large" color={ORANGE} style={{ marginTop: 25 }} />
      )}

      {settledClaims.length > 0 && (
        <>
          <Text style={styles.sectionCaption}>SETTLED CLAIMS</Text>
          {renderHeaderRow()}
          {settledClaims.map(renderClaimRow)}
        </>
      )}
    </ScrollView>
  );
};

export default ExpenseClaims;

const ORANGE = '#F47C25';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },

  subHeader: {
    fontSize: 14,
    paddingHorizontal: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 32,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#000',
  },
  desc: {
    textAlign: 'center',
    paddingHorizontal: 15,
    fontSize: 10,
    fontWeight: '600',
    color: '#111',
    marginVertical: 6,
  },
  sectionCaption: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 25,
    color: '#000',
    paddingHorizontal: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  tableHeadText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  colDate: {
    width: '20%',
  },
  colValue: {
    width: '15%',
  },
  colDesc: {
    width: '25%',
  },
  colStatus: {
    width: '36%',
  },
  claimRow: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  claimTxt: {
    fontSize: 10,
    color: '#555',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  btnWrap: {
    flexDirection: 'row',
    marginRight: 45,
    gap: 1,
  },
  btnOrange: {
    backgroundColor: '#F47C25',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  btnOrangeTxt: {
    color: 'rgb(243, 233, 193)',
    fontSize: 10,
    fontWeight: '600',
  },
  btnOutline: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  btnOutlineTxt: {
    fontSize: 10,
    fontWeight: '600',
  },
  searchLabel: {
    marginTop: 26,
    fontSize: 10,
    fontWeight: '700',
    color: '#333',
    textTransform: 'uppercase',
    paddingHorizontal: 15,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 16,
    marginLeft: 30,
  },
  searchTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  toTxt: {
    fontSize: 14,
    color: '#444',
    marginHorizontal: 20,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minWidth: 85,
    alignItems: 'center',
    marginLeft: 25,
  },
  dateBox1: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minWidth: 85,
    alignItems: 'center',
  },
  dateTxt: {
    fontSize: 11,
  },
  emptyTxt: {
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,
  },
});
