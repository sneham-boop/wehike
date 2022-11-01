import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../hooks/useAppData";
import useAppData from "../hooks/useAppData";
import "../styles/Navigation.css";
import logo from "../images/main-logo.png";

export default function Navigation() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { logout } = useAppData();

  const signOut = () => {
    logout().then((status) => {
      if (status === null) {
        navigate("/");
      }
    });
  };

  return (
    <Navbar id="navigation" bg="light" expand="lg" collapseOnSelect>
      <Container fluid>
        <Link className="navbar-brand" to="/">
          <img src={logo} className="d-inline-block align-top" alt="logo" />
        </Link>
        <Nav.Link as={Link} className="nav-link signed-in" to="/profile">
          Signed in as {user.name}
        </Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <Nav.Link as={Link} eventKey="1" className="nav-link" to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} eventKey="2" className="nav-link" to="/runs">
              Join A Run
            </Nav.Link>
          </Nav>
          <Nav pullright="true">
            <Nav.Link as={Link} eventKey="3" className="nav-link" to="/faq">
              FAQs
            </Nav.Link>
            {user === null && (
              <Nav.Link
                as={Link}
                eventKey="4"
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Nav.Link>
            )}
            {user === null && (
              <Nav.Link
                as={Link}
                eventKey="5"
                className="nav-link"
                to="/register"
              >
                Sign Up
              </Nav.Link>
            )}

            {user !== null && (
              <>
                <Nav.Link
                  as={Link}
                  eventKey="6"
                  className="nav-link"
                  to="/profile"
                >
                  Signed in as {user.name}
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  eventKey="7"
                  className="nav-link"
                  to="#"
                  onClick={signOut}
                >
                  Sign Out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
