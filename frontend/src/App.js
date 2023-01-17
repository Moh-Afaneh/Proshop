import "./App.scss";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./Screen/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./Screen/ProductScreen";
import LoginScreen from "./Screen/LoginScreen";
import CartScreen from "./Screen/CartScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterScreen from "./Screen/RegisterScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import ShippingScreen from "./Screen/ShippingScreen";
import PaymentMethod from "./Screen/PaymentMethod";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import OrderScreen from "./Screen/OrderScreen";
import UsersList from "./Screen/UsersList";
import EditUsersScreen from "./Screen/EditUsersScreen";
import ProductListScreen from "./Screen/ProductListScreen";
import ProductEditScreen from "./Screen/ProductEditScreen";
import OrderListScreen from "./Screen/OrderListScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<HomeScreen />}
              />
              <Route path="/search/:keyword" element={<HomeScreen />} />
              <Route path="admin/productList" element={<ProductListScreen />} />
              <Route
                path="admin/productList/:pageNumber"
                element={<ProductListScreen />}
              />
              <Route path="admin/user/:id/edit" element={<EditUsersScreen />} />
              <Route
                path="admin/product/:id/edit"
                element={<ProductEditScreen />}
              />
              <Route path="admin/OrderList" element={<OrderListScreen />} />
              <Route path="admin/userList" element={<UsersList />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/place-order" element={<PlaceOrderScreen />} />
              <Route path="/payment" element={<PaymentMethod />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/cart">
                <Route path=":id" element={<CartScreen />} />
                <Route path="" element={<CartScreen />} />
              </Route>
            </Routes>
          </Container>
        </main>
      </Router>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
