import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyB-xgiEklsBn7-2_Aa2NT9168ENNvfmdTA",
    authDomain: "todoapp-b257b.firebaseapp.com",
    databaseURL: "https://todoapp-b257b.firebaseio.com",
    projectId: "todoapp-b257b",
    storageBucket: "todoapp-b257b.appspot.com",
    messagingSenderId: "470082646318"
};
firebase.initializeApp(config);
export default firebase;