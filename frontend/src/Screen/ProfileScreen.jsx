import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, UpdateUserProfile } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { GetMyOrders } from "../actions/orderAction";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const onSumbit = (e) => {
    e.preventDefault();
    // dispatch Register
    if (password !== confirmPassword) {
      toast.warn("password and confirm password does not match");
    } else {
      //dispatch user update
      dispatch(UpdateUserProfile({ id: user?._id, name, email, password }));
    }
  };
  const ordersList = useSelector((state) => state.MyOrders);
  const { orders } = ordersList;
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, Error, user } = UserDetails;
  const UserUpdateProfile = useSelector((state) => state.UserUpdateProfile);
  const { success } = UserUpdateProfile;
  const Login = useSelector((state) => state.UserLogin);
  const { userInfo } = Login;

  useEffect(() => {
    if (!userInfo) {
      nav("/login");
    } else {
      if (!user?.name) {
        dispatch(getUserDetails("profile"));
        dispatch(GetMyOrders());
      } else {
        setName(user?.name);
        setEmail(user?.email);
      }
    }
  }, [Login, dispatch, nav, user?.email, user?.name, userInfo]);

  return (
    <Row>
      <Col md={3}>
        <h1 className="display-8 fw-bold">User profile</h1>
        {Error && <Message>{Error}</Message>}
        {success && <Message variant="success">Updated your Profile</Message>}
        {loading && <Loader />}
        <Form onSubmit={onSumbit}>
          <FormGroup controlId="name">
            <FormLabel>Enter your name</FormLabel>
            <FormControl
              type="Name"
              placeholder="enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="email">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="password" className="my-3">
            <FormLabel>Enter Your password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="confirmpassword" className="my-3">
            <FormLabel>Confirm your password</FormLabel>
            <FormControl
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {orders?.Length !== 0 && (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid </th>
                <th>Delivered</th>
                <th>Detials</th>
              </tr>
            </thead>
            <tbody>
              {orders?.orders?.map((order) => (
                <tr key={order?._id}>
                  <th>{order._id}</th>
                  <th>{order.createdAt?.substring(0, 10)}</th>
                  <th>{order.totalPrice}</th>
                  <th>
                    {order.isPaid ? (
                      order?.paidAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </th>
                  <th>
                    {order.isDelivered ? (
                      order?.deliveredAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </th>
                  <th>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Detials
                      </Button>
                    </LinkContainer>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
export default ProfileScreen;
