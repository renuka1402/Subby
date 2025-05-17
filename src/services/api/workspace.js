

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '../../constants/baseURL';


export const getWorkspaceDocument = async (id, tokenFromRedux) => {
  const token = await AsyncStorage.getItem('authToken');

  const response = await axios.get(`${BASE_URL}/sole-trader/get-site-document/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data.data;
};

export const downloadWorkspaceDocument = async (documentImage, tokenFromRedux, RNFetchBlob) => {
  const token = await AsyncStorage.getItem('authToken');
  const { config, fs } = RNFetchBlob;
  const filePath = `${fs.dirs.DownloadDir}/workspace_doc_${Date.now()}.pdf`;

  return config({
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
  }).fetch('GET', `${BASE_URL}/site/documents/${documentImage}`, {
    Authorization: token,
    Accept: 'application/pdf',
  });
};
