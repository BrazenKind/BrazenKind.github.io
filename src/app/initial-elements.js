import React from 'react';
import { MarkerType, Position } from 'reactflow';


// The timeline is divided into 3 axes: axis 1, axis 2 and axis 3. An axis is defined as a set of connected nodes
// that share the same Y coordinates.

window.addEventListener('load', function () {
    var eles = document.getElementsByClassName('react-flow__pane')[0].offsetWidth;
    console.log(eles);
});

export const x_one_start = 500;
export const y_one_start = 300;

const x_two_start = 650;
const y_two_start = 300;

const x_three_start = 900;
const y_three_start = 100;

const x_interval = 150;

// const used to define the style of the marker ends (the "arrowtips") of the edges.
// source: https://reactflow.dev/docs/api/edges/edge-options/#edgemarker

const markerStyle = {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      strokeWidth: 1,
      color: 'black',
    };

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
            height: 700,
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
        },
        position: {x: 700, y: -75},
        hidden: true,
    },
    {
        id: '1.1',
        data: {
            label: 'Conditional Random Field Implementation',
            labelpos: 'nodeLabelTop',
            desc: 'My final project for the first course I\'ve taken in an AI related field: introduction to natural language processing.',
            projdesc: 'asdf',
            leftStyle: {visibility: 'hidden',},
            rightStyle: {visibility: 'hidden',},
        },
        className: 'jobitem',
        type: 'betweenNode',
        position: {x: getxpos(x_one_start, 0) , y: y_one_start },
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

export const edges = [


];