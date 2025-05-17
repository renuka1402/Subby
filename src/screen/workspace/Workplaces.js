import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Header from '../../component/Header';

const WorkplacesScreen = ({ navigation }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const fetchWorkspaces = async () => {
    try {
      const localToken = token || (await AsyncStorage.getItem('authToken'));
      const response = await axios.get(
        'https://devapi.subbygroup.co.uk/sole-trader/get-all-workspaces',
        {
          headers: {
            Authorization: localToken,
          },
        }
      );
      setWorkspaces(response.data.data || []);
      console.log(workspaces);
      
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <View style={styles.container}>

   <Header title='Workspaces'/>

      <Text style={styles.subTitle}>Your Workspaces</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#F47C25" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView >
          {workspaces.map((workspace, index) => {
            const imageUrl =  `https://devapi.subbygroup.co.uk/contractor/profile/${workspace.logo}`
            
              {console.log(4343,imageUrl);
              }

            return (
              <TouchableOpacity
                key={index}
                style={styles.workspaceItem}
                onPress={() => navigation.navigate('WorkspaceDetail', {id:workspace.id, workspace })}
              >
                <Image
                  source={
                    imageUrl
                      ? { uri: imageUrl }
                      :""
                  }
                  style={styles.thumbnail}
                />
                <Text style={styles.workspaceName}>{workspace.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
  
    alignItems: 'center',
    marginBottom: 20,
    gap:100,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft:100,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  workspaceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  thumbnail: {
    width: 35,
    height: 70,
   
    marginRight: 10,
  },
  workspaceName: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default WorkplacesScreen;
