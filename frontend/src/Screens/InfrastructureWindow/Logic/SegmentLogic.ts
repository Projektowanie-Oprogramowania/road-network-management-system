import { generatePoint, Point } from './NodeLogic';

//pojedyncza droga na mapie
export interface Segment {
    id: string;
    points: string[];
    startingPoint: string;
    endingPoint: string;
    isPaid: boolean;
    price?: number;
    tarrificator?: string;
}

export interface SegmentFormDTO {
    points: string[];
    startingPoint: string;
    endingPoint: string;
    isPaid: boolean;
    price?: number;
    tarrificator?: string;
}

let segmentMock: Segment[] = [];
let segmentMockId = 0;


const generateSegments: () => Promise<Segment[]> = async () => {
    const size = Math.floor(Math.random() * 20);
    const segments: Segment[] = [];

    for (let i = 0; i < size; i++) {
        const numberOfPoints = Math.floor(Math.random() * 20);
        const points: string[] = [];
        for (let j = 0; j < numberOfPoints; j++) {
            points.push((await generatePoint()).id);
        }
        segments.push({
            id: String(segmentId++),
            points: points,
            startingPoint: await generatePoint(),
            endingPoint: await generatePoint(),
            isPaid: Math.floor(Math.random() * 2) ? true : false,
            price: 0,
        });
    }

    return segments;
};

const addSegment: (s: SegmentFormDTO) => Promise<Segment> = (segment: SegmentFormDTO) => {} 
const editSegment: (s: Segment) => Promise<Segment> = (segment: SegmentFormDTO) => {} 
const getSegment: (id: string) => Promise<Segment> = (id: string) => {} 
const removeSegment: (id: string) => Promise<void> = (id: string) => {} 
