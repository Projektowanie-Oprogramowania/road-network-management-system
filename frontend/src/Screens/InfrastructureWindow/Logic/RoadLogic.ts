import { Road } from './Interfaces';

let roads = [
    {
        id: 0,
        startingPointId: 'Warszawa',
        endingPointId: 'Gdynia',
        length: 200,
    },
    {
        id: 1,
        startingPointId: 'Warszawa',
        endingPointId: 'Krakow',
        length: 200,
    },
];

interface RoadForm {
    id?: number;
    startId: string;
    endId: string;
}

//addPointAsync
export const addRoad = async (p: RoadForm) => {
    let road = {
        id: p.id ? p.id : roads.length,
        startingPointId: p.startId,
        endingPointId: p.endId,
        length: 0,
    };
    roads.push(road);
    return {
        error: 0,
        message: 'dodano droge',
        value: road,
    };
};

export const editRoad = async (p: RoadForm) => {
    //TODO
    //Send request to edit point
    console.log(
        `Requested to edit road id: ${p.id}  start: ${p.startId} end: ${p.endId}`,
    );

    const id = roads.findIndex(v => v.id === p.id);

    roads[id].startingPointId = p.startId;
    roads[id].endingPointId = p.endId;

    /* url to put
    fetch('', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "id": id,
        "startingPointId": startId,
        "endingPointId": endId
    })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    */

    //Return value

    return {
        error: 0,
        message: 'edytowano droge',
        value: roads[id],
    };
};

export const removeRoad = async (id: number) => {
    //Send request to delete point
    console.log(`Requested ${id} to delete`);
    const index = roads.findIndex(v => v.id === id);
    if (index >= 0 && index < roads.length) {
        roads.splice(index, 1);
    }

    //TODO
    /*
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
        message: 'usunieto droge',
        value: undefined,
    };
};

export const getRoads = async () => {
    //Send request to delete point
    console.log(`Requested to get roads`);

    //TODO
    //get request

    return {
        error: 0,
        message: 'pobrano drogi',
        value: roads,
    };
};

export const deleteRoadsConnectedWithNode: (id: string) => void = (
    id: string,
) => {
    roads = roads.filter(v => v.startingPointId != id && v.endingPointId != id);

    //TODO
    //delete request - jeśli nie ma ma to dlete road po id
};
