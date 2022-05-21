// Récupération  des données de l'API 
fetch('http://localhost:3000/api/products')
    .then(rep => rep.json()) 
    .then((data) => initData(data)) 
    .catch((err)=>alert("impossible de charger les données"))
    
//La fonction qui utilise les données récupérées de l'API et qui appelle les fonctions qui crééront les différents éléments de la page d'accueil
function initData(data) {
    //les données récupérées sont placées en forme de tableau
    for (let i = 0; i < data.length; i++) {
        const {
            _id,
            imageUrl,
            altTxt,
            name,
            description
        } = data[i] 
        const anchor = createAnchor(_id) 
        const article = document.createElement("article") 
        const image = createImage(imageUrl, altTxt) 
        const h3 = createH3(name) 
        const p = createParagraphe(description) 
        integrationElementToArticle(article, image, h3, p) 
        integrationInItems(anchor, article) 
    }
}

// Les scripts des différentes fonction appelées 
function integrationElementToArticle(article, image, h3, p) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

//La fonction pour l'ancre"a" et le lien
function createAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

//La fonction integration de l'ancre et de l'article 
function integrationInItems(anchor, article) {
    const items = document.querySelector("#items") 
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

//La fonction de création de l'image et de ses attributs
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

//La fonction de création du titre du produit et de sa classe
function createH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

//La fonction de création du paragraphe de description du produit et de sa classe
function createParagraphe(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}