import { useLoaderData, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import DishCard from "./DishCard";
export default function CategoryFoods() {
  const { meals: dishes } = useLoaderData();
  const { categoryName } = useParams();

  const dishesJSX = (d) => {
    return d.map(({ strMeal, strMealThumb, idMeal }) => (
      <DishCard
        key={idMeal}
        detail={{ name: strMeal, picture: strMealThumb, id: idMeal }}
      />
    ));
  };

  const dishContainer = () => {
    return (
      <Container>
        <h1>{categoryName}</h1>
        <Row className="g-5">{dishesJSX(dishes)}</Row>
      </Container>
    );
  };

  const UI = dishContainer();

  return UI;
}
