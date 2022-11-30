import { IResponse } from 'shared/interfaces';
import { apiUrl } from 'shared/settings';
import { Node, Region, Segment } from './Interfaces';
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
    startingPoint: Node;
    endingPoint: Node;
    length: number;
    region: Region;
}

let pointId = 0;
let segmentId = 0;
let roadId = 4;

let mockRoads: Road[] = [];

export const addRoad: (data: RoadFormDTO) => Promise<Road | undefined> = async (
    data: RoadFormDTO,
) => {
    let road = {
        endingPoint: {
            id: data.endingPoint.id,
            x: data.endingPoint.x,
            y: data.endingPoint.y,
        },
        length: data.length,
        name: data.name,
        region: data.region,
        segments: [0],
        startingPoint: {
            id: data.endingPoint.id,
            x: data.endingPoint.x,
            y: data.endingPoint.y,
        },
    };
    let _r: Road | undefined = undefined;
    await fetch(`${apiUrl}/road`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(road),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            _r = {
                id: r.id,
                name: r.name,
                segments: r.segments,
                startingPoint: r.startingPoint.id,
                endingPoint: r.endingPoint.id,
                length: r.length,
                region: r.region,
            };
        });
    return _r;
};

export const getRoads: () => Promise<Road[]> = async () => {
    let roads: Road[] = [];
    await fetch(`${apiUrl}/road`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            roads = r;
        });

    return roads;
};

export const getRoadById = async (id: string) => {
    let road: Road | undefined = undefined;
    await fetch(`${apiUrl}/road/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            road = r;
        });

    return road;
};

export interface RoadMainData {
    name: string;
    startingPoint: string;
    endingPoint: string;
    length: number;
    region: string;
}

/*
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
*/
