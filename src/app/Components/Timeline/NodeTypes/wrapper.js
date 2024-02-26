import React, { memo, useCallback } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

function Wrapper({data}){

    const {setCenter} = useReactFlow();

    return (
    <div className="Wrapper">
      <Handle type="source" position={Position.Top} style={{visibility: 'hidden'}}/>
    </div>
    );
};

export default Wrapper;
