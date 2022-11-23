import { Graph, GraphData } from 'react-d3-graph';
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
            index: v.id,
            id: v.id,
            x: v.x,
            y: v.y,
        })),
        links: r
            .filter(
                v =>
                    p.findIndex(_v => _v.id === v.startingPoint.id) != -1 &&
                    p.findIndex(_v => _v.id === v.endingPoint.id) != -1,
            )
            .map(v => ({
                id: v.id,
                source: v.startingPoint.id,
                target: v.endingPoint.id,
                length: v.length,
                region: v.region.name,
            })),
    },
});

interface IMapData {
    nodes: Array<{
        index: string;
        id: string;
        x: number;
        y: number;
        color?: string;
        size?: number;
        highlightStrokeColor?: string;
    }>;
    links: Array<{
        source: string;
        target: string;
        color?: 'lightgreen';
        size?: 80;
        highlightColor?: 'blue';
    }>;
}

export const mapFromRoadData = (r: Road) => {
    const data: IMapData = {
        nodes: [],
        links: [],
    };

    let point = r.startingPoint;
    data.nodes.push({
        index: point.id,
        id: point.id,
        x: point.x,
        y: point.y,
        color: 'red',
        size: 200,
    });
    point = r.endingPoint;
    data.nodes.push({
        index: point.id,
        id: point.id,
        x: point.x,
        y: point.y,
        color: 'red',
        size: 200,
    });

    for (const s of r.segments) {
        let p = s.startingPoint;
        data.nodes.push({
            index: p.id,
            id: p.id,
            x: p.x,
            y: p.y,
            color: 'yellow',
        });
        for (let i = 0; i < s.points.length; i++) {
            const c = s.points[i];
            data.nodes.push({
                index: c.id,
                id: c.id,
                x: c.x,
                y: c.y,
                color: 'blue',
            });
            data.links.push({
                source: p.id,
                target: c.id,
            });
            p = c;
        }
        const c = s.endingPoint;
        data.nodes.push({
            index: c.id,
            id: c.id,
            x: c.x,
            y: c.y,
            color: 'yellow',
        });
        data.links.push({
            source: p.id,
            target: c.id,
        });
    }

    return data;
};

export { Graph, mapConfig };
