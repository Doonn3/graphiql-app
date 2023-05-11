import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Row className="w-100">
          <Col md={12} className="d-flex">
            <Navbar.Brand>Graphi-QL</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Welcom
              </Nav.Link>
              <Nav.Link as={NavLink} to="/main">
                Main
              </Nav.Link>
            </Nav>

            <Nav className="mr-auto">
              <Nav.Link>Sign In</Nav.Link>
              <Nav.Link>Sign Up</Nav.Link>
              <Nav.Link>Sign Out</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
