import { orderContext } from "../Contexts/OrdersContext";
import { Col, Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import Loader from "./Loader";

export default function OrderedMeal({ id }) {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const { orderedMeals, modifyQuantify } = useContext(orderContext);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then(({ meals }) => {
        setItem(meals[0]);
        setLoading(false);
      });
  }, [id]);

  if (!item || !item.strMeal || loading) {
    return (
      <Col sm={12} lg={4}>
        <Loader />
      </Col>
    );
  } else {
    const { strMeal, strMealThumb, idMeal } = item;
    return (
      <Col sm={12} lg={4}>
        <div className="d-md-flex border rounded justify-content-between">
          <div className="d-flex justify-content-center ">
            <img src={strMealThumb} className="img imgFluid" alt={strMeal} />
          </div>
          <div className="p-3">
            <h2 className="h4">{strMeal}</h2>
            <p>Amount: {orderedMeals[idMeal]}</p>
          </div>
          <div className="d-flex justify-content-evenly align-items-center p-4">
            <Button
              onClick={() => modifyQuantify(idMeal, -1)}
              className="btn rouned-circle"
            >
              -
            </Button>
            <Button
              onClick={() => modifyQuantify(idMeal, 1)}
              className="btn rouned-circle"
            >
              +
            </Button>
          </div>
        </div>
      </Col>
    );
  }
}
