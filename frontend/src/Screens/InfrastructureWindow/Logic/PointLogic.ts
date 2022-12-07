import { apiUrl } from 'shared/settings';

export interface Point {
    id: string;
    x: number;
    y: number;
    name?: string;
}

export interface PointFormDTO {
    x: number;
    y: number;
    name?: string;
}

export const getCities: () => Promise<Point[]> = async () => {
    let cities: Point[] = [];
    await fetch(`${apiUrl}/point/cities`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            cities = r;
        });

    return cities;
};

export const addPoint: (point: PointFormDTO) => Promise<Point> = async (
    point: PointFormDTO,
) => {
    let p: Point = {
        id: '0',
        x: 0,
        y: 0,
    };
    await fetch(`${apiUrl}/point`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(point),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            p = r;
        });
    return p;
};

export const editPoint: (point: Point) => Promise<Point> = async (
    point: Point,
) => {
    let p: Point = {
        id: '0',
        x: 0,
        y: 0,
    };
    await fetch(`${apiUrl}/point`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(point),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            p = r;
        });
    return p;
};

export const getPoints: () => Promise<Point[]> = async () => {
    let points: Point[] = [];
    await fetch(`${apiUrl}/point`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            points = r;
        });

    return points;
};

export const removePoint: (id: string) => Promise<void> = async (
    id: string,
) => {
    await fetch(`${apiUrl}/point/${id}`, {
        method: 'Delete',
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response.text);
        }
    });
};

export const getPointsByRoad: (id: string) => Promise<Point[]> = async (
    id: string,
) => {
    let points: Point[] = [];
    await fetch(`${apiUrl}/road/${id}/points`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            points = r;
        });

    return points;
};
