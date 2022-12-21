//Recuperation chaine de requete dans l'URL et extraction de l'ID
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log(id);

//Recuperation des données de l'API correspondant à l'ID
fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((product) => {
    console.log(product);

    // Récupération des données de l'API et destination des éléments
    const itemImg = document.getElementsByClassName("item__img")[0];
    console.log(itemImg);

    itemImg.innerHTML = `
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    `;

    const Title = (document.getElementById("title").innerText = product.name);
    console.log(Title);

    const Price = (document.getElementById("price").innerText = product.price);
    console.log(Price);

    const Description = (document.getElementById("description").innerText =
      product.description);
    console.log(Description);

    //// Boucle forEach pour ajouter toutes les couleurs en option du select en HTML
    product.colors.forEach(function (Colors) {
      const option = document.createElement("option");
      const select = document.getElementById("colors");

      // Récupération des données de l'API
      option.value = Colors;
      option.innerText = Colors;

      // Ajout de l'option à la sélection (select en HTML)
      select.appendChild(option);
      console.log(Colors);
    });
  });
