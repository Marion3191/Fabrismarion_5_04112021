// variable "enregister dans la localstorage" (key , value)
let stockage = JSON.parse(localStorage.getItem("kanape"));

// si le panier est vide
if(stockage === null) {
  const panierVide = `
  <div> votre panier est vide </div>`;
  pagePanier.innerHTML = panierVide;
}
//si le panier n'est pas vide 
else {

  let produitPanier = [];

for ( k = 0; k < stockage.length; k++ ) {
  produitPanier = produitPanier +  `
  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="" alt="">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2></h2>
      <p>${stockage[k].couleur_Produit}</p>
      <p>€</p>
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
  </article>
  `;
  
}
document.querySelector("#cart__items").innerHTML += produitPanier;

  }

  (async function() {
    const article = await getArticle()
   displayArticle(article)
})()


    //apell a l'API
function getArticle() {
    return fetch(`http://localhost:3000/api/products`)

    .then(function(Response) {
        return Response.json()
    })
    .then(function(Products){
      return Products 
    })
    .catch(function(error){
        alert(error)
    })
}

//Affichage d'un produit celon son ID
function displayArticle(article) {
  document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="${article.imageUrl}" alt="${article.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${article.name}</h2>
     
      <p>${article.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
      
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
  </article>
  `;;
  }
  
