import { Point, Road, Infrastructure_object } from './Interfaces';

import { addRoad, editRoad, removeRoad, getRoads } from './RoadLogic';
import { addPoint, editPoint, removePoint, getPoints } from './PointLogic';
import { getNetworks } from './NetworkLogic';

interface MapData {
    points: Array<Point>;
    roads: Array<Road>;
    objects: Array<Infrastructure_object>;
}

export const getInfrastructure = async () => {
    //TODO dodać sprawdzanie jeżeli w ten sposób
    const points: Point[] = (await getPoints()).value;
    const roads: Road[] = (await getRoads()).value;

    const objects: Infrastructure_object[] = [];

    return {
        points: points,
        roads: roads,
        objects: objects,
    };
};

export { addRoad, editRoad, removeRoad, getRoads };
export { addPoint, editPoint, removePoint, getPoints };
export { getNetworks };
