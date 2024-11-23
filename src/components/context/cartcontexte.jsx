import { createContext, useReducer } from "react";
import { cartReducer } from "./cartreducer";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const initialState = {
    items: [], 
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };

