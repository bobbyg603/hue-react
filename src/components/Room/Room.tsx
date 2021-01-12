import React from 'react';
import './Room.css';

export interface RoomProps {
  id: string;
}

const Room: React.FC<RoomProps> = (props: RoomProps) => {

  if (!props.id) {
    return (<div className="Error" data-testid="Error">
        Must provide 'id' query param
      </div>
    );
  }
  
  return (
    <div className="Room" data-testid="Room">
      Room Component {props.id}
    </div>
  );
};

export default Room;
