export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
              const updatedItems = [...state.items];
              updatedItems[existingItemIndex].quantity += 1; 
              return {
                ...state,
                items: updatedItems,
              };
            }
            
            return {
              ...state,
              items: [...state.items, { ...action.payload, quantity: 1 }], 
            };
          }
  
      case "REMOVE_FROM_CART": {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }
  
      case "INCREMENT_QUANTITY": {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
  
      case "DECREMENT_QUANTITY": {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
  
      default:
        return state;
    }
  };
  