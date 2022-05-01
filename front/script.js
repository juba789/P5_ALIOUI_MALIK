// Récupération  des données de l'API 

fetch('http://localhost:3000/api/products')
.then(rep=>rep.json())                           /*La réponse sera au format JSON*/
.then((data)=>initData(data))                   /*Ce qui a été reçu est nommé "data"et j'appel  la fonction d'affichage des données initData*/

function initData(data){       /*la fonction d'affichage des produit pour la page d'accueil*/
  
  
   
    for    (let i=0;i<data.length;i++) {
        

    
    const {_id,imageUrl,altTxt,name,description}= data[i]              /* les données en forme de tableau*/
    const anchor =createAnchor(_id)                                    /*fonction de création de l'encre a createAnchor*/
    const article = document.createElement("article")                  /*création de la balise article*/
    const image =createImage(imageUrl,altTxt)                          /*appel de la fonction de création de l'image*/
    const h3 =createH3(name)                                           /*appel de la fonction de création du titre H3*/
    const p =createParagraphe(description)                             /*appel de la fonction de création du paragraphe de description*/
    integrationElementToArticle(article,image,h3,p)                    /* appel de la fonction d'integration des element dans la balise "article*/
    integrationInItems(anchor,article)                                 /*appel de la fonction d'intégration des balise"articles et "a"dans la section*/     

}
  }
// Les scripts des différentes fonction appelées 
function integrationElementToArticle(article,image,h3,p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

function createAnchor(id){
    const anchor =document.createElement("a")
    anchor.href=  "./product.html?id=" + id
    return anchor

}

function integrationInItems(anchor,article){
    const items =document.querySelector("#items")         /*je cible la balise section avec l'id "items"*/
    if (items != null){
        items.appendChild(anchor)
        anchor.appendChild(article)
       
    }

}

function createImage(imageUrl,altTxt){
const image = document.createElement("img")
image.src =imageUrl
image.alt= altTxt
return image

}





function createH3 (name){
const h3 =document.createElement("h3")
h3.textContent= name
h3.classList.add("productName")
return h3
}

function createParagraphe (description){
const p = document.createElement("p")
p.textContent= description
p.classList.add("productDescription")
return p

}
   