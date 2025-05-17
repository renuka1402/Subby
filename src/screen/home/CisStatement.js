import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const months = [
  '5th January',
  '5th February',
  '5th March',
  '5th April',
  '5th May',
  '5th June',
  '5th July',
  '5th August',
  '5th September',
  '5th October',
  '5th November',
  '5th December',
];

const CISStatements = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f17300" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>CIS STATEMENTS</Text>
        <TouchableOpacity>
          <TouchableOpacity  onPress={()=>navigation.navigate("Home")}>  
                     <Ionicons name="home" size={25} color="#F47C25" />
                     </TouchableOpacity>
        </TouchableOpacity>
      </View>

   
      <Text style={styles.statementText}>STATEMENT DATE</Text>

    
      <View style={styles.tableHeader}>
        <Text style={styles.yearText}>YEAR</Text>
        <Text style={styles.monthText}>MONTH</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {months.map((month, index) => (
          <View
            key={index}
            style={ styles.tableRow}>
            {index === 0 ? (
              <Text style={styles.yearCell1}>2025</Text>
            ) : (
              <Text style={styles.yearCell}></Text>
            )}
            <Text style={styles.monthCell}>{month}</Text>
            <Text style={styles.naText}>N/A</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CISStatements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:60,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft:100,
  },
  statementText: {
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    marginTop: 50,
    paddingBottom: 4,
  },
  yearText: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 12,
    
  },
  monthText: {
    width: '50%',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 40, 
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  yearCell: {
    width: '30%',
    fontSize: 13,
  },
  yearCell1: {
    width: '30%',
    fontSize: 11,
    borderBottomColor: '#f17300',
    borderBottomWidth: 2,
  },
  monthCell: {
    width: '35%',
    fontSize: 11,
    marginLeft: 30, 
  },
  naText: {
    fontSize: 11,
    width: '20%',
    color: '#555',
    marginRight: 0, 
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#999',
    lineHeight: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
