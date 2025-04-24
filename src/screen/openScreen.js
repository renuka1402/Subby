import React, { useEffect } from 'react';
import { View, Image, StyleSheet,StatusBar } from 'react-native';

const OpenScreen = ({ navigation }) => {
  useEffect(() => {

    setTimeout(() => {
      navigation.navigate('SecondOpen'); 
    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
   
   
      {/* <Image source={require('../assets/logo3.jpg')} style={styles.image} /> */}
    </View>
  );
};

export default OpenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  image: {
    width: 100, 
    height: 100,
    resizeMode: 'contain', 
  },
});
