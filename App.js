

import React from 'react';
import { Provider } from 'react-redux';
import { store ,persistor} from './src/services/redux/store';
import RootStack from './src/navigation/RootStack';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
      <RootStack />
      </PersistGate>
    </Provider>
  );
};

export default App;



// import React, { useEffect } from 'react';
// import { View, Button, PermissionsAndroid, Platform } from 'react-native';
// import notifee, { AndroidImportance } from '@notifee/react-native';

// async function requestPermissions() {
//   if (Platform.OS === 'android') {
//     await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
//   }
// }

// async function displayNotification() {

//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     importance: AndroidImportance.HIGH,
//   });

//   await notifee.displayNotification({
//     title: ' Test Notification',
//     body: 'This is a sample notification from Notifee!',
//     android: {
//       channelId,
//       smallIcon: 'ic_launcher', 
//     },
//   });
// }

// export default function App() {
//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Show Notification" onPress={displayNotification} />
//     </View>
//   );
// }



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const TicketsScreen = () => {
//   const [downloading, setDownloading] = useState(false);

//   const handleDownload = async () => {
//     const token = await AsyncStorage.getItem('authToken'); // your token key

//     if (!token) {
//       Alert.alert('Error', 'Authentication token missing!');
//       return;
//     }

//     const { config, fs } = RNFetchBlob;
//     const downloadDir = fs.dirs.DownloadDir;
//     const filePath = `${downloadDir}/tickets_${Date.now()}.pdf`;

//     setDownloading(true);

//     config({
//       fileCache: true,
//       appendExt: 'pdf',
//       notification: true, 
//       path: filePath,
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: filePath,
//         description: 'Downloading tickets PDF',
//         mime: 'application/pdf',
//         title: 'Tickets Download',
//         mediaScannable: true,
//       },
//     })
//       .fetch('GET', 'https://devapi.subbygroup.co.uk/sole-trader/download-all-tickets', {
//         Authorization: token,
//         Accept: 'application/pdf',
//       })
//       .then(res => {
//         console.log('File saved to:', res);
//         Alert.alert('Success', 'Tickets downloaded successfully');
//       })
//       .catch(err => {
//         console.log('Download error:', err);
//         Alert.alert('Error', 'Failed to download tickets');
//       })
//       .finally(() => {
//         setDownloading(false);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Your Tickets</Text>

//       <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
//         <Text style={styles.btnText}>Download Tickets</Text>
//       </TouchableOpacity>

//       {downloading && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="#f17300" />
//           <Text style={{ marginTop: 8 }}>Downloading tickets...</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default TicketsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },
//   downloadBtn: {
//     backgroundColor: '#f17300',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   btnText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   loaderContainer: {
//     marginTop: 30,
//     alignItems: 'center',
//   },
// });



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import RNFS from 'react-native-fs';
// import { Buffer } from 'buffer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FileViewer from 'react-native-file-viewer';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useSelector } from 'react-redux';

// const TicketsScreen = ({ navigation }) => {
//   const [downloading, setDownloading] = useState(false);
//   const [filePath, setFilePath] = useState(null);
//   const token1 = useSelector(state => state.auth.token);

//   const handleDownload = async () => {
//     setDownloading(true);
//     try {
//       // Request storage permission on Android
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission',
//             message: 'App needs access to your storage to download the file.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert('Permission Denied', 'Cannot download without storage permission.');
//           setDownloading(false);
//           return;
//         }
//       }

//       const token = token1 || (await AsyncStorage.getItem('authToken'));
//       const fileUrl = 'https://devapi.subbygroup.co.uk/sole-trader/download-all-tickets';
//       const localFile = `${RNFS.DownloadDirectoryPath}/tickets.pdf`;

//       const response = await fetch(fileUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: token,
//           Accept: 'application/pdf',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch PDF. Status: ${response.status}`);
//       }

//       const arrayBuffer = await response.arrayBuffer();
//       const base64String = Buffer.from(arrayBuffer).toString('base64');

//       await RNFS.writeFile(localFile, base64String, 'base64');
//       setFilePath(localFile);

//       FileViewer.open(localFile)
//         .then(() => {
//           console.log('PDF opened successfully');
//         })
//         .catch(error => {
//           console.log('FileViewer error:', error);
//           Alert.alert('No App Found', 'Please install a PDF viewer like Adobe Reader.');
//         });
//     } catch (error) {
//       console.error('PDF Download Error:', error);
//       Alert.alert('Error', error.message);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Tickets</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Ionicons name="home" size={25} color="#F47C25" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={styles.addTicketContainer}
//         onPress={() => navigation.navigate('AddTicket')}
//       >
//         <MaterialCommunityIcons name="ticket-outline" size={20} color="#000" />
//         <Text style={styles.addTicketText}>Add A New Ticket</Text>
//         <Ionicons name="chevron-forward" size={20} color="#000" />
//       </TouchableOpacity>

//       <View style={styles.ticketsHeader}>
//         <Text style={styles.yourTicketsText}>Your Tickets</Text>
//         <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
//           <Text style={styles.downloadButtonText}>Download Tickets</Text>
//         </TouchableOpacity>
//       </View>

//       {downloading && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="#f17300" />
//         </View>
//       )}

//       <View style={styles.documentRow}>
//         <View style={styles.docLeft}>
//           <View style={styles.docIcon}>
//             <Icon name="file-document" size={15} color="#f97316" />
//           </View>
//           <View>
//             <Text style={styles.docText}>Valorant</Text>
//             <Text style={styles.docDate}>10-May-2025</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.viewBtn1}>
//           <Text style={styles.viewText}>EXPIRING</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('Valorant')}>
//           <Text style={styles.viewText}>View/Edit</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default TicketsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 15,
//     paddingHorizontal: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 110,
//     alignItems: 'center',
//     paddingBottom: 30,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontFamily: 'Poppins-SemiBold',
//     marginLeft: 130,
//     fontWeight: 'bold',
//   },
//   addTicketContainer: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     marginBottom: 20,
//   },
//   addTicketText: {
//     flex: 1,
//     marginLeft: 10,
//     fontFamily: 'Poppins-Medium',
//     fontSize: 14,
//   },
//   documentRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     marginTop: 10,
//   },
//   docLeft: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   docIcon: {
//     backgroundColor: '#eee',
//     borderRadius: 10,
//     padding: 8,
//   },
//   docText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   docDate: {
//     fontSize: 10,
//   },
//   viewBtn: {
//     borderWidth: 1,
//     paddingVertical: 3,
//     paddingHorizontal: 8,
//     borderRadius: 6,
//   },
//   viewBtn1: {
//     borderWidth: 1,
//     borderColor: '#f27c24',
//     paddingVertical: 3,
//     paddingHorizontal: 8,
//     borderRadius: 6,
//     marginLeft: 70,
//   },
//   viewText: {
//     fontSize: 10,
//   },
//   ticketsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   yourTicketsText: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 14,
//   },
//   downloadButton: {
//     borderColor: '#000',
//     borderWidth: 1,
//     borderRadius: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   downloadButtonText: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: 12,
//   },
//   loaderContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
// });




