import React, { useMemo, useState } from 'react';

import { FormPoint } from './FormPoint';
import { FormRoad, FormRoadSelect } from './FormRoad';
import { Graph, mapConfig } from '../Map';

import {
    getInfrastructure,
    addRoad,
    addPoint as _addPoint,
    editPoint,
    removePoint,
    editRoad,
    removeRoad,
    getNetworks,
} from '../Logic/InfrastructureLogic';
import { Point, Road, IRoadNetwork } from '../Logic/Interfaces';

import { Button, Box, Paper, TextField } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { SimpleComponent } from '@components/lists/simpleComponent';
import { margin } from '@mui/system';

interface IFormNewNetwork {
    points: Point[];
    roads: Road[];
    pageNumber: number;
    setAdding: (b: boolean) => void;
    mapEdit: (page: number) => void;
    addPoint: () => void;
    addRoad: () => void;
}

export const FormNewNetwork: React.FC<IFormNewNetwork> = ({
    points,
    roads,
    pageNumber,
    setAdding,
    mapEdit,
    addPoint,
    addRoad,
}) => {
    const [page, setPage] = useState(pageNumber);
    const [strNode, setSN] = useState<Point | undefined>(undefined);
    const [endNode, setEN] = useState<Point | undefined>(undefined);
    const [length, setLength] = useState(0);

    //Page 0
    const MainPage = () => (
        <>
            <TextField
                id="outlined-basic"
                label="Nazwa sieci"
                variant="outlined"
                type="text"
                autoComplete="off"
            />
            <Button onClick={() => setPage(1)}>
                {strNode ? strNode.id : 'Początek sieci'}
            </Button>
            <Button onClick={() => setPage(2)}>
                {endNode ? endNode.id : 'Koniec sieci'}
            </Button>
            <TextField
                id="outlined-basic"
                sx={{
                    label: { color: 'white' },
                    input: { color: 'white' },
                }}
                label="Ilość kilometrów"
                variant="outlined"
                type="number"
                autoComplete="off"
            />
        </>
    );

    //Page 1 - 2
    const PointsSelector: React.FC<{
        cb: (point: Point) => void;
        point?: Point;
        cbPage: number;
    }> = ({ cb, point, cbPage }) => (
        <>
            {points
                .filter(v => !point || (point && v.id !== point.id))
                .map(v => (
                    <Button onClick={() => cb(v)}>{v.id}</Button>
                ))}
            <Button onClick={() => setPage(cbPage)}>
                Utwórz nowy punkt startowy
            </Button>
            <Button onClick={() => setPage(0)}>Anuluj</Button>
        </>
    );

    //Wezly i odcinki - tylko przyciski (wyświetlane na mapie przecież są)
    /*
    lista wezłów niżej lista 
    */

    return (
        <>
            <Box sx={{ height: '90%' }}>
                <div>Dodawanie nowej sieci drogowej</div>

                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        margin: 10,
                    }}
                >
                    <Carousel
                        animation="slide"
                        indicators={false}
                        autoPlay={false}
                        height="650px"
                        navButtonsAlwaysInvisible={true}
                        swipe={false}
                        index={page}
                    >
                        <MainPage />
                        <PointsSelector
                            cb={(p: Point) => {
                                setSN(p);
                                setPage(0);
                            }}
                            cbPage={3}
                        />
                        <PointsSelector
                            cb={(p: Point) => {
                                setEN(p);
                                setPage(0);
                            }}
                            cbPage={4}
                        />
                        <>
                            <FormPoint onSubmit={_addPoint} />
                            <Button onClick={() => setPage(1)}>Anuluj</Button>
                        </>
                        <>
                            <FormPoint onSubmit={_addPoint} />
                            <Button onClick={() => setPage(2)}>Anuluj</Button>
                        </>
                        <>
                            <Button onClick={() => addPoint()}>
                                Dodaj węzeł
                            </Button>
                            <Button onClick={() => addRoad()}>
                                Dodaj drogę
                            </Button>
                            <Button onClick={() => setPage(0)}>Powrót</Button>
                        </>
                    </Carousel>
                </Box>
            </Box>
            <Box
                sx={{
                    height: '10%',
                    justifyContent: 'center',
                    display: 'flex',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setPage(5);
                                setAdding(true);
                                mapEdit(5);
                            }}
                        >
                            Dodaj węzły lub odcinki płatne
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => setAdding(true)}
                        >
                            Zapisz
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginLeft: 5 }}
                            onClick={() => setAdding(false)}
                        >
                            Anuluj
                        </Button>
                    </div>
                </div>
            </Box>
        </>
    );
};
