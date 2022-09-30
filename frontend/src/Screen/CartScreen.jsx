import { useState } from "react";
import {
  Card,
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RemoveCart, UpdateCart } from "../actions/cartAction";
import Message from "../components/Message";

function CartScreen() {
  const dispatch = useDispatch();
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const cartItems = useSelector((state) => state.cart);
  const nav = useNavigate();
  const loc = useLocation();
  const qty = +loc?.search.split("=")[1];
  const removeFromCartHandler = (product, qty) => {
    dispatch(RemoveCart(product, qty));
  };

  const checkoutHandler = () => {
    nav("/login?redirect=/shipping");
  };

  return (
    <>
      <Helmet>
        <title>Welcome to ProShop | Cart</title>
        <meta
          name="description"
          content="We sell the best products for cheap"
        />
        <meta
          name="keywords"
          content="electronics , buy electronics , cheap electronics "
        />
      </Helmet>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>

          {cartItems?.length === 0 ? (
            <Message>
              Your Cart is empty <Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems?.map((product) => (
                <ListGroup.Item key={product._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product?.image}
                        fluid
                        rounded
                        alt={product?.name}
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${product?._id}`}>
                        {product?.name}
                      </Link>
                    </Col>
                    <Col md={2}>${product?.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={product.qty}
                        onChange={(e) =>
                          dispatch(UpdateCart(product, Number(e.target.value)))
                        }
                      >
                        {[...Array(product?.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="dark"
                        onClick={() => removeFromCartHandler(product, qty)}
                      >
                        <i class="fa-solid fa-minus"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  SubTotal (
                  {cartItems?.reduce((acc, curr) => acc + curr.qty, 0)}) Items
                </h4>
                $
                {cartItems
                  ?.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-primary w-100"
                  disabled={cartItems?.length === 0}
                  onClick={checkoutHandler}
                >
                  Proced to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default CartScreen;
