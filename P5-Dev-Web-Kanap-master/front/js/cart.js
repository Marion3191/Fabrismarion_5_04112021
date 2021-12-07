let stockage = JSON.parse(localStorage.getItem("kanape"));
//classe ou injecter le code html
const pagePanier = document.querySelector("#cart__items");
//appel de l'api
const  dataProducts = fetch("http://localhost:3000/api/products");

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

function affichage(apiList)
{
  if(!stockage){    
    stockage = [];
    let produitsPanier = [] ;
  }

  let toDisplay=['img','imgAlt','nom','prix'];

  for (let k = 0; k < stockage.length; k++) {
    toDisplay=getInfos(apiList,stockage[k].id_ProduitSelectionner);
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
  }
}

//supression des articles 
var el = document.getElementById(`id_ProduitSelectionner + couleur_Produit`);

var r1 = el.closest("");

var r2 = el.closest("stockage[k].couleur_Produit");

var r3 = el.closest("article > div");

var r4 = el.closest(":not(div)");