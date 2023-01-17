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
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserDetails, UpdateUserAdmin } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const EditUsersScreen = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const dispatch = useDispatch();
  const Update = useSelector((state) => state.UserUpdateAdmin);

  const UserDetials = useSelector((state) => state.UserDetails);
  const {
    loading,
    user: { user },
    user: { message },
  } = UserDetials;
  const { success } = Update;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails(id));
    if (success) {
      dispatch({ type: "USER_UPDATE_RESET" });
      navigate("/admin/userList");
    } else {
      if (!user?.name || user?._id !== id || !message) {
        dispatch(getUserDetails(id));
      } else {
        setName(user?.name);
        setEmail(user?.email);
        setAdmin(user?.isAdmin);
      }
    }
  }, [
    message,
    dispatch,
    id,
    navigate,
    success,
    user?._id,
    user?.email,
    user?.isAdmin,
    user?.name,
  ]);
  const onSumbit = (e) => {
    e.preventDefault();
    dispatch(UpdateUserAdmin({ _id: id, name, email, isAdmin }));
  };
  return (
    <>
      <Link to={"/admin/userList"} className="btn-dark fw-bold">
        Go back
      </Link>

      <FormContainer>
        <h1 className="display-6 fw-bold">Edit user</h1>
        {loading && <Loader />}
        <Form onSubmit={onSumbit}>
          <FormGroup controlId="name" className="my-3">
            <FormLabel>Enter name</FormLabel>
            <FormControl
              type="name"
              placeholder="enter Name"
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
          <Form.Check
            type="checkbox"
            label="is Admin"
            checked={isAdmin}
            onChange={(e) => setAdmin(e.target.checked)}
          ></Form.Check>
          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
        </Form>
        <Row className="py-3">
          <Col></Col>
        </Row>
      </FormContainer>
    </>
  );
};
export default EditUsersScreen;
