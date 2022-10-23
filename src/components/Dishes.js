import Loader from "./Loader";
import DishCard from "./DishCard";
import { useEffect, useState } from "react";
import { Container, Row, Carousel } from "react-bootstrap";

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
      <DishCard
        key={idMeal}
        detail={{ name: strMeal, picture: strMealThumb, id: idMeal }}
      />
    ));
  };

  const carauselJSX = (d) => {
    const pickedOnes = d.slice(-3);
    return (
      <Carousel className="carauselContainer">
        {pickedOnes.map((item) => {
          return (
            <Carousel.Item interval={1000} key={item.idMeal}>
              <img
                className="d-block w-100 carauselImg"
                src={item.strMealThumb}
                alt={item.strMeal}
              />
              <Carousel.Caption className="centeringCaption">
                <div className="d-flex justify-content-between">
                  <div className="leftPart">
                    <h1>Featured Dishes</h1>
                    <p>Invented by our culnury experts</p>
                  </div>
                  <div className="d-none d-md-block rightPart">
                    <h1>Ready to Order</h1>
                    <p>Order, when its hot</p>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  };

  const dishContainer = () => {
    return (
      <>
        {carauselJSX(dishes)}
        <Container>
          <h1 className="my-5 ">Dishes</h1>
          <Container>
            <Row className="g-5">{dishesJSX(dishes)}</Row>
          </Container>
        </Container>
      </>
    );
  };

  const UI = loading ? <Loader></Loader> : dishContainer();

  return UI;
}
