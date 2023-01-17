import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
function HomeScreen() {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, page, pages, loading } = productList;
  console.log(products);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to={"/"} className="btn btn-dark my-3">
          Go back
        </Link>
      )}
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
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
}
export default HomeScreen;
