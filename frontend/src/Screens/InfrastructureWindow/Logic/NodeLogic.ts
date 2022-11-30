export interface Point {
    id: string;
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
    x: number;
    y: number;
}

const mockNodes: Node[] = [
    {
        id: '1',
        isCity: true,
        name: 'Warszawa',
        x: 100,
        y: 100,
    },
    {
        id: '2',
        isCity: true,
        name: 'Lublin',
        x: 300,
        y: 100,
    },
    {
        id: '3',
        isCity: true,
        name: 'Krakow',
        x: 300,
        y: 300,
    },
    {
        id: '4',
        isCity: true,
        name: 'Gdynia',
        x: 400,
        y: 300,
    },
    {
        id: '5',
        isCity: true,
        name: 'Swinoujscie',
        x: 500,
        y: 300,
    },
    {
        id: '6',
        isCity: true,
        name: 'Kielce',
        x: 600,
        y: 300,
    },
];
const mockPoints: Point[] = [];

let mockNodesid = 0;
let mockPointsid = 0;

// potem do wywalenia
export const generatePoint: () => Point = () =>
    addPoint({
        x: Math.floor(Math.random() * 2000),
        y: Math.floor(Math.random() * 2000),
    });

export const generateNode: () => Node = () =>
    addNode({
        isCity: false,
        name: `wezel-${mockNodesid++}`,
        x: Math.floor(Math.random() * 2000),
        y: Math.floor(Math.random() * 2000),
    });

export const generateCity: () => Node = () => {
    const cities = getCities();
    return cities[Math.floor(Math.random() * (cities.length - 1))];
};
//

/*
//TODO connect to backend
export const addNode: (n: NodeFormDTO) => Promise<Node> = async (
    node: NodeFormDTO,
) => {
*/
//----------- TMP
export const addNode: (n: NodeFormDTO) => Node = (node: NodeFormDTO) => {
    const n: Node = {
        id: `node_${mockNodesid++}`,
        ...node,
    };
    mockNodes.push(n);
    return n;
};
export const editNode: (node: Node) => Promise<Node> = async (node: Node) => {
    const index: number = mockNodes.findIndex(v => v.id === node.id);
    if (index === -1) {
        throw new Error('node not found');
    }
    mockNodes[index] = node;
    return node;
};
//-----------

export const getNodes: () => Promise<Node[]> = async () => {
    //TODO connect to backend
    return mockNodes;
};

export const removeNode: (id: string) => Promise<void> = async (id: string) => {
    //TODO connect to backend
    const index = mockNodes.findIndex(v => v.id == id);
    if (index >= 0) {
        mockNodes.splice(index, 1);
    }
};

/*
//TODO connect to backend
export const getCities: () => Promise<Node[]> = async () => {
};
*/
//--------- TMP
export const getCities: () => Node[] = () => {
    //TODO connect to backend
    return mockNodes.filter(v => v.isCity);
};
//---------

export const getNodesByRoad: () => Promise<Node[]> = async () => {
    //TODO connect to backend
    return mockNodes;
};

/*
export const addPoint: (point: PointFormDTO) => Promise<Point> = async (
    point: PointFormDTO,
) => {
*/
//TODO connect to backend
//----------- TMP
export const addPoint: (point: PointFormDTO) => Point = (
    point: PointFormDTO,
) => {
    const p: Point = {
        id: `point_${mockPointsid++}`,
        ...point,
    };
    mockPoints.push(p);
    return p;
};
export const editPoint: (point: Point) => Point = (point: Point) => {
    const index: number = mockPoints.findIndex(v => v.id === point.id);
    if (index === -1) {
        throw new Error('point not found');
    }
    mockPoints[index] = point;
    return point;
};
//-----------

export const getPoints: () => Promise<Point[]> = async () => {
    //TODO connect to backend
    return mockPoints;
};

export const removePoint: (id: string) => Promise<void> = async (
    id: string,
) => {
    //TODO connect to backend
    const index = mockPoints.findIndex(v => v.id == id);
    if (index >= 0) {
        mockPoints.splice(index, 1);
    }
};

export const getPointsByRoad: () => Promise<Point[]> = async () => {
    //TODO connect to backend
    return mockPoints;
};
