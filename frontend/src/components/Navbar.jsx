import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Logout } from "../actions/userAction";
import SearchBox from "./SearchBox";

function BasicExample() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const state = useSelector((state) => state.UserLogin);
  console.log(state.userInfo);
  const userInfo = state?.userInfo;

  const logoutHandler = () => {
    dispatch(Logout());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">ProShop.</Navbar.Brand>
        <SearchBox />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/cart">
              <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
            </Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo?.name} id="username">
                <NavDropdown.Item href="/profile">profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logoutHandler()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">
                <i className="fas fa-user"></i> Login
              </Nav.Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminMenu">
                <NavDropdown.Item href="/admin/userList">
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/productList">
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/OrderList">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item href="/login" onClick={() => logoutHandler()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
