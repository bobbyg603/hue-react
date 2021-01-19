import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GroupsService } from '../../services/Groups/groups-service';
import { debounce } from '../../utils/debounce';
import Bulb, { Light as Group, LightSize, LightState } from '../Bulb/Bulb';
import './Groups.css';

export interface GroupsProps {
  id?: string;
  groupsService: GroupsService;
}

const Groups: React.FC<GroupsProps> = (props: GroupsProps) => {
  const [groups, setGroups] = useState([] as Array<Group>);
  const [refresh, setRefresh] = useState(0);

  const debouncedSetName = debounce((id, name) => props.groupsService.setName(id, name), 100);
  const debouncedSetState = debounce((id, state) => props.groupsService.setState(id, state), 250);

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
    <div className="Groups" data-testid="Groups">
      <Row className="mx-0 pt-2">
        {
          groups.map(group => {
            return (
              <Col className="my-2 px-2 text-center align-items-center" lg="2" key={group.id}>
                <div className="px-2 bg-light rounded">
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
                </div>
              </Col>
            );
          })
        }
      </Row>
    </div>
  );
};

export default Groups;
