//recuperation du local storage
let stockage = JSON.parse(localStorage.getItem("kanape"));
//classe ou injecter le code html
const pagePanier = document.querySelector("#cart__items");
//appel de l'api
const  dataProducts = fetch("http://localhost:3000/api/products");
//tableau de stockage de IDs
let products = [];
//OrderId
let orderid = "";
//validité formulaire
let checkValid = false;

//récuperation des donner en fonction de Lid
function getInfos(apiList,id){
  let toReturn=['img','imgAlt','nom','prix'];
  for (let k = 0; k < apiList.length; k++) {
      if(apiList["key",k]._id ==  id) {
        toReturn.img=apiList["key",k].imageUrl;
        toReturn.imgAlt=apiList["key",k].altTxt;
        toReturn.nom=apiList["key",k].name;
        toReturn.prix=apiList["key",k].price ;
        return toReturn;
      }
  }
}

dataProducts.then(async(response)=>{
  const produits = await response.json();
  affichage(produits);
}).catch((err)=> {
  alert(err)
});

//Suppression d'un article en local storage
function suppr( idProd, colorProd)
{
  for (let k = 0; k < stockage.length; k++) {
      if(stockage[k].id_ProduitSelectionner == idProd && stockage[k].couleur_Produit == colorProd){
        stockage.splice(k,1);
        localStorage.setItem('kanape',JSON.stringify(stockage));
      }
  }
}

//modification des quantités
function change( idProd, colorProd, newqte)
{
  //parcourir la stocakage (for)
  for (let k = 0; k < stockage.length; k++) {
      if(stockage[k].id_ProduitSelectionner == idProd && stockage[k].couleur_Produit == colorProd){
        console.log(newqte);
        stockage[k].quantite = newqte;
        localStorage.setItem('kanape',JSON.stringify(stockage));
      }
  }
}



//variable pour total prix et quantité
var totArt = 0;
var totalPrice = 0;




function affichage(apiList){
  //Verifiction de l'existence du local storage
  if(!stockage){    
    stockage = [];
    let produitsPanier = [] ;
  }

  let toDisplay=['img','imgAlt','nom','prix'];
  
// boucle qui parcour le local storage
  for (let k = 0; k < stockage.length; k++) {
    //remplissage du tableau contenant uniquement les id produits
    products[k]= stockage[k].id_ProduitSelectionner;

    //calcul des totaux
    toDisplay=getInfos(apiList,stockage[k].id_ProduitSelectionner);
    totalPrice += parseInt(toDisplay.prix) * parseInt(stockage[k].quantite);
   totArt += parseInt(stockage[k].quantite);
   
    //Ecriture dans l'html courant (innerHTML)
    document.querySelector("#cart__items").innerHTML += `
        <article class="cart__item" data-id="${stockage[k].id_ProduitSelectionner}" data-color="${stockage[k].couleur_Produit}">
            <div class="cart__item__img">
              <img src="${toDisplay.img}" alt="${toDisplay.imgAlt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${toDisplay.nom}</h2>
                <p>${stockage[k].couleur_Produit}</p>
                <p>${toDisplay.prix} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${stockage[k].quantite}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;


          //suppresion des articles
          let deleteBtn = document.querySelectorAll('.deleteItem');
          for(let btn of deleteBtn){
              btn.addEventListener('click', (e) =>{
                suppr(btn.closest("article").getAttribute("data-id"),btn.closest("article").getAttribute("data-color"));
                location.reload();               
              })
          }
          //changement des quantité
          let changeBtn = document.querySelectorAll('.itemQuantity');
          for(let btn of changeBtn){
            btn.addEventListener('change', (e) =>{
              change(btn.closest("article").getAttribute("data-id"),btn.closest("article").getAttribute("data-color"),btn.value);
              location.reload();
            })
          }

}  
  // affichage des totaux Quantite et prix
    document.querySelector("#totalQuantity").innerHTML += totArt;
    document.querySelector("#totalPrice").innerHTML += totalPrice;
};
   
  

for (let k = 0; k < stockage.length; k++) {

}

//recuperation des valeurs formulaire
const btnCommander = document.querySelector("#order");
btnCommander.addEventListener("click", (e)=>{
  e.preventDefault();
  //delcaration du contact a envoyer en POST
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName:document.querySelector("#lastName").value,
    address:document.querySelector("#address").value,
    city:document.querySelector("#city").value,
    email:document.querySelector("#email").value,
  }
  //validation du formulaire 
  var regExPrenomNomVille = /^[A-Za-z-]{3,33}$/;
  var regExAdresse = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  var regExEmail =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  // controle du formulaire 
  function controlePrenom() {
    const Prenom = contact.firstName;
    if (regExPrenomNomVille.test(Prenom)) {
       return true;
    }else {
      document.querySelector("#firstNameErrorMsg").innerHTML = "veuillez remplir le champ Prenom";
      return false;
    }
  };
  function controleNom() {
    const Nom = contact.lastName;
    if (regExPrenomNomVille.test(Nom)) {
      return true;
    }else {
      document.querySelector("#lastNameErrorMsg").innerHTML = "veuillez remplir le champ Nom";
    return false;
    }
  };
  function controleVille() {
    const Ville = contact.city;
    if (regExPrenomNomVille.test(Ville)) {
      return true;
    }else {
      document.querySelector("#cityErrorMsg").innerHTML = "veuillez remplir le champ Ville"; 
      return false;
    }
  };
  function controleAdresse(){
    const Adresse = contact.address;
    if (regExAdresse.test(Adresse)) {
      return true;
    }else{
      document.querySelector("#addressErrorMsg").innerHTML = "veuillez remplir le champ Adresse";
      return false;
    }
  };
  function controleEmail(){
    const Email = contact.email;
    if (regExEmail.test(Email)){
    return true;
    }else{
      document.querySelector("#emailErrorMsg").innerHTML = "veuillez remplir le champ Email";
    return false;
    }
  };  
  //affichage du message d'erreur si une des conditions nest pas remplie
  if(controlePrenom() && controleNom() && controleVille() && controleAdresse()  && controleEmail()) {
    localStorage.setItem("Contact", JSON.stringify(contact));
  checkValid = true; 
  }else{
    alert("veuillez remplir le formulaire");
  };
//envoye vers le serveur et reccuperation du num de commande
  const url = "http://localhost:3000/api/products/order";
  let aEnvoyer = {
    contact,
    products,
  }
  //requete au serveur pour recuperer orderId
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(aEnvoyer),
    headers: { 
      'Content-Type': 'application/json'
    },      
  })
  .then(result => result.json())
  .then(data => {
    orderid = data.orderId;
    console.log(orderid)
    //envoie sur la page confirmation 
    if(checkValid)
    {
      window.location = "confirmation.html?orderid=" + orderid;
    }
  })
  .catch(err => {
    console.error(err);
  });
});
