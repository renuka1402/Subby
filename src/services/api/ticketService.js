import axios from 'axios';
import {getAuthToken } from '../token/token';
import { BASE_URL } from '../../constants/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux'; 



export const getAllTickets = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const response = await axios.get(`${BASE_URL}/sole-trader/get-all-tickets`, {
    headers: { Authorization: token },
  });
  return response.data.data.rows;
};

export const downloadTicketsPDF = async (RNFetchBlob) => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) throw new Error('Token not found');

  const { config, fs } = RNFetchBlob;
  const filePath = `${fs.dirs.DownloadDir}/tickets_${Date.now()}.pdf`;

  return config({
    fileCache: true,
    appendExt: 'pdf',
    path: filePath,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: filePath,
      description: 'Downloading your tickets PDF',
      title: 'Tickets Download',
      mime: 'application/pdf',
      mediaScannable: true,
    },
  }).fetch('GET', `${BASE_URL}/sole-trader/download-all-tickets`, {
    Authorization: token,
    Accept: 'application/pdf',
  });
};








// src/services/ticketService.js






export const fetchAllTickets = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const response = await axios.get(`${BASE_URL}/sole-trader/get-all-tickets`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data.data.rows;
};

export const submitTicketForm = async ({ value, currentDate, ticketFront, ticketBack }) => {
  const formData = new FormData();
  formData.append('ticket_id', value);
  formData.append('expiry_date', currentDate);

  formData.append('front_image', {
    uri: ticketFront.uri,
    name: ticketFront.fileName || 'front.jpg',
    type: ticketFront.type || 'image/jpeg',
  });

  formData.append('rear_image', {
    uri: ticketBack.uri,
    name: ticketBack.fileName || 'rear.jpg',
    type: ticketBack.type || 'image/jpeg',
  });

  const token = await AsyncStorage.getItem('authToken');

  const response = await axios.post(`${BASE_URL}/sole-trader/add-ticket`, formData, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};


