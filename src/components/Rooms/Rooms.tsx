import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { GroupsService } from '../../services/Groups/groups-service';
import Bulb from '../Bulb/Bulb';
import './Rooms.css';

export interface RoomsProps {
  groupsService: GroupsService;
}

export interface Group {
  id: string;
  name: string;
  on: boolean;
  x: number;
  y: number;
  brightness: number;
}

const Rooms: React.FC<RoomsProps> = (props: RoomsProps) => {

  const groups = [] as Array<Group>;
  const [refresh, setRefresh] = useState(0);
  const [state, setState] = useState({ groups });

  useEffect(() => {
    props.groupsService.getGroups()
      .then((groups) => setState({ groups }));
  }, [props.groupsService, refresh]);

  return (
    <div className="Rooms" data-testid="Rooms">
      <Row className="mx-0">
        {
          state.groups.map(group => {

            const handleClick = async () => {
              await props.groupsService.setOnOffValue(group.id, !group.on);
              setRefresh(refresh + 1);
            };

            return (
              <Col className="mt-4 text-center align-items-center" lg="2" key={group.id}>
                <Link className="nav-link" to={`/room?id=${group.id}`}>
                  <h5>
                    {group.name}
                  </h5>
                </Link>
                <button onClick={() => handleClick()}>
                  <Bulb
                    on={group.on}
                    x={group.x}
                    y={group.y}
                    brightness={group.brightness}>
                  </Bulb>
                </button>
              </Col>
            );
          })
        }
      </Row>
    </div>
  );
};

export default Rooms;
