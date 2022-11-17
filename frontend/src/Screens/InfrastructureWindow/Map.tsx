import { Graph } from 'react-d3-graph';
import { Point, Road, Region } from './Logic/Interfaces';

const mapConfig = {
    nodeHighlightBehavior: true,
    staticGraphWithDragAndDrop: true,
    width: 1500,
    height: 800,
    node: {
        color: 'lightgreen',
        size: 80,
        highlightStrokeColor: 'blue',
    },
    link: {
        highlightColor: 'lightblue',
    },
};

export const mapPointsAndRoads = (p: Point[], r: Road[]) => ({
    data: {
        nodes: p.map(v => ({
            index: v.index,
            id: v.id,
            x: v.x,
            y: v.y,
        })),
        links: r
            .filter(
                v =>
                    p.findIndex(_v => _v.id === v.startingPointId) != -1 &&
                    p.findIndex(_v => _v.id === v.endingPointId) != -1,
            )
            .map(v => ({
                id: v.id,
                source: v.startingPointId,
                target: v.endingPointId,
                length: v.length,
                region: v.region,
            })),
    },
});

export { Graph, mapConfig };
