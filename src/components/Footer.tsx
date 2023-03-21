import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 fixed-bottom">
      <Container>
        <p className="text-center">
          &copy; {new Date().getFullYear()} Smart Insurance
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
