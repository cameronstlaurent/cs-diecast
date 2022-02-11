import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

 document.querySelector("#carImage").addEventListener("change", onImageSelected);

 document.forms["carForm"].addEventListener("submit", onAddCar);

function onAddCar(e) {
     e.preventDefault();
     uploadNewCar();
 }

function onImageSelected(e) {
    //selected file
    //file objects [fileObj, fileObj, fileObj]
   let file = e.target.files[0];
    console.log(file)
    //upldate the display with the requested image
   document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function uploadNewCar() {
   //form data
   const car = document.querySelector('#carName').value.trim();
    const manufacturer = document.querySelector('#diecastManufacturer').value.trim();
    const price = document.querySelector('#price').value.trim();
    const file = document.querySelector('#carImage').files[0]

    //path to the data to write
     const imageRef = storageRef( storage, `cars/${file.name}`);
     const dataRef = databaseRef( db, 'cars')

     //uploading file to the storage bucket
    const uploadResult = await uploadBytes(imageRef, file);
     //url to the image stored in storage bucket
    const urlPath = await getDownloadURL(imageRef)
    // path on the storage bucket to the image
    const storagePath = uploadResult.metadata.fullPath;

    //firebase unique key
     const itemRef = await push(dataRef);


    set(itemRef, {
        key:itemRef.key,
        sku: `jhvr${itemRef.key}`,
         urlPath,
         storagePath,
        car,
        price, 
        manufacturer
     })

 }