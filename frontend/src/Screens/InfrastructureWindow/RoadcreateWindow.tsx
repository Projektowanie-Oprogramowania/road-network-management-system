import { useEffect, useState } from 'react';

import { Button, Box, TextField } from '@mui/material';
import './InfrastructureStyles.css';

import { getRoadById, addRoadByMainData } from './Logic/RoadLogic';
import { Node } from './Logic/Interfaces';
import { useParams, useNavigate } from 'react-router-dom';
import { FormNode } from './Forms/FormNode';
import { getCities, getPointsByRoad } from './Logic/NodeLogic';

interface ICitiesList {
    callback: (p: Node) => void;
    onReturn: () => void;
}

const CitiesList = (props: ICitiesList) => {
    const { callback, onReturn } = props;
    const [_cities, setCities] = useState<Node[]>([]);
    const [_page, _setPage] = useState(0);

    useEffect(() => {
        setCities(getCities());
    }, []);

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
                        {_cities.length > 0 ? (
                            _cities.map(v => (
                                <Button
                                    sx={{ width: '100%' }}
                                    variant="contained"
                                    onClick={() => callback(v)}
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
                        color="error"
                        onClick={() => onReturn()}
                    >
                        Powrót
                    </Button>
                </>
            )) || (
                <FormNode
                    onSubmit={(p: Node) => {
                        callback(p);
                    }}
                    onReturn={() => _setPage(0)}
                    isCity={true}
                />
            )}
        </>
    );
};

export const RoadcreateWindow = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [startingPoint, setSP] = useState<Node>();
    const [endingPoint, setEP] = useState<Node>();
    const [length, setLength] = useState(0);
    const [regionName, setRegion] = useState('');

    const [page, setPage] = useState(0);

    const createRoad = () => {
        if (startingPoint && endingPoint) {
            const response = addRoadByMainData({
                name: name,
                startingPoint: startingPoint.name,
                endingPoint: endingPoint.name,
                length: length,
                region: regionName,
            });
            if (response.status === 200) {
                navigate(`/infrastructure/${response.data.id}`);
            }
        }
    };

    const onReturn = () => {
        navigate(-1);
    };

    useEffect(() => {
        // do nothing
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
                            <CitiesList
                                callback={(p: Node) => {
                                    setSP(p);
                                    setPage(0);
                                }}
                                onReturn={() => setPage(0)}
                            />
                        )) ||
                            (page === 2 && (
                                <CitiesList
                                    callback={(p: Node) => {
                                        setEP(p);
                                        setPage(0);
                                    }}
                                    onReturn={() => setPage(0)}
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
                                    <Button
                                        sx={{ width: '100%' }}
                                        variant="contained"
                                        color="error"
                                        onClick={onReturn}
                                    >
                                        Anuluj
                                    </Button>
                                </>
                            )}
                    </Box>
                </Box>
            </div>
        </div>
    );
};
