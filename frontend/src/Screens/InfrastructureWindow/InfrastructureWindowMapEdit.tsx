import { useEffect, useState } from 'react';

import { Box, Button, Paper } from '@mui/material';
import './InfrastructureStyles.css';

import { editRoad, getRoadById } from './Logic/RoadLogic';
import { Point, Road, Segment } from './Logic/Interfaces';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Graph,
    mapConfig,
    IMapData,
    appendCities,
    appendSegments,
    addNodesFromSegments,
    addRestOfPoints,
} from './Map';
import useAlert from '@context/useAlert';

import { FormSegment } from './Forms/FormSegment';
import { getCities, getPointsByRoad } from './Logic/PointLogic';
import { FormPoint } from './Forms/FormPoint';
import { FormNode } from './Forms/FormNode';

export const InfrastructureWindowMapEdit = () => {
    const { roadId } = useParams();
    const { setAlert } = useAlert();

    const navigate = useNavigate();

    const [road, setRoad] = useState<Road>();
    const [cities, setCities] = useState<Point[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [points, setPoints] = useState<Point[]>([]);

    //edycja segmentu
    const [segment, setSegment] = useState<Segment>();
    //edycja punktu
    const [point, setPoint] = useState<Point>();

    const [mapData, setMapData] = useState<any>({
        nodes: [],
        links: [],
    });

    const [editPage, setEditPage] = useState(0);

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
        await updateCities();
    };

    const updateCities: (c?: Point) => Promise<void> = async (c?: Point) => {
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
            newData = addRestOfPoints(newData, points);
            setMapData(newData);
        }
    };

    const onClickNode = (nodeId: string) => {
        let index: number = points.findIndex(v => v.id === nodeId);
        if (index !== -1) {
            setPoint(points[index]);
            setEditPage(3);
        } else {
            index = cities.findIndex(v => v.name === nodeId);
            if (index !== -1) {
                setPoint(cities[index]);
                setEditPage(4);
            } else {
                setAlert(`Błąd punkt ${nodeId} nie istnieje w bazie`);
            }
        }
    };

    const onClickLink = (source: string, target: string) => {
        //setAlert(`Droga do edycji ${source}-${target}`);
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

    const onClickGraph = function (event: any) {
        console.log(event.nativeEvent.srcElement);
        console.log(event.nativeEvent.srcElement);
    };

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        updateMapData();
    }, [road, points, segments]);

    const onCreateNode = (p: Point) => {
        setPoints([...points, p]);
        setEditPage(0);
    };

    const onUpdateNode = (p: Point) => {
        const index = points.findIndex(v => v.id === p.id);
        if (index !== -1) {
            const c = [...points];
            c[index] = p;
            setPoints(c);
        }
    };

    const handleSegmentUpdate = (s: Segment) => {
        const index: number = segments.findIndex(v => v.id === s.id);
        if (index !== -1) {
            const _s = [...segments];
            _s[index] = s;
            setSegments(_s);
        } else {
            setSegments([...segments, s]);
        }
        setEditPage(0);
        setEditPage(2);
    };

    const handleSubmit = async () => {
        if (road) {
            const res = await editRoad({
                ...road,
                segments: segments,
            });
            if (res) {
                setAlert(`Zaktualizowano droge id: ${res.id}`);
                navigate(`/infrastructure/${res.id}`);
                return;
            }
        }
        setAlert(`Wystapil blad`);
    };

    const onReturn = () => navigate(-1);

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
                    {(road && (
                        <Graph
                            id="graph-id" // id is mandatory
                            data={mapData}
                            config={mapConfig}
                            onClickNode={onClickNode}
                            onClickLink={onClickLink}
                            onClickGraph={onClickGraph}
                        />
                    )) || (
                        <Box
                            sx={{
                                width: 1500,
                                height: 800,
                                display: 'flex',
                                bgcolor: 'gray',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            Brak sieci o id: {roadId}
                        </Box>
                    )}
                </Box>
                <Paper
                    sx={{
                        height: 800,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                        margin: '10px',
                    }}
                    elevation={10}
                >
                    {editPage || (
                        <>
                            <div>EDYCJA</div>
                            {segment && <Box>Edycja segmentu</Box>}
                            {point && <Box>Edycja punktu</Box>}
                            <Button
                                type="submit"
                                value="Submit"
                                variant="contained"
                                color="primary"
                                onClick={() => setEditPage(1)}
                            >
                                Dodaj wezel
                            </Button>
                            <Button
                                type="submit"
                                value="Submit"
                                variant="contained"
                                color="primary"
                                onClick={() => setEditPage(2)}
                            >
                                Dodaj odcinek
                            </Button>
                            <Button
                                type="submit"
                                value="Submit"
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Zapisz
                            </Button>
                            <Button
                                type="submit"
                                value="Submit"
                                variant="contained"
                                color="error"
                                onClick={onReturn}
                            >
                                Anuluj
                            </Button>
                        </>
                    )}
                    {editPage === 1 && (
                        <FormPoint
                            callback={onCreateNode}
                            onReturn={() => setEditPage(0)}
                        />
                    )}
                    {editPage === 2 && roadId && (
                        <FormSegment
                            roadPoints={points}
                            onReturn={() => setEditPage(0)}
                            callback={handleSegmentUpdate}
                            data={segment ? segment : undefined}
                        />
                    )}
                    {editPage === 3 && (
                        <FormPoint
                            data={point}
                            callback={onUpdateNode}
                            onReturn={() => setEditPage(0)}
                        />
                    )}
                    {editPage === 4 && point && (
                        <FormNode
                            data={{
                                id: point.id,
                                name: point.id,
                                x: point.x,
                                y: point.y,
                            }}
                            onSubmit={updateCities}
                            onReturn={() => setEditPage(0)}
                        />
                    )}
                </Paper>
            </div>
        </div>
    );
};
