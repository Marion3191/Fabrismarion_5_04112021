//récuperation de l'orderId dans le localstorage
function numeroCommande() {
    return new URL(location.href).searchParams.get("orderid")
    }
    console.log(new URL(location.href).searchParams.get("orderid"));

    document.querySelector("#orderId").innerHTML += `<span id="orderId">${numeroCommande()}</span></p>`;