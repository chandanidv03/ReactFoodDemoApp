import {Fragment} from 'react';
import classes from './Header.module.css';
import image from '../../Assets/Food.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = props=>{
return(
    <Fragment>
        <header className={classes.header}>
            <h1>IndianMeals</h1>
            <HeaderCartButton onShowCart={props.onShowCart}/>
        </header>
        <div>
            <img className={classes['main-image']} src={image} alt='Good Food, Good Mood ;)' ></img>
        </div>
    </Fragment>
)
};

export default Header;