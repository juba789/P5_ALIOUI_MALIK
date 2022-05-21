//Je récupère l'url pour acceder à l'id
const string = window.location.search
const urlParam = new URLSearchParams(string)
const id = urlParam.get("id")

//j'initialise les données du produit               
let itemPrice = 0
let imgUrl, altText, articleName =

//avec l'Id je récupère les données du produit
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(rep => rep.json())
    .then((data) => initReponse(data))
    .catch((err)=>{alert("aucune produit trouvé ne correspond à cet id")})

// La fonction initReponse d'affichage du produit dans la page product avec pour paramètre Kanap et qui appel d'autres fonctions
function initReponse(Kanap) {
    const altTxt = Kanap.altTxt
    const colors = Kanap.colors
    const description = Kanap.description
    const imageUrl = Kanap.imageUrl
    const name = Kanap.name
    const price = Kanap.price
    const _id = Kanap._id
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    createImage(imageUrl, altTxt)
    createTitle(name)
    createPrice(price)
    createDescription(description)
    createColors(colors)
}

// Les scripts des différentes fonctions appelées plus haut 
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
    return image
}

// Script de création du nom du produit
function createTitle(name) {
    document.querySelector("#title").textContent = name
}

// Script de création du nom du prix du produit
function createPrice(price) {
    document.querySelector("#price").textContent = price
}

// Script de création du nom de la description du produit
function createDescription(description) {
    document.querySelector("#description").textContent = description
}

// Script de création des option de couleur pour le  produit
function createColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach(color => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
        console.log(color)
    });
}

// Création d'un événement lié au click sur "ajouter au panier" 
const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    //Je fixe les conditions de validation des champs         
    if (color == null || color === '' || quantity == null || quantity == 0) {
        alert("Veuillez choisir une couleur et la quantité !!")
    } else if (quantity < 0) {
        alert("vous ne pouvez pas choisr une quantité négative")
    } else {
        const key = `${id}-${color}`
        const infoStorage = {
            id: id,
            color: color,
            //pour la quantité je fais appel à une fonction qui calcule la quantité en prenant compte de l'existance ou non de l'article dans le panier
            quantity: quantityTotal(id),
            altTxt: altText,
            imageUrl: imgUrl,
            name: articleName,
        }
        localStorage.setItem(key, JSON.stringify(infoStorage))
        alert("L'article est ajouté à votre panier") /* je mentionne à l'utilisateur que l'article est ajouté à son panier */
    }
})

// je Définit la fonction pour la quantité  du produit qui s'affichera dans la page panier 
function quantityTotal(id) {
    const color = document.querySelector("#colors").value
    let quantity = document.querySelector("#quantity").value
    const keyProduct = `${id}-${color}`
    const newQuantity = ""   
    for (let i = 0; i < localStorage.length; i++) {
        if (keyProduct == localStorage.key(i)) {
            const valueStorage = localStorage.getItem(localStorage.key(i));
            const obj = JSON.parse(valueStorage);
            const newQuantity = Number(quantity) + Number(obj.quantity)
            quantity = newQuantity
        } else {
            quantity = quantity
        }
    }
    return quantity
}