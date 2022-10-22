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
      <Container>
        <h1 className=" text-center my-5 sticky top-0">
          Orders || Checkout || PayMent
        </h1>
        <Row className="g-4">{orderedMealsJSX}</Row>
      </Container>
    </div>
  );
}
