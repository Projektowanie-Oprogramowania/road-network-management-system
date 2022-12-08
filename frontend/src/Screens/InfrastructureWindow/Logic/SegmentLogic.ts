import { Tariff } from 'Screens/TariffWindow/TariffLogic';
import { apiUrl } from 'shared/settings';
import { Point } from './PointLogic';

//pojedyncza droga na mapie
export interface Segment {
    id: string;
    points: Point[];
    startingPoint: Point;
    endingPoint: Point;
    isPaid: boolean;
    price?: number;
    tariffDTO?: Tariff;
}

export interface SegmentCreate {
    pointsIds: string[];
    startingPointId: string;
    endingPointId: string;
    //price: number;
    tariffId: string;
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
        tariffId: segment.tarrificator ? segment.tarrificator : '0',
        //price: segment.isPaid && segment.price ? segment.price : 0,
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
        tariffId: segment.tariffDTO ? segment.tariffDTO.id : '0',
        //price: segment.isPaid && segment.price ? segment.price : 0,
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
        method: 'GET',
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

export const getSegments: () => Promise<Segment[]> = async () => {
    let segments: Segment[] = [];
    await fetch(`${apiUrl}/segments`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            segments = r;
        });

    return segments;
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
