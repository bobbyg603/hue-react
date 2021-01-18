import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { GroupsService } from '../../services/Groups/groups-service';
import './Groups.css';
import Bulb, { Light as Group, LightSize, LightState } from '../Bulb/Bulb';
import delay from 'delay';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export interface GroupsProps {
  id?: string;
  groupsService: GroupsService;
}

const Groups: React.FC<GroupsProps> = (props: GroupsProps) => {

  const [refresh, setRefresh] = useState(0);
  const [groups, setGroups] = useState([] as Array<Group>);

  const debouncedSetName = AwesomeDebouncePromise((id, name) => props.groupsService.setName(id, name), 100);
  const debouncedSetState = AwesomeDebouncePromise((id, state) => props.groupsService.setState(id, state), 250);

  useEffect(() => {
    if (!props.id) {
      props.groupsService
        .getGroups()
        .then(setGroups);
      return;
    }

    props.groupsService
      .getGroupById(props.id)
      .then((group) => ([group]))
      .then(setGroups);
  }, [props.id, props.groupsService, refresh]);

  const handleNameChange = async (id: string, name: string) => {
    await debouncedSetName(id, name);
    setRefresh(refresh + 1);
  };

  const handleStateChange = async (id: string, state: LightState) => {
    await debouncedSetState(id, state);
    setRefresh(refresh + 1);
  };

  return (
    <div className="Rooms" data-testid="Rooms">
      <Row className="mx-0">
        {
          groups.map(group => {
            return (
              <Col className="mt-4 text-center align-items-center" lg="2" key={group.id}>
                <Link className="nav-link" to={`/groups?id=${group.id}`}>
                  <h5>
                    {group.name}
                  </h5>
                </Link>
                <Bulb
                  id={group.id}
                  name={group.name}
                  state={group.state}
                  size={LightSize.medium}
                  onNameChange={(name) => handleNameChange(group.id, name)}
                  onStateChange={(state) => handleStateChange(group.id, state)}>
                </Bulb>
              </Col>
            );
          })
        }
      </Row>
    </div>
  );
};

export default Groups;
