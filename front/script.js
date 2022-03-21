
fetch('http://localhost:3000/api/products')
.then(rep=>rep.json())
.then((data)=>addProductes(data))

function addProductes(data){
  
     const _id=data[0]._id
     const imageUrl=data[0].imageUrl
     const altTxt =data[0].altTxt
     const name =data[0].name
     const description=data[0].description 
    
     
 
     
     const {_id,imageUrl,altTxt,name,description}= data[0]
     
     
 
 }
   