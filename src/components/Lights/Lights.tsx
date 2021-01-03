import React, { useEffect, useState } from 'react';
import { ApiClient } from '../../services/ApiClient/api-client-service';
import { LightsService } from '../../services/Lights/lights-service';
import './Lights.css';

const Lights: React.FC = () => {
  // TODO BG DI
  const apiClient = new ApiClient(fetch.bind(globalThis), 'hue.local', 'yB1olM3CtrQhQxtG1Xc5oT5l8QsIgbtP2PIiueLS');
  const lightsService = new LightsService(apiClient);
  const [lights, setLights] = useState({ lights: [] });

  useEffect(() => {
    lightsService.getLights()
      .then((lights) => setLights({ lights }));
  });

  return (
    <div className="Lights" data-testid="Lights">
      {JSON.stringify(lights)}
    </div>
  );
}

export default Lights;
