/*
    templating 
    tempalte literals settup
*/

function buyCars({ key, car, urlPath, manufacturer, price }) {
    const template = `
    <div class="card" data-key="${key}">
        <img src="${urlPath}" alt="${car}">
        <div class="card-text">
        <p>${manufacturer}</p>
            <div class="name-price">
            <p>${car}</p>
            <p>${price}</p>
            </div>
        </div>
            <button class="buy-now" id="buy">Buy Now</button>
            <button class="delete" id="delete" data-key="${key}">Delete</button>
            <button class="edit" id="edit" data-key="${key}">Edit</button>
    </div>
    `;
    const element = document.createRange().createContextualFragment(template).children[0];
    addCarControls(element);
    return element;
}

function addCarControls(car) {
    car.querySelector("#edit").addEventListener("click", onEditCar);
    car.querySelector("#delete").addEventListener("click", onDeleteCar);
}

function onEditCar(e) {
    const key = e.target.dataset.key;
    sessionStorage.setItem("key", key);
    window.location.assign("update.html");
}

function onDeleteCar(e) {
    const key = e.target.dataset.key;
    sessionStorage.setItem("key", key);
    window.location.assign("delete.html");
}

export { buyCars };
