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
    if (toggleButton.current.nextSibling.classList.contains("show"))
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
              <Nav.Link as={Link}>Payment</Nav.Link>
              <NavDropdown title="Categories" id="collasible-nav-dropdown">
                {availableCategories.map((cat) => {
                  return (
                    <NavDropdown.Item
                      as={NavLink}
                      to={`/categories/${cat.strCategory}`}
                      onClick={closeMenu}
                      key={cat.idCategory}
                    >
                      {cat.strCategory}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
            <Nav>
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
