import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, StatusBar, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../component/Header';
const HomeScreen = ({ navigation }) => {
  const [homeData, setHomeData] = useState(null);
  const token = useSelector(state => state.auth.token);
console.log(token);


  const fetchHomeData = async () => {
    console.log(1);
    
    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));
      const response = await axios.get('https://devapi.subbygroup.co.uk/sole-trader/get-home-page-data',
        {
          headers: {
            Authorization: localToken,
          },
        }
      );
      console.log('API Response:', response.data.data); 
      console.log(localToken);
      
      setHomeData(response.data); 
    } catch (error) {
      console.error('Error fetching home page data:', error.response);
    }
  };
  useEffect(() => {
    fetchHomeData();
  }, []);
  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="white" />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.headerContainer}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/icons/LoginIcon.png')} style={styles.thumbnail} />
            <Text style={styles.logoText}>Subby</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home" size={25} color="#F47C25" />
          </TouchableOpacity>
        </View>

        <Text style={styles.welcomeText}>
          WELCOME BACK  REYAND SHARMA!
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CURRENT WORKSPACE</Text>
          <View style={styles.workspaceRow}>
            <Ionicons name="business-outline" size={20} color="#F47C25" />
            <Text style={styles.workspaceText}> Test company by yash</Text>
          </View>
        </View>

        <View style={styles.section1}>
          <Text style={styles.sectionTitle1}>NEXT PAYMENT DUE / STATUS</Text>
          <Text style={styles.paymentStatus}>PENDING YOUR TIMESHEET</Text>
        </View>

        <View style={styles.section2}>
          <Text style={styles.sectionTitle2}>CIS STATEMENTS</Text>
          <TouchableOpacity style={styles.statementButton} onPress={() => navigation.navigate("CisStatement")}>
            <Text style={styles.statementButtonText}>VIEW / DOWNLOAD STATEMENTS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOW TO GUIDES</Text>
          <Text style={styles.linkText}>
            Link to How to Guide Video's
          </Text>
        </View>
      </ScrollView>

      <View style={styles.contactFooter}>
        <View style={styles.contactLeft}>
          <Ionicons name="call" size={30} color="black" style={styles.phone} />
          <Text style={styles.contactLabel}>CONTACT SUBBY</Text>
        </View>
        <Text style={styles.contactEmail}>help@subbygroup.co.uk</Text>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C3C3C',
    fontFamily: 'Poppins',
  },
  thumbnail: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  welcomeText: {
    marginTop: 38,
    fontSize: 16,
    color: '#F47C25',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  section: {
    marginTop: 26,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Poppins',
  },
  section1: {
    marginTop: 60,
  },
  sectionTitle1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Poppins',
  },
  workspaceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  workspaceText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  paymentStatus: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Poppins',
   
    marginLeft:20,
  },
  section2: {
    marginTop: 45,
  },
  sectionTitle2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Poppins',
  },
  statementButton: {
    marginTop: 14,
    padding: 8,
    borderColor: '#F47C25',
    borderWidth: 1,
    borderRadius: 8,
  },
  statementButtonText: {
    color: '#F47C25',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  linkText: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
  contactFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:70,
  },
  phone:{
    marginLeft:20,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLabel: {
  
    width:"40%",
    marginLeft:8,
    textAlign: "center",
  },
  contactEmail: {
    color: '#f57c00',
    fontSize: 13,
    marginRight:15
  },
});

export default HomeScreen;





