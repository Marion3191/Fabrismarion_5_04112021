//récuperation de l'orderId dans le localstorage
const idCom = localStorage.getItem("orderid");


//selection du dom pour le positionnement
const pageConfirmation = document.querySelector("#orderId").innerHTML += `${idCom}`


//effecaer le local stage
function suppLocalStorage(key){
    localStorage.removeItem(key);
};

suppLocalStorage("orderid")