import { orderContext } from "../Contexts/OrdersContext";
import { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import OrderedMeal from "./OrderedMeal";

export default function Orders() {
  const { orderedMeals } = useContext(orderContext);
  const orderedMealsJSX = Object.keys(orderedMeals).map((id) => (
    <OrderedMeal key={id} id={id} />
  ));

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Container>
      <h1 className="my-5 sticky top-0">Orders || Review || Payment </h1>
      <Container className="compensatingMargin">
        <Row className="g-4">{orderedMealsJSX}</Row>
      </Container>
    </Container>
  );
}
