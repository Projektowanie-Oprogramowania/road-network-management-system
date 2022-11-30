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

const apiUrl: string = 'http://localhost:8080';

export const addNode: (n: NodeFormDTO) => Promise<Node> = async (
    node: NodeFormDTO,
) => {
    let n: Node = {
        id: '0',
        isCity: false,
        name: 'error',
        x: 0,
        y: 0,
    };
    await fetch(`${apiUrl}/node`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(node),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            n = r;
        });
    return n;
};
export const editNode: (node: Node) => Promise<Node> = async (node: Node) => {
    let n: Node = node;
    await fetch(`${apiUrl}/node`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(node),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            n = r;
        });
    return n;
};

export const getNodes: () => Promise<Node[]> = async () => {
    let nodes: Node[] = [];
    await fetch(`${apiUrl}/node`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            nodes = r;
        });

    return nodes;
};

export const removeNode: (id: string) => Promise<void> = async (id: string) => {
    await fetch(`${apiUrl}/node/${id}`, {
        method: 'Delete',
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response.text);
        }
    });
};

export const getCities: () => Promise<Node[]> = async () => {
    let nodes: Node[] = [];
    await fetch(`${apiUrl}/node/cities`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            nodes = r;
        });

    return nodes;
};

export const getNodesByRoad: () => Promise<Node[]> = async () => {
    //TODO - byRoad
    let nodes: Node[] = [];
    await fetch(`${apiUrl}/node`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            nodes = r;
        });

    return nodes;
};

export const addPoint: (point: PointFormDTO) => Promise<Point> = async (
    point: PointFormDTO,
) => {
    let p: Point = {
        id: '0',
        x: 0,
        y: 0,
    };
    await fetch(`${apiUrl}/point`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(point),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            p = r;
        });
    return p;
};

export const editPoint: (point: Point) => Promise<Point> = async (
    point: Point,
) => {
    let p: Point = {
        id: '0',
        x: 0,
        y: 0,
    };
    await fetch(`${apiUrl}/point`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(point),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            p = r;
        });
    return p;
};

export const getPoints: () => Promise<Point[]> = async () => {
    let points: Point[] = [];
    await fetch(`${apiUrl}/point`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            points = r;
        });

    return points;
};

export const removePoint: (id: string) => Promise<void> = async (
    id: string,
) => {
    await fetch(`${apiUrl}/point/${id}`, {
        method: 'Delete',
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response.text);
        }
    });
};

export const getPointsByRoad: () => Promise<Point[]> = async () => {
    //TODO - byRoad
    let points: Point[] = [];
    await fetch(`${apiUrl}/point`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            points = r;
        });

    return points;
};
