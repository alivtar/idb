async function open_DB() {
  return await idb.openDB("cm-db", 1, {
    async upgrade(db) {
      await db.createObjectStore("order");
    },
  });
}

async function deleteProductFromCart(product_id) {
  const db = await open_DB();
  const cartData = (await db.get("order", "cart")) || [];

  const newCartData = cartData.filter((el) => el.id !== product_id);

  db.put("order", newCartData, "cart");

  document.querySelector(`#add-p-${product_id}`).disabled = false;
  document.querySelector(`#delete-p-${product_id}`).disabled = true;
  rerenderSelectedProducts();
}

async function addProductToCart(product_id) {
  const db = await open_DB();
  const cartData = (await db.get("order", "cart")) || [];

  cartData.push(productsList.find((el) => el.id === product_id));

  db.put("order", cartData, "cart");

  document.querySelector(`#add-p-${product_id}`).disabled = true;
  document.querySelector(`#delete-p-${product_id}`).disabled = false;
  rerenderSelectedProducts();
}

async function isProductInCart(product_id) {
  const db = await open_DB();
  const cartData = (await db.get("order", "cart")) || [];
  return cartData.find((el) => el.id === product_id);
}

async function clearCart() {
  const db = await open_DB();
  db.clear("order");

  productsList.forEach((el) => {
    document.querySelector(`#add-p-${el.id}`).disabled = false;
    document.querySelector(`#delete-p-${el.id}`).disabled = true;
  });

  rerenderSelectedProducts();
}
