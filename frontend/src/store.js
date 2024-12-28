import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/user/reducer';
import cartReducer from './redux/cart/reducer';

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  },
})