import React from 'react';
import { Graph } from 'react-d3-graph';

// graph payload (with minimalist structure)
const data = {
  nodes: [
    { 
        id: "Warszawa",
        cx: 200,
        cy: 200 
    }, { 
        id: "Gdynia",
        cx: 200,
        cy: 400
    }, { 
        id: "Krakow",
        cx: 200,
        cy: 0 
    }],
  links: [
    { source: "Warszawa", target: "Gdynia" },
    { source: "Warszawa", target: "Krakow" },
  ],
};

// the graph configuration, just override the ones you need
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

const onClickNode = function(nodeId: any) {
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function(source: any, target: any) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

export const Map = () => <Graph
  id="graph-id" // id is mandatory
  data={data}
  config={myConfig}
  onClickNode={onClickNode}
  onClickLink={onClickLink}
/>;

export default Map;