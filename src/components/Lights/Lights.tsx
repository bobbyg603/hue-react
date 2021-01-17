import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { LightsService } from '../../services/Lights/lights-service';
import Bulb from '../Bulb/Bulb';
import './Lights.css';
import { RouteableBulb as Light } from '../Bulb/Bulb';

export interface LightsProps {
  lightsService: LightsService;
}

const Lights: React.FC<LightsProps> = (props: LightsProps) => {

  const lights = [] as Array<Light>;
  const [refresh, setRefresh] = useState(0);
  const [state, setState] = useState({ lights });

  useEffect(() => {
    props.lightsService.getLights()
      .then((lights) => setState({ lights }));
  }, [props.lightsService, refresh]);

  return (
    <div className="Lights" data-testid="Lights">
      <Row className="mx-0">
        {
          state.lights.map(light => {
            const handleClick = async () => {
              await props.lightsService.setOnOffValue(light.id, !light.on);
              setRefresh(refresh + 1);
            };

            return (
              <Col className="mt-4 text-center align-items-center" lg="2" key={light.id}>
                <Link className="nav-link" to={`/light?id=${light.id}`}>
                  <h5>
                    {light.name}
                  </h5>
                </Link>
                <button onClick={handleClick}>
                  <Bulb
                    on={light.on}
                    brightness={light.brightness}
                    color={light.color}>
                  </Bulb>
                </button>
              </Col>
            )
          })
        }
      </Row>
    </div>
  );
}

export default Lights;
