import { Point } from './Interfaces';
import { deleteRoadsConnectedWithNode } from './RoadLogic';

let points = [
    {
        index: 0,
        id: 'Warszawa',
        x: 200,
        y: 200,
    },
    {
        index: 1,
        id: 'Gdynia',
        x: 200,
        y: 400,
    },
    {
        index: 2,
        id: 'Krakow',
        x: 200,
        y: 0,
    },
];

export const editPoint: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
) => {
    e.preventDefault();

    const id: string = (e.currentTarget[1] as HTMLInputElement).value;
    const x: number = Number((e.currentTarget[3] as HTMLInputElement).value);
    const y: number = Number((e.currentTarget[5] as HTMLInputElement).value);
    //Send request to edit point
    console.log(`Requested to edit point  id: ${id} x: ${x} y: ${y}`);

    const index = points.findIndex(v => v.id === id);
    if (index !== -1) {
        points[index].x = x;
        points[index].y = y;
    }
    /* url to post
    fetch('', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "id": id,
        "x": x,
        "y": y
    })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    */

    //Return value
    return {};
};

export const addPoint: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
) => {
    e.preventDefault();

    const id: string = (e.currentTarget[0] as HTMLInputElement).value;
    const x: number = Number((e.currentTarget[2] as HTMLInputElement).value);
    const y: number = Number((e.currentTarget[4] as HTMLInputElement).value);
    //Send request to edit point
    console.log(`Requested to add point  id: ${id} x: ${x} y: ${y}`);

    points.push({
        index: points.length,
        id: id,
        x: x,
        y: y,
    });

    /* url to post
    fetch('', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "id": id,
        "x": x,
        "y": y
    })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    */

    //Return value
    return {};
};

export const removePoint: (id: string) => void = (id: string) => {
    //Send request to delete point
    console.log(`Requested ${id} to delete`);

    const index = points.findIndex(v => v.id === id);
    if (index !== -1) {
        deleteRoadsConnectedWithNode(id);
        points.splice(index, 1);
    }

    /* url to delete
    fetch('', {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "id": id
    })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    */
};

export const getPoints: () => Array<Point> = () => {
    //Send request to delete point
    console.log(`Requested to get points`);

    return points;
};
