import { getRoads } from 'Screens/InfrastructureWindow/Logic';
import { Road } from 'Screens/InfrastructureWindow/Logic/Interfaces';
import {
    getCities,
    Point,
} from 'Screens/InfrastructureWindow/Logic/PointLogic';
import {
    getSegments,
    Segment,
} from 'Screens/InfrastructureWindow/Logic/SegmentLogic';
import {
    addNodesFromSegments,
    appendCities,
    appendSegments,
    IMapData,
} from 'Screens/InfrastructureWindow/Map';

interface IFullMap {
    cities: Point[];
    roads: Road[];
    segments: Segment[];
    mapData: IMapData;
}

export const fetchFullMapData = async (): Promise<IFullMap> => {
    const cities = await getCities();
    const roads = await getRoads();
    const segments = await getSegments();

    let data: IMapData = {
        nodes: [],
        links: [],
    };

    data = appendCities(data, cities);
    /* Problemy z zapisem drogi dlatego bierzemy segmenty */
    //roads.forEach(r => {
    //    data = appendSegments(data, r.segments);
    //});
    data = addNodesFromSegments(data, segments, cities);
    data = appendSegments(data, segments);

    return {
        cities: cities,
        roads: roads,
        segments: segments,
        mapData: data,
    };
};

export const getSegmentFromLink = (
    targetID: string,
    sourceID: string,
    segments: Segment[],
): string => {
    let res = '-1';

    segments.forEach(s => {
        const ids: string[] = [s.startingPoint.id]
            .concat(s.points.map(p => p.id))
            .concat(s.endingPoint.id);
        const id1 = ids.findIndex(v => v == targetID);
        const id2 = ids.findIndex(v => v == sourceID);
        if (id1 !== -1 && id2 !== -1 && Math.abs(id1 - id2) == 1) {
            res = s.id;
        }
    });

    return res;
};
