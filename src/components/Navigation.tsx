import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
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
            View Claims
          </Nav.Link>
          <Nav.Link as={Link} to="/claim/process">
            Process Claims
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
