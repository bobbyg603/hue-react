import logo from '../logo.svg';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import Home from './Home/Home';
import Lights from './Lights/Lights';
import Groups from './Groups/Groups';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link className="nav-link" to="/">
            <img src={logo} className="App-logo" alt="logo" />
            Hue
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/lights">Lights</Link>
            <Link className="nav-link" to="/groups">Groups</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/lights">
        <Lights />
      </Route>
      <Route path="/groups">
        <Groups />
      </Route>
    </Router>
  );
}

export default App;
