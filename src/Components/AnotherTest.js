import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Pdf from 'react-native-pdf';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnotherTestView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [document, setDocument] = useState(null);
  const { documentUrl, documentName, companyName, logo } = route.params;
  console.log(documentUrl);
  

  const source = { uri: documentUrl, cache: true };
  const fetchDocuments = async () => {
    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));

      const response = await axios.get(
        `https://devapi.subbygroup.co.uk/sole-trader/get-site-document/${id}`,
        {
          headers: {
            Authorization: localToken,
          },
        }
      );

      const doc = response.data.data;
      setDocument(doc);
    } catch (error) {
      console.error('Error fetching documents:', error);
      Alert.alert('Error', 'Failed to load document.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Documents</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color="#F47C25" />
        </TouchableOpacity>
      </View>

      <View style={styles.workspaceCard}>
        {/* <Image
          source={logo ? { uri: logo } : require('../assets/screenshot.jpg')}
          style={styles.thumbnail}
        /> */}
        <Text style={styles.companyText}>{companyName || 'Test company'}</Text>
      </View>

      <Text style={styles.testing}>{documentName || 'Document'}</Text>

      <Pdf
        source={source}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page) => {
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

export default AnotherTestView;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  header: {
    flexDirection: 'row',
    marginLeft: 120,
    alignItems: 'center',
    marginBottom: 20,
    gap: 80,
    marginTop: 10,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  testing: {
    marginLeft: 30,
    fontSize: 16,
    marginTop: 13,
  },
  workspaceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginTop: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
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
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#f27c24',
    margin: 15,
    paddingVertical: 12,
    borderRadius: 12,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
  },
});
