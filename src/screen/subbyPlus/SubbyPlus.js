import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SubbyPlusScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>SUBBY PLUS </Text>
      <Text style={styles.text}>COMING SOON</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',      
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 23,
    color: '#F47C25',          
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 20,
    color: '#F47C25',          
    
  },
});

export default SubbyPlusScreen;
