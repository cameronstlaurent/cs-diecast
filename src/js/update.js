import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'; 
import {ref as databaseRef, update, set, get} from 'firebase/database'
import {db, storage } from './libs/firebase/firebaseConfig';

// const key = sessionStorage.getItem('key');
const carForm = document.forms['carForm']

document.querySelector("#carImage").addEventListener("change", onImageSelected);

async function pageInit(){
    const key = sessionStorage.getItem('key');
    const carRef = databaseRef(db, `cars/${key}`);
    const carSnapShot = await get(carRef);
    console.log(key);
    

    if(carSnapShot.exists()) {
        setFieldValues(carSnapShot.val());
    }

        carForm.addEventListener('submit', onUpdateCar)
}


    function onUpdateCar(e) {
        e.preventDefault();
        updateCarData();
    }

    function onImageSelected(e) {
        //selected file
        //file objects [fileObj, fileObj, fileObj]
       let file = e.target.files[0];
        console.log(file)
        //upldate the display with the requested image
       document.querySelector(".display img").src = URL.createObjectURL(file);
    }
    


    function setFieldValues({car, price, manufacturer, urlPath}){
        carForm.elements['carName'].value = car;
        document.querySelector('#price').value = price;
        document.querySelector('#diecastManufacturer').value = manufacturer;
        document.querySelector('#uploadImage img').src = urlPath;
    }

    async function updateCarData(){
        const key = sessionStorage.getItem('key');
        const dataRef = databaseRef(db, `cars/${key}`);
        const car = carForm.elements['carName'].value.trim();
        const price = carForm.elements['price'].value.trim();
        const manufacturer = carForm.elements['diecastManufacturer'].value.trim();
        const file = carForm.elements['carImage'].files[0];
        // const sku = dataRef.sku;


        if(file.length !== 0){
            const imageRef = storageRef(storage, `cars/${file.name}`);
            //uploading file to the storage bucket
            const uploadResult =  await uploadBytes(imageRef, file);
            //url to the image stored in storage bucket
            const urlPath =  await getDownloadURL(imageRef);
            // path on the storage bucket to the image
            const storagePath = uploadResult.metadata.fullPath;
            

            update(dataRef, {
                key,
                sku:`jhvr${key}`,
                urlPath,
                storagePath,
                car,
                price, 
                manufacturer
           })
        }

    }

pageInit()








