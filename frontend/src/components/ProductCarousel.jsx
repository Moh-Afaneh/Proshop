import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedProducts } from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function ProductCarousel() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopRatedProducts());
  }, [dispatch]);
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, products } = productTopRated;
  console.log(products);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Carousel touch={true} pause="hover" className="bg-dark my-5">
          {products &&
            products?.products?.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} fluid className="d-block w-100" />
                  <Carousel.Caption className="carousel-caption">
                    <h2>
                      {product.name}(${product.price})
                    </h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
        </Carousel>
      )}
    </>
  );
}
export default ProductCarousel;
