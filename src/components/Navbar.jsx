//import styles from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { userContext } from "../Contexts/AuthContext";

export default function NavBar() {
  const [availableCategories, setAvailableCategories] = useState([]);
  const { activeUser, setActiveUser, logOutHandler } = useContext(userContext);

  const toggleButton = useRef();
  const closeMenu = () => {
    if (toggleButton.current.nextSibling.classList.contains("show"))
      toggleButton.current.click();
  };

  const handleLogOut = () => {
    logOutHandler().then(() => {
      setActiveUser(null);
    });
  };

  const logoutNavItem = () => {
    return <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>;
  };

  const loginRegisterNavItem = () => {
    return (
      <>
        <Nav.Link as={NavLink} to="/register">
          Register
        </Nav.Link>
        <Nav.Link as={NavLink} to="/login">
          Login
        </Nav.Link>
      </>
    );
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
              <Nav.Link as={NavLink} onClick={closeMenu} to="/booking">
                Booking
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
              {activeUser && activeUser.uid
                ? logoutNavItem()
                : loginRegisterNavItem()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
