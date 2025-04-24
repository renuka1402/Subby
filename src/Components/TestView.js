import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Pdf from 'react-native-pdf';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TestView = () => {
  const navigation = useNavigation();
  // const source = require('../assets/test.pdf');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Documents</Text>
          <TouchableOpacity  onPress={()=>navigation.navigate("Home")}>  
                     <Ionicons name="home" size={25} color="#F47C25" />
                     </TouchableOpacity>
      </View>

      <View style={styles.workspaceCard}>
  {/* <Image
    source={require('../assets/screenshot.jpg')}
    style={styles.thumbnail}
  /> */}
  <Text style={styles.companyText}>Test company by yash</Text>
</View>

        <Text style={styles.testing}> Test</Text>
        <Pdf
        source={source}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log('PDF Error:', error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity> 
    </View>
  );
};

export default TestView;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 120,
    alignItems: 'center',
    marginBottom: 20,
    gap: 80,
    marginTop:10,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  testing:{
marginLeft:30,
fontSize:16,
marginTop:13,

  },
  workspaceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
  marginTop:10,
    marginVertical: 10,
  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  
  workspaceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  companyText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  pdf: {
    flex: 0,
    width: '85%',
    height: 380, 
    alignSelf: 'center',
    margin: 4,
    borderWidth: 1.8,
    borderStyle: 'dashed',
    borderColor: '#f57c00',
    borderRadius:10,
  },
  
  button: {
    backgroundColor: '#f27c24',
    margin: 15,
    paddingVertical: 12,
    borderRadius: 12,
    width:"80%",
    alignSelf:"center",
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',

    fontSize:17,
  },
});
