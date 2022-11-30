import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import './InfrastructureStyles.css';

import { getRoadById } from './Logic/RoadLogic';
import { Node, Point, Road, Segment } from './Logic/Interfaces';
import { useParams } from 'react-router-dom';
import {
    Graph,
    mapConfig,
    mapFromRoadData,
    IMapData,
    appendCities,
    appendNodes,
    appendPoints,
    appendSegments,
    addNodesFromSegments,
} from './Map';
import useAlert from '@context/useAlert';
import useFetch from 'use-fetch';
import {
    getCities,
    getNodes,
    getNodesByRoad,
    getPoints,
    getPointsByRoad,
} from './Logic/NodeLogic';

export const InfrastructureWindowMap = () => {
    const { roadId } = useParams();
    const { setAlert } = useAlert();
    const [road, setRoad] = useState<Road>();
    const [mapData, setMapData] = useState<IMapData>();
    const [cities, setCities] = useState<Node[]>([]);
    //const [nodes, setNodes] = useState<Node[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);

    const updateData: () => void = async () => {
        //getRoads
        if (roadId) {
            const _r: Road | undefined = await getRoadById(roadId);
            if (_r) {
                const _p = await getPointsByRoad(roadId);
                //const _n = await getNodesByRoad(roadId);
                setRoad(_r);
                setSegments(_r['segments']);
                setPoints(_p);
                //setNodes(_n.filter(v => !v.isCity));
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
            //newData = mapFromRoadData(road);
            newData = appendCities(newData, cities);
            //newData = appendNodes(newData, nodes);
            newData = addNodesFromSegments(newData, segments, cities);
            newData = appendSegments(newData, segments);
            //newData = appendPoints(newData, points);
            setMapData(newData);
        }
    };

    const onClickNode = (nodeId: string) => {
        setAlert(`Punkt ${nodeId}`);
    };

    const onClickLink = (source: string, target: string) => {
        setAlert(`Droga ${source}-${target}`);
    };

    const { sendRequest: fetchInfrastructure } = useFetch();

    useEffect(() => {
        /*const handleRespnse = (response: any) => {
            console.log(response);
        };

        const fetchInfrastructureRequest = {
            url: `road/region/${parseInt(roadId!) - 1}`,
        };

        fetchInfrastructure(fetchInfrastructureRequest, handleRespnse);
        */
        console.log('up');
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
