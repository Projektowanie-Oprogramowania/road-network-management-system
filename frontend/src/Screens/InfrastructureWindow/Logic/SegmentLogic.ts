import { Point } from './NodeLogic';

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

/*
export const generateSegments: () => Segment[] = () => {
    const size = Math.floor(Math.random() * 20);
    const segments: Segment[] = [];

    for (let i = 0; i < size; i++) {
        const numberOfPoints = Math.floor(Math.random() * 20);
        const points: string[] = [];
        for (let j = 0; j < numberOfPoints; j++) {
            points.push(generatePoint().id);
        }
        segments.push({
            id: String(segmentMockId++),
            points: points,
            startingPoint: generateNode().id,
            endingPoint: generateNode().id,
            isPaid: Math.floor(Math.random() * 2) ? true : false,
            price: 0,
        });
    }

    segmentMock.push(...segments);
    return segments;
};
*/

//TODO connect to backend
export const addSegment: (segment: SegmentFormDTO) => Promise<Segment> = (
    segment: SegmentFormDTO,
) => {
    const s: Segment = {
        id: `${segmentMockId++}`,
        ...segment,
    };
    segmentMock.push(s);
    return Promise.resolve(s);
};
export const editSegment: (segment: Segment) => Promise<Segment> = (
    segment: Segment,
) => {
    const index: number = segmentMock.findIndex(v => v.id === segment.id);
    if (index === -1) {
        return addSegment(segment);
    }
    segmentMock[index] = segment;
    return Promise.resolve(segment);
};
export const getSegment: (id: string) => Promise<Segment | undefined> = (
    id: string,
) => {
    return Promise.resolve(segmentMock.find(v => v.id === id));
};
export const removeSegment: (id: string) => Promise<void> = (id: string) => {
    const index: number = segmentMock.findIndex(v => v.id === id);
    if (index === -1) {
        return Promise.resolve();
    }
    segmentMock.splice(index, 1);
    return Promise.resolve();
};
