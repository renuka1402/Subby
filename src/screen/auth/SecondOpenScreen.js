import React, { useEffect } from 'react';
import { View, Image, StyleSheet ,StatusBar} from 'react-native';

const SecondOpenScreen = ({ navigation }) => {
  useEffect(() => {
 
    setTimeout(() => {
      navigation.replace('Login'); 
    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
            <StatusBar backgroundColor="rgb(227, 113, 31)" barStyle="dark-content" />
      <Image source={require('../../assets/images/logo4.jpg')} style={styles.image} />
    </View>
  );
};

export default SecondOpenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgb(227, 113, 31)',
  },
  image: {
    width: 150, 
    height: 150,
    resizeMode: 'contain', 
  },
});
