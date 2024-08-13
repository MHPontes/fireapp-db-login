import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {      // Configurações do Firebase, que são obtidas no momento da criação do projeto no Firebase

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  
    authDomain: "curso-96cde.firebaseapp.com",
  
    projectId: "curso-96cde",
  
    storageBucket: "curso-96cde.appspot.com",
  
    messagingSenderId: "318928259455",
  
    appId: "1:318928259455:web:ef4bb98c9b95c6f653324a",
  
    measurementId: "G-94PJKS3455"
  
  };

const firebaseApp = initializeApp(firebaseConfig);   // Iniciando o Firebase com as configurações do firebaseConfig

const db = getFirestore(firebaseApp);  // Iniciando o Firestore com as configurações do firebaseApp
const auth = getAuth(firebaseApp);    // Iniciando o Auth com as configurações do firebaseApp

export { db, auth };   // Exportando o db para ser utilizado em outros arquivos