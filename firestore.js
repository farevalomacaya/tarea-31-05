// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { addDoc,collection,getFirestore,onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOGyGf0HaG7IL7vlX15m1tb378chtlfjA",

    authDomain: "estacionamientoinacap-103bd.firebaseapp.com",
  
    projectId: "estacionamientoinacap-103bd",
  
    storageBucket: "estacionamientoinacap-103bd.appspot.com",
  
    messagingSenderId: "791685655254",
  
    appId: "1:791685655254:web:959900735dc8a23b143777"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getFirestore es una funcion de firestorm que retorna la Base de datos para su uso
const db = getFirestore(app)
//funcion para guardar datos
export const save = (emp) => {
  //addDoc es una funcion de firestore que permite añadir un nuevo documento
  //collection es una funcion que recibe la base de datos y la coleccion
  addDoc(collection(db,'Registros'),emp)
}
//funcion que trae todos los documentos de la coleccion
export const getData = (data) => {
  //onSnapshot es el metodo que permite traer todos los documentos y asignarlos a variable "data"
  onSnapshot(collection(db,'Registros'),data)
}

//función remove que sirve para eliminar un documento
export const remove = (id) =>{
  //deleteDoc es una funcion de Firestore que permite eliminar un documento. Se le pasa la db, la colección (Empleados) y el id
  //doc permite traer un documento POR SU ID
  deleteDoc(doc(db,'Registros',id))
}

//funcion que me permite seleccionar un documento
//getDoc es la funcion de firestore que permite obtener un documento por su id
export const selectOne = (id) => getDoc(doc(db,'Registros',id))

//crearemos la funcion que permita editar un documento
export const edit = (id,vehiculo)=>{
  //updateDoc es la función de firestore que permite modificar un documento
  updateDoc(doc(db,'Registros',id),vehiculo)
}