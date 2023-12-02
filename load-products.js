window.addEventListener("load", async (e) => {
  const productsContainerEl = document.querySelector("#products-container");

  productsList.forEach((productItem, idx) => {
    productsContainerEl.innerHTML += `
        <div class="product-cart">
            <div>${productItem.name}</div>
            <button id="add-p-${productItem.id}" onclick="addProductToCart(${productItem.id})">Add to cart</button>
            <button id="delete-p-${productItem.id}" onclick="deleteProductFromCart(${productItem.id})">Delete From cart</button>
        </div>
    `;
  });

  const db = await open_DB();
  const cartData = (await db.get("order", "cart")) || [];

  productsList.forEach((item) => {
    if (cartData.find((el) => el.id === item.id)) {
      document.querySelector(`#add-p-${item.id}`).disabled = true;
      document.querySelector(`#delete-p-${item.id}`).disabled = false;
    } else {
      document.querySelector(`#add-p-${item.id}`).disabled = false;
      document.querySelector(`#delete-p-${item.id}`).disabled = true;
    }
  });

  rerenderSelectedProducts();
});

async function rerenderSelectedProducts() {
  const selectedProductsContainerEl = document.querySelector(
    "#selected-products-container"
  );
  selectedProductsContainerEl.innerHTML = "";

  const db = await open_DB();
  const cartData = (await db.get("order", "cart")) || [];

  cartData.forEach((el) => {
    selectedProductsContainerEl.innerHTML += `
      <div class="selected-product-cart">
        <div>${el.id}) </div>
        <div>${el.name}</div>
      </div>
      `;
  });
}
