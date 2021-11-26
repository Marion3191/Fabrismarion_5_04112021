(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
   displayArticle(article)
})()

//recuperation de L'ID
function getArticleId() {
    return new URL(location.href).searchParams.get("id")
    }

    //apell a l'API
function getArticle(articleId) {
    return fetch(`http://localhost:3000/api/products/${articleId}`)
  
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
  document.querySelector("#title").innerHTML += `${article.name}`;
  document.querySelector("#description").innerHTML += `${article.description}`;
  document.querySelector("#price").innerHTML += `${article.price}`;
  document.querySelector("div.item__img").innerHTML += `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
  for(colors of article.colors){
      document.querySelector("#colors").innerHTML += `<option value="${colors}">${colors}</option>`;
  }

//selection du btn ajouter l'article au panier
const btnEnvoyer = document.querySelector("#addToCart");


//ecouter le bouton et envoyer le panier
btnEnvoyer.addEventListener("click", (Event)=>{
    Event.preventDefault();

//option de quantité et de couleur
const couleurProduct = document.getElementById("colors").value;

const quantiteProduct = quantity.value;

// récuperation des choix client
let optionsProduct = {
    id_ProduitSelectionner: article._id,
    couleur_Produit: couleurProduct,
    quantite: quantiteProduct,
}; 

// variable "enregister dans la localstorage" (key , value)
let stockage = JSON.parse(localStorage.getItem("kanape"));
console.log(stockage);

if(stockage){    
    stockage.push(optionsProduct);
    localStorage.setItem("kanape", JSON.stringify(stockage));    
    console.log("if");
}

else{
  stockage = [];
  stockage.push(optionsProduct);
  localStorage.setItem("kanape", JSON.stringify(stockage));  
  console.log("else");
}
});
}

console.log(localStorage);