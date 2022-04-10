const orderId= getOrderId() /*appel de la fonction*/
placeOrderId(orderId)
removeAllCach()

function getOrderId() {  
const string =window.location.search              /*window.location.search affiche la requete http avec ? et ce qui suit après*/
const urlParam = new URLSearchParams(string)      /* URLSearchParams nous permet de pouvoir la decortiquer */
const orderId =  urlParam.get("orderId")
return orderId

  }

  
  function placeOrderId(orderId){
const spanId =document.getElementById("orderId")
spanId.textContent=orderId

  }

  function removeAllCach(){
const cach =window.localStorage
cach.clear()
    
  }

//   console.log(orderId)

