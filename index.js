const formInput = document.getElementById("userInputForm");
const list = document.getElementById("list");

formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const sellerPrice = document.getElementById("price").value;
  const productName = document.getElementById("product").value;
  const productCategory = document.getElementById("category").value;

  const product = {
    price: sellerPrice,
    product: productName,
    category: productCategory,
  };

  addProduct(product);
  formInput.reset();
});

function displayProducts(product) {
  const categoryHeading = document.createElement("h2");
  categoryHeading.textContent = `${product.category}`;
  categoryHeading.style.fontSize = "16px";
  list.appendChild(categoryHeading);

  const listItem = document.createElement("li");
  listItem.textContent = `${product.price} - ${product.product} `;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Order";
  deleteButton.addEventListener("click", () => {
    deleteProducts(product);
    listItem.remove();
  });

  listItem.appendChild(deleteButton);
  categoryHeading.appendChild(listItem);
}

function addProduct(product) {
  axios
    .post(
      "https://crudcrud.com/api/b31f1301c4b94300bb53b05de36fe978/sellerPageData",
      product
    )
    .then((res) => {
      product._id = res.data._id;
      displayProducts(product);
    })
    .catch((error) => console.log(error));
}

function deleteProducts(product) {
  axios
    .delete(
      `https://crudcrud.com/api/b31f1301c4b94300bb53b05de36fe978/sellerPageData/${product._id}`
    )
    .then((res) => console.log("User deleted"))
    .catch((error) => console.log(error));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/b31f1301c4b94300bb53b05de36fe978/sellerPageData"
    )
    .then((res) => {
      const product = res.data;
      for (let i = 0; i < product.length; i++) {
        displayProducts(product[i]);
      }
    })
    .catch((error) => console.log(error));
});
