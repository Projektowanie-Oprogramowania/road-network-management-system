import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import './InfrastructureStyles.css';

import { getRoadById } from './Logic/RoadLogic';
import { Point, Road, Segment } from './Logic/Interfaces';
import { useParams } from 'react-router-dom';
import {
    Graph,
    mapConfig,
    IMapData,
    appendCities,
    appendSegments,
    addNodesFromSegments,
} from './Map';
import useAlert from '@context/useAlert';
import { getCities, getPointsByRoad } from './Logic/PointLogic';

export const InfrastructureWindowMap = () => {
    const { roadId } = useParams();
    const { setAlert } = useAlert();
    const [road, setRoad] = useState<Road>();
    const [mapData, setMapData] = useState<IMapData>();
    const [cities, setCities] = useState<Point[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    //infrastruktura ig????

    const updateData: () => void = async () => {
        if (roadId) {
            const _r: Road | undefined = await getRoadById(roadId);
            if (_r) {
                const _p = await getPointsByRoad(roadId);
                setRoad(_r);
                setSegments(_r['segments']);
                setPoints(_p);
            }
        }
        const _c = await getCities();
        setCities(_c);
    };

    const updateMapData = () => {
        if (road) {
            let newData: IMapData = {
                nodes: [],
                links: [],
            };
            newData = appendCities(newData, cities);
            newData = addNodesFromSegments(newData, segments, cities);
            newData = appendSegments(newData, segments);
            setMapData(newData);
        }
    };

    const onClickNode = (nodeId: string) => {
        setAlert(`Punkt ${nodeId}`);
    };

    const onClickLink = (source: string, target: string) => {
        setAlert(`Droga ${source}-${target}`);
    };

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        updateMapData();
    }, [road]);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',

                    margin: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <>
                        <div>{`Siec drogowa: ${roadId}`}</div>
                        {mapData && (
                            <Graph
                                id="graph-id" // id is mandatory
                                data={mapData}
                                config={mapConfig}
                                onClickNode={onClickNode}
                                onClickLink={onClickLink}
                            />
                        )}
                    </>
                </Box>
            </div>
        </div>
    );
};
