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
  
produitPanier = produitPanier + `
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="${stockage[k].image}" alt="${stockage[k].altimage}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${stockage[k].nom_Produit}</h2>
    <p>${stockage[k].couleur_Produit}</p>
    <p>${stockage[k].prix_Produit} €</p>
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