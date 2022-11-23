export interface Region {
    id: string;
    name: string;
}

//Siec drogowa
export interface Road {
    id: string;
    name: string;
    segments: Segment[];
    startingPoint: Point;
    endingPoint: Point;
    length: number;
    region: Region;
}

//pojedyncza droga na mapie
export interface Segment {
    id: string;
    points: Point[];
    startingPoint: Point;
    endingPoint: Point;
    isPaid: boolean;
    price: number;
}

export interface SegmentDTO {
    points: PointDTO[];
    startingPoint: PointDTO;
    endingPoint: PointDTO;
    isPaid: boolean;
    price: number;
}

export interface Point {
    id: string;
    name?: string;
    x: number;
    y: number;
}

export interface PointDTO {
    name?: string;
    x: number;
    y: number;
}

export interface InfrastructureObject {
    id: string;
    name: string;
    location: Point;
    type: InfrastructureType;
}

export enum InfrastructureType {
    GAS_STATION,
    RESTAURANT,
    TOILETS,
    SHOWERS,
    HOSTEL,
    HOTEL,
}
