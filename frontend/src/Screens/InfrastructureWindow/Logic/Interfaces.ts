export interface Point {
    index: number;
    id: string;
    x: number;
    y: number;
}

export interface Region {
    id: number;
    name: string;
}

export interface Road {
    id?: number;
    startingPointId: string;
    endingPointId: string;
    length: number;
    region?: Region;
}

export interface Infrastructure_object {
    name: string;
    location: Point;
    type: number;
}

export interface IRoadNetwork {
    name: string;
    // Później zamienić na Point pewnie
    startingNode: string;
    endingNode: string;
    length?: number;
}

export interface INetwork {
    network: IRoadNetwork;
    roads: Road[];
    points: Point[];
}

export interface IResponse {
    error: number;
    message: string;
    value: object;
}
