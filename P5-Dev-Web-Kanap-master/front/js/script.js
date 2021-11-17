// Index  (appel de l'API)
fetch ("http://localhost:3000/api/products")
.then(function(reponse){
if(reponse.ok){
    return reponse.json();
    
}
})
.then(function(kanapéList){
    console.log(kanapéList);
    let articleContent ='';
    let cardNbr = 0 ;
    let imgid =`imgId`;
    for(let kanap of kanapéList){
        //creer ici chaque tuile d article
        imgid =  "imgID" + cardNbr;
        cardNbr ++;
 
        articleContent += ` <a href="./product.html?id=42">
        <article id="${kanap.name}">
          <img id="${imgid}" src="${kanap.imageUrl}" alt="${kanap.altTxt}">
          <h3 id="${kanap.name}" class="productName">${kanap.name}</h3>
          <p id="description" class="productDescription">${kanap.description}</p>
        </article>
      </a>`;
        document.querySelector("#items").innerHTML = articleContent;
        console.log(imgid);
    }
    
    

})
.catch(function(err){
    //il y a une erreur
});


        //affichage produit 
