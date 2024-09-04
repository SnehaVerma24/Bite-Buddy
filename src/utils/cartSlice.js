import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : { items: {}, totalItemsCount: 0 };
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items[action.payload.id];
      const quantity =
        item && item.hasOwnProperty("quantity")
          ? state.items[action.payload.id]?.quantity + 1
          : 1;

      state.items[action.payload.id] = { ...action.payload, quantity };
      state.totalItemsCount += 1;
      saveCartToLocalStorage(state); 
    },
    removeItem: (state, action) => {
      const item = state.items[action.payload];
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        state.totalItemsCount -= 1;
      } else {
        state.totalItemsCount -= 1;
        delete state.items[action.payload];
      }

      saveCartToLocalStorage(state); // Save to local storage after update
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItemsCount = 0;
      saveCartToLocalStorage(state); // Save to local storage after update
    },
  },
});

// Exporting actions by name
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Exporting reducers
export default cartSlice.reducer;
