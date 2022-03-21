fetch('http://localhost:3000/api/products')
.then(rep=>rep.json())
.then((data)=>initData(data))

function initData(data){
  
   /* const _id=data[0]._id
    const imageUrl=data[0].imageUrl
    const altTxt =data[0].altTxt
    const name =data[0].name
    const description=data[0].description */
   
    for    (let i=0;i<data.length;i++) {
        console.log(data[i])

    
    const {_id,imageUrl,altTxt,name,description}= data[i]
    const anchor =createAnchor(_id)
    const article = document.createElement("article")
    const image =createImage(imageUrl,altTxt)
    const h3 =createH3(name)
    const p =createParagraphe(description)
    integrationElementToArticle(article,image,h3,p)
    integrationInItems(anchor,article) 

}
  }

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
    const items =document.querySelector("#items")
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
   