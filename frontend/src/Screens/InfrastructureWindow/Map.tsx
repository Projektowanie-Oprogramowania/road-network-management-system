import { Graph } from 'react-d3-graph';

const mapConfig = {
  nodeHighlightBehavior: true,
  staticGraphWithDragAndDrop: true,
  width: 1500,
  height: 800,
  node: {
    color: "lightgreen",
    size: 80,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

export { Graph, mapConfig }