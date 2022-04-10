const cart =[]
exposeItems ()
cart.forEach((item)=>CreateItemsDOM(item))           /* une boucle qui affichera les article selon la fonction displayItemsDOM*/

const orderButton=document.querySelector("#order")
orderButton.addEventListener("click",(e)=>submitForm(e) )


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
placeDeleteToSettings(settings,item)

return settings

}

function placeDeleteToSettings(settings,item){
const div =document.createElement("div")
div.classList.add("cart__item__content__settings__delete")
div.addEventListener("click",()=>deleteItem(item))
const p =document.createElement("p")
p.classList.add("deleteItem")
p.textContent="Supprimer"
div.appendChild(p)
settings.appendChild(div)
}

function deleteItem(item){
const itemToDelete=cart.findIndex((element)=>element.id===item.id && element.color===item.color)
cart.splice(itemToDelete,1)    /*avec splice j'enleve un élément à partir de l'élément à l'index 0*/
console.log(cart)
exposeTotalPrice()   
exposeTotalQuantity()
deleteToStorage(item)
deleteArticleToDom(item)
}

function deleteArticleToDom(item){
const articleToDelete=document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
articleToDelete.remove()

}

function deleteToStorage(item) {
const key = `${item.id}-${item.color}`
localStorage.removeItem(key)
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

function submitForm(e){
    e.preventDefault()
    if (cart.length===0) alert("Votre panier est vide")

const body =makeRequestBody()
fetch("http://localhost:3000/api/products/order",{
    method:"POST",
    body:JSON.stringify(body),
    headers:{
        "Content-type":"application/json"
    }
})
.then(rep=>rep.json())
.then((data)=>console.log(data))
// console.log(form.elements)
}

function makeRequestBody(){
const form=document.querySelector(".cart__order__form")
const firstName=form.elements.firstName.value    /*form.elements récuoère les élément rempli dans un formulaire*/
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
     products: idForCache()
    
  }

return body
}

function idForCache(){
const numberProducts= localStorage.length
const ids =[]
for (let i = 0; i < numberProducts; i++) {
    const key = localStorage.key(i)
   console.log(key) 
   const id = key.split("-")[0]/* ici avec split je transforme les key en tableau et je lui demande de prendre l'élement 0 donc l'id*/
   ids.push(id)
}
return ids
}