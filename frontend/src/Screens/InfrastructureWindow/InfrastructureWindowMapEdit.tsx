import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import './InfrastructureStyles.css';

import { getRoadById } from './Logic/RoadLogic';
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
    const [, setSegment] = useState<Segment>();
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
                v.endingPoint === nodeId ||
                v.startingPoint === nodeId ||
                v.points.find(p => p === nodeId),
        );
        if (s) {
            setSegment(s);
        }
    };

    const onClickLink = (source: string, target: string) => {
        setAlert(`Droga do edycji ${source}-${target}`);
        const s = road?.segments.find(v => {
            let sf = v.startingPoint === source || v.endingPoint === source;
            let tf = v.startingPoint === target || v.endingPoint === target;
            for (const p of v.points) {
                if (!sf) sf = p === source;
                if (!tf) sf = p === target;
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
        // eslint-disable-next-line
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
