import React from 'react';
import { MarkerType, Position } from 'reactflow';


// The timeline is divided into 3 axes: axis 1, axis 2 and axis 3. An axis is defined as a set of connected nodes
// that share the same Y coordinates.

const x_one_start = 0;
const y_one_start = 0;

//set center_x to the x coordinates plus half the width of the node you'd like to focus on.
//set center_y to y coordinates plus half the height of the node you'd like to focus on.
export const center_x = x_one_start + 100;
export const center_y = y_one_start + 75;

const x_two_start = 300;
const y_two_start = 200;


const x_interval = 250;



// X coordinates for each axis of nodes are calculated by taking the X position of the first node in that axis
// and incrementing it multiple times by the const x_interval. Currently x_interval is set to 150, and this
// const could be changed to increase or decrease the spacing between nodes.

function getxpos(start, increments){
    return start + increments*x_interval;
}


export let nodes = [

    {
        id: 'all',
        data: {
            label: null
        },
        position: {x: 0, y: 0},
        style: {
            width: 1400,
            height: 200,
            background: 'rgb(255, 255, 255, 0)',
        },
        type: 'wrapper',
    },

    {
        id: 'return',
        data: {
            label: 'return to initial view'
        },
        style: {
            width: 'auto',
            fontSize: '32px',
            display: 'none',
        },
        position: {x: 50, y: -125},
        extent: [[50, -125], [50, -125]],
        hidden: true,
    },
    {
        id: '1.1',
        data: {
            label: 'Conditional Random Field Implementation',
            desc: 'My graduate assessment for CMSC 673: introduction to natural language processing.',
            labelpos: 'nodeLabelTop',
            projdesc: 'asdf',
            leftStyle: {visibility: 'hidden',},
            rightStyle: {visibility: 'visible',},
        },
        className: 'jobitem',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 0) , y: y_one_start },
        parentNode: 'all',
        extent: 'parent',
    },
    {
        id: '1.2',
        data: {
            label: 'Covid Misinformation Detector',
            desc: 'My final project for CMSC 673: introduction to natural language processing.',
            labelpos: 'nodeLabelTop',
            projdesc: 'asdf',
            leftStyle: {visibility: 'visible',},
            rightStyle: {visibility: 'visible',},
        },
        className: 'jobitem',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 1) , y: y_one_start},
        parentNode: 'all',
        extent: 'parent',
    },

    {
        id: '1.3',
        data: {
            label: 'Sign Language Image Classifier',
            desc: 'My final project for CMSC 678: introduction to Machine Learning.',
            labelpos: 'nodeLabelTop',
            projdesc: 'asdf',
            leftStyle: {visibility: 'visible',},
            rightStyle: {visibility: 'visible',},
        },
        className: 'jobitem',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 3) , y: y_one_start},
        parentNode: 'all',
        extent: 'parent',
    },

    {
        id: '1.4',
        data: {
            label: 'Wordle Solver',
            desc: 'My final project for CMSC 671: principles of artificial intelligence.',
            labelpos: 'nodeLabelTop',
            projdesc: 'asdf',
            leftStyle: {visibility: 'visible',},
            rightStyle: {visibility: 'visible',},
        },
        className: 'jobitem',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 5) , y: y_one_start},
        parentNode: 'all',
        extent: 'parent',
    },

    {
        id: '1.5',
        data: {
            label: 'Aeroplane: an Android Password Archiver',
            desc: 'My final project for CMSC 628: Introduction to Mobile Computing.',
            labelpos: 'nodeLabelTop',
            projdesc: 'asdf',
            leftStyle: {visibility: 'visible',},
            rightStyle: {visibility: 'visible',},
        },
        className: 'jobitem',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 7) , y: y_one_start},
        parentNode: 'all',
        extent: 'parent',
    },

    {
        id: '1.6',
        data: {
            label: '',
            desc: '',
            labelpos: 'circleStubLabel',
            leftStyle: {visibility: 'hidden',},
            rightStyle: {visibility: 'hidden',},
        },
        className: 'hidden_node',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 9) , y: y_one_start+75},
        parentNode: 'all',
        extent: 'parent',
    },

    {
        id: '2.0',
        data: {
            label: '',
            desc: '',
            labelpos: 'circleStubLabel',
            leftStyle: {visibility: 'hidden',},
            rightStyle: {visibility: 'hidden',},
        },
        className: 'hidden_node',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 0) , y: y_two_start},
        parentNode: 'all',
        extent: 'parent',
    },

    {
        id: '2.1',
        data: {
            label: '2022',
            desc: '',
            labelpos: 'circleStubLabel',
            leftStyle: {visibility: 'hidden',},
            rightStyle: {visibility: 'visible',},
        },
        className: 'circle_stub',
        type: 'betweenNode',
        position: {x: getxpos(x_two_start, 1) , y: y_two_start},
        parentNode: 'all',
        extent: 'parent',
    },

    {
        id: '2.2',
        data: {
            label: '2023',
            desc: '',
            labelpos: 'circleStubLabel',
            leftStyle: {visibility: 'hidden',},
            rightStyle: {visibility: 'visible',},
        },
        className: 'circle_stub',
        type: 'betweenNode',
        position: {x: getxpos(x_two_start, 5) , y: y_two_start},
        parentNode: 'all',
        extent: 'parent',
    },

    {
        id: '2.3',
        data: {
            label: 'Current',
            desc: '',
            labelpos: 'circleStubLabel',
            leftStyle: {visibility: 'hidden',},
            rightStyle: {visibility: 'hidden',},
        },
        className: 'circle_stub',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 9) , y: y_two_start},
        parentNode: 'all',
        extent: 'parent',
    },



];


// The JSON data for an edge must include a 'source' node (the node the edge comes from)
// and a 'target' node (the node the edge connects to.) In the case a source node has multiple
// source handles (i.e. connector nodes), you must specify the position of source handle to use using the sourceHandle field.
// if the source handle you want to connect from is at the top of the source node, put sourceHandle: 't'. Same for
// multiple target handles, you use the targetHandle field.
// see the comments at line 20 of app.js for more info on handles and nodes.
// 't' = top handle
// 'r' = right handle
// 'b' = bottom handle
// 'l' = left handle

// const used to define the style of the marker ends (the "arrowtips") of the edges.
// source: https://reactflow.dev/docs/api/edges/edge-options/#edgemarker

const markerStyle = {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      strokeWidth: 1,
      color: 'black',
    };

export const edges = [
    {id: '1.1-1.2', source: '1.1', target: '1.2', markerEnd: markerStyle,},
    {id: '1.2-1.3', source: '1.2', target: '1.3', markerEnd: markerStyle,},
    {id: '1.3-1.4', source: '1.3', target: '1.4', markerEnd: markerStyle,},
    {id: '1.4-1.5', source: '1.4', target: '1.5', markerEnd: markerStyle,},
    {id: '1.5-1.6', source: '1.5', target: '1.6', markerEnd: markerStyle, animated: true},
    {id: '2.0-2.1', source: '2.0', target: '2.1', animated: true},
    {id: '2.1-2.2', source: '2.1', target: '2.2',},
    {id: '2.2-2.3', source: '2.2', target: '2.3', animated: true},
];