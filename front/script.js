
fetch('http://localhost:3000/api/products')
.then(rep=>rep.json())
.then((data)=>addProductes(data))