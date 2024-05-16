import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.CLIENT_ID || '';
const API_KEY = process.env.API_KEY || '';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/tasks.readonly";

export function initClient() {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
      redirect_uri: "http://localhost:5173"
    }).then(() => {
      console.log('GAPI client initialized.');
    }).catch((error: any) => {
      console.error('Error initializing GAPI client', error);
    });
  });
}

export function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

export function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}

export function listTasks() {
  return gapi.client.tasks.tasks.list({
    tasklist: '@default'
  });
}
