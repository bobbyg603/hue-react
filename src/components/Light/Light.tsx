import React from 'react';
import './Light.css';

export interface LightProps {
  id: string | null;
}

const Light: React.FC<LightProps> = (props: LightProps) => {

  if (!props.id) {
    return (<div className="Error" data-testid="Error">
        Must provide 'id' query param
      </div>
    );
  }
  
  return (
    <div className="Light" data-testid="Light">
      Light Component {props.id}
    </div>
  );
};

export default Light;
