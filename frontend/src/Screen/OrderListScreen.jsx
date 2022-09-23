import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetAllOrders } from "../actions/orderAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

function OrderListScreen() {
  const dispatch = useDispatch();
  const Navagtive = useNavigate();
  const AllOrders = useSelector((state) => state.AllOrders);
  const { loading, orders: orderArr, Error } = AllOrders;
  const { orders } = orderArr;
  const UserLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = UserLogin;
  useEffect(() => {
    dispatch(GetAllOrders());
    if (userInfo && userInfo.isAdmin) {
      dispatch(GetAllOrders());
    } else {
      Navagtive("/login");
    }
  }, [Navagtive, dispatch, userInfo]);
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : Error ? (
        <Message variant="danger"></Message>
      ) : (
        <Table className="table-sm" responsive bordered hover striped>
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
            {orders !== undefined &&
              orders?.map((order) => (
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
    </>
  );
}
export default OrderListScreen;
