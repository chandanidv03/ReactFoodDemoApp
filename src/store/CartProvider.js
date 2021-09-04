import { useReducer } from 'react';
import CartContext from './cart-context';


const defaultCartFuction = { items: [], totalAmount: 0 };

const cartReducer = ((state, action) => {
    if (action.type === 'ADD') {
        let updatedItems;
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'REMOVE') {
        let updatedItems;
        let removedItem;
        const removedItemIndex = state.items.findIndex((item) => item.id === action.id);
        removedItem = state.items[removedItemIndex];
        const newTotalAmount = state.totalAmount - removedItem.price;
        if (removedItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = { ...removedItem, amount: removedItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[removedItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        };
    }
    if (action.type === 'CLEAR') {
        return defaultCartFuction;
      }
    return defaultCartFuction;
});

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartFuction);

    const addItemToCartHandler = item => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemToCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
      };

    const cartContextItem = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearCartHandler
    };
    return (<CartContext.Provider value={cartContextItem}>
        {props.children}
    </CartContext.Provider>);
};

export default CartProvider;