import { Point, Road, Infrastructure_object } from './Interfaces';

import { getPoints } from './PointLogic';
import { getRoads } from './RoadLogic';

interface MapData {
    points: Array<Point>;
    roads: Array<Road>;
    objects: Array<Infrastructure_object>;
}

//TODO connect with backend
export const getInfrastructure: () => MapData = () => {
    const points: Point[] = getPoints();
    const roads: Road[] = getRoads();

    const objects: Infrastructure_object[] = [];

    return {
        points: points,
        roads: roads,
        objects: objects,
    };
};

export { getNetworks } from './NetworkLogic';
export { addPoint, editPoint, removePoint } from './PointLogic';
export { addRoad, editRoad, removeRoad } from './RoadLogic';
