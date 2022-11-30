import { IResponse } from 'shared/interfaces';
import { Point, PointFormDTO, Segment, Region } from './Interfaces';
import { getRegion, getRegionByName } from './RegionLogic';
/*
import { generateCity, generatePoint } from './NodeLogic';
import { generateSegments, Segment } from './SegmentLogic';
*/

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

let mockRoads: Road[] = [
    /*    {
        id: '1',
        name: 'siec 1',
        segments: generateSegments(),
        startingPoint: generateCity().id,
        endingPoint: generateCity().id,
        length: 100,
        region: getRegion('0'),
    },
    {
        id: '2',
        name: 'siec 2',
        segments: generateSegments(),
        startingPoint: generateCity().id,
        endingPoint: generateCity().id,
        length: 100,
        region: getRegion('1'),
    },
    {
        id: '3',
        name: 'siec 3',
        segments: generateSegments(),
        startingPoint: generateCity().id,
        endingPoint: generateCity().id,
        length: 100,
        region: getRegion('2'),
    },
*/
];

let roadMockId = 4;

export const addRoad: (data: RoadFormDTO) => Road = (data: RoadFormDTO) => {
    //TODO connect to backend
    //-----------
    const r: Road = {
        id: `road_${roadMockId++}`,
        ...data,
        segments: [],
        region: getRegion(data.regionName),
    };
    mockRoads.push(r);
    //-----------
    return r;
};

export const getRoads: () => Road[] = () => {
    //Send request to delete point
    console.log(`Requested to get networks`);

    return mockRoads;
};

export const getRoadById = async (id: string) => {
    //Send request to delete point
    console.log(`Requested to get networks ${id}`);

    const index = mockRoads.findIndex(v => v.id === id);
    console.log(index);
    return index !== -1 ? mockRoads[index] : undefined;
};

export interface RoadMainData {
    name: string;
    startingPoint: string;
    endingPoint: string;
    length: number;
    region: string;
}

export const addRoadByMainData: (r: RoadMainData) => IResponse = (
    r: RoadMainData,
) => {
    //Send request to delete point
    console.log(`Requested to get networks`);

    //mock
    mockRoads.push({
        id: String(roadId++),
        name: r.name,
        segments: [],
        startingPoint: r.startingPoint,
        endingPoint: r.endingPoint,
        length: r.length,
        region: getRegionByName(r.region),
    });

    const response: IResponse = {
        status: 200,
        statusText: 'OK',
        data: mockRoads[mockRoads.length - 1],
    };
    return response;
};
