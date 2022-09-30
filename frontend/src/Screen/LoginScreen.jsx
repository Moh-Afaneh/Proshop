import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Login } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const onSumbit = (e) => {
    e.preventDefault();
    // dispatch Login
    dispatch(Login(email, password));
  };
  const state = useSelector((state) => state.UserLogin);
  const loading = state?.loading;
  const userInfo = state?.userInfo;
  const Error = state?.Error;
  const location = useLocation();
  const redirect = location?.search ? location?.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      nav(redirect);
    }
  }, [userInfo, redirect, nav]);
  return (
    <>
      <FormContainer>
        <h1 className="display-6 fw-bold">Sign in</h1>
        {Error && <Message>{Error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={onSumbit}>
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
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Button type="submit" variant="primary" className="my-3">
            Sign in
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ?{" "}
            <Link
              className="fw-bold"
              to={redirect ? `/register?redirect=${redirect}` : `/register`}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};
export default LoginScreen;
