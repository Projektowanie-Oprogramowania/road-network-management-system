import React, { useMemo, useState } from 'react';

import { FormPoint } from './FormPoint';
import { FormRoad, FormRoadSelect } from './FormRoad';
import { Graph, mapConfig } from '../Map';

import { getInfrastructure } from '../Logic/InfrastructureLogic';
import { Point, Road } from '../Logic/Interfaces';

import { Button, Box, Paper, TextField } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { SimpleComponent } from '@components/lists/simpleComponent';
import { margin } from '@mui/system';

interface IFormNewNetwork {
    name: string;
    onChangeName: (n: string) => void;
    start?: Point;
    onStartPointChange: (n: Point) => void;
    end?: Point;
    onEndPointChange: (n: Point) => void;
    length: number;
    onLengthChange: (n: number) => void;
    mainPoints: Point[];
    onMainPointsAdd: React.FormEventHandler<HTMLFormElement>;
    pageNumber: number;
    changePage: (n: number) => void;
    startMapEdit: () => void;
    save: () => void;
    cancel: () => void;
}

export const FormNewNetwork: React.FC<IFormNewNetwork> = ({
    name,
    onChangeName,
    start,
    onStartPointChange,
    end,
    onEndPointChange,
    length,
    onLengthChange,
    mainPoints,
    onMainPointsAdd,
    pageNumber,
    changePage,
    startMapEdit,
    save,
    cancel,
}) => {
    const [n, setN] = useState(name);
    const [l, setl] = useState(length);

    //Page 0
    const MainPage = () => (
        <>
            <TextField
                id="outlined-basic"
                label="Nazwa sieci"
                variant="outlined"
                type="text"
                autoComplete="off"
                value={n}
                onChange={e => setN(e.target.value)}
            />
            <Button onClick={() => changePage(1)}>
                {start ? start.id : 'Początek sieci'}
            </Button>
            <Button onClick={() => changePage(2)}>
                {end ? end.id : 'Koniec sieci'}
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
                value={l}
                onChange={e => setl(Number(e.target.value))}
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
            {mainPoints
                .filter(v => !point || (point && v.id !== point.id))
                .map(v => (
                    <Button onClick={() => cb(v)}>{v.id}</Button>
                ))}
            <Button onClick={() => changePage(cbPage)}>
                Utwórz nowy punkt startowy
            </Button>
            <Button onClick={() => changePage(0)}>Anuluj</Button>
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
                        index={pageNumber}
                    >
                        <MainPage />
                        <PointsSelector
                            cb={(p: Point) => {
                                onStartPointChange(p);
                                changePage(0);
                            }}
                            cbPage={3}
                        />
                        <PointsSelector
                            cb={(p: Point) => {
                                onEndPointChange(p);
                                changePage(0);
                            }}
                            cbPage={4}
                        />
                        <>
                            {/*<FormPoint onSubmit={onMainPointsAdd} />*/}
                            <Button onClick={() => changePage(1)}>
                                Anuluj
                            </Button>
                        </>
                        <>
                            {/*<FormPoint onSubmit={onMainPointsAdd} />*/}
                            <Button onClick={() => changePage(2)}>
                                Anuluj
                            </Button>
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
                                startMapEdit();
                            }}
                        >
                            Dodaj węzły lub odcinki płatne
                        </Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={() => save()}>
                            Zapisz
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginLeft: 5 }}
                            onClick={() => cancel()}
                        >
                            Anuluj
                        </Button>
                    </div>
                </div>
            </Box>
        </>
    );
};
