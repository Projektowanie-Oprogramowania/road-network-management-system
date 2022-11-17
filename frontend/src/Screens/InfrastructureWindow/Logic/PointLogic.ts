import { Point, IResponse } from './Interfaces';
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

interface PointForm {
    id: string;
    x: number;
    y: number;
}

export const addPoint = async (p: PointForm) => {
    let point = {
        index: points.length,
        id: p.id,
        x: p.x,
        y: p.y,
    };

    //TODO
    points.push(point);
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

    return {
        error: 0,
        message: 'dodano punkt',
        value: point,
    };
};

export const editPoint = async (p: PointForm) => {
    //TODO
    const index = points.findIndex(v => v.id === p.id);
    if (index !== -1) {
        points[index].x = p.x;
        points[index].y = p.y;
    }
    /*
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

    return {
        error: 0,
        message: 'edytowano wezel',
        value: points[index],
    };
};

export const removePoint = async (id: string) => {
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

    return {
        error: 0,
        message: 'usunieto wezel',
        value: undefined,
    };
};

export const getPoints = async () => {
    //Send request to delete point
    console.log(`Requested to get points`);

    return {
        error: 0,
        message: 'pobrano punkty',
        value: points,
    };
};

export const getPointsForNetwork = async (networkId: number) => {
    //Send request to delete point
    console.log(`Requested to get points`);

    return {
        error: 0,
        message: 'pobrano wezly',
        value: points,
    };
};
