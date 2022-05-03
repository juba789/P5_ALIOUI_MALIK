const string =window.location.search              /*window.location.search affiche la requete http avec "?" et ce qui suit après*/
const urlParam = new URLSearchParams(string)      /* URLSearchParams nous permet de pouvoir la decortiquer */
const id =  urlParam.get("id")                     /* avec get("id")nous demandons l'id de cette requete*/
                
let itemPrice = 0   
let imgUrl,altText,articleName =               

fetch(`http://localhost:3000/api/products/${id}`)   /*avec fetch et l'id nous demandons toutes les information liées à la page */
.then(rep=>rep.json())
.then((data)=>initReponse(data))                 /*Ce qui a été reçu est nommé "data"et j'appel  la fonction d'affichage des données initReponse*/

// La fonction initReponse d'affichage du produit dans la page product avec pour paramètre Kanap et qui appel d'autres fonctions
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
createImage(imageUrl,altTxt)           /*fonction de création de l'image du produit*/
createTitle(name)                      /*fonction de   création du nom du produit*/
createPrice(price)                     /*fonction de création de l'emplacement prix */
createDescription(description)         /*fonction de création de la description du produit */
createColors(colors)                   /*fonction de création de l'emplacement choix de couleur pour l'article*/


  }

// Les scripts des différentes fonctions appelées plus haut 
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
// Script de création du nom du produit
function createTitle(name){
document.querySelector("#title").textContent= name 

}

// Script de création du nom du prix du produit
function createPrice(price){
document.querySelector("#price").textContent=price
}

// Script de création du nom de la description du produit
function createDescription(description){
document.querySelector("#description").textContent=description

}

// Script de création des option de couleur pour le  produit
function createColors(colors){
    const select =document.querySelector("#colors")
    colors.forEach(color => {                           /* je crée une boucle qui pour chaque élément "couleur" lui associera la couleur de l'option*/
        const option =document.createElement("option")
        option.value=color
        option.textContent=color
        select.appendChild(option)
        console.log(color)
    });
}

const button = document.querySelector("#addToCart")
// Création d'un événement lié au click sur "ajouter au panier" 
button.addEventListener("click", (e)=>{                            /* au click sur "ajouter au panier"*/
const color =document.querySelector("#colors").value               /* color sera défini par la valeur lié à l'emplacement dont l'id est "colors"*/      
const quantity =document.querySelector("#quantity").value          /*quantity sera défini par la valeur lié à l'emplacement dont l'id est "quantity"*/
if(color==null || color===''|| quantity==null ||quantity== 0){     /*je rajoute que si l'un des emplacement est vide ..*/  
alert("Veuillez choisir une couleur et la quantité !!")            /*un message s'affichera pour rappeler l'utilisateur de choisir une couleur et une quantité */
  }
else{                                               /* sinon*/
  const key =`${id}-${color}`                      /* je crée une clé avec une association id et color */
  const infoStorage ={                            /* et je définit un objet les informations du produit */
id:id,
color:color,
// quantity: Number(quantity),/* Number transforme une chaine de caractére en nombre*/
quantity:quantityTotal(id),                      /* pour la quantité je fais appel à la fonction quantityTotal*/
price:itemPrice,
altTxt:altText,
imageUrl:imgUrl,
name:articleName,

}
localStorage.setItem(key,JSON.stringify(infoStorage))       /* j'intègre le tout dans le local storage avec la clé définit plus haut et les données du produit (infostorage)*/
// window.location.href="cart.html"    /* au clic avec addEventListener on sera dirigé vers cart.html grace à window.location
                                    //  et son attribut href*/
console.log(infoStorage)
alert("L'article est ajouté à votre panier")                 /* je mentionne à l'utilisateur que l'article est ajouté à son panier */
  }
})

// je Définit la fonction pour la quantité  du produit qui s'affichera dans la page panier 
function quantityTotal(id){
const color =document.querySelector("#colors").value
let quantity =document.querySelector("#quantity").value
const keyProduct =`${id}-${color}`

const newQuantity = ""

  
for (let i = 0; i < localStorage.length; i++) {                                 /* pour chaque élément se trouvant dans le panier à travers le localStorage*/
  if (keyProduct==localStorage.key(i)) {                                       /* ici la condition se porte sur les éléments existant déja dans le panier (identifiés à travers leurs clés)*/
const valueStorage = localStorage.getItem(localStorage.key(i));               /*je prends avec getItem les données du produit du panier */
const obj = JSON.parse(valueStorage);                                        /* que je transforme en objet */



const newQuantity =Number(quantity)+Number(obj.quantity)                 /*newQuantity sera donc egale à la quantité du produit dans le panier ajouté à celle fixé dans la page product*/               

quantity=newQuantity
}
    
     
  else {                                                             /* si l'article n'existe pas dans le panier , la quantité sera celle de la page product */
    quantity=quantity
    }
  
  
  }
  return quantity
    }
    
    
 




