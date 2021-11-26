// Index  
//boucle de la card 
(async function() {
    const Products = await getProducts()
   for (kanape of Products) {
    displayArticle(kanape)
    }
})()
 
//(appel de l'API)
function getProducts(){
   return fetch("http://localhost:3000/api/products")
   
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

// création de la card
function displayArticle(kanape) {
    document.querySelector("#items").innerHTML += ` <a href="./product.html?id=${kanape._id}" >
     <article>
    <img src="${kanape.imageUrl}" alt="${kanape.altTxt}">
    <h3 class="productName">${kanape.name}</h3>
    <p class="productDescription">${kanape.description}</p>
  </article>
  </a> `;
}





