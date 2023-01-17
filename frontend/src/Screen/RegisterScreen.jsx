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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Register } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const onSumbit = (e) => {
    e.preventDefault();
    // dispatch Register
    if (password !== confirmPassword) {
      toast.warn("password and confirm password does not match");
    } else {
      dispatch(Register(name, email, password));
    }
  };
  const state = useSelector((state) => state.UserRegister);

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
    <FormContainer>
      <h1 className="display-6 fw-bold">Sign up</h1>
      {Error && <Message>{Error}</Message>}
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
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="confirmpassword" className="my-3">
          <FormLabel>Enter Your password</FormLabel>
          <FormControl
            type="password"
            placeholder="enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary" className="my-3">
          Sign in
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account ?
          <Link
            className="fw-bold mx-2"
            to={redirect ? `/login?redirect=${redirect}` : `/login`}
          >
            Login Now
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterScreen;
