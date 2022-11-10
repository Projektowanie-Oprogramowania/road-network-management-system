import { Road } from "./Interfaces";

export const getRoads: () => Array<Road> = () => {
    //Send request to delete point
    console.log(`Requested to get points`);

    return [
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
}