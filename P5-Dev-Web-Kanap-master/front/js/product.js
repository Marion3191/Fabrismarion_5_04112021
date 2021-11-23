(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
   displayArticle(article)
})()

function getArticleId() {
    return new URL(location.href).searchParams.get("id")
    }

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

function displayArticle(article) {
  document.querySelector("#title").innerHTML += `${article.name}`;
  document.querySelector("#description").innerHTML += `${article.description}`;
  document.querySelector("#price").innerHTML += `${article.price}`;
  document.querySelector("div.item__img").innerHTML += `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
  for(colors of article.colors){
      document.querySelector("#colors").innerHTML += `<option value="${colors}">${colors}</option>`;
  }
}
