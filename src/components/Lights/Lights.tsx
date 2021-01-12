import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { LightsService } from '../../services/Lights/lights-service';
import Bulb from '../Bulb/Bulb';
import './Lights.css';

export interface LightsProps {
  lightsService: LightsService;
}

const Lights: React.FC<LightsProps> = (props: LightsProps) => {

  const [state, setState] = useState({ lights: [] });

  useEffect(() => {
    props.lightsService.getLights()
      .then((lights) => setState({ lights }));
  }, [props.lightsService]);

  return (
    <div className="Lights" data-testid="Lights">
      <Row className="mx-0">
        {
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
                <Link className="nav-link" to={`/light?id=${key}`}>
                  <Bulb
                    on={on}
                    x={x}
                    y={y}
                    brightness={brightness}>
                  </Bulb>
                </Link>
              </Col>
            )
          })
        }
      </Row>
    </div>
  );
}

export default Lights;
