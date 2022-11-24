import { useEffect, useState } from 'react';

import { Button, Box, TextField } from '@mui/material';
import './InfrastructureStyles.css';

import { getRoadById, addRoadByMainData } from './Logic/RoadLogic';
import { Point, Road } from './Logic/Interfaces';
import { useParams, useNavigate } from 'react-router-dom';
import { FormMainPoint } from './Forms/FormMainPoint';

export const RoadcreateWindow = () => {
    const { roadId } = useParams();
    const navigate = useNavigate();
    const [, setRoad] = useState<Road>();
    const [points, setPoints] = useState<Point[]>([]);

    const [name, setName] = useState('');
    const [startingPoint, setSP] = useState<Point>();
    const [endingPoint, setEP] = useState<Point>();
    const [length, setLength] = useState(0);
    const [regionName, setRegion] = useState('');

    const [page, setPage] = useState(0);

    //Road Params
    //id: string;
    const createRoad = () => {
        //createRoad TODO dodać takie do backendu
        const response = addRoadByMainData({
            name: name,
            startingPoint: {
                name: startingPoint?.name,
                x: startingPoint ? startingPoint?.x : 0,
                y: startingPoint ? startingPoint?.y : 0,
            },
            endingPoint: {
                name: endingPoint?.name,
                x: endingPoint ? endingPoint?.x : 0,
                y: endingPoint ? endingPoint?.y : 0,
            },
            length: length,
            region: regionName,
        });
        if (response.status === 200) {
            navigate(`/infrastructure/${response.data.id}`);
        }
    };

    const updateData: () => void = async () => {
        //getRoads
        if (roadId) {
            const _r = await getRoadById(roadId);
            //const _p = await getPoints();
            if (_r) {
                setRoad(_r);
                //setPoints(_p);
            }
        }
    };

    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, []);

    interface IMPL {
        onSubmit: (p: Point) => void;
    }

    const MainPointList = (props: IMPL) => {
        const [_page, _setPage] = useState(0);
        const addPoint = (p: Point) => {
            //add To backend
            setPoints([...points, p]);
        };

        return (
            <>
                {(_page === 0 && (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '100%',
                                marginBottom: '40px',
                            }}
                        >
                            {points.length > 0 ? (
                                points.map(v => (
                                    <Button
                                        sx={{ width: '100%' }}
                                        variant="contained"
                                        onClick={() => props.onSubmit(v)}
                                    >
                                        {v.name}
                                    </Button>
                                ))
                            ) : (
                                <div>Brak punktów do wybrania</div>
                            )}
                        </Box>
                        <Button
                            sx={{ width: '100%' }}
                            variant="contained"
                            onClick={() => _setPage(1)}
                        >
                            Utwórz nowy punkt
                        </Button>
                        <Button
                            sx={{ width: '100%' }}
                            variant="contained"
                            onClick={() => setPage(0)}
                        >
                            Powrót
                        </Button>
                    </>
                )) || (
                    <>
                        <Button
                            sx={{ width: '100%' }}
                            variant="outlined"
                            onClick={() => _setPage(0)}
                        >
                            Powrót
                        </Button>
                        <FormMainPoint
                            onSubmit={(p: Point) => {
                                addPoint(p);
                                props.onSubmit(p);
                            }}
                        />
                    </>
                )}
            </>
        );
    };

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
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <div>Dodaj sieć drogową</div>
                    <Box
                        sx={{
                            display: 'flex',
                            position: 'relative',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '10px',
                            gap: '10px',
                        }}
                    >
                        {(page === 1 && (
                            <MainPointList
                                onSubmit={(p: Point) => {
                                    setSP(p);
                                    setPage(0);
                                }}
                            />
                        )) ||
                            (page === 2 && (
                                <MainPointList
                                    onSubmit={(p: Point) => {
                                        setEP(p);
                                        setPage(0);
                                    }}
                                />
                            )) || (
                                <>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{
                                            label: { color: 'white' },
                                            input: { color: 'white' },
                                        }}
                                        label="Nazwa"
                                        variant="outlined"
                                        type="text"
                                        autoComplete="off"
                                        onChange={v => setName(v.target.value)}
                                        value={name}
                                    />
                                    <Box sx={{ width: '100%' }}>
                                        <div>Punkt początkowy</div>
                                        <Button
                                            sx={{ width: '100%' }}
                                            variant="outlined"
                                            onClick={() => setPage(1)}
                                        >
                                            {startingPoint
                                                ? startingPoint.name
                                                : 'Wybierz'}
                                        </Button>
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <div>Punkt końcowy</div>
                                        <Button
                                            sx={{ width: '100%' }}
                                            variant="outlined"
                                            onClick={() => setPage(2)}
                                        >
                                            {endingPoint
                                                ? endingPoint.name
                                                : 'Wybierz'}
                                        </Button>
                                    </Box>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{
                                            label: { color: 'white' },
                                            input: { color: 'white' },
                                        }}
                                        label="Długość"
                                        variant="outlined"
                                        type="number"
                                        autoComplete="off"
                                        onChange={v =>
                                            setLength(Number(v.target.value))
                                        }
                                        value={length}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        sx={{
                                            label: { color: 'white' },
                                            input: { color: 'white' },
                                        }}
                                        label="Region"
                                        variant="outlined"
                                        type="text"
                                        autoComplete="off"
                                        onChange={v =>
                                            setRegion(v.target.value)
                                        }
                                        value={regionName}
                                    />
                                    <Button
                                        sx={{ width: '100%' }}
                                        variant="contained"
                                        onClick={createRoad}
                                    >
                                        Zapisz
                                    </Button>
                                </>
                            )}
                    </Box>
                </Box>
            </div>
        </div>
    );
};
