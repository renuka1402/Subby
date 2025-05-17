import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, showHome = true }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {showHome && (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color="#F47C25" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
   
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
 
 
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',

    
  },
});

export default Header;
