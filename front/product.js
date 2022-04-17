const string =window.location.search              /*window.location.search affiche la requete http avec ? et ce qui suit après*/
const urlParam = new URLSearchParams(string)      /* URLSearchParams nous permet de pouvoir la decortiquer */
const id =  urlParam.get("id") 
                  /* avec get("id")nous demandons l'id de cette requete*/
                
let itemPrice = 0   
let imgUrl,altText,articleName =               

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
itemPrice =price
imgUrl=imageUrl
altText=altTxt
articleName =name
createImage(imageUrl,altTxt)
createTitle(name)
createPrice(price)
createDescription(description)
createColors(colors)
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

function createColors(colors){
    const select =document.querySelector("#colors")
    colors.forEach(color => {
        const option =document.createElement("option")
        option.value=color
        option.textContent=color
        select.appendChild(option)
        console.log(color)
    });
}

const button = document.querySelector("#addToCart")

button.addEventListener("click", (e)=>{
const color =document.querySelector("#colors").value
const quantity =document.querySelector("#quantity").value
if(color==null || color===''|| quantity==null ||quantity== 0){ 
alert("Veuillez choisir une couleur et la quantité !!")
  }
else{
  const key =`${id}-${color}`
  const infoStorage ={
id:id,
color:color,
// quantity: Number(quantity),/* Number transforme une chaine de caractére en nombre*/
quantity:quantityTotal(id),
price:itemPrice,
altTxt:altText,
imageUrl:imgUrl,
name:articleName,

}
localStorage.setItem(key,JSON.stringify(infoStorage))
// window.location.href="cart.html"    /* au clic avec addEventListener on sera dirigé vers cart.html grace à window.location
                                    //  et son attribut href*/
console.log(infoStorage)
  }
})
// const product=(localStorage.key(1)) 

function quantityTotal(id){
const color =document.querySelector("#colors").value
let quantity =document.querySelector("#quantity").value
const keyProduct =`${id}-${color}`

const newQuantity = ""
// je pose la condition 
 for (let i = 0; i < localStorage.length; i++) {
  if (keyProduct==localStorage.key(i)) {
const valueStorage = localStorage.getItem(localStorage.key(i));
const obj = JSON.parse(valueStorage);
console.log(obj)

console.log(quantity)
console.log(obj.quantity)
const newQuantity =Number(quantity)+Number(obj.quantity)
console.log(newQuantity)
quantity=newQuantity


  } else {
    quantity=quantity
  }
  return quantity
  
} 
  



}
