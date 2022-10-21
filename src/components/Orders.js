import { orderContext } from "../Contexts/OrdersContext";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap";

import OrderedMeal from "./OrderedMeal";

export default function Orders() {
  const { orderedMeals } = useContext(orderContext);
  const orderedMealsJSX = Object.keys(orderedMeals).map((id) => (
    <OrderedMeal key={id} id={id} />
  ));
  return (
    <div>
      <h1>Orders</h1>
      <Container>
        <Row className="g-4">{orderedMealsJSX}</Row>
      </Container>
    </div>
  );
}
