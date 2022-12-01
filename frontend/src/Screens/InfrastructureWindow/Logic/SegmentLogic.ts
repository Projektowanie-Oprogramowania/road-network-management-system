import { apiUrl } from 'shared/settings';
import { Point } from './NodeLogic';

//pojedyncza droga na mapie
export interface Segment {
    id: string;
    points: Point[];
    startingPoint: Point;
    endingPoint: Point;
    isPaid: boolean;
    price?: number;
    tarrificator?: string;
}

export interface SegmentCreate {
    pointsIds: string[];
    startingPointId: string;
    endingPointId: string;
    price: number;
}

export interface SegmentFormDTO {
    points: Point[];
    startingPoint: Point;
    endingPoint: Point;
    isPaid: boolean;
    price?: number;
    tarrificator?: string;
}

export const addSegment = async (
    segment: SegmentFormDTO,
): Promise<Segment | undefined> => {
    let s: SegmentCreate = {
        pointsIds: segment.points.map(v => v.id),
        startingPointId: segment.startingPoint.id,
        endingPointId: segment.endingPoint.id,
        price: segment.isPaid && segment.price ? segment.price : 0,
    };
    let res: Segment | undefined = undefined;
    await fetch(`${apiUrl}/segments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(s),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            res = r;
        });

    return res;
};

export const editSegment: (
    segment: Segment,
) => Promise<Segment | undefined> = async (segment: Segment) => {
    let s: SegmentCreate = {
        pointsIds: segment.points.map(v => v.id),
        startingPointId: segment.startingPoint.id,
        endingPointId: segment.endingPoint.id,
        price: segment.isPaid && segment.price ? segment.price : 0,
    };
    let res: Segment | undefined = undefined;
    await fetch(`${apiUrl}/segments/${segment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(s),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            res = r;
        });

    return res;
};

export const getSegment: (id: string) => Promise<Segment | undefined> = async (
    id: string,
) => {
    let res: Segment | undefined = undefined;
    await fetch(`${apiUrl}/segments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            res = r;
        });

    return res;
};

export const removeSegment: (id: string) => Promise<void> = async (
    id: string,
) => {
    await fetch(`${apiUrl}/segments/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    });
};
