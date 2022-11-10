import { Point } from "./Interfaces";

let points = [
    { 
        id: "Warszawa",
        x: 200,
        y: 200 
    }, { 
        id: "Gdynia",
        x: 200,
        y: 400
    }, { 
        id: "Krakow",
        x: 200,
        y: 0 
    }];

export const editPoint: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id: string = (e.currentTarget[1] as HTMLInputElement).value;
    const x: number =  Number( (e.currentTarget[3] as HTMLInputElement).value );
    const y: number =  Number( (e.currentTarget[5] as HTMLInputElement).value );
    //Send request to edit point
    console.log(`Requested to edit point  id: ${id} x: ${x} y: ${y}`);

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

export const addPoint: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id: string = (e.currentTarget[0] as HTMLInputElement).value;
    const x: number =  Number( (e.currentTarget[2] as HTMLInputElement).value );
    const y: number =  Number( (e.currentTarget[4] as HTMLInputElement).value );
    //Send request to edit point
    console.log(`Requested to add point  id: ${id} x: ${x} y: ${y}`);

    points.push({
        id: id,
        x: x,
        y: y
    })

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

export const removePoint: (id: string) => void = (id: string) => {
    //Send request to delete point
    console.log(`Requested ${id} to delete`);
}

export const getPoints: () => Array<Point> = () => {
    //Send request to delete point
    console.log(`Requested to get points`);

    return points;
}