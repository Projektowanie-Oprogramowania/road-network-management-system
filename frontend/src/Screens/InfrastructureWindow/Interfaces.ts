export interface Point {
    id: number,
    x: number,
    y: number
}

export interface Region {
    id: number,
    name: string
}

export interface Road {
    startingPoint: Point,
    endingPoint: Point,
    length: number,
    region: Region,
}

export interface Infrastructure_object {
    name: string,
    location: Point,
    type: number
}