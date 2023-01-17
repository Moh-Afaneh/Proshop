import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner className="spinner" animation="border" role="status">
      <span className="sr-only"></span>
    </Spinner>
  );
}
export default Loader;
