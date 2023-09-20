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
import {nodes as initialNodes, edges as initialEdges, center_x, center_y} from './initial-elements';
import './css/react_styles.css';


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
    const [curCenterX, setCurCenterX] = useState(center_x);
    const [curCenterY, setCurCenterY] = useState(center_y);
    const [panLimit, setPanLimit] = useState([[-Infinity, -Infinity], [Infinity, Infinity]]);


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
                //NOTE: Return node is hidden for the purpose of this visualization. To make it visible,
                //go to initial_elements.js, find the JSON element with an id field of "return",
                //then remove "display: 'none'" from its style element.
                const width = document.getElementsByClassName('react-flow__pane')[0].offsetWidth;
                const height = document.getElementsByClassName('react-flow__pane')[0].offsetHeight;

                const zoom = 0.8;

                setCenter(curCenterX, curCenterY, { zoom, duration: 1000 });
                setVisible('hidden');
                setMaxZ(2);
                setMinZ(0.5);
                setPanLimit([[-Infinity, -Infinity], [Infinity, Infinity]]);


            } else if (node.type != 'wrapper' && node.className != 'circle_stub') {
                setCurCenterX(node.position.x + 100);
                setCurCenterY(node.position.y + 75);


                if (contentVisible == 'hidden'){
                    const zoom = 0.5;
                    const width = document.getElementsByClassName('react-flow__pane')[0].offsetWidth;
                    const height = document.getElementsByClassName('react-flow__pane')[0].offsetHeight;
                    const offsetfactor = (0.5*(1/zoom))
                    const x_displacement = (width)*offsetfactor;
                    const y_displacement = -(height)*offsetfactor + 275;

                    setCenter(x_displacement, y_displacement, { zoom, duration: 1000 });
                    setMaxZ(zoom);
                    setMinZ(zoom);
                    setPanLimit([[-(width/zoom) + 250, y_displacement], [(width/zoom) + 1750, y_displacement]]);
                }

                setBgIndex((node.data.bg)? node.data.bg: No_BG);
                setTextContent(node.data.desc);
                setProjDesc(node.data.projdesc);
                setVisible('visible');


            }
        }
    );

    const returnToInitialView = useCallback(() => {
        const width = document.getElementsByClassName('react-flow__pane')[0].offsetWidth;
        const height = document.getElementsByClassName('react-flow__pane')[0].offsetHeight;

        const zoom = 0.8;

        setCenter(curCenterX, curCenterY, { zoom, duration: 1000 });
        setVisible('hidden');
        setMaxZ(2);
        setMinZ(0.5);
        setPanLimit([[-Infinity, -Infinity], [Infinity, Infinity]]);
    }, [curCenterX, curCenterY, panLimit, minZ, maxZ, contentVisible]);

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

    const center_screen = useCallback((instance) => {
        const zoom = 1;
        setCenter(center_x, center_y, { zoom, duration: 500 });

    });

    // All CSS stylesheet elements that make use of react states must be declared as a const here.
    // I.E. if some element <div> needs to make use of the react state "contentVisible",
    // you'd declare it like const divStyle = { visibility: `${contentVisible}` } and specify
    // div to use that style in its HTML tag by using <div style={divStyle}>. Alternatively,
    // you could simply declare <div style = {{ visibility: `${contentVisible}` }}>

    const textBoxStyle = {
        visibility: `${contentVisible}`,
        width: '40vw',
        minHeight: '20vh',
        borderRadius: '5%',
        background: 'rgba(200, 200, 200, 0.5)',
        fontSize: '1em',
        display: 'flex',
        flexFlow: 'column nowrap',
        maxHeight: '35vh',
    };

    const imgBoxStyle = {
        visibility: `${contentVisible}`,
        width: '30vw',
        maxWidth: '300px',
        maxHeight: '40vh',
        borderRadius: '5%',
        background: 'rgba(200, 200, 200, 0.5)',
        objectFit: 'contain',
    };

    const returnButtonStyle = {
        visibility: `${contentVisible}`,
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '5%',
        fontWeight: 'bold',
        marginTop: '10px',
        width: 'fit-content',
        padding: '2px',

    };

    return (
         <ReactFlow
          nodes={nodes}
          edges={edges}
          onInit = {center_screen}
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
                <img id="imageBox" src={`${bgIndex}`} style={imgBoxStyle}/>
            </Panel>

            <Panel position="top-left" style={{visibility: `${contentVisible}`}}>
                <div id="textBox" style={textBoxStyle}>
                    <p>{textContent}</p>
                    <p className="projDesc" >{projDesc}</p>
                </div>
                <div id="return_button" onClick={returnToInitialView} style={returnButtonStyle}>
                    Return to Free View Mode
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