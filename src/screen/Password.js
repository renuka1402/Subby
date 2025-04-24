
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendLink = () => {
 
    console.log("Sending reset link to:", email);
  };

  return (
    <View style={styles.container}>
      
         <View style={styles.logoContainer}>
        
    
             <View style={styles.logoWrapper}>
                           {/* <Image source={require('../assets/logo2.jpg')} style={styles.thumbnail}/> */}
                             <Text style={styles.logoText}>Subby</Text>
                           </View>
         </View>

      <Text style={styles.heading}>Forgot{'\n'}password?</Text>

      <Text style={styles.subText}>
        Please enter{'\n'}The Email address associated with your{'\n'}Account
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Your Email Address"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSendLink}>
        <Text style={styles.buttonText}>Send Link</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 16,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap:5
  
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C3C3C',
    fontFamily: 'Poppins',
  },
  thumbnail: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    
  },
  checkIcon: {
    fontSize: 13,
    color: '#f57c00',
    
  },
  logoText: {
    fontSize: 35,
    color:"gray",
  

  },
  appName: {
    fontSize:504,
    fontWeight: '600',
    color: '#666',
  },
  heading: {
    fontSize: 35,
 
    marginBottom: 16,
    color: '#000',
    marginTop:100,
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 12,
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#e76f00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width:"60%",
    alignSelf:"center"
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});