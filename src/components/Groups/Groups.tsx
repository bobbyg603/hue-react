import React, { useEffect, useState } from 'react';
import { ApiClient } from '../../services/ApiClient/api-client-service';
import { GroupsService } from '../../services/Groups/groups-service';
import './Groups.css';

const Groups: React.FC = () => {
  
  const [groups, setGroups] = useState({ groups: [] });
  
  useEffect(() => {
    // TODO BG DI
    const apiClient = new ApiClient(fetch.bind(globalThis), 'hue.local', 'yB1olM3CtrQhQxtG1Xc5oT5l8QsIgbtP2PIiueLS');
    const groupsService = new GroupsService(apiClient);
    groupsService.getGroups()
      .then((groups) => setGroups({ groups }));
  }, []);

  return (
    <div className="Groups" data-testid="Groups">
      {JSON.stringify(groups)}
    </div>
  );
};

export default Groups;
