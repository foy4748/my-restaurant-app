// Loader function for "Orders" page
const orderLoader = async () => {
  const res = await fetch("./fakeData/products.json");
  const data = await res.json();

  const localCart = readFromDb();
  const currentData = [];
  for (let id in localCart) {
    const foundItem = data.find((itm) => itm.id === id);
    foundItem.quantity = localCart[id];
    if (foundItem) currentData.push(foundItem);
  }
  return currentData;
};

// use local storage to manage cart data
const addToDb = (orderObj) => {
  localStorage.setItem("order-cart", JSON.stringify(orderObj));
};

const readFromDb = () => {
  let localItems = {};

  const _localItems = localStorage.getItem("order-cart");
  if (_localItems) {
    localItems = JSON.parse(_localItems);
  }

  return localItems;
};

const removeFromDb = (id) => {
  const storedCart = localStorage.getItem("order-cart");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      localStorage.setItem("order-cart", JSON.stringify(shoppingCart));
    }
  }
};

const deleteShoppingCart = () => {
  localStorage.removeItem("order-cart");
  window.location.reload();
};

export { addToDb, readFromDb, removeFromDb, deleteShoppingCart, orderLoader };
