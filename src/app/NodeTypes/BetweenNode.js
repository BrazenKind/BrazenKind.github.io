import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';


function BetweenNode({data}){
    return (
    <div className="BetweenNode">
      <Handle type="target" position={Position.Left} style={data.leftStyle}/>
      <div className="nodeLabelTop">
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} style={data.rightStyle}/>
    </div>
    );
};

export default BetweenNode;