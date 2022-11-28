import { IResponse } from 'shared/interfaces';
import { Point, PointFormDTO, Segment, Region } from './Interfaces';
import { getRegion } from './RegionLogic';

import { generatePoint } from './NodeLogic';

//Siec drogowa
export interface Road {
    id: string;
    name: string;
    segments: Segment[];
    startingPoint: string;
    endingPoint: string;
    length: number;
    region: Region;
}

export interface RoadFormDTO {
    name: string;
    startingPoint: string;
    endingPoint: string;
    length: number;
    regionName: string;
}

let pointId = 0;
let segmentId = 0;
let roadId = 4;

let roadMock: Road[] = [
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

let roadMockId = 4;

export const addRoad: (data: RoadFormDTO) => Road = (d: RoadFormDTO) => {
    //TODO connect to backend
    //-----------
    const r: Road = {
        id: `road_${roadMockId++}`,
        ...d,
        segments: [],
        region: getRegion(d.regionName);
    }
    mockNodes.push(n);
    //-----------
    return n;
    
}

export const getRoads: () => Road[] = () => {
    //Send request to delete point
    console.log(`Requested to get networks`);

    return roadMock;
};

export const getRoadById = async (id: string) => {
    //Send request to delete point
    console.log(`Requested to get networks ${id}`);

    const index = roadMock.findIndex(v => v.id === id);
    return index !== -1 ? roadMock[index] : undefined;
};

export interface RoadDTO {
    name: string;
    segments: SegmentDTO[];
    startingPoint: PointFormDTO;
    endingPoint: PointFormDTO;
    length: number;
    region: string;
}

/*
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
*/

export interface RoadMainData {
    name: string;
    startingPoint: PointFormDTO;
    endingPoint: PointFormDTO;
    length: number;
    region: string;
}

export const addRoadByMainData: (r: RoadMainData) => IResponse = (
    r: RoadMainData,
) => {
    //Send request to delete point
    console.log(`Requested to get networks`);

    //mock
    roadMock.push({
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
        data: roadMock[roadMock.length - 1],
    };
    return response;
};
