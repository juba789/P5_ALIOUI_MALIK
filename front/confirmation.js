const orderId= getOrderId()                                /*appel de la fonction getOrderId qui récupère l'orderId*/
placeOrderId(orderId)                                     /* appel de la fonction qui affichera l'orderId comme numéro de commande dans la page "confirmation"*/
removeAllCach()                                          /* appel de la fonction qui supprimera les données du localStorage*/

// Le script de la fonction qui récupère l'orderId 
function getOrderId() {  
const string =window.location.search                       /*window.location.search affiche la requete http avec ? et ce qui suit après*/
const urlParam = new URLSearchParams(string)              /* URLSearchParams nous permet de pouvoir la decortiquer */
const orderId =  urlParam.get("orderId")                 /* avec get("orderId")nous demandons l'orderId de cette requete que nous associerons à la constante orderId */
return orderId

  }

// Le script de la fonction placeOrderId   
  function placeOrderId(orderId){
const spanId =document.getElementById("orderId")
spanId.textContent=orderId

  }

  // Le script de la fonction removeAllCach
  function removeAllCach(){
const cach =window.localStorage
cach.clear()
    
  }



