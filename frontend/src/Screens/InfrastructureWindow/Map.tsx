import { Graph } from 'react-d3-graph';

const mapConfig = {
  nodeHighlightBehavior: true,
  staticGraphWithDragAndDrop: true,
  node: {
    color: "lightgreen",
    size: 80,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

const onClickNode = function(nodeId: any) {
  window.alert(`Wybrano punkt ${nodeId}`);
};

const onClickLink = function(source: any, target: any) {
  window.alert(`Wybrano droge ${source} - ${target}`);
};

export { Graph, mapConfig, onClickLink, onClickNode }