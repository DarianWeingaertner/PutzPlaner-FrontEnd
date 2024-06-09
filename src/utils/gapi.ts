import { gapi } from 'gapi-script';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/tasks.readonly";

export function initClient() {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).then(() => {
      console.log('GAPI client initialized.');
    }).catch((error: any) => {
      console.error('Error initializing GAPI client', error);
    });
  });
}

export function handleAuthClick() {
  const authInstance = gapi.auth2.getAuthInstance();
  if (authInstance) {
    authInstance.signIn();
  } else {
    console.error('GAPI Auth instance is not initialized.');
  }
}

export function handleSignoutClick() {
  const authInstance = gapi.auth2.getAuthInstance();
  if (authInstance) {
    authInstance.signOut();
  } else {
    console.error('GAPI Auth instance is not initialized.');
  }
}

export function listTasks() {
  return gapi.client.tasks.tasks.list({
    tasklist: '@default'
  });
}

