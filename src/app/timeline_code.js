'use client'

import React, { useEffect, useState, Component, useCallback }from "react";
import { Panel } from 'reactflow';
import 'reactflow/dist/style.css';

// './initial-elements' contains all the data for the nodes + edges used in our graph.
// The data for each node + edge is represented using a JSON object. The JSON for a node includes fields
// such as xy coordinates, text/image data and CSS styling elements. The JSON for an edge includes fields
// such as the nodes they connect and the style of their "arrowtip." The colors of edges are declared
// under the css style sheet './react_styles.css' under '.react-flow__edge-path, .react-flow__connection-path'.

// './react_styles.css' includes all the CSS styling options for static elements within our timeline.
// The CSS styling options for dynamic elements that make use of react states must be declared in this file instead.
// For a 'dynamic element' CSS example, ctrl+f textBoxStyle.
import {nodes as initialNodes, edges as initialEdges, x_one_start, y_one_start} from './initial-elements';
import './CSS/react_styles.css';


// Imported custom nodes.
// Handle: A dot on a node for an edge to connect to. Left or right handles can be made invisible by declaring
//         leftstyle || rightstyle: {visibility: 'hidden} within the JSON data for a node in initial-elements.js.
// Source handle: the handle an edge originates from.
// Target handle: the handle an edge connects to.
//
// Connector node: node type with a left target handle, a right source handle, and an upper source handle that connects to the axis above it.
// Receiver node: node type with a left target handle, a right source handle, and a bottom target handle used to connects to the axis below it.
// Between node: node type with a left target handle and a right source handle. Most common node type.
import BetweenNode from './NodeTypes/BetweenNode.js';
import Wrapper from './NodeTypes/wrapper.js';

import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
} from 'reactflow';

// Dict object mapping imported node types to variable names. These variable names are used to assign nodes a type
// in initial-elements.js. For example, if you imported a node type 'import example_1 from 'example_1.js' earlier,
// and you mapped example_1 to the name example_2 using example_2:example_1, you'd declare 'type: 'example_2'' in the
// JSON data of a node under initial-elements.js to make that node of type example_1.

const nodeTypes = {
    betweenNode: BetweenNode,
    wrapper: Wrapper,
};


function Timeline() {

    const No_BG = './No_BG.png'
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params) =>
          setEdges((eds) =>
            addEdge({ ...params, type: 'floating'}, eds)
          ),
        []
      );
    const [contentVisible, setVisible] = useState('hidden');
    const [bgIndex, setBgIndex] = useState(No_BG);
    const [textContent, setTextContent] = useState("Node not selected yet");
    const [projDesc, setProjDesc] = useState("");
    const [minZ, setMinZ] = useState(0.5);
    const [maxZ, setMaxZ] = useState(2);
    const [panLimit, setPanLimit] = useState([[-Infinity, -Infinity], [Infinity, Infinity]])

    // 'setCenter' isn't a const, but a helper function we're calling from the useReactFlow hook. In order to call
    // any of these helper functions, the reactflow element its being called from must be wrapped in the
    // <ReactFlowProvider> tag. (See TimeLineWithProvider() function below.)
    //
    // Source: https://reactflow.dev/docs/examples/misc/use-react-flow-hook/
    const {setCenter} = useReactFlow();

    // onNodeClick is the function that gets called whenever a node within the graph is clicked on.
    // Clicking on any node within the graph triggers the default view (second if statement),
    // Clicking on the 'return' node in the default view triggers the initial view (first if statement).
    const onNodeClick = useCallback((event, node) => {

            if (node.id == 'return') {
                const width = document.getElementsByClassName('react-flow__pane')[0].offsetWidth;
                const height = document.getElementsByClassName('react-flow__pane')[0].offsetHeight;

                const zoom = 0.8;
                const offsetfactor = (0.5*(1/zoom))
                const x_displacement = offsetfactor*width - 120;
                const y_displacement = (height)*offsetfactor - 100;

                setCenter(x_displacement, y_displacement, { zoom, duration: 1000 });
                setVisible('hidden');
                setMaxZ(2);
                setMinZ(0.5);
                setPanLimit([[-Infinity, -Infinity], [Infinity, Infinity]]);


            } else if (node.type != 'wrapper' && node.className != 'circle_stub') {
                const zoom = 0.5;

                const width = document.getElementsByClassName('react-flow__pane')[0].offsetWidth;
                const height = document.getElementsByClassName('react-flow__pane')[0].offsetHeight;
                const offsetfactor = (0.5*(1/zoom))
                const x_displacement = offsetfactor*width - 25;
                const y_displacement = -(height-700)*offsetfactor + 25;


                setCenter(x_displacement, y_displacement, { zoom, duration: 1000 });
                setBgIndex((node.data.bg)? node.data.bg: No_BG);
                setTextContent(node.data.desc);
                setProjDesc(node.data.projdesc);
                setVisible('visible');
                setMaxZ(zoom);
                setMinZ(zoom);
                setPanLimit([[x_displacement, y_displacement], [x_displacement, y_displacement]]);

            }
        }
    );

    //hook that gets called whenever contentVisible state gets changed. Simply toggles the visibility of
    //the "return to initial view" button.
    useEffect(() => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === 'return') {
              // when you update a simple type you can just update the value
              node.hidden = (contentVisible == 'hidden');
            }

            return node;
          })
        );
      }, [contentVisible, setNodes]);

    //hook that gets called when this component mounts. Centers screen.
    useEffect(() => {
        const width = document.getElementsByClassName('react-flow__pane')[0].offsetWidth;
        const height = document.getElementsByClassName('react-flow__pane')[0].offsetHeight;
        setCenter(width, height, { zoom: 1, duration: 0 });

    }, []);

    // All CSS stylesheet elements that make use of react states must be declared as a const here.
    // I.E. if some element <div> needs to make use of the react state "contentVisible",
    // you'd declare it like const divStyle = { visibility: `${contentVisible}` } and specify
    // div to use that style in its HTML tag by using <div style={divStyle}>. Alternatively,
    // you could simply declare <div style = {{ visibility: `${contentVisible}` }}>

    const textBoxStyle = {
        visibility: `${contentVisible}`,
        width: '40vw',
        borderRadius: '5%',
        background: 'rgba(200, 200, 200, 0.5)',
        fontSize: '1em',
        display: 'flex',
        flexFlow: 'column nowrap',
        maxHeight: '35vh',
    };

    const imgBoxStyle = {
        visibility: `${contentVisible}`,
        height: '50vh',
        background: 'rgba(200, 200, 200, 0.5)',
    };

    return (
         <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesDraggable={false}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes = {nodeTypes}
          onNodeClick = {onNodeClick}
          onConnect={onConnect}
          minZoom={minZ}
          maxZoom={maxZ}
          translateExtent={panLimit}
          attributionPosition="top-right"
        >

            <Controls />
            <Background color="#aaa" gap={16} />

            <Panel position="top-right" style={{visibility: `${contentVisible}`}}>
                <img src={`${bgIndex}`} style={imgBoxStyle}/>
            </Panel>

            <Panel position="bottom-right" style={{visibility: `${contentVisible}`}}>
                <div id="textBox" style={textBoxStyle}>
                    <p>{textContent}</p>
                    <p class="projDesc" >{projDesc}</p>
                </div>
            </Panel>

         </ReactFlow>

    );
}


// Simple helper function that wraps the code returned by the above 'timeline' function in a ReactFlowProvider element.
// Necessary in order to use any functions that modify the internal data of nodes during runtime. In the case of our
// code, the internal data we're modifying is the zoom level of the nodes when moving between the initial view
// and the default view.
export default function TimelineWithProvider() {
    return (
        <ReactFlowProvider>
            <Timeline />
        </ReactFlowProvider>
    )
}

//this renders all the HTML code returned by the function TimeLineWithProvider into the div element with id 'app'
// in frontend/templates/index.html.