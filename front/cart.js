const cart =[]
displayItemsInCart ()
cart.forEach((item)=>displayItemsDOM(item))           /* une boucle qui affichera les article selon la fonction displayItemsDOM*/


function displayItemsInCart (){
    const numberOfItems = localStorage.length               /*la constante aura pour valeur le nombre d'article*/
    for ( i=0;i<localStorage.length;i++){

        const item =localStorage.getItem(localStorage.key(i))     /*chaque article sera affiché*/
        const itemObject = JSON.parse(item)                       /*je convertie en objet l'affichage des carte */
        cart.push(itemObject)
        
    }



}

function displayItemsDOM(item){
const article = makeArticle(item)
console.log(article)
const image = makeImage(item)


}

function makeArticle(item){
    const article =document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id=item.id
    article.dataset.color=item.color      /*dataset permet de rajouter les attributs data-id et data-color*/ 
return article
    // article.appendChild(makeImage(item))
}

function makeImage(item){
const image =document.createElement("img")
image.src =item.imageUrl
image.alt=item.altTxt
return image


}