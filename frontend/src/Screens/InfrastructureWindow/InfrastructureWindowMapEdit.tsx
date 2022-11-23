import React, { useEffect, useState } from 'react';

import { Button, Box, Paper } from '@mui/material';
import './InfrastructureStyles.css';

import { getRoads, getRoadById } from './Logic/RoadLogic';
import { Road, Segment } from './Logic/Interfaces';
import { useParams } from 'react-router-dom';
import { Graph } from 'react-d3-graph';
import { mapConfig, mapFromRoadData } from './Map';
import useAlert from '@context/useAlert';

export const InfrastructureWindowMapEdit = () => {
    const { roadId } = useParams();
    const { setAlert } = useAlert();

    const [road, setRoad] = useState<Road>();
    //edycja według segmentu
    const [segment, setSegment] = useState<Segment>();
    const [mapData, setMapData] = useState<any>({
        nodes: [],
        links: [],
    });

    const updateData: () => void = async () => {
        //getRoads
        if (roadId) {
            const _r = await getRoadById(roadId);
            if (_r) {
                setRoad(_r);
            }
        }
    };

    const onClickNode = (nodeId: string) => {
        setAlert(`Punkt do edycji ${nodeId}`);
        const s = road?.segments.find(
            v =>
                v.endingPoint.id === nodeId ||
                v.startingPoint.id === nodeId ||
                v.points.find(p => p.id === nodeId),
        );
        if (s) {
            setSegment(s);
        }
    };

    const onClickLink = (source: string, target: string) => {
        setAlert(`Droga do edycji ${source}-${target}`);
        const s = road?.segments.find(v => {
            let sf =
                v.startingPoint.id === source || v.endingPoint.id === source;
            let tf =
                v.startingPoint.id === target || v.endingPoint.id === target;
            for (const p of v.points) {
                if (!sf) sf = p.id === source;
                if (!tf) sf = p.id === target;
            }
            return sf && tf;
        });
        if (s) {
            setSegment(s);
        }
    };

    useEffect(() => {
        if (road) setMapData(mapFromRoadData(road));
    }, [road]);

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
                    margin: '10px',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <div>{`Id sieci do edycji ${roadId}`}</div>
                    {road && (
                        <Graph
                            id="graph-id" // id is mandatory
                            data={mapData}
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
