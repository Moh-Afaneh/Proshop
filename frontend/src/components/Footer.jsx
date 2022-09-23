import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <Container>
      <footer>
        <Row>
          <Col className="text-center py-3">Copyright &copy; ProShop</Col>
        </Row>
      </footer>
    </Container>
  );
}
export default Footer;
