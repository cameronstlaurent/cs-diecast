import {ref as dataRef, get, set, update} from 'firebase/database'; 
import {db} from './libs/firebase/firebaseConfig';
import {buyCars} from './templates/buyCars'
console.log(db)

async function pageInit(){
    const carRef = dataRef(db, 'cars/');
    const carSnapShot = await get(carRef)
    const data = carSnapShot.val();
    // data you need to know its structure
    // firebase structure Obj of Objects {{}, {}, {}, {}, {} }
    // Obj.keys Obj.values Object.entries
    const cards = Object.values(data).map(car=>{
        // console.log(vacationRental(rental))
    const card = buyCars(car)
    document.querySelector('#card-display').append(card)
    return null

    })
}

pageInit()
