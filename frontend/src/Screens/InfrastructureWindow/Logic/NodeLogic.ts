export interface Point {
    id: string;
    name?: string;
    x: number;
    y: number;
}

export interface Node {
    id: string;
    isCity: boolean;
    name: string;
    x: number;
    y: number;
}

export interface NodeFormDTO {
    isCity: boolean;
    name: string;
    x: number;
    y: number;
}

export interface PointFormDTO {
    name?: string;
    x: number;
    y: number;
}

const mockNodes: Node[] = [];
const mockPoints: Point[] = [];

let mockNodesid = 0;
let mockPointsid = 0;

// potem do wywalenia
export const generatePoint: () => Promise<Point> = async () => await addPoint({
    x: Math.floor(Math.random() * 2000),
    y: Math.floor(Math.random() * 2000),
});

//


export const addNode: (n: NodeFormDTO) => Promise<Node> = async (node: NodeFormDTO) => {
    //TODO connect to backend
    //-----------
    const n: Node = {
        id: `node_${mockNodesid++}`,
        ...node
    }
    mockNodes.push(n);
    //-----------
    return n;
}

export const getNodes: () => Promise<Node[]> = async () => {
    //TODO connect to backend
    return mockNodes;
}

export const removeNode: (id: string) => Promise<void> = async (id: string) => {
    //TODO connect to backend
    const index = mockNodes.findIndex(v => v.id == id);
    if(index >= 0){
        mockNodes.splice(index, 1);
    }
}

export const getCities: () => Promise<Node[]> = async () => {
    //TODO connect to backend
    return mockNodes.filter(v => v.isCity);
}

export const getNodesByRoad8: () => Promise<Node[]> = async () => {
    //TODO connect to backend
    return mockNodes;
}


export const addPoint: (point: PointFormDTO) => Promise<Point> = async (point: PointFormDTO) => {
    //TODO connect to backend
    //-----------
    const p: Point = {
        id: `point_${mockPointsid++}`,
        ...point
    }
    mockPoints.push(p);
    //-----------
    return p;
}

export const getPoints: () => Promise<Point[]> = async () => {
    //TODO connect to backend
    return mockPoints;
}

export const removePoint: (id: string) => Promise<void> = async (id: string) => {
    //TODO connect to backend
    const index = mockPoints.findIndex(v => v.id == id);
    if(index >= 0){
        mockPoints.splice(index, 1);
    }
}

export const getPointsByRoad8: () => Promise<Point[]> = async () => {
    //TODO connect to backend
    return mockPoints;
}