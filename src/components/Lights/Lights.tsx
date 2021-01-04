import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ApiClient } from '../../services/ApiClient/api-client-service';
import { LightsService } from '../../services/Lights/lights-service';
import Light from '../Light/Light';
import './Lights.css';

const Lights: React.FC = () => {
  
  const [state, setState] = useState({ lights: [] });
  
  useEffect(() => {
    // TODO BG DI
    const apiClient = new ApiClient(fetch.bind(globalThis), 'hue.local', 'yB1olM3CtrQhQxtG1Xc5oT5l8QsIgbtP2PIiueLS');
    const lightsService = new LightsService(apiClient);
    lightsService.getLights()
      .then((lights) => setState({ lights }));
  }, []);

  return (
    <div className="Lights" data-testid="Lights">
      <Row className="mx-0">
      {
        // TODO BG put a console log in the map function, why is it rendering so many times?
        Object.keys(state.lights).map(key => {
          const light = state.lights[key];
          const name = light.name;
          const on = light.state.on;
          const xy = light.state.xy;
          const x = xy ? xy[0] : 0;
          const y = xy ? xy[1] : 0;
          const brightness = light.state.bri;

          return (
            <Col className="mt-4 text-center align-items-center" lg="2" key={key}>
              <h5>
                {name}
              </h5>
              <Light 
                on={on} 
                x={x}
                y={y}
                brightness={brightness}>
              </Light>
            </Col>
          )
        })
      }      
      </Row>
    </div>
  );
}

export default Lights;
