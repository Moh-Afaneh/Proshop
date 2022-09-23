import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
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
import { listProductDetails, updateProduct } from "../actions/productAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

const ProductEditScreen = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [upload, setUpload] = useState(false);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(0);
  const dispatch = useDispatch();
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;
  const uploadFileHandler = async (e) => {
    console.log(e.target);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUpload(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      console.log(data);
      setImage(data);
      setUpload(false);
    } catch (error) {
      console.log(error.data);
      setUpload(false);
    }
  };
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      Navigate("/admin/productList");
    } else {
      dispatch(listProductDetails(id));
      if (!product?.name || product?._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product?.name);
        setPrice(product?.price);
        setImage(product?.image);
        setCategory(product?.category);
        setBrand(product?.brand);
        setCountInStock(product?.countInStock);
        setDescription(product?.description);
      }
    }
  }, [
    Navigate,
    dispatch,
    id,
    product?._id,
    product?.brand,
    product?.category,
    product?.countInStock,
    product?.description,
    product?.image,
    product?.name,
    product?.price,
    successUpdate,
  ]);
  const onSumbit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        countInStock,
        category,
        description,
      })
    );
  };
  return (
    <>
      <Link to={"/admin/productList"} className="btn-dark fw-bold">
        Go back
      </Link>

      <FormContainer>
        <h1 className="display-6 fw-bold">Edit Product</h1>
        {loading && <Loader />}
        <Form onSubmit={onSumbit}>
          <FormGroup controlId="name" className="my-3">
            <FormLabel>name</FormLabel>
            <FormControl
              type="name"
              placeholder="enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="price">
            <FormLabel>price</FormLabel>
            <FormControl
              type="number"
              placeholder="enter your email"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="image">
            <FormLabel>image</FormLabel>
            <FormControl
              type="text"
              label="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></FormControl>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>upload image</Form.Label>
              <Form.Control
                type="file"
                custom="true"
                onChange={uploadFileHandler}
              />{" "}
              {upload && <Loader></Loader>}
            </Form.Group>
          </FormGroup>
          <FormGroup controlId="brand">
            <FormLabel>brand</FormLabel>
            <FormControl
              type="text"
              label="image"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="category">
            <FormLabel>category</FormLabel>
            <FormControl
              type="text"
              label="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="description">
            <FormLabel>description</FormLabel>
            <FormControl
              type="text"
              label="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="countInStock">
            <FormLabel>count in stock</FormLabel>
            <FormControl
              type="text"
              label="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></FormControl>
          </FormGroup>

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
export default ProductEditScreen;
