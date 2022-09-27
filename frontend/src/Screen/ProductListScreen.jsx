import { useEffect } from "react";

import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

function UsersList() {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();
  const Navagtive = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, products, Error, page, pages } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate, product: createdProduct } = productCreate;
  const UserLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = UserLogin;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  useEffect(() => {
    dispatch({ type: "PRODUCT_CREATE_RESET" });
    if (!userInfo.isAdmin) {
      Navagtive("/login");
    }
    if (successCreate) {
      Navagtive(`/admin/product/${createdProduct?.createdProduct?._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    Navagtive,
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProduct?.createdProduct?._id,
    pageNumber,
  ]);
  const DeleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col md={10}>
          <h1>products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : Error ? (
        <Message variant="danger"></Message>
      ) : (
        <>
          <Table className="table-sm" responsive bordered hover striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products !== undefined &&
                products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          Edit <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        onClick={() => DeleteHandler(product._id)}
                        variant="danger"
                        className="btn-sm "
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ fontSize: ".95rem" }}
                        ></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
}
export default UsersList;
