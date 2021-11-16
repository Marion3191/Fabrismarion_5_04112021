fetch ("http://localhost:3000/api/products")
.then(function(reponse){
        return reponse.json();
    })
    .then(function(data){
        console.log(data);
    });
