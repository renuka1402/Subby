import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';  // Add this line

const WorkspaceDetails = ({ navigation, route }) => {
  const { workspace, id } = route.params;
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);  // For download state
  const token = useSelector(state => state.auth.token);

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

  const handleDownloadDocument = async () => {
    try {
      setDownloading(true); 

      const localToken = token || (await AsyncStorage.getItem('authToken'));

      const { config, fs } = RNFetchBlob;
      const filePath = `${fs.dirs.DownloadDir}/workspace_doc_${Date.now()}.pdf`;

      config({
        fileCache: true,
        appendExt: 'pdf',
        path: filePath,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading document',
          title: 'Workspace Document',
          mime: 'application/pdf',
          mediaScannable: true,
        },
      })
        .fetch('GET', `https://devapi.subbygroup.co.uk/site/documents/${document.image}`, {
          Authorization: localToken,
          Accept: 'application/pdf',
        })
        .then(res => {
          console.log('Document downloaded to:', res.path());
          Alert.alert('Success', 'Document downloaded successfully!');
        })
        .catch(err => {
          console.log('Download error:', err);
          Alert.alert('Error', 'Failed to download document.');
        })
        .finally(() => setDownloading(false)); // End the download and hide the loader
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Something went wrong.');
      setDownloading(false); // Ensure loader hides in case of an error
    }
  };
  
  const handleViewPDF = () => {
    if (document?.image) {
      const fullPdfUrl = `https://devapi.subbygroup.co.uk/site/documents/${document.image}`;
      navigation.navigate('AnotherTest', {
        documentUrl: fullPdfUrl,
        documentName: document.name,
      });
    } else {
      Alert.alert('No PDF file found.');
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Workspaces</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color="#F47C25" />
        </TouchableOpacity>
      </View>

      <View style={styles.workspaceRow}>
        <Image
          source={
            workspace.logo
              ? {
                  uri: `https://devapi.subbygroup.co.uk/contractor/profile/${workspace.logo}`,
                }
              : " "
          }
          style={styles.thumbnail}
        />
        <Text style={styles.companyText}>{workspace.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDownloadDocument}
          disabled={downloading} // Disable button while downloading
        >
          {downloading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Download Contract</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Document Details</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#f27c24" />
      ) : document ? (
        <View style={styles.documentRow}>
          <View style={styles.docLeft}>
            <View style={styles.docIcon}>
              <Icon name="file-document" size={15} color="#f97316" />
            </View>
            <View>
              <Text style={styles.docText}>{document.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewBtn} onPress={handleViewPDF}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ color: 'gray', paddingVertical: 10 }}>No document found.</Text>
      )}
    </ScrollView>
  );
};

export default WorkspaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginLeft: 120,
    alignItems: 'center',
    gap: 90,
    marginTop: 15,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
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
    flexShrink: 1,
    maxWidth: '50%',
  },
  button: {
    backgroundColor: '#f27c24',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    paddingTop: 10,
    marginTop: 10,
  },
  documentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  docIcon: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 8,
  },
  docText: {
    fontSize: 15,
    color: '#555',
  },
  viewBtn: {
    borderWidth: 1,
    borderColor: '#f27c24',
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  viewText: {
    color: '#f27c24',
  },
});
