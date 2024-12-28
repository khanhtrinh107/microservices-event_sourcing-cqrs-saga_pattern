import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.item.find((exItem) => exItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.price * item.quantity;
      } else {
        state.item.push({
          id: item.id,
          name: item.name,
          price: item.price,
          imgUrl: item.imgUrl,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        });
      }
      state.totalQuantity += item.quantity;
      state.totalAmount += item.quantity * item.price;
    },
    removeItem: (state, action) => {
      const id = action.payload.id;
      const existingItem = state.item.find((exItem) => exItem.id === id);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.totalQuantity -= existingItem.quantity;
        state.item = state.item.filter((exItem) => exItem.id !== id);
      }
    },
    clearCart: (state) => {
      state.item = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    fetchCart: (state, action) => {
      state.item = action?.payload;
      if (action.payload.length !== 0) {
        state.totalAmount = action?.payload?.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        state.totalQuantity = action?.payload?.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
      }
    },
  },
});

export const { addItem, removeItem, clearCart, fetchCart } = cartSlice.actions;
export default cartSlice.reducer;
