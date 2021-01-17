import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  Link,
  Route,
  useLocation
} from "react-router-dom";
import logo from '../logo.svg';
import { ApiClient } from '../services/ApiClient/api-client-service';
import { GroupsService } from '../services/Groups/groups-service';
import { LightsService } from '../services/Lights/lights-service';
import './App.css';
import Light from './Light/Light';
import Lights from './Lights/Lights';
import Room from './Room/Room';
import Rooms from './Rooms/Rooms';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const apiClient = new ApiClient('hue.local', 'yB1olM3CtrQhQxtG1Xc5oT5l8QsIgbtP2PIiueLS');
  const groupsService = new GroupsService(apiClient);
  const lightsService = new LightsService(apiClient);
  const query = useQuery();

  return (
    <div>
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/">
        <Rooms groupsService={groupsService} />
      </Route>
      <Route path="/lights">
        <Lights lightsService={lightsService} />
      </Route>
      <Route path="/room">
        <Room id={query.get('id') as string} />
      </Route>
      <Route path="/light">
        <Light id={query.get('id')} lightsService={lightsService} />
      </Route>
    </div>
  );
}

export default App;
