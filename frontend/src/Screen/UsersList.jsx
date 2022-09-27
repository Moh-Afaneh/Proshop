import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { DeleteUser, GetUserList } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

function UsersList() {
  const dispatch = useDispatch();
  const Navagtive = useNavigate();
  const UserList = useSelector((state) => state.UserList);
  const { loading, users, Error } = UserList;
  const UserLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = UserLogin;
  const UserDel = useSelector((state) => state.UserDel);
  const { success: successDelete } = UserDel;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(GetUserList());
    } else {
      Navagtive("/login");
    }
  }, [Navagtive, dispatch, userInfo, successDelete]);
  const DeleteHandler = (id) => {
    dispatch(DeleteUser(id));
  };
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : Error ? (
        <Message variant="danger"></Message>
      ) : (
        <Table className="table-sm" responsive bordered hover striped>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
          </thead>
          <tbody>
            {users !== undefined &&
              users.users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        Edit <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      onClick={() => DeleteHandler(user._id)}
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
      )}
    </>
  );
}
export default UsersList;
