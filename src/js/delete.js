import {ref as dataRef, get, set, update, remove} from 'firebase/database'; 
import {db} from './libs/firebase/firebaseConfig';
import {buyCars} from './templates/buyCars'
console.log(db)

async function pageInit(){
    const key = sessionStorage.getItem('key');
    console.log(key)
    //read in the object RTD with that key
    const carRef = dataRef(db, `cars/${key}`);
    remove(carRef);
    carRef.remove(0);
}

pageInit()