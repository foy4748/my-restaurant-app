import Loader from "./Loader";
import DishCard from "./DishCard";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

export default function Dishes() {
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=a")
      .then((res) => res.json())
      .then(({ meals }) => {
        setDishes(meals);
        setLoading(false);
      });
  }, []);

  const dishesJSX = (d) => {
    return d.map(({ strMeal, strMealThumb, idMeal }) => (
      <DishCard name={strMeal} key={idMeal} picture={strMealThumb} />
    ));
  };

  const dishContainer = () => {
    return (
      <Container>
        <Row className="g-5">{dishesJSX(dishes)}</Row>
      </Container>
    );
  };

  const UI = loading ? <Loader></Loader> : dishContainer();

  return UI;
}
