import React, { useEffect, useState } from 'react';
import { ApiClient } from '../../services/ApiClient/api-client-service';
import { GroupsService } from '../../services/Groups/groups-service';
import './Groups.css';

const Groups: React.FC = () => {
  // TODO BG DI
  const apiClient = new ApiClient(fetch.bind(globalThis), 'hue.local', 'yB1olM3CtrQhQxtG1Xc5oT5l8QsIgbtP2PIiueLS');
  const lightsService = new GroupsService(apiClient);
  const [groups, setGroups] = useState({ groups: [] });

  useEffect(() => {
    lightsService.getGroups()
      .then((groups) => setGroups({ groups }));
  });

  return (
    <div className="Groups" data-testid="Groups">
      {JSON.stringify(groups)}
    </div>
  );
};

export default Groups;
