import { Road } from "./Interfaces";

let roads = [
    {
        startingPointId: 'Warszawa',
        endingPointId: 'Gdynia',
        length: 200
    }, {
        startingPointId: 'Warszawa',
        endingPointId: 'Krakow',
        length: 200
    }
];

export const editRoad: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //const id: string = (e.currentTarget[1] as HTMLInputElement).value;

    //Send request to edit point
    console.log(`Requested to edit road ...`);

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
    return {
    }
}

export const addRoad: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //const id: string = (e.currentTarget[0] as HTMLInputElement).value;

    //Send request to edit point
    console.log(`Requested to add road ...`);
    //roads.push();

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
    return {
    }
}

export const removeRoad: (id: string) => void = (id: string) => {
    //Send request to delete point
    console.log(`Requested ${id} to delete`);
}

export const getRoads: () => Array<Road> = () => {
    //Send request to delete point
    console.log(`Requested to get points`);

    return roads;
}