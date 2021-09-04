import { useRef , useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
const[formInputValidity,setformInputValidity]=useState({
  name:true,
  street:true,
  city:true,
  postalcode:true
});

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalCodeInputRef.current.value;
    const enteredcity = cityInputRef.current.value;

    const enteredNameIsValid=!isEmpty(enteredName);
    const enteredStreetIsValid=!isEmpty(enteredStreet);
    const enteredcityIsValid=!isEmpty(enteredcity);
    const enteredPostalIsValid=isFiveChars(enteredPostal);

    setformInputValidity({
      name:enteredNameIsValid,
      street:enteredStreetIsValid,
      city:enteredcityIsValid,
      postalcode:enteredPostalIsValid
    });

    const formIsValid=(enteredNameIsValid&&
    enteredPostalIsValid&&
    enteredStreetIsValid&&
    enteredcityIsValid);

    if(!formIsValid){
      return;
    }

    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      city:enteredcity,
      postalcode:enteredPostal
    });

  };
const nameControlClasses=`${classes.control} ${formInputValidity.name ? '':classes.invalid}`;
const streetControlClasses=`${classes.control} ${formInputValidity.street ? '':classes.invalid}`;
const cityControlClasses=`${classes.control} ${formInputValidity.city ? '':classes.invalid}`;
const postalcodeControlClasses=`${classes.control} ${formInputValidity.postalcode ? '':classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>please enter a valid street!</p>}
      </div>
      <div className={postalcodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputValidity.postalcode && <p>please enter a valid postalcode!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;