import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { GroupsService } from '../../services/Groups/groups-service';
import Bulb from '../Bulb/Bulb';
import './Groups.css';

export interface GroupsProps {
  groupsService: GroupsService;
}

const Groups: React.FC<GroupsProps> = (props: GroupsProps) => {

  const [state, setState] = useState({ groups: [] });

  useEffect(() => {
    props.groupsService.getGroups()
      .then((groups) => setState({ groups }));
  }, [props.groupsService]);

  return (
    <div className="Groups" data-testid="Groups">
      <Row className="mx-0">
        {
          Object.keys(state.groups).map(key => {
            const group = state.groups[key];
            const name = group.name;
            const on = group.action.on;
            const xy = group.action.xy;
            const x = xy ? xy[0] : 0;
            const y = xy ? xy[1] : 0;
            const brightness = group.action.bri;

            return (
              <Col className="mt-4 text-center align-items-center" lg="2" key={key}>
                <h5>
                  {name}
                </h5>
                <Link className="nav-link" to={`/group?id=${key}`}>
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
};

export default Groups;
