import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Reviews from "../components/Reviews";

import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "../actions/cartAction";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productAction";
import Meta from "../components/Meta";
function ProductScreen() {
  const { id } = useParams();
  const [qty, setqty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const nav = useNavigate();
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: ReviewSuccess, Error: ErrorReview } = productReviewCreate;
  console.log(ErrorReview);
  const UserLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = UserLogin;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;
  useEffect(() => {
    if (ReviewSuccess) {
      toast.success("Review Submitted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setComment("");
      setRating("");
      dispatch({ type: "PRODUCT_REVIEW_CREATE_RESET" });
    }
    dispatch(listProductDetails(id));
  }, [ReviewSuccess, dispatch, id]);
  const stockCheck = state.find(
    (el) => el.qty >= product.countInStock && el._id === id
  );
  // el.qty + qty < product.countInStock
  const LeftinStock = state.map((el) => {
    return (el._id === id && el.qty + qty) <= product.countInStock - 1;
  });
  const SubmitReview = (e) => {
    e.preventDefault();
    if (ErrorReview) {
      toast.error("Only one Review!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch(createProductReview(id, { rating, comment }));
  };

  const setQtyInc = () => {
    if (qty < product.countInStock && !LeftinStock.includes(false)) {
      setqty(qty + 1);
    } else {
      toast.error("No more stock", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const setQtyDec = () => {
    if (product.countInStock && qty !== 0) {
      setqty(qty - 1);
    } else {
      toast.error("No more stock", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const addToCart = (product) => {
    if (qty >= stockCheck?.qty - 1) {
      toast.error("No more stock", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Added to cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(AddCart(product, qty));
      nav(`/cart/?qty=${qty}`);
    }
  };
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title={product?.name} />
          <Row>
            <Col lg={6}>
              <Image src={product?.image} alt={product?.name} />
            </Col>
            <Col lg={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Reviews
                    value={product?.rating}
                    text={`${product?.numReviews}  Reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item className="Description  w-auto">
                  Description :{product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        {product?.countInStock > 0
                          ? "In stock"
                          : "Out of stock"}{" "}
                        with {product.countInStock} items
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="text-center">
                          <Button
                            className="btn-light "
                            disabled={stockCheck?._id === id}
                            onClick={() => setQtyDec()}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </Button>
                          <Button
                            className="w-20 text-center"
                            disabled={stockCheck?._id === id}
                          >
                            {qty}
                          </Button>
                          <Button
                            className="btn-light w-auto"
                            disabled={stockCheck?._id === id}
                            onClick={() => setQtyInc()}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn btn-dark w-100"
                      type="button"
                      disabled={
                        product.countInStock === 0 || stockCheck || qty === 0
                      }
                      onClick={() => addToCart(product)}
                    >
                      {stockCheck !== undefined
                        ? "Stock run out"
                        : "Add to cart"}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-2">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant={"success"}>No Reviews yet</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Reviews value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                <ListGroupItem>
                  <h2>Write a Review</h2>
                  {userInfo ? (
                    <Form onSubmit={SubmitReview}>
                      <FormGroup controlId="rating">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </FormControl>
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Write a Review</FormLabel>
                        <FormControl
                          as="textarea"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant={"danger"}>
                      Please <Link to={"/login"}>sign in</Link> in to write a
                      review{" "}
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
export default ProductScreen;
