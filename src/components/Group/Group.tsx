import React from 'react';
import './Group.css';

export interface GroupProps {
  id: string | null;
}

const Group: React.FC<GroupProps> = (props: GroupProps) => {

  if (!props.id) {
    return (<div className="Error" data-testid="Error">
        Must provide 'id' query param
      </div>
    );
  }
  
  return (
    <div className="Group" data-testid="Group">
      Group Component {props.id}
    </div>
  );
};

export default Group;
