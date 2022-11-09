export interface Point {
    id: string,
    x: number,
    y: number
}

export interface Region {
    id: number,
    name: string
}

export interface Road {
    startingPointId: string,
    endingPointId: string,
    length: number,
    region?: Region,
}

export interface Infrastructure_object {
    name: string,
    location: Point,
    type: number
}