import { Graph } from 'react-d3-graph';
import { Point, Road, Segment } from './Logic/Interfaces';

const mapConfig = {
    staticGraph: true,
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

const mapConfigSmall = {
    staticGraph: true,
    nodeHighlightBehavior: true,
    width: 1000,
    height: 600,
    node: {
        color: 'lightgreen',
        size: 80,
        highlightStrokeColor: 'blue',
    },
    link: {
        highlightColor: 'lightblue',
    },
};

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
        index?: string;
        id: string;
        x: number;
        y: number;
        color?: string;
        size?: number;
        highlightStrokeColor?: string;
    }>;
    links: Array<{
        source: string;
        breakPoints?: Object[];
        target: string;
        color?: string;
        size?: 80;
        highlightColor?: 'blue';
    }>;
}

export const appendCities = (data: IMapData, cities: Point[]): IMapData => {
    const nodes = data.nodes;
    for (const city of cities) {
        if (nodes.findIndex(v => v.id === city.id) === -1) {
            nodes.push({
                index: city.name,
                id: city.name ? city.name : city.id,
                x: city.x,
                y: -city.y,
                ...cityStyle,
            });
        }
    }
    return {
        nodes: nodes,
        links: data.links,
    };
};

export const appendNodes = (data: IMapData, nodesTable: Point[]): IMapData => {
    const nodes = data.nodes;
    for (const node of nodesTable) {
        if (nodes.findIndex(v => v.id === node.id) === -1) {
            nodes.push({
                index: node.name,
                id: node.name ? node.name : node.id,
                x: node.x,
                y: -node.y,
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
                id: city.id,
                x: city.x,
                y: -city.y,
                ...pointStyle,
            });
        }
    }
    return {
        nodes: nodes,
        links: data.links,
    };
};

export const addNodesFromSegments = (
    data: IMapData,
    segments: Segment[],
    cities: Point[],
): IMapData => {
    const nodes = data.nodes;
    const links = data.links;
    for (const segment of segments) {
        const sLength: number = segment.points.length;
        let index: number = nodes.findIndex(
            v => v.id === segment.startingPoint.id,
        );
        if (
            index !== -1 &&
            cities.findIndex(v => v.id === nodes[index].id) === -1
        ) {
            nodes[index] = {
                id: segment.startingPoint.id,
                x: segment.startingPoint.x,
                y: -segment.startingPoint.y,
                ...nodeStyle,
            };
        } else {
            nodes.push({
                id: segment.startingPoint.id,
                x: segment.startingPoint.x,
                y: -segment.startingPoint.y,
                ...nodeStyle,
            });
        }

        for (const point of segment.points) {
            index = nodes.findIndex(v => v.id === point.id);
            if (index === -1)
                nodes.push({
                    id: point.id,
                    x: point.x,
                    y: -point.y,
                    ...pointStyle,
                });
        }

        index = nodes.findIndex(v => v.id === segment.endingPoint.id);
        if (
            index !== -1 &&
            cities.findIndex(v => v.id === nodes[index].id) === -1
        ) {
            nodes[index] = {
                id: segment.endingPoint.id,
                x: segment.endingPoint.x,
                y: -segment.endingPoint.y,
                ...nodeStyle,
            };
        } else {
            nodes.push({
                id: segment.endingPoint.id,
                x: segment.endingPoint.x,
                y: -segment.endingPoint.y,
                ...nodeStyle,
            });
        }
    }
    return {
        nodes: data.nodes,
        links: links,
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
                nodes.findIndex(v => v.id === segment.startingPoint.id) !==
                    -1 &&
                nodes.findIndex(v => v.id === segment.points[0].id) !== -1
            ) {
                links.push({
                    source: segment.startingPoint.id,
                    target: segment.points[0].id,
                });
            }

            for (let i = 0; i < sLength - 1; i++) {
                if (
                    nodes.findIndex(v => v.id === segment.points[i].id) !==
                        -1 &&
                    nodes.findIndex(v => v.id === segment.points[i + 1].id) !==
                        -1
                ) {
                    links.push({
                        source: segment.points[i].id,
                        target: segment.points[i + 1].id,
                    });
                }
            }

            if (
                nodes.findIndex(
                    v => v.id === segment.points[sLength - 1].id,
                ) !== -1 &&
                nodes.findIndex(v => v.id === segment.endingPoint.id) !== -1
            ) {
                links.push({
                    source: segment.points[sLength - 1].id,
                    target: segment.endingPoint.id,
                });
            }
        } else {
            if (
                nodes.findIndex(v => v.id === segment.startingPoint.id) !==
                    -1 &&
                nodes.findIndex(v => v.id === segment.endingPoint.id) !== -1
            ) {
                links.push({
                    source: segment.startingPoint.id,
                    target: segment.endingPoint.id,
                });
            }
        }
    }
    return {
        nodes: data.nodes,
        links: links,
    };
};

export const colorSegments = (
    data: IMapData,
    segments: Segment[],
): IMapData => {
    const nodes = data.nodes;
    const links = data.links;
    for (const segment of segments) {
        const sLength: number = segment.points.length;
        if (sLength > 0) {
            if (
                nodes.findIndex(v => v.id === segment.startingPoint.id) !==
                    -1 &&
                nodes.findIndex(v => v.id === segment.points[0].id) !== -1
            ) {
                links.push({
                    source: segment.startingPoint.id,
                    target: segment.points[0].id,
                    color: 'green',
                });
            }

            for (let i = 0; i < sLength - 1; i++) {
                if (
                    nodes.findIndex(v => v.id === segment.points[i].id) !==
                        -1 &&
                    nodes.findIndex(v => v.id === segment.points[i + 1].id) !==
                        -1
                ) {
                    links.push({
                        source: segment.points[i].id,
                        target: segment.points[i + 1].id,
                        color: 'green',
                    });
                }
            }

            if (
                nodes.findIndex(
                    v => v.id === segment.points[sLength - 1].id,
                ) !== -1 &&
                nodes.findIndex(v => v.id === segment.endingPoint.id) !== -1
            ) {
                links.push({
                    source: segment.points[sLength - 1].id,
                    target: segment.endingPoint.id,
                    color: 'green',
                });
            }
        } else {
            if (
                nodes.findIndex(v => v.id === segment.startingPoint.id) !==
                    -1 &&
                nodes.findIndex(v => v.id === segment.endingPoint.id) !== -1
            ) {
                links.push({
                    source: segment.startingPoint.id,
                    target: segment.endingPoint.id,
                    color: 'green',
                });
            }
        }
    }
    return {
        nodes: data.nodes,
        links: links,
    };
};

export const addRestOfPoints = (data: IMapData, points: Point[]) => {
    const nodes = data.nodes;
    const links = data.links;
    for (const point of points) {
        if (nodes.findIndex(v => v.id === point.id) === -1) {
            console.log(point.x);
            console.log(point.y);
            nodes.push({
                id: point.id,
                x: point.x,
                y: -point.y,
                ...pointStyle,
            });
        }
    }
    return {
        nodes: nodes,
        links: data.links,
    };
};

//Wersja gdzie points to breakPoints
/*
export const appendSegments = (
    data: IMapData,
    segments: Segment[],
): IMapData => {
    const nodes = data.nodes;
    const links = data.links;
    for (const segment of segments) {
        if (
            nodes.findIndex(v => v.id === segment.startingPoint.id) !== -1 &&
            nodes.findIndex(v => v.id === segment.endingPoint.id) !== -1
        ) {
            links.push({
                source: segment.startingPoint.id,
                breakPoints: segment.points.map(v => ({
                    x: v.x,
                    y: v.y,
                })),
                target: segment.endingPoint.id,
            });
        }
    }
    return {
        nodes: data.nodes,
        links: links,
    };
};
*/

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

export { Graph, mapConfig, mapConfigSmall };
