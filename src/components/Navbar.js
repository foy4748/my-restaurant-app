//import styles from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar() {
  const [availableCategories, setAvailableCategories] = useState([]);

  const toggleButton = useRef();
  const closeMenu = () => {
    toggleButton.current.click();
  };

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then(({ categories }) => {
        setAvailableCategories(categories);
      });
  }, []);
  return (
    <>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Posh Restaurant
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            ref={toggleButton}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} onClick={closeMenu} to="/orders">
                Orders
              </Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Categories" id="collasible-nav-dropdown">
                {availableCategories.map((cat) => {
                  return (
                    <NavDropdown.Item onClick={closeMenu}>
                      {" "}
                      <Nav.Link
                        className="text-black"
                        as={Link}
                        to={`/categories/${cat.strCategory}`}
                      >
                        {" "}
                        {cat.strCategory}{" "}
                      </Nav.Link>{" "}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Moredeets</Nav.Link>
              <Nav.Link as={NavLink} eventKey={2} to="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
