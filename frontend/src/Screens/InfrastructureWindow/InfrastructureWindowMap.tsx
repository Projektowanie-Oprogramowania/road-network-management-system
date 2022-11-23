import React, { useEffect, useState } from 'react';

import { Button, Box, Paper } from '@mui/material';
import './InfrastructureStyles.css';

import { getRoads, getRoadById } from './Logic/RoadLogic';
import { Road } from './Logic/Interfaces';
import { useParams } from 'react-router-dom';
import { Graph, mapConfig, mapFromRoadData } from './Map';
import useAlert from '@context/useAlert';

export const InfrastructureWindowMap = () => {
    const { roadId } = useParams();
    const { setAlert } = useAlert();
    const [road, setRoad] = useState<Road>();

    const updateData: () => void = async () => {
        //getRoads
        if (roadId) {
            const _r = await getRoadById(roadId);
            if (_r) setRoad(_r);
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
                    <div>{`Siec drogowa: ${roadId}`}</div>
                    {road && (
                        <Graph
                            id="graph-id" // id is mandatory
                            data={mapFromRoadData(road)}
                            config={mapConfig}
                            onClickNode={onClickNode}
                            onClickLink={onClickLink}
                        />
                    )}
                </Box>
            </div>
        </div>
    );
};
