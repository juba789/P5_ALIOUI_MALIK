const string =window.location.search              /*window.location.search affiche la requete http avec ?*/
const urlParam = new URLSearchParams(string)      /* URLSearchParams nous permet de pouvoir la decortiquer */
const id =  urlParam.get("id")                    /* avec get("id")nous demandons l'id de cette requete*/

fetch(`http://localhost:3000/api/products/${id}`)   /*avec fetch et l'id nous demandons toutes les information liées à la page de l'id*/
.then(rep=>rep.json())
.then((data)=>initReponse(data))

/*altTxt: "Photo d'un canapé bleu, deux places"
colors: (3) ['Blue', 'White', 'Black']
description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
imageUrl: "http://localhost:3000/images/kanap01.jpeg"
name: "Kanap Sinopé"
price: 1849
_id: "107fb5b75607497b96722bda5b504926" */



function initReponse(Kanap){
const altTxt = Kanap.altTxt
const colors = Kanap.colors
const description = Kanap.description
const imageUrl = Kanap.imageUrl
const name = Kanap.name
const price = Kanap.price
const _id = Kanap._id

createImage(imageUrl,altTxt)
createTitle(name)
createPrice(price)
createDescription(description)
console.log(Kanap)
  }


function createImage(imageUrl,altTxt){
const image =document.createElement("img")
image.src= imageUrl
image.alt= altTxt
const parent =document.querySelector(".item__img")
// if( parent != null){
    parent.appendChild(image)
// }

return image 
}

function createTitle(name){
    // const h1=document.querySelector("#title")   
    // if (h1 != null){               /* je n'aurais pas besoin d'utiliser la condition pour les autres vu que les cibles existent surement*/
        // h1.textContent=name   }
document.querySelector("#title").textContent= name 

}

function createPrice(price){
document.querySelector("#price").textContent=price
}

function createDescription(description){
document.querySelector("#description").textContent=description

}

