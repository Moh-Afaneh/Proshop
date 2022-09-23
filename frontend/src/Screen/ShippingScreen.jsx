import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShipping } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";
function ShippingScreen() {
  const dispatch = useDispatch();
  const ShippingAddress = useSelector((state) => state.ShippingAddress);
  const { shipping } = ShippingAddress;
  const Navigate = useNavigate();
  const [address, setAddress] = useState(shipping?.address);
  const [city, setCity] = useState(shipping?.city);
  const [postalCode, setPostalCode] = useState(shipping?.postalCode);
  const [country, setCountry] = useState(shipping?.country);
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    Navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={HandleSubmit}>
        <FormGroup controlId="address">
          <FormLabel>Enter Address</FormLabel>
          <FormControl
            type="text"
            placeholder="ex : Amman-tabarbour"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city">
          <FormLabel>Enter City</FormLabel>
          <FormControl
            type="text"
            placeholder="ex : Amman"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postal code">
          <FormLabel>Enter postal code</FormLabel>
          <FormControl
            type="text"
            placeholder="ex : 11731"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="country">
          <FormLabel>Enter country</FormLabel>
          <FormControl
            type="text"
            placeholder="ex : Jordan"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
export default ShippingScreen;
