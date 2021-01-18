import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ConfigService } from '../../services/Config/config-service';
import './Home.css';

export interface HomeProps {
  configService: ConfigService;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {

  const [config, setConfig] = useState({});

  useEffect(() => {
    props.configService
      .getConfig()
      .then(setConfig);
  }, [props.configService]);

  return (
    <div className="Home" data-testid="Home">
      <div className="mt-4">
      {
        Object.keys(config).map(key => {
          return (
            <Row className="mx-4" key={key}>
              <Col lg="2" sm="12"><b>{key}</b></Col>
              <Col lg="10" sm="12">{JSON.stringify(config[key])}</Col>
            </Row>
          );
        })
      }
      </div>
    </div>
  );
}

export default Home;
