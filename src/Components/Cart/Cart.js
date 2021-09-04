import React,{ useContext, useState } from 'react';
import classes from './Cart.module.css';
import Model from '../UI/Model';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartItemAddHandler = item => {
        cartCtx.addItem({
            id: item.id,
            name: item.name,
            amount: 1,
            price: item.price
        });
    };

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch('https://react-http-4f855-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };
    const totalAmount = cartCtx.totalAmount;

    const hasItems = cartCtx.items.length > 0;

    const CartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item, index) => (
            <CartItem
                key={index}
                id={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)} />))}
    </ul>;
    const modelActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>);
        const cartModalContent = (
            <React.Fragment>
              {CartItems}
              <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
              </div>
              {isCheckout && (
                <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
              )}
              {!isCheckout && modelActions}
            </React.Fragment>
          );
        
          const isSubmittingModalContent = <p>Sending order data...</p>;
        
          const didSubmitModalContent = (
            <React.Fragment>
              <p>Successfully sent the order!</p>
              <div className={classes.actions}>
              <button className={classes.button} onClick={props.onHideCart}>
                Close
              </button>
            </div>
            </React.Fragment>
          );
        
          return (
            <Model onCancel={props.onHideCart}>
              {!isSubmitting && !didSubmit && cartModalContent}
              {isSubmitting && isSubmittingModalContent}
              {!isSubmitting && didSubmit && didSubmitModalContent}
            </Model>
          );
    // return (
    //     <Model>
    //         {CartItems}
    //         <div className={classes.total}>
    //             <span>Total Amount</span>
    //             <span>{totalAmount}</span>
    //         </div>
    //         {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
    //         {!isCheckout && modelActions}
    //     </Model>);
};

export default Cart;