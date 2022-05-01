const cart =[]                                         /*je met en tableau les objet"articles " que je définirai */
exposeItems ()                                        /*j'appel la fonction qui fera de chaque article dans le localStorage un objet et l'integrera dans le tableau*/
cart.forEach((item)=>CreateItemsDOM(item))           /* une boucle qui affichera les article selon la fonction CreateItemsDOM*/

const orderButton=document.querySelector("#order")
orderButton.addEventListener("click",(e)=>submitForm(e) )       /* je rajoute un evenement au clic sur "commander!" lié à la fonction submit fomr que je définirai en bas*/


   function exposeItems (){
    const numberOfItems = localStorage.length              /*la constante aura pour valeur le nombre d'article*/
    for ( i=0;i<localStorage.length;i++){

        const item =localStorage.getItem(localStorage.key(i))      /*nous associons la constante "item" au données de chaque article*/
        const itemObject = JSON.parse(item)                       /* et je convertie en objet les données "item" */
        cart.push(itemObject)                                    /*que j'intetegre dans le tableau "cart"*/
        
    }



}
// La fonction CreateItemsDOM qui à son tour appellera d'autres fonctions avec des scripts qui afficheronts les articles dans la page
function CreateItemsDOM(item){
const article = makeArticle(item)                                     /*l'appel de la fonction de création  de la balise "article"*/
const imageDiv = makeImageDiv(item)                                  /* l'appel de la fonction de création de la balise"image"*/
article.appendChild(imageDiv)                                       /*j'integre "image" dans "article"*/
const cardItemContent = makeCartContent(item)                      /* appel de la fonction de création des descriptions du produit*/
article.appendChild(cardItemContent)                              /* que j'integre dans la balise "article"*/
displayArticle(article)                                          /*L'appel de la fonction qui ajoutera la balise article dans la section à l'id "cart__items" */ 
exposeTotalQuantity(item)
exposeTotalPrice(item)
}

function exposeTotalQuantity(item){
const totalQuantity =document.querySelector("#totalQuantity")
const total =cart.reduce((total,item)=>Number(total)+Number(item.quantity),0) /* je dis que pour chaque quantity je le rajoute au total en partant de 0*/
totalQuantity.textContent=total

}

function exposeTotalPrice(item){
    let total =0
const totalPrice= document.querySelector("#totalPrice")
cart.forEach((item)=> {                                                   /* au lieu d'utiliser .reduce*/
    const totalUnitPrice =item.price*item.quantity                       /* pour chaque produit je multiplie sa quantité au prix unitaire*/
    total +=totalUnitPrice                                              /*que je rajoute au total (initialisé à 0)*/
});

totalPrice.textContent=total                                          /*et j'affiche le totale sur la page web*/
}
// Le script de la fonction makeCartContent qui à son tour appellera les fonctions "makeDescription" et "makeSettings" qui créeront respcetivement la descriptions des produits et les emplacements "quantité" et "supprimer" 
function makeCartContent(item){
const cardItemContent=document.createElement("div")
cardItemContent.classList.add("cart__item__content")
const description =makeDescription(item)
const settings =makeSettings(item)
cardItemContent.appendChild(description)
cardItemContent.appendChild(settings)
return cardItemContent
}

// Le script de la fonction qui créera la div "cart__item__content__settings" et ajoutera les fonctionnalité pour chaque produit 
function makeSettings(item){
const settings =document.createElement("div")
settings.classList.add("cart__item__content__settings")
placeElementToSettings(settings,item)                        /*appel la fonction qui placera les différentes balises dans "cart__item__content__settings"*/
placeDeleteToSettings(settings,item)                        /* appel de la foction qui ajoutera la fonctionnalité de suppression du produit */

return settings
}
// Le script de supression 
function placeDeleteToSettings(settings,item){
const div =document.createElement("div")
div.classList.add("cart__item__content__settings__delete")
div.addEventListener("click",()=>deleteItem(item))         /* au clic sur "supprimer je rajoute un évenement "deleteItem"*/
const p =document.createElement("p")
p.classList.add("deleteItem")
p.textContent="Supprimer"
div.appendChild(p)
settings.appendChild(div)
}

// Le script de la fonction lié à l'evenement deleteItem de supression d'un produit du panier
function deleteItem(item){
const itemToDelete=cart.findIndex((element)=>element.id===item.id && element.color===item.color)    /* avec findIndex je demande le premier élément du tableau cart dont l'id et la couleur coresspondent à item.id et item.color*/     
cart.splice(itemToDelete,1)                                                                        /*avec splice j'enleve un élément à partir de l'élément à l'index 0*/
console.log(cart)
exposeTotalPrice()                                                                                /* appel de la fonction du prix total pour la mise à jour avec la supression d'un produit*/ 
exposeTotalQuantity()                                                                            /* appel de la fonction de la quantité d'article totale pour la mise à jour après la supression d'un article*/
deleteToStorage(item)                                                                           /* appel de la fonction qui supprime le produit du localStorage*/
deleteArticleToDom(item)                                                                       /* appel de la fonction qui supprime le produit de la page web du panier*/
}

// Le script de la fonction qui supprime le produit du panier 
function deleteArticleToDom(item){
const articleToDelete=document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)      /* avec querySelector je vise l'article en fonction de son data-id et data-color*/
articleToDelete.remove()                                                                                      /* je supprime avec remove*/
}

// Le script qui supprime le produit du localStorage
function deleteToStorage(item) {
const key = `${item.id}-${item.color}`       /* je crée la clé en fonction de l'id et la couleur du produit à supprimé*/
localStorage.removeItem(key)                /* et avec removeItem je supprime*/
}

// Script de la fonction "placeElementToSettings"  qui crée et integre les élements  dans "cart__item__content__settings__quantity"  
function placeElementToSettings(settings,item){
const  quantity =document.createElement("div")
quantity.classList.add("cart__item__content__settings__quantity")
const p =document.createElement("p")
p.textContent="Qté : "
quantity.appendChild(p)
const input =document.createElement("input")
input.type="number"
input.classList.add("itemQuantity")
input.name="itemQuantity"
input.min="1"
input.max="100"
input.value=item.quantity
input.addEventListener("input",()=> updatePriceAndQuantity(item.id,input.value,item))     /*je rajoute un evenement qui reli à l'input une fonction qui recalcule la quantité et le prix total,avec comme paramètre la nouvelle quantité"input.value" */
quantity.appendChild(input)
settings.appendChild(quantity)
}

// La fonction qui recalcule le prix et la quantité global selon le clic à l'input 
function updatePriceAndQuantity(id,newValue,item){              /*newValue est le paramètre representant input.value,la nouvelle valeur*/  
const color =item.color                 
const itemToUpdate= cart.find((item)=>item.id===id && item.color===color )             /*La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.ici je cherche l'element dont je veux changer la quantité  à travers son id */
itemToUpdate.quantity=  Number(newValue)                                              /* et je récupère la nouvelle valeur*/
item.quantity=itemToUpdate.quantity                              /* je relie la nouvelle valeur à item.quantity*/
 
exposeTotalPrice()                                               /* j'appel la fonction de calcule du prix total  qui sera modifié avec la nouvelle quantité*/
exposeTotalQuantity()                                           /* j'appel la fonction de calcule de la quantité totale qui sera modifiée avec la nouvelle valeur*/
saveNewDataToCache(item)                                       /* j'appel la fonction qui écrasera les données du cache afin de les mettre à jours avec la nouvelle valeur de quantité*/
}

// Le script de la fonction saveNewDataToCache qui met à jours les quantité dans le localStorage
function saveNewDataToCache(item){   
const dataToSave=JSON.stringify(item)                           /*le produit item dans le localS sera mis en string et associé à la constante dataToSave*/
const key =`${item.id}-${item.color}`                          /*je crée la clé Key*/
localStorage.setItem(key,dataToSave)                          /* et j'associé les deux avec setItem*/
}

// Le script de la fonction makeDescription qui crée toutes les descrption du produit dans le panier
function makeDescription(item){
const description =document.createElement("div")
description.classList.add("cart__item__content__description")
const h2 =document.createElement("h2")
h2.textContent=item.name
const p =document.createElement("p")
p.textContent=item.color
const p2 =document.createElement("p")
p2.textContent=item.price + "€"
description.appendChild(h2,p,p2)
description.appendChild(p)
description.appendChild(p2)
return description
}


// Le script de la fonction qui ajoutera la balise article dans la section à l'id "cart__items" 
function displayArticle(article) {
document.querySelector("#cart__items").appendChild(article)
  }

// Le script de la fonction makeArticle qui créera la balise "article" 
function makeArticle(item){
    const article =document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id=item.id
    article.dataset.color=item.color      /*dataset permet de rajouter les attributs data-id et data-color*/ 
return article
    // article.appendChild(makeImage(item))
}
// Le script de la fonction makeImageDiv qui créera la balise "image" et son contenu 
function makeImageDiv(item){
    const div =document.createElement("div")
    div.classList.add("cart__item__img")
    
    const image =document.createElement("img")
    image.src =item.imageUrl
    image.alt=item.altTxt
    div.appendChild(image)
    return div
}

function submitForm(e){
    e.preventDefault()                                               /* je bloque la fonctionnalité par défault de rafraichissement de la page au clic*/
    if (cart.length===0){                                           /* içi je dis que s'il n'y a aucun produit */          
        alert("Votre panier est vide")                             /* le message indiqué s'affiche*/
        return
    } 



// içi les fonctions de conditions pour chaques champs ,si elles sont valides l'execution du script continu,dans le cas contraire le "return" bloque l'execution 
if ( firstNameAccept()) return                                 
if ( lastNameAccept()) return
if ( addressAccept()) return
if ( cityAccept()) return
if ( emailAccept()) return

// la constante body appel la fonction makeRequestBody qui créera la structure des données à envoyer au backend
const body =makeRequestBody()
fetch("http://localhost:3000/api/products/order",{                           /* j'utilise fetch vers le liens cité*/
    method:"POST",                                                          /* j'envoie des données donc j'utilise la methode:POST*/
    body:JSON.stringify(body),                                             /* et le body en format string avec stringify */                                    
    headers:{
        "Content-type":"application/json"
    }
})
.then(rep=>rep.json())
.then((data)=> {
const orderId =data.orderId                                              
window.location.href="confirmation.html"+"?orderId="+orderId            /* l'utilisateur sera dirigé vers le lien cité avec un orderId remis que nous passons au paramétres  */
console.log(data)
} )  

}

// Ici les fonction de validations des différents champs avec le premier champs expliqué ,les autres fonctions seront identique niveau script 
function firstNameAccept(){
    const firstName=document.getElementById('firstName')                                   /* je vise le champs firstName*/
    const regexName=/^[A-zÃÃ-€º' -]*$/                                                    /* j'initialise avec regex la condition d'acceptation*/      
    let firstNameErrorMsg=document.getElementById('firstNameErrorMsg')                   /* je crée la variable qui sera lié au champs pour le message d'erreur*/
    if(firstName.value==''){                                                            /* si le champs est vide */
firstNameErrorMsg.innerHTML='le champs est requis'                                     /*voici le message qui s'affichera*/
return true
} 
else if ( regexName.test(firstName.value)===false){                                 /* sinon si le champs ne remplit pas la condition du format regex fixé plus haut*/
firstNameErrorMsg.innerHTML='le champs est incorrect'                              /* voiçi le message qui s'affichera*/
return true
  }
return false                                                                    /*  sinon il retournera false et le script continuera son execution*/
}
// Script pour la validation du prénom
function lastNameAccept(){
    const lastName=document.getElementById('lastName')
    const regexName= /^[A-zÃÃ-€º' -]*$/
    let lastNameErrorMsg=document.getElementById('lastNameErrorMsg')
    if(lastName.value==''){
lastNameErrorMsg.innerHTML='le champs est requis'
return true
} 
else if ( regexName.test(lastName.value)===false){  
lastNameErrorMsg.innerHTML='le champs est incorrect'
return true
  }
return false
}
// Script pour la validation de l'adresse 
function addressAccept(){
    const address=document.getElementById('address')
    const addressRegex = /([0-9]{1,}) ?([A-zÃÃ-€º,' -\. ]*)/
    let addressErrorMsg=document.getElementById('addressErrorMsg')
    if(address.value==''){
addressErrorMsg.innerHTML='le champs est requis'
return true
} 
else if ( addressRegex.test(address.value)===false){  
addressErrorMsg.innerHTML='le champs est incorrect'
return true
  }
return false
}

// Script pour la validation du champs de la ville 
function cityAccept(){
    const city=document.getElementById('city')
    const regexName=/^[A-zÃÃ-€º' -]*$/
    let cityErrorMsg=document.getElementById('cityErrorMsg')
    if(city.value==''){
cityErrorMsg.innerHTML='le champs est requis'
return true
} 
else if ( regexName.test(city.value)===false){  
cityErrorMsg.innerHTML='le champs est incorrect'
return true
  }
return false
}

// Script pour la validation de l'email 
function emailAccept(){
    const email=document.getElementById('email')
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    let emailErrorMsg=document.getElementById('emailErrorMsg')
    if(email.value==''){
emailErrorMsg.innerHTML='le champs est requis'
return true
} 
else if ( emailRegex.test(email.value)===false){  
emailErrorMsg.innerHTML='le champs est incorrect'
return true
  }
return false
}

// Le script de la fonction makeRequestBody qui crééra la structure des données envoyées au backend
function makeRequestBody(){
const form=document.querySelector(".cart__order__form")
const firstName=form.elements.firstName.value    /*form.elements récupère les élément rempli dans un formulaire*/
const lastName=form.elements.lastName.value
const address=form.elements.address.value
const city=form.elements.city.value
const email=form.elements.email.value
 const body ={    
     contact: {
       firstName: firstName,
       lastName: lastName,
       address: address,
       city: city,
       email: email,
     },
     products: idForCache()                  /* ici products fera appel à la fonction idForCache pour nous retourner les id*/
    
  }

return body
}

// Le script de la fonction idForCache de création de l'id pour "products" 
function idForCache(){
const numberProducts= localStorage.length
const ids =[]                                              /* je crée une array vide*/
for (let i = 0; i < numberProducts; i++) {
    const key = localStorage.key(i)                    /* je récupére pour chaque boucle la clé key indexé "i"*/

   const id = key.split("-")[0]                      /* ici avec split je transforme les key en tableau et je lui demande de prendre l'élement 0 donc l'id juste avant le "-"  */
   ids.push(id)                                     /*et je le rajoute    à l'array "ids" */           
}
return ids
}
