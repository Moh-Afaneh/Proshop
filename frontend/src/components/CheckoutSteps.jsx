import { Nav, NavLink } from "react-bootstrap";
function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Nav.Link href="/login">Sign in</Nav.Link>
        ) : (
          <Nav.Link disabled>Sign in</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Nav.Link href="/shipping">Shipping</Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Nav.Link href="/payment">Payment</Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Nav.Link href="/place-order">Place order</Nav.Link>
        ) : (
          <Nav.Link disabled>Place order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}
export default CheckoutSteps;
