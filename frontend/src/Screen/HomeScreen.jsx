import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;
  console.log(products);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Featured Products</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            {products &&
              products?.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
}
export default HomeScreen;
