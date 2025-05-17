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
import RNFetchBlob from 'rn-fetch-blob';  
import Header from '../../component/Header';
import { getWorkspaceDocument, downloadWorkspaceDocument } from '../../services/api/workspace';


const WorkspaceDetails = ({ navigation, route }) => {
  const { workspace, id } = route.params;
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);  
  const token = useSelector(state => state.auth.token);

  const fetchDocuments = async () => {
    try {
      const doc = await getWorkspaceDocument(id, token);
      setDocument(doc);
    } catch (error) {
      console.error('Error fetching documents:', error?.response?.data?.message);
      Alert.alert('Error', 'Failed to load document.', error?.response?.data?.message || '');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDownloadDocument = async () => {
    try {
      setDownloading(true);
      const res = await downloadWorkspaceDocument(document.image, token, RNFetchBlob);
      console.log('Document downloaded to:', res.path());
      Alert.alert('Success', 'Document downloaded successfully!');
    } catch (err) {
      console.log('Download error:', err?.response);
      Alert.alert('Error', 'Failed to download document.', err.response || '');
    } finally {
      setDownloading(false);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
  <Header title="Workspaces Detail"/>

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
          disabled={downloading} 
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
