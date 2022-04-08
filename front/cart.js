const cart =[]
exposeItems ()
cart.forEach((item)=>CreateItemsDOM(item))           /* une boucle qui affichera les article selon la fonction displayItemsDOM*/


function exposeItems (){
    const numberOfItems = localStorage.length              /*la constante aura pour valeur le nombre d'article*/
    for ( i=0;i<localStorage.length;i++){

        const item =localStorage.getItem(localStorage.key(i))     /*chaque article sera affiché*/
        const itemObject = JSON.parse(item)                       /*je convertie en objet l'affichage des carte */
        cart.push(itemObject)
        
    }



}

function CreateItemsDOM(item){
const article = makeArticle(item)
const imageDiv = makeImageDiv(item)
article.appendChild(imageDiv)
const cardItemContent = makeCartContent(item)
article.appendChild(cardItemContent)
displayArticle(article)
exposeTotalQuantity(item)
exposeTotalPrice(item)
}

function exposeTotalQuantity(item){
const totalQuantity =document.querySelector("#totalQuantity")
const total =cart.reduce((total,item)=>total+item.quantity,0) /* je dis que pour chaque quantity je le rajoute au total en partant de 0*/
totalQuantity.textContent=total

}

function exposeTotalPrice(item){
    let total =0
const totalPrice= document.querySelector("#totalPrice")
cart.forEach((item)=> {                                   /* au lieu d'utiliser .reduce*/
    const totalUnitPrice =item.price*item.quantity
    total +=totalUnitPrice
});
console.log(total)
totalPrice.textContent=total
}

function makeCartContent(item){
const cardItemContent=document.createElement("div")
cardItemContent.classList.add("cart__item__content")
const description =makeDescription(item)
const settings =makeSettings(item)
cardItemContent.appendChild(description)
cardItemContent.appendChild(settings)
return cardItemContent
}

function makeSettings(item){
const settings =document.createElement("div")
settings.classList.add("cart__item__content__settings")
placeElementToSettings(settings,item)
placeDeleteToSettings(settings)

return settings

}

function placeDeleteToSettings(settings){
const div =document.createElement("div")
div.classList.add("cart__item__content__settings__delete")
const p =document.createElement("p")
p.classList.add("deleteItem")
p.textContent="Supprimer"
div.appendChild(p)
settings.appendChild(div)


}

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
input.addEventListener("input",()=> updatePriceAndQuantity(item.id,input.value,item))
quantity.appendChild(input)
settings.appendChild(quantity)
}

function updatePriceAndQuantity(id,newValue,item){ /*newValue est le paramètre representant input.value*/
const itemToUpdate= cart.find((item)=>item.id===id ) /*La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.*/
itemToUpdate.quantity=  Number(newValue) 
item.quantity=itemToUpdate.quantity
console.log(cart) 
exposeTotalPrice()   
exposeTotalQuantity()
saveNewDataToCache(item)
                   
}

function saveNewDataToCache(item){   
const dataToSave=JSON.stringify(item)
const key =`${item.id}-${item.color}`
localStorage.setItem(key,dataToSave)
   }

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



function displayArticle(article) {
document.querySelector("#cart__items").appendChild(article)
  }


function makeArticle(item){
    const article =document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id=item.id
    article.dataset.color=item.color      /*dataset permet de rajouter les attributs data-id et data-color*/ 
return article
    // article.appendChild(makeImage(item))
}

function makeImageDiv(item){
    const div =document.createElement("div")
    div.classList.add("cart__item__img")
    
    const image =document.createElement("img")
    image.src =item.imageUrl
    image.alt=item.altTxt
    div.appendChild(image)
    return div



}