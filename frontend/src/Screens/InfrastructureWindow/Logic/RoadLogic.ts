import { IResponse } from 'shared/interfaces';
import { Point, PointDTO, Road, Segment, SegmentDTO } from './Interfaces';
import { addRegion, getRegion } from './RegionLogic';

let pointId = 0;
let segmentId = 0;
let roadId = 4;

const generatePoint: () => Point = () => ({
    id: String(pointId++),
    x: Math.floor(Math.random() * 2000),
    y: Math.floor(Math.random() * 2000),
});

const generateSegments: () => Segment[] = () => {
    const size = Math.floor(Math.random() * 20);
    const segments: Segment[] = [];

    for (let i = 0; i < size; i++) {
        const numberOfPoints = Math.floor(Math.random() * 20);
        const points: Point[] = [];
        for (let j = 0; j < numberOfPoints; j++) {
            points.push(generatePoint());
        }
        segments.push({
            id: String(segmentId++),
            points: points,
            startingPoint: generatePoint(),
            endingPoint: generatePoint(),
            isPaid: Math.floor(Math.random() * 2) ? true : false,
            price: 0,
        });
    }

    return segments;
};

let networksTable: Road[] = [
    {
        id: '1',
        name: 'siec 1',
        segments: generateSegments(),
        startingPoint: generatePoint(),
        endingPoint: generatePoint(),
        length: 100,
        region: getRegion('0'),
    },
    {
        id: '2',
        name: 'siec 2',
        segments: generateSegments(),
        startingPoint: generatePoint(),
        endingPoint: generatePoint(),
        length: 100,
        region: getRegion('1'),
    },
    {
        id: '3',
        name: 'siec 3',
        segments: generateSegments(),
        startingPoint: generatePoint(),
        endingPoint: generatePoint(),
        length: 100,
        region: getRegion('2'),
    },
];

export const getRoads: () => Road[] = () => {
    //Send request to delete point
    console.log(`Requested to get networks`);

    return networksTable;
};

export const getRoadById = async (id: string) => {
    //Send request to delete point
    console.log(`Requested to get networks ${id}`);

    const index = networksTable.findIndex(v => v.id == id);
    return index !== -1 ? networksTable[index] : undefined;
};

export interface RoadDTO {
    name: string;
    segments: SegmentDTO[];
    startingPoint: PointDTO;
    endingPoint: PointDTO;
    length: number;
    region: string;
}

export const addRoad: (r: RoadDTO) => IResponse = (r: RoadDTO) => {
    //Send request to delete point
    console.log(`Requested to get networks`);
    const response: IResponse = {
        status: 200,
        statusText: 'OK',
        data: {},
    };
    return response;
};

export interface RoadMainData {
    name: string;
    startingPoint: PointDTO;
    endingPoint: PointDTO;
    length: number;
    region: string;
}

export const addRoadByMainData: (r: RoadMainData) => IResponse = (
    r: RoadMainData,
) => {
    //Send request to delete point
    console.log(`Requested to get networks`);

    //mock
    networksTable.push({
        id: String(roadId++),
        name: r.name,
        segments: [],
        startingPoint: {
            id: String(pointId++),
            ...r.startingPoint,
        },
        endingPoint: {
            id: String(pointId++),
            ...r.endingPoint,
        },
        length: r.length,
        region: addRegion(r.region),
    });

    const response: IResponse = {
        status: 200,
        statusText: 'OK',
        data: networksTable[networksTable.length - 1],
    };
    return response;
};
