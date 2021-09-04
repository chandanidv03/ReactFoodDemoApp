import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';
import Card from '../UI/Card';

const AvailableMeals = (props) => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState();

    async function fetchMealsHandler() {
        const response = await fetch('https://react-http-4f855-default-rtdb.firebaseio.com/meals.json');

        if (!response.ok) {
            throw new Error('somthing went wrong !');
        }
        const data = await response.json();
        const loadedMeals = [];

        for (const mealKey in data) {
            loadedMeals.push({
                id: mealKey,
                name: data[mealKey].name,
                description: data[mealKey].description,
                price: data[mealKey].price
            });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchMealsHandler().catch((error)=>{
            setIsLoading(false);
            setHasError(error.message);
        });
    }, []);
    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading....</p>
            </section>);
    }
    if (hasError) {
        return (
            <section className={classes.MealsError}>
                <p>{hasError}</p>
            </section>);
    }
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {meals.map((meal, index) => (
                        <MealItem
                            id={meal.id}
                            key={index}
                            name={meal.name}
                            description={meal.description}
                            price={meal.price}></MealItem>
                    ))}
                </ul>
            </Card>
        </section>
    );
};
export default AvailableMeals;