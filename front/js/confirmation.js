//L'appel des fonctions qui afficheront le contenu de la page confirmation et qui supprimera par la suite les données du localstorage
const orderId = getOrderId()
placeOrderId(orderId)
removeAllCach()

//La fonction qui récupère l'orderId 
function getOrderId() {
    const string = window.location.search
    const urlParam = new URLSearchParams(string)
    const orderId = urlParam.get("orderId")
    return orderId
}

//La fonction qui affichera l'orderId comme numéro de commande dans la page "confirmation"*/ 
function placeOrderId(orderId) {
    const spanId = document.getElementById("orderId")
    spanId.textContent = orderId
}

//La fonction qui supprimera les données du localStorage
function removeAllCach() {
    const cach = window.localStorage
    cach.clear()
}



