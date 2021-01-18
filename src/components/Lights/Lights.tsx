import AwesomeDebouncePromise from 'awesome-debounce-promise';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { LightsService } from '../../services/Lights/lights-service';
import Bulb, { Light, LightSize, LightState } from '../Bulb/Bulb';
import './Lights.css';

export interface LightsProps {
  id?: string;
  lightsService: LightsService;
}

const Lights: React.FC<LightsProps> = (props: LightsProps) => {

  const [refresh, setRefresh] = useState(0);
  const [lights, setLights] = useState([] as Array<Light>);

  const debouncedSetName = AwesomeDebouncePromise((id, name) => props.lightsService.setName(id, name), 100);
  const debouncedSetState = AwesomeDebouncePromise((id, state) => props.lightsService.setState(id, state), 100);

  useEffect(() => {
    if (!props.id) {
      props.lightsService
        .getLights()
        .then(setLights);
      return;
    }

    props.lightsService
      .getLightById(props.id)
      .then((light) => ([light]))
      .then(setLights);
  }, [props.id, props.lightsService, refresh]);

  const handleNameChange = async (id: string, name: string) => {
    await debouncedSetName(id, name);
    setRefresh(refresh + 1);
  };

  const handleStateChange = async (id: string, state: LightState) => {
    await debouncedSetState(id, state);
    setRefresh(refresh + 1);
  };

  return (
    <div className="Lights" data-testid="Lights">
      <Row className="mx-0">
        {
          lights.map(light => {
            return (
              <Col className="mt-4 text-center align-items-center" lg="2" key={light.id}>
                <Link className="nav-link" to={`/lights?id=${light.id}`}>
                  <h5>
                    {light.name}
                  </h5>
                </Link>
                <Bulb
                  id={light.id}
                  name={light.name}
                  state={light.state}
                  size={LightSize.medium}
                  onNameChange={(name) => handleNameChange(light.id, name)}
                  onStateChange={(state) => handleStateChange(light.id, state)}>
                </Bulb>
              </Col>
            )
          })
        }
      </Row>
    </div>
  );
}

export default Lights;
