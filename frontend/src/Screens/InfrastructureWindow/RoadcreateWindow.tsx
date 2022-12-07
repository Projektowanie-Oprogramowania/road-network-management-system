import { useEffect, useState } from 'react';

import { Button, Box, TextField } from '@mui/material';
import './InfrastructureStyles.css';

import { getRoadById, addRoad } from './Logic/RoadLogic';
import { Point, Region } from './Logic/Interfaces';
import { useParams, useNavigate } from 'react-router-dom';
import { FormNode } from './Forms/FormNode';
import { getCities, getPointsByRoad } from './Logic/PointLogic';
import { getRegions } from './Logic/RegionLogic';

interface ICitiesList {
    callback: (p: Point) => void;
    onReturn: () => void;
}

const CitiesList = (props: ICitiesList) => {
    const { callback, onReturn } = props;
    const [_cities, setCities] = useState<Point[]>([]);
    const [_page, _setPage] = useState(0);

    const updateCities = async () => {
        const c = await getCities();
        setCities(c);
    };

    useEffect(() => {
        updateCities();
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
                    onSubmit={(p: Point) => {
                        callback(p);
                    }}
                    onReturn={() => _setPage(0)}
                    isCity={true}
                />
            )}
        </>
    );
};

interface IRegionList {
    callback: (p: Region) => void;
    onReturn: () => void;
}

const RegionList = (props: IRegionList) => {
    const { callback, onReturn } = props;
    const [_regions, setRegions] = useState<Region[]>([]);
    //const [_page, _setPage] = useState(0);

    const updateRegions = async () => {
        const c = await getRegions();
        setRegions(c);
        console.log(c);
    };

    useEffect(() => {
        updateRegions();
    }, []);

    return (
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
                {_regions.length > 0 ? (
                    _regions.map(v => (
                        <Button
                            sx={{ width: '100%' }}
                            variant="contained"
                            onClick={() => callback(v)}
                        >
                            {v.name}
                        </Button>
                    ))
                ) : (
                    <div>
                        Brak regionów do wybrania (Zgłoś problem do
                        administatora)
                    </div>
                )}
            </Box>
            <Button
                sx={{ width: '100%' }}
                variant="contained"
                color="error"
                onClick={() => onReturn()}
            >
                Powrót
            </Button>
        </>
    );
};

export const RoadcreateWindow = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [startingPoint, setSP] = useState<Point>();
    const [endingPoint, setEP] = useState<Point>();
    const [length, setLength] = useState(0);
    const [region, setRegion] = useState<Region>();

    const [page, setPage] = useState(0);

    const createRoad = async () => {
        if (startingPoint && endingPoint && region) {
            const response = await addRoad({
                name: name,
                startingPoint: startingPoint,
                endingPoint: endingPoint,
                length: length,
                region: region,
            });
            if (response) {
                navigate(`/infrastructure/${response.id}`);
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
                                callback={(p: Point) => {
                                    setSP(p);
                                    setPage(0);
                                }}
                                onReturn={() => setPage(0)}
                            />
                        )) ||
                            (page === 2 && (
                                <CitiesList
                                    callback={(p: Point) => {
                                        setEP(p);
                                        setPage(0);
                                    }}
                                    onReturn={() => setPage(0)}
                                />
                            )) ||
                            (page === 3 && (
                                <RegionList
                                    callback={(r: Region) => {
                                        setRegion(r);
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
                                    <Box sx={{ width: '100%' }}>
                                        <div>Region</div>
                                        <Button
                                            sx={{ width: '100%' }}
                                            variant="outlined"
                                            onClick={() => setPage(3)}
                                        >
                                            {region ? region.name : 'Wybierz'}
                                        </Button>
                                    </Box>
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
