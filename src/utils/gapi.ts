import { gapi } from 'gapi-script';
import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/tasks.readonly";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL as string;

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export function initClient() {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      console.log('GAPI client initialized.');
    }).catch((error: any) => {
      console.error('Error initializing GAPI client', error);
    });
  });
}

export function handleAuthClick() {
  const authInstance = gapi.auth2.getAuthInstance();
  return authInstance.signIn().then(() => {
    console.log('User signed in');
  }).catch((error: any) => {
    console.error('Error during sign-in', error);
  });
}

export function handleSignoutClick() {
  const authInstance = gapi.auth2.getAuthInstance();
  return authInstance.signOut().then(() => {
    console.log('User signed out');
  }).catch((error: any) => {
    console.error('Error during sign-out', error);
  });
}

export function getUserProfile() {
  const authInstance = gapi.auth2.getAuthInstance();
  if (authInstance.isSignedIn.get()) {
    const user = authInstance.currentUser.get();
    const profile = user.getBasicProfile();
    return {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
    };
  }
  return null;
}

export function listTasks() {
  return gapi.client.tasks.tasks.list({
    tasklist: '@default'
  }).then((response: any) => {
    console.log('Tasks fetched:', response);
    return response;
  }).catch((error: any) => {
    console.error('Error fetching tasks', error);
  });
}

export const getGoogleAuthUrl = async () => {
  const response = await apiClient.get('/google/auth-url');
  return response.data.authUrl;
};
