import { Road } from "./Interfaces";

let roads = [
    {
        id: 0,
        startingPointId: 'Warszawa',
        endingPointId: 'Gdynia',
        length: 200
    }, {
        id: 1,
        startingPointId: 'Warszawa',
        endingPointId: 'Krakow',
        length: 200
    }
];

let new_index = 2;

export const editRoad: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id: number = Number( (e.currentTarget[1] as HTMLInputElement).value );
    const startId: string = (e.currentTarget[2] as HTMLInputElement).value;
    const endId: string = (e.currentTarget[4] as HTMLInputElement).value;

    //Send request to edit point
    console.log(`Requested to edit road id: ${id}  start: ${startId} end: ${endId}`);
    roads[id].startingPointId = startId;
    roads[id].endingPointId = endId;

    /* url to post
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
    }
}

export const addRoad: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id: number = Number( (e.currentTarget[0] as HTMLInputElement).value );
    const startId: string = (e.currentTarget[1] as HTMLInputElement).value;
    const endId: string = (e.currentTarget[3] as HTMLInputElement).value;

    //Send request to edit point
    console.log(`Requested to add road id: ${new_index}  start: ${startId} end: ${endId}`);
    roads.push({
        id: new_index,
        startingPointId: startId,
        endingPointId: endId,
        length: 0
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
        "startingPointId": startId,
        "endingPointId": endId
    })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    */

    //Return value
    return {
    }
}

export const removeRoad: (id: number) => void = (id: number) => {
    //Send request to delete point
    console.log(`Requested ${id} to delete`);
    const index = roads.findIndex(v => v.id === id);
    if (index >= 0 && index < roads.length)
    {
        roads.splice(index);
    }

    /* url to post
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
}

export const getRoads: () => Array<Road> = () => {
    //Send request to delete point
    console.log(`Requested to get points`);

    return roads;
}

export const deleteRoadsConnectedWithNode: (id: string) => void = (id: string) => {
    roads = roads.filter(v => v.startingPointId != id && v.endingPointId != id);
}