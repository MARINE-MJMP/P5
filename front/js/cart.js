// recuperer le panier de localstorage
let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);
// parcourir les produits du panier (boucle)
let produitspanier = [];

let totalprice = 0;
let totalquantity = 0;

// dans la boucle : recuperer les infos manquantes du produit depuis l'API (fetch de product.js)

// afficher les infos du produit dans la page
const displaycart = () => {
  const productsPositionHtml = document.getElementById("cart__items");
  console.log(productsPositionHtml);
  productsPositionHtml.innerHTML = "";
  totalprice = 0;
  totalquantity = 0;
  for (i = 0; i < panier.length; i++) {
    const product = panier[i];
    fetch("http://localhost:3000/api/products/" + product.id)
      .then((response) => response.json())
      .then((productapi) => {
        productsPositionHtml.innerHTML += `  <article class
  ="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${productapi.imageUrl}" alt="${productapi.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productapi.name}</h2>
        <p>${product.color}</p>
        <p>${productapi.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> 
    `;
        gettotalprice(productapi.price, product.qty);
        gettotalquantity(product.qty);
        const inputs = document.querySelectorAll(".itemQuantity");
        console.log(inputs);
        inputs.forEach((input) => {
          input.addEventListener("change", () => {
            changequantity(input);
          });
        });
        const deletes = document.querySelectorAll(".deleteItem");
        deletes.forEach((item) => {
          item.addEventListener("click", () => {
            removeitem(item);
          });
        });
      });
  }
};
displaycart();
// calculer le total prix et quantité et les afficher
const gettotalprice = (price, qty) => {
  totalprice += price * qty;
  const span = document.getElementById("totalPrice");
  span.innerHTML = totalprice;
};
const gettotalquantity = (qty) => {
  totalquantity += qty;
  const span = document.getElementById("totalQuantity");
  span.innerHTML = totalquantity;
};

const changequantity = (input) => {
  const newqty = parseInt(input.value);
  const article = input.closest("article");
  console.log(article);
  const id = article.dataset.id;
  const color = article.dataset.color;
  console.log(id, color);
  const product = panier.find(
    (product) => product.id === id && product.color === color
  );
  product.qty = newqty;
  localStorage.setItem("panier", JSON.stringify(panier));
  displaycart();
};
const removeitem = (item) => {
  const article = item.closest("article");
  console.log(article);
  const id = article.dataset.id;
  const color = article.dataset.color;
  console.log(id, color);
  const index = panier.findIndex(
    (product) => product.id === id && product.color === color
  );
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  displaycart();
};
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const city = document.getElementById("city").value;
  const adress = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  console.log(firstName, lastName, city, address, email);
  console.log(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(firstName));

  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(firstName) === false) {
    document.querySelector(".firstNameErrorMsg").innerText =
      "Ton prénom n'est pas bon";
  } else {
    document.querySelector(".firstNameErrorMsg").innerText = "";
  }

  if (/\d/.test(firstName) === true) {
    // error
  } else {
    // vider erreur
  }

  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(lastName) === false) {
    document.querySelector(".lastNameErrorMsg").innerText =
      "Ton nom n'est pas bon";
  } else {
    document.querySelector(".lastNameErrorMsg").innerText = "";
  }

  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(lastName) === true) {
    // error
  } else {
    // vider erreur
  }

  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(city) === false) {
    document.querySelector(".cityErrorMsg").innerText =
      "Ta ville n'est pas valide";
  } else {
    document.querySelector(".cityErrorMsg").innerText = "";
  }

  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(city) === true) {
    // error
  } else {
    // vider erreur
  }

  if (/^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/.test(address) === false) {
    document.querySelector("addressErrorMsg").innerText =
      "Ton adresse n'est pas valide";
  } else {
    document.querySelector("addressErrorMsg").innerText = "";
  }

  if (/^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/.test(address) === true) {
    // error
  } else {
    // vider erreur
  }

  if (
    /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      email
    ) === false
  ) {
    document.querySelector(".emailErrorMsg").innerText =
      "Ton emain n'est pas valide";
  } else {
    document.querySelector(".emailErrorMsg").innerText = "";
  }

  if (
    /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      email
    ) === true
  ) {
    // error
  } else {
    // vider erreur
  }
  // Récupérer toutes les regex
  // prénom, nom et la ville ==> pas de chiffre
  // email ==> /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  // zipCode / code postal ==> pas de lettre

  // Ajouter les messages d'erreur

  // https://regex101.com/
});
