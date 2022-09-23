import { useEffect } from "react";
import axios from "axios";
import lottie from "lottie-web";
import { PayPalButton } from "react-paypal-button-v2";
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
import { Link, useParams } from "react-router-dom";
import {
  getOrderDetails,
  setDelivered,
  SetPaidOrder,
} from "../actions/orderAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { useRef } from "react";
function OrderScreen() {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, Error } = orderDetails;
  const OrderPay = useSelector((state) => state.OrderPay);
  const { loading: loadingPay, success: successPay } = OrderPay;
  const deliveredStatus = useSelector((state) => state.deliveredStatus);
  const { success: delivered } = deliveredStatus;
  const UserLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = UserLogin;
  console.log(userInfo);
  console.log(delivered);
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // the dom element that will contain the animation: ;
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../Lottie/payment.json"), // the path to the animation json
    });
  }, []);
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (successPay || !order || delivered) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch({ type: "ORDER_DELIVER_RESET" });
      dispatch(getOrderDetails(id));
    } else if (!order.order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [delivered, dispatch, id, order, successPay]);
  const successPaymentHandler = (paymentResult) => {
    dispatch(SetPaidOrder(id, paymentResult));
  };
  const deliveredHandler = () => {
    dispatch(setDelivered(id));
  };

  return (
    <>
      {order !== undefined ? (
        <>
          {loading ? (
            <Loader />
          ) : Error ? (
            <Message>{Error}</Message>
          ) : (
            <>
              <h1>order ID {id} </h1>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Shipping to</h2>
                      <p>
                        {" "}
                        <strong>Name: </strong>
                        {order?.order?.user.name}
                      </p>
                      <a href={`mailto:${order?.order?.user.email}`}>
                        Mail to: {order?.order?.user.email}
                      </a>
                      <p>
                        <strong>Address: </strong>
                        {order?.order?.shippingAddress.address},{" "}
                        {order.order?.shippingAddress.city} ,{" "}
                        {order.order?.shippingAddress.postalCode}{" "}
                        {order.order?.shippingAddress.country}
                        {order.order?.isDelivered ? (
                          <Message variant="success">
                            Delivered {order.order?.deliveredAt}
                          </Message>
                        ) : (
                          <Message variant="danger">Not Delivered</Message>
                        )}
                      </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h2>Payment Method</h2>
                      <p>
                        <strong>Method:</strong>
                        {order?.order?.paymentMethod}
                      </p>
                      <p>
                        {order.order?.isPaid ? (
                          <Message variant="success">
                            Paid on {order.order?.paidAt}
                          </Message>
                        ) : (
                          <Message variant="danger">Not Paid</Message>
                        )}
                      </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h2>Order items</h2>
                      {true === 0 ? (
                        <Message>Your cart is empty</Message>
                      ) : (
                        <ListGroup variant="flush">
                          {order?.order?.orderItems.map((item, index) => (
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
                          <Col>${order?.order?.itemsPrice}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col>Tax</Col>
                          <Col>${order?.order?.taxPrice}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col>Shipping</Col>
                          <Col>${order?.order?.shippingPrice}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col>Total</Col>
                          <Col>${order?.order?.totalPrice}</Col>
                        </Row>
                      </ListGroupItem>
                      {!order.order.isPaid ? (
                        <ListGroupItem>
                          {loadingPay && <Loader />}
                          {!sdkReady ? (
                            <Loader />
                          ) : (
                            <PayPalButton
                              amount={order?.order?.totalPrice}
                              onSuccess={successPaymentHandler}
                            />
                          )}
                        </ListGroupItem>
                      ) : (
                        ""
                      )}
                      <ListGroupItem>
                        {Error && <Message variant="danger">{Error}</Message>}
                      </ListGroupItem>
                      {userInfo.isAdmin &&
                        order?.order?.isPaid &&
                        !order?.order?.isDelivered && (
                          <ListGroupItem>
                            <Button
                              type="button"
                              className="btn btn-block w-100"
                              onClick={deliveredHandler}
                            >
                              Mark as Delivered
                            </Button>
                          </ListGroupItem>
                        )}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
export default OrderScreen;
