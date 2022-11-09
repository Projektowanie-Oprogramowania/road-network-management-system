
import { Point, Road, Infrastructure_object } from './Interfaces';

interface MapData {
    points: Array<Point>;
    roads: Array<Road>;
    objects: Array<Infrastructure_object>;
}

//TODO connect with backend
export const getInfrastructure:() => MapData = () => {
    const points: Point[] = [
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

    const roads: Road[] = [
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

    const objects: Infrastructure_object[] = [];

    return {
        points: points,
        roads: roads,
        objects: objects
    }
}

export { addPoint, editPoint, removePoint } from './PointLogic';