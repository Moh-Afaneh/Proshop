import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const cartItems = new Array(useSelector((state) => state.cart))[0];
  const ShippingAddress = useSelector((state) => state.ShippingAddress);
  const MethodPayment = useSelector((state) => state.paymentMethod);
  const { paymentMethod } = MethodPayment;
  const { shipping } = ShippingAddress;
  //cal price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cartItems.itemsPrice = addDecimals(
    cartItems?.reduce(
      (acc, item) => acc + item.price * item.qty,

      0
    )
  );
  cartItems.ShippingPrice = cartItems.itemsPrice > 100 ? 100 : 0;
  cartItems.TaxPrice = addDecimals(Number(0.15 * cartItems.itemsPrice));
  cartItems.TotalPrice = (
    Number(cartItems.itemsPrice) +
    Number(cartItems.TaxPrice) +
    Number(cartItems.ShippingPrice)
  ).toFixed(2);
  const createOrderState = useSelector((state) => state.orderCreate);
  const { loading, success, order, Error } = createOrderState;
  const naviagte = useNavigate();
  useEffect(() => {
    if (success) {
      naviagte(`/order/${order?.CreatedOrder?._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naviagte, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shipping,
        paymentMethod: paymentMethod,
        itemsPrice: cartItems.itemsPrice,
        shippingPrice: cartItems.ShippingPrice,
        taxPrice: cartItems.TaxPrice,
        totalPrice: cartItems.TotalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>shipping</h2>
              <p>
                <strong>Address: </strong>
                {shipping.address}, {shipping.city} , {shipping.postalCode}{" "}
                {shipping.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems &&
                    cartItems?.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} fluid rounded></Image>
                          </Col>
                          <Col>
                            <Link to={`/products/${item._id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X {item.price} = ${" "}
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summery</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>items</Col>
                  <Col>${cartItems?.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cartItems.TaxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cartItems.ShippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${cartItems.TotalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {Error && <Message variant="danger">{Error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="button w-100"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default PlaceOrderScreen;
