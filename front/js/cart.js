//je crée un tqableqau et j'appel les fonctions de récupération des données dans le localstorage et l'API
const cart = []
exposeItems()
cart.forEach((item) => idPrice(item))

//Je vise le boutton commander et je lui reli la fonction submitForm décrite plus bas
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

//Je recupère les données des produits dans le localstorage que je transforme en objet pour les mettre dans le tableau "cart"
function exposeItems() {
    for (i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        const id = itemObject.id
        cart.push(itemObject)
    }
}

//Je recupère l'id des produits et avec fetch je recupère toutes les information des produits et plus précisément le prix que je transmet à la fonction qui les utilisera
function idPrice(item) {
    const id = item.id
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(rep => rep.json())
        .then((data) => rep(data, item))
}

//Je rajoute aux objets des produit du panier la données "price" et j'appel la fonction qui affichera les contenu de la page panier
function rep(data, item) {
    const addItemPrice = {
        price: data.price
    };
    const finalResult = Object.assign(item, addItemPrice);
    CreateItemsDOM(item)
    exposeTotalPrice()
}

// La fonction CreateItemsDOM qui à son tour appellera d'autres fonctions avec des scripts qui afficheronts les articles dans la page
function CreateItemsDOM(item) {
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    exposeTotalQuantity(item)
    exposeTotalPrice(item)
}

// Script de la fonction qui calcule et affiche la quantité totale 
function exposeTotalQuantity(item) {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => Number(total) + Number(item.quantity), 0)
    totalQuantity.textContent = total
}

// Script de la fonction qui calcule et affiche le prix total 
function exposeTotalPrice(item) {
    let total = 0

    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    });
    totalPrice.textContent = total
}

// Le script de la fonction makeCartContent qui à son tour appellera les fonctions "makeDescription" et "makeSettings" qui créeront respcetivement la descriptions des produits et les emplacements "quantité" et "supprimer" 
function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")
    const description = makeDescription(item)
    const settings = makeSettings(item)
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

// Le script de la fonction qui créera la div "cart__item__content__settings" et ajoutera les fonctionnalité pour chaque produit 
function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    placeElementToSettings(settings, item)
    placeDeleteToSettings(settings, item)
    return settings
}

// Le script de supression 
function placeDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.classList.add("deleteItem")
    p.textContent = "Supprimer"
    div.appendChild(p)
    p.addEventListener("click", () => deleteItem(item))
    settings.appendChild(div)
}

// Le script de la fonction lié à l'evenement deleteItem de supression d'un produit du panier
function deleteItem(item) {
    let result = confirm('cet article sera supprimé de votre panier')
    if (result) {
        const itemToDelete = cart.findIndex((element) => element.id === item.id && element.color === item.color)
        cart.splice(itemToDelete, 1) /*avec splice j'enleve un élément à partir de l'élément à l'index 0*/
        exposeTotalPrice() 
        exposeTotalQuantity()
        deleteToStorage(item)
        deleteArticleToDom(item)
        if (cart.length === 0) {
            alert('votre panier est vide')
        }
    } else {
        alert('supression annulée')
    }
}

// Le script de la fonction qui supprime le produit du panier 
function deleteArticleToDom(item) {
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()
}

// Le script qui supprime le produit du localStorage
function deleteToStorage(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

// Script de la fonction "placeElementToSettings"  qui crée et integre les élements  dans "cart__item__content__settings__quantity"  
function placeElementToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item)) /*je rajoute un evenement qui reli à l'input une fonction qui recalcule la quantité et le prix total,avec comme paramètre la nouvelle quantité"input.value" */
    quantity.appendChild(input)
    settings.appendChild(quantity)
    updatePriceAndQuantity(item.id, input.value, item)
    exposeTotalPrice(item)
}

// La fonction qui recalcule le prix et la quantité global selon le clic à l'input 
function updatePriceAndQuantity(id, newValue, item) {
    const color = item.color
    const itemToUpdate = cart.find((item) => item.id === id && item.color === color)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    //je met à jour le prix et la quantité totale en appelant les fonctions concernées
    exposeTotalPrice()
    exposeTotalQuantity()
    saveNewDataToCache(item)
}

// Le script de la fonction saveNewDataToCache qui met à jours les quantité dans le localStorage
function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

// Le script de la fonction makeDescription qui crée toutes les descrption du produit dans le panier
function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + "€"
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    exposeTotalPrice()
    return description
}

// Le script de la fonction qui ajoutera la balise article dans la section à l'id "cart__items" 
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

// Le script de la fonction makeArticle qui créera la balise "article" 
function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

// Le script de la fonction makeImageDiv qui créera la balise "image" et son contenu 
function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

// J'écoute avec addEventlistener ce qui s'écrit sur les champs et je déclenche les fonctions associés
document.getElementById("firstName").addEventListener("input", firstNameAccept);
document.getElementById("lastName").addEventListener("input", lastNameAccept);
document.getElementById("address").addEventListener("input", addressAccept);
document.getElementById("city").addEventListener("input", cityAccept);
document.getElementById("email").addEventListener("input", emailAccept);


// Les fonctions associés aux champs qui réagissent en rapport avec ce qu'écrit l'utilisateur 
function firstNameAccept() {
    const firstName = document.getElementById('firstName')
    const regexName = /^[A-zÃÃ-€º' -]*$/
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
    if (firstName.value == '') {
        /* si le champs est vide */
        firstNameErrorMsg.innerHTML = 'le champs est requis'
        return true
    }
    if (regexName.test(firstName.value) === false) {
        firstNameErrorMsg.innerHTML = 'le champs est incorrect'
        return true
    } else {
        firstNameErrorMsg.innerHTML = ''
    }

    return false /*  sinon il retournera false et le script continuera son execution*/
}

// Script pour la validation du prénom
document.getElementById("lastName").addEventListener("change", lastNameAccept);

function lastNameAccept() {
    const lastName = document.getElementById('lastName')
    const regexName = /^[A-zÃÃ-€º' -]*$/
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
    if (lastName.value == '') {
        lastNameErrorMsg.innerHTML = 'le champs est requis'
        return true
    }
    if (regexName.test(lastName.value) === false) {
        lastNameErrorMsg.innerHTML = 'le champs est incorrect'
        return true
    } else {
        lastNameErrorMsg.innerHTML = ''
    }
    return false
}

// Script pour la validation de l'adresse 
function addressAccept() {
    const address = document.getElementById('address')
    const addressRegex = /([0-9]{1,}) ?([A-zÃÃ-€º,' -\. ]*)/
    let addressErrorMsg = document.getElementById('addressErrorMsg')
    if (address.value == '') {
        addressErrorMsg.innerHTML = 'le champs est requis'
        return true
    } else if (addressRegex.test(address.value) === false) {
        addressErrorMsg.innerHTML = 'le champs est incorrect'
        return true
    } else {
        addressErrorMsg.innerHTML = ''
    }
    return false
}

// Script pour la validation du champs de la ville 
function cityAccept() {
    const city = document.getElementById('city')
    const regexName = /^([A-zÃÃ-€º' -])*$/
    let cityErrorMsg = document.getElementById('cityErrorMsg')
    if (city.value == '') {
        cityErrorMsg.innerHTML = 'le champs est requis'
        return true
    } else if (regexName.test(city.value) === false) {
        cityErrorMsg.innerHTML = 'le champs est incorrect'
        return true
    } else {
        cityErrorMsg.innerHTML = ''
    }
    return false
}

// Script pour la validation de l'email 
function emailAccept() {
    const email = document.getElementById('email')
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    let emailErrorMsg = document.getElementById('emailErrorMsg')
    if (email.value == '') {
        emailErrorMsg.innerHTML = 'le champs est requis'
        return true
    } else if (emailRegex.test(email.value) === false) {
        emailErrorMsg.innerHTML = 'le champs est incorrect'
        return true
    } else {
        emailErrorMsg.innerHTML = ''
    }
    return false
}
//La fonction qui sous condition d'acceptation du formulaire valide la commande et envoi les données au backend
function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Votre panier est vide") /* le message indiqué s'affiche*/
        return
    }

    // içi les fonctions de conditions pour chaques champs ,si elles sont valides l'execution du script continu,dans le cas contraire le "return" bloque l'execution 
    if (firstNameAccept()) return
    if (lastNameAccept()) return
    if (addressAccept()) return
    if (cityAccept()) return
    if (emailAccept()) return

    // la constante body appel la fonction makeRequestBody qui créera la structure des données à envoyer au backend
    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
            /* j'utilise fetch vers le liens cité*/
            method: "POST",
            /* j'envoie des données donc j'utilise la methode:POST*/
            body: JSON.stringify(body),
            /* et le body en format string avec stringify */
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(rep => rep.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "confirmation.html" + "?orderId=" + orderId
            console.log(data)
        })
}

// Le script de la fonction makeRequestBody qui crééra la structure des données envoyées au backend
function makeRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value /*form.elements récupère les élément rempli dans un formulaire*/
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        },
        products: idForCache() /* ici products fera appel à la fonction idForCache pour nous retourner les id*/

    }
    return body
}

// Le script de la fonction idForCache de création de l'id pour "products" 
function idForCache() {
    const numberProducts = localStorage.length
    const ids = [] /* je crée une array vide*/
    for (let i = 0; i < numberProducts; i++) {
        const key = localStorage.key(i) /* je récupére pour chaque boucle la clé key indexé "i"*/

        const id = key.split("-")[0] /* ici avec split je transforme les key en tableau et je lui demande de prendre l'élement 0 donc l'id juste avant le "-"  */
        ids.push(id) /*et je le rajoute    à l'array "ids" */
    }
    return ids
}
