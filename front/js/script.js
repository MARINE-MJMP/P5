fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    const products = document.getElementById("items");
    console.log(products);

    for (let i = 0; i < response.length; i++) {
      const product = response[i];
      console.log(product);

      products.innerHTML += `
<a href="./product.html?id=${product._id}">
<article>
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  <h3 class="productName">${product.name}</h3>
  <p class="productDescription">${product.description}</p>
</article>
</a>
`;
    }
  });
