//recuperation du local storage
let stockage = JSON.parse(localStorage.getItem("kanape"));
//classe ou injecter le code html
const pagePanier = document.querySelector("#cart__items");
//appel de l'api
const  dataProducts = fetch("http://localhost:3000/api/products");

let products = [];

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
})
.catch((err)=> {
  alert(err)
});
//variable pour total prix et quantité
 var totArt = 0;
 var totalPrice = 0;

function affichage(apiList)
{
  if(!stockage){    
    stockage = [];
    let produitsPanier = [] ;
  }

  let toDisplay=['img','imgAlt','nom','prix'];

  for (let k = 0; k < stockage.length; k++) {
    products[k]= stockage[k].id_ProduitSelectionner;

    toDisplay=getInfos(apiList,stockage[k].id_ProduitSelectionner);
    //calcul des totaux
    totalPrice += parseInt(toDisplay.prix) * parseInt(stockage[k].quantite);
    totArt += parseInt(stockage[k].quantite);
   
    document.querySelector("#cart__items").innerHTML += `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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
    }
  
    document.querySelector("#totalQuantity").innerHTML += totArt;
    document.querySelector("#totalPrice").innerHTML += totalPrice;
};

//modifier les quantités et supprimer les articles

let input = document.querySelector('.input');
let result = document.querySelector('[value=""]');
input.addEventListener(`change`, function() {
  result.Number = this.value;
});



//recuperation des valeurs formulaire ---> local storage
const btnCommander = document.querySelector("#order");
btnCommander.addEventListener("click", (e)=>{
  e.preventDefault();
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
  function controleAdresse() {
    const Adresse = contact.address;
    if (regExAdresse.test(Adresse)) {
  return true;
    }else {
      document.querySelector("#addressErrorMsg").innerHTML = "veuillez remplir le champ Adresse";
    return false;
    }
  };
function controleEmail() {
  const Email = contact.email;
  if (regExEmail.test(Email)) {
 return true;
  }else {
    document.querySelector("#emailErrorMsg").innerHTML = "veuillez remplir le champ Email";
  return false;
  }
};
if(controlePrenom() && controleNom() && controleVille() && controleAdresse()  && controleEmail()) {
  localStorage.setItem("Contact", JSON.stringify(contact));
}else{
  alert("veuillez remplir le formulaire");
}


//envoyer vers le serveur 
const url = "http://localhost:3000/api/products/order";
let aEnvoyer = {
  contact,
  products,
}

fetch(url, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(aEnvoyer),
 }).then(result =>{
  console.log(result);
 }).catch(err => {
  console.error(err);
});


});
