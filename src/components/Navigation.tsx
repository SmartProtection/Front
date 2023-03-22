import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigation() {
  return (
    <Container fluid className="p-0">
      <Navbar bg="light" expand="lg" className="px-3">
        <Navbar.Brand>Smart Insurance</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/policy/view">
              View Policy
            </Nav.Link>
            <Nav.Link as={Link} to="/policy/new">
              New Policy
            </Nav.Link>
            <Nav.Link as={Link} to="/claim/view">
              View Claim
            </Nav.Link>
            <Nav.Link as={Link} to="/claim/new">
              New Claim
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Navigation;
