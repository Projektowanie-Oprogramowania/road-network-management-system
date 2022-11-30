import { Graph } from 'react-d3-graph';
import { Node, Point, Road, Segment } from './Logic/Interfaces';

const mapConfig = {
    nodeHighlightBehavior: true,
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

/*
const mapConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 400,
    highlightDegree: 1,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 800,
    d3: {
        alphaTarget: 0.05,
        gravity: -400,
        linkLength: 300,
        linkStrength: 1,
        disableLinkForce: false,
    },
};
*/

const cityStyle = {
    color: 'red',
    size: 200,
};

const nodeStyle = {
    color: 'yellow',
    size: 100,
};

const pointStyle = {
    color: 'black',
    size: 50,
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
                    p.findIndex(_v => _v.id === v.startingPoint) !== -1 &&
                    p.findIndex(_v => _v.id === v.endingPoint) !== -1,
            )
            .map(v => ({
                id: v.id,
                source: v.startingPoint,
                target: v.endingPoint,
                length: v.length,
                region: v.region.name,
            })),
    },
});

export interface IMapData {
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

export const appendCities = (data: IMapData, cities: Node[]): IMapData => {
    const nodes = data.nodes;
    for (const city of cities) {
        if (nodes.findIndex(v => v.id === city.id) === -1) {
            nodes.push({
                index: city.name,
                id: city.name,
                x: city.x,
                y: city.y,
                ...cityStyle,
            });
        }
    }
    return {
        nodes: nodes,
        links: data.links,
    };
};

export const appendNodes = (data: IMapData, nodesTable: Node[]): IMapData => {
    const nodes = data.nodes;
    for (const node of nodesTable) {
        if (nodes.findIndex(v => v.id === node.id) === -1) {
            nodes.push({
                index: node.name,
                id: node.name,
                x: node.x,
                y: node.y,
                ...nodeStyle,
            });
        }
    }
    return {
        nodes: nodes,
        links: data.links,
    };
};

export const appendPoints = (data: IMapData, cities: Point[]): IMapData => {
    const nodes = data.nodes;
    for (const city of cities) {
        if (nodes.findIndex(v => v.id === city.id) === -1) {
            nodes.push({
                index: city.id,
                id: city.id,
                x: city.x,
                y: city.y,
                ...pointStyle,
            });
        }
    }
    return {
        nodes: nodes,
        links: data.links,
    };
};

export const appendSegments = (
    data: IMapData,
    segments: Segment[],
): IMapData => {
    const nodes = data.nodes;
    const links = data.links;
    for (const segment of segments) {
        const sLength: number = segment.points.length;
        if (sLength > 0) {
            if (
                nodes.findIndex(v => v.id === segment.startingPoint) !== -1 &&
                nodes.findIndex(v => v.id === segment.points[0]) !== -1
            ) {
                links.push({
                    source: segment.startingPoint,
                    target: segment.points[0],
                });
            }

            for (let i = 0; i < sLength - 1; i++) {
                if (
                    nodes.findIndex(v => v.id === segment.points[i]) !== -1 &&
                    nodes.findIndex(v => v.id === segment.points[i + 1]) !== -1
                ) {
                    links.push({
                        source: segment.points[i],
                        target: segment.points[i + 1],
                    });
                }
            }

            if (
                nodes.findIndex(v => v.id === segment.points[sLength - 1]) !==
                    -1 &&
                nodes.findIndex(v => v.id === segment.endingPoint) !== -1
            ) {
                links.push({
                    source: segment.points[sLength - 1],
                    target: segment.endingPoint,
                });
            }
        } else {
            if (
                nodes.findIndex(v => v.id === segment.startingPoint) !== -1 &&
                nodes.findIndex(v => v.id === segment.endingPoint) !== -1
            ) {
                links.push({
                    source: segment.startingPoint,
                    target: segment.endingPoint,
                });
            }
        }
    }
    return {
        nodes: data.nodes,
        links: links,
    };
};

export const mapFromRoadData = (r: Road) => {
    const data: IMapData = {
        nodes: [],
        links: [],
    };
    return data;
};
/*
export const mapFromRoadData = (r: Road) => {
    const data: IMapData = {
        nodes: [],
        links: [],
    };

    let point = r.startingPoint;
    data.nodes.push({
        index: point,
        id: point,
        x: point.x,
        y: point.y,
        color: 'red',
        size: 200,
    });
    point = r.endingPoint;
    data.nodes.push({
        index: point,
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
*/

export { Graph, mapConfig };
