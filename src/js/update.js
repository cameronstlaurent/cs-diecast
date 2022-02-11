import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'; 
import {ref as databaseRef, set, get} from 'firebase/database'
import {db, storage } from './libs/firebase/firebaseConfig';

const carForm = document.forms['carForm']

async function pageInit(){
    const key = sessionStorage.getItem('key');
    const carRef = databaseRef(db, `cars/${key}`);
    const carSnapShot = await get(carRef);
    

    if(carSnapShot.exists()) {
        setFieldValues(carSnapShot.val());
    }

        carForm.addEventListener('submit', onUpdateCar)
}


    function onUpdateCar(e) {
        e.preventDefault();
        const car = e.target.elements['carName'].value.trim();
        const price = e.target.elements['price'].value.trim();
        const manufacturer = e.target.elements['carType'].value.trim();
        const file = e.target.elements['carImage'].files[0];
        updateCarData(car, price, manufacturer, file);
    }


    function setFieldValues({car, price, manufacturer, urlPath}){
        carForm.elements['carName'].value = car;
        document.querySelector('#price').value = price;
        document.querySelector('#carType').value = manufacturer;
        document.querySelector('#uploadImage img').src = urlPath;
    }

    function updateCarData(){
        const car = carForm.elements['carName'].value.trim();
        const price = carForm.elements['price'].value.trim();
        const manufacturer = carForm.elements['carType'].value.trim();
        const file = carForm.elements['carImage'].files;
        if(file.length !== 0){
            const key = sessionStorage.getItem('key');
            const dataRef = databaseRef(db, `cars/${key}`);
            const imageRef = storageRef(storage, `cars/${file.name}`);
            const uploadResult = uploadBytes(imageRef, file);

            const urlPath = getDownloadURL(imageRef);
            const storagePath = uploadResult.metadata.fullPath;

            set(dataRef, {
                urlPath,
                storagePath,
                car,
                price, 
                manufacturer
           })
        }

    }


    
pageInit()








