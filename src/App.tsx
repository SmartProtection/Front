import { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Navigation from "./components/Navigation";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import { connectWallet } from "./helpers/Connection";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="App">
      <Router basename={"/"}>
        <header className="App-header">
          <Navigation />
        </header>
        <Container className="App-body my-3">
          <AppRouter />
        </Container>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
