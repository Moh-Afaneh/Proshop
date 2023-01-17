import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";
import { useEffect } from "react";
function PaymentMethod() {
  const cart = useSelector((state) => state.cart);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const ShippingAddress = useSelector((state) => state.ShippingAddress);
  const { shipping } = ShippingAddress;

  useEffect(() => {
    if (!shipping) {
      Navigate("/shipping");
    }
  }, [Navigate, shipping]);
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    Navigate("/place-order");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="display-8 fw-bold my-4">Payment Method</h1>
      <Form onSubmit={HandleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              className="my-4"
              type="radio"
              label="Paypal or Credit Card"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
export default PaymentMethod;
