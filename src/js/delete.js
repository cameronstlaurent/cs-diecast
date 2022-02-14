import { ref as dataRef, get, set, update, remove } from "firebase/database";
import { db } from "./libs/firebase/firebaseConfig";
console.log(db);

async function pageInit() {
    const key = sessionStorage.getItem("key");
    console.log(key);
    //read in the object RTD with that key
    const carRef = dataRef(db, `cars/${key}`);
    // remove(carRef);
    const deleteItem = document.getElementById("delete");
    const exit = document.getElementById("exit");

    deleteItem.addEventListener("click", () => {
        remove(carRef);
        alert("Item successfully deleted");
    });

    exit.addEventListener("click", () => {
        window.location.assign("index.html");
    });
}

pageInit();