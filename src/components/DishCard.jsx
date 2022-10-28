import { Col, Card, Button } from "react-bootstrap";
import { orderContext } from "../Contexts/OrdersContext";
import { useContext } from "react";

export default function DishCard({ detail }) {
  const { name, picture, id } = detail;
  const { addToOrder } = useContext(orderContext);
  return (
    <Col lg={4} md={6}>
      <Card className="border rounded">
        <Card.Img variant="top" src={picture} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button onClick={() => addToOrder(id)} variant="primary">
            Order
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

/*
  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
*/
