
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator,  PermissionsAndroid,Platform, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Header from '../../component/Header';
import axios from 'axios';
import { getAllTickets, downloadTicketsPDF } from '../../services/api/ticketService';

const TicketsScreen = ({ navigation }) => {
  const [downloading, setDownloading] = useState(false);

  const [tickets, setTickets] = useState([]);
  const token1 = useSelector(state => state.auth.token);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await downloadTicketsPDF(RNFetchBlob);
      console.log('File saved to:', res.path());
      Alert.alert('Success', 'Tickets downloaded successfully!');
    } catch (error) {
      console.log('Download error:', error);
      Alert.alert('Error', 'Failed to download tickets.');
    } finally {
      setDownloading(false);
    }
  };
  

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsData = await getAllTickets();
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        Alert.alert('Error', 'Fetching Tickets');
      } finally {
        setLoading(false);
      }
    };
    

    fetchTickets();
  }, []);
  console.log(tickets.rear_image
    );
    console.log(tickets.expiry_date);
    
  

  return (
    <View style={styles.container}>
      <Header title="Tickets" />

      <TouchableOpacity
        style={styles.addTicketContainer}
        onPress={() => navigation.navigate('AddTicket')}
      >
        <MaterialCommunityIcons name="ticket-outline" size={20} color="#000" />
        <Text style={styles.addTicketText}>Add A New Ticket</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <View style={styles.ticketsHeader}>
        <Text style={styles.yourTicketsText}>Your Tickets</Text>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.downloadButtonText}>Download Tickets</Text>
        </TouchableOpacity>
      </View>

      {downloading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#f17300" />
        </View>
      )}
    {tickets.map((ticket, index) => {
  const frontImgUrl = `https://devapi.subbygroup.co.uk/sole_trader/tickets/${ticket.front_image}`;
  const rearImgUrl = `https://devapi.subbygroup.co.uk/sole_trader/tickets/${ticket.rear_image}`;
  {console.log(frontImgUrl);
  }

  return (
    <View key={index} style={styles.documentRow}>
      <View style={styles.docLeft}>
        <View style={styles.docIcon}>
          <Icon name="file-document" size={18} color="#f97316" />
        </View>
        <View>
          <Text style={styles.docText}>{ticket.Ticket.name}</Text>
          <Text style={styles.docDate}>{ticket.expiry_date}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewBtn1}>
        <Text style={styles.viewText}>EXPIRING</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() =>
          navigation.navigate('Valorant', {
            id: ticket.Ticket.id,
            name: ticket.Ticket.name,
            expiry_date: ticket.expiry_date,
            frontImage: frontImgUrl,
            rearImage: rearImgUrl ,
          })
        }
      >
        <Text style={styles.viewText}>View/Edit</Text>
      </TouchableOpacity>
    </View>
  );
})}



    </View>
  );
};

export default TicketsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 110,
    alignItems: 'center',
    paddingBottom: 20,  
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 130,
    fontWeight: 'bold',
  },
  addTicketContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 19,
    paddingHorizontal: 12,

    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    marginBottom: 20,
  },
  addTicketText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: "bold"
  },
  ticketImage:{
    width:100,
    height:100
  },
  documentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  docLeft: {
    flexDirection: 'row',
    gap: 10,
  },
  docIcon: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10
  },
  docText: {
    fontSize: 14,
    color: '#555',
  },
  docDate: {
    fontSize: 10,
  },
  viewBtn: {
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  viewBtn1: {
    borderWidth: 1,
    borderColor: 'rgb(227, 113, 31)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginLeft: 70,
  },
  viewText: {
    fontSize: 10,
  },
  ticketsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  yourTicketsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    fontWeight: "bold"
  },
  downloadButton: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  downloadButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});



















