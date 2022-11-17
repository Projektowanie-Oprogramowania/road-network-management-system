import React, { useState } from 'react';

import { FormPoint } from './FormPoint';
import { FormRoad, FormRoadSelect } from './FormRoad';
import { Graph, mapConfig, mapPointsAndRoads } from '../Map';
import useAlert from '@context/useAlert';

import {
    addPoint,
    addRoad,
    editPoint,
    removePoint,
    editRoad,
    removeRoad,
    getNetworks,
    getRoads,
    getPoints,
} from '../Logic/InfrastructureLogic';
import { Point, Road, IRoadNetwork } from '../Logic/Interfaces';

import { Button, Box, Paper, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';

import '../InfrastructureStyles.css';

interface IFormNetwork {
    onClose: () => void;
    name?: string;
    length?: number;
    startPoint?: Point;
    endPoint?: Point;
    points?: Point[];
    mainPoints?: Point[];
    roads?: Road[];
}

export const FormNetwork: React.FC<IFormNetwork> = ({
    onClose,
    name = '',
    length = 0,
    startPoint,
    endPoint,
    points = [],
    mainPoints = [],
    roads = [],
}) => {
    const [_name, setName] = React.useState(name);
    const [_startPoint, setStartPoint] = React.useState<Point | undefined>(
        startPoint,
    );
    const [_endPoint, setEndPoint] = React.useState<Point | undefined>(
        endPoint,
    );
    const [_length, setLength] = React.useState(length);

    const [_mainPoints, setMainPoints] = React.useState(mainPoints);
    const [_points, setPoints] = React.useState<Point[]>(points);
    const [_roads, setRoads] = React.useState<Road[]>(roads);

    const [page, changePage] = useState(0);
    const [editingMap, setEditingMap] = useState(false);

    const [formIsActive, setFormIsActive] = React.useState(false);
    const [formId, setFormId] = React.useState(0);

    const [currentPoint, setCurrentPoint] = React.useState<Point | undefined>(
        undefined,
    );
    const [currentRoad, setCurrentRoad] = React.useState<Road | undefined>(
        undefined,
    );
    const [currentNetwork, setCurrentNetwork] = React.useState<
        IRoadNetwork | undefined
    >(undefined);

    const [roadNetworks, setRoadNetworks] = React.useState<Array<IRoadNetwork>>(
        getNetworks(),
    );

    const [adding, setAdding] = useState(false);

    const { data } = React.useMemo(
        () => mapPointsAndRoads(_points, _roads),
        [_points, _roads],
    );

    //Konteksty
    const theme = useTheme();
    const { setAlert } = useAlert();

    const onClickNode = function (nodeId: any) {
        console.log(`Wybrano punkt ${nodeId}`);

        setFormIsActive(true);
        setFormId(4);
        setCurrentPoint(data.nodes.filter(v => v.id === nodeId)[0]);
    };

    const onClickLink = function (source: any, target: any) {
        console.log(`Wybrano droge ${source} - ${target}`);

        setFormIsActive(true);
        setFormId(5);
        const link = data.links.filter(
            v => v.source === source && v.target === target,
        )[0];
        setCurrentRoad({
            id: link.id,
            startingPointId: link.source,
            endingPointId: link.target,
            length: link.length,
            region: link.region,
        });
    };

    const onAddPointClick = async function (
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();
        const id: string = (e.currentTarget[0] as HTMLInputElement).value;
        const x: number = Number(
            (e.currentTarget[2] as HTMLInputElement).value,
        );
        const y: number = Number(
            (e.currentTarget[4] as HTMLInputElement).value,
        );

        const response = await addPoint({ id: id, x: x, y: y });

        setAlert(response.message);
        if (response.value) {
            setPoints([..._points, response.value]);
            setFormIsActive(false);
        }
    };

    const onEditPointClick = async function (
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();

        const id: string = (e.currentTarget[1] as HTMLInputElement).value;
        const x: number = Number(
            (e.currentTarget[3] as HTMLInputElement).value,
        );
        const y: number = Number(
            (e.currentTarget[5] as HTMLInputElement).value,
        );

        const response = await editPoint({ id: id, x: x, y: y });
        if (response.value) {
            setPoints((await getPoints()).value);
            setFormIsActive(false);
        }
    };

    const onDeletePointClick = async function (currentPoint: string) {
        const response = await removePoint(currentPoint);

        setAlert(response.message);
        if (response.value) {
            setRoads((await getRoads()).value);
            setFormIsActive(false);
        }
    };

    const onEditRoadClick = async function (
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();
        const id: number = Number(
            (e.currentTarget[1] as HTMLInputElement).value,
        );
        const startId: string = (e.currentTarget[2] as HTMLInputElement).value;
        const endId: string = (e.currentTarget[4] as HTMLInputElement).value;

        const response = await editRoad({
            id: id,
            startId: startId,
            endId: endId,
        });

        setAlert(response.message);
        if (response.value) {
            setRoads((await getRoads()).value);
            setFormIsActive(false);
        }
    };

    const onDeleteRoadClick = async function (currentRoad: number) {
        const response = await removeRoad(currentRoad);

        setAlert(response.message);
        if (response.value) {
            setRoads((await getRoads()).value);
            setFormIsActive(false);
        }
    };

    const OnAddRoadClick = async function (
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();

        const id: number = Number(
            (e.currentTarget[0] as HTMLInputElement).value,
        );
        const startId: string = (e.currentTarget[1] as HTMLInputElement).value;
        const endId: string = (e.currentTarget[3] as HTMLInputElement).value;
        //addRoad(currentRoad);
        const response = await addRoad({
            id: id,
            startId: startId,
            endId: endId,
        });

        setAlert(response.message);
        if (response.value) {
            setRoads([..._roads, response.value]);
            setFormIsActive(false);
        }
    };

    const onMainPointsAdd: React.FormEventHandler<HTMLFormElement> = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const id: string = (e.currentTarget[0] as HTMLInputElement).value;
        const x: number = Number(
            (e.currentTarget[2] as HTMLInputElement).value,
        );
        const y: number = Number(
            (e.currentTarget[4] as HTMLInputElement).value,
        );
        //Send request to edit point
        console.log(`Requested to add point  id: ${id} x: ${x} y: ${y}`);

        setMainPoints([
            ..._mainPoints,
            {
                index: _mainPoints.length,
                id: id,
                x: x,
                y: y,
            },
        ]);
    };

    const onSave = () => {
        console.log('zapisywanie sieci');
        //TODO no wiadomo request do zapisu edytowanych rzeczy wszystko w zmiennych zapisane
    };

    const onCancel = () => {
        console.log('anulowano zapis sieci');
        //TODO moze coś trzeba tu dodać
        onClose();
    };

    const PointsSelector: React.FC<{
        cb: (point: Point) => void;
        point?: Point;
        cbPage: number;
    }> = ({ cb, point, cbPage }) => (
        <>
            {_mainPoints
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

    return (
        <div
            style={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                height: '960px',
            }}
        >
            {/* W tym elemencie będą wyświetlane formularze*/}
            {formIsActive && (
                <div className="fill-window">
                    <div className="form-overlay" />
                    <Paper className="form-container">
                        <Box
                            sx={{
                                p: 10,
                                border: '1px dashed grey',
                                gap: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => setFormIsActive(false)}
                            >
                                Close
                            </Button>
                            {formId === 0 && (
                                <FormPoint onSubmit={onAddPointClick} />
                            )}
                            {formId === 4 && (
                                <FormPoint
                                    onSubmit={onEditPointClick}
                                    onDelete={onDeletePointClick}
                                    data={currentPoint}
                                />
                            )}
                            {formId === 1 && (
                                <FormRoadSelect
                                    points={data.nodes.map(v => v.id)}
                                    onSubmit={OnAddRoadClick}
                                />
                            )}
                            {formId === 5 && (
                                <FormRoadSelect
                                    points={data.nodes.map(v => v.id)}
                                    onSubmit={onEditRoadClick}
                                    onDelete={onDeleteRoadClick}
                                    data={currentRoad}
                                />
                            )}
                        </Box>
                    </Paper>
                </div>
            )}
            <Paper
                style={{
                    padding: 30,
                    margin: 20,
                    width: '80%',
                    height: '90%',
                }}
            >
                {((editingMap || currentNetwork) && (
                    <Graph
                        id="graph-id" // id is mandatory
                        data={data}
                        config={mapConfig}
                        onClickNode={onClickNode}
                        onClickLink={onClickLink}
                    />
                )) || (
                    <Box
                        sx={{
                            width: mapConfig.width,
                            height: mapConfig.height,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        Wybierz sieć drogową z listy obok aby ją edytować
                    </Box>
                )}
            </Paper>
            <Paper
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 30,
                    margin: 20,
                    width: '80%',
                    height: '90%',
                }}
            >
                <Box sx={{ height: '90%' }}>
                    <div>Dodawanie nowej sieci drogowej</div>

                    {editingMap ? (
                        <>
                            <Button
                                onClick={() => {
                                    setFormIsActive(true);
                                    setFormId(0);
                                }}
                            >
                                Dodaj węzeł
                            </Button>
                            <Button
                                onClick={() => {
                                    setFormIsActive(true);
                                    setFormId(1);
                                }}
                            >
                                Dodaj drogę
                            </Button>
                            <Button onClick={() => setEditingMap(false)}>
                                Powrót
                            </Button>
                        </>
                    ) : (
                        <>
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
                                    <>
                                        <TextField
                                            id="outlined-basic"
                                            label="Nazwa sieci"
                                            variant="outlined"
                                            type="text"
                                            autoComplete="off"
                                            value={_name}
                                            onChange={e => {
                                                e.preventDefault();
                                                setName(e.target.value);
                                            }}
                                        />
                                        <Button onClick={() => changePage(1)}>
                                            {_startPoint
                                                ? _startPoint.id
                                                : 'Początek sieci'}
                                        </Button>
                                        <Button onClick={() => changePage(2)}>
                                            {_endPoint
                                                ? _endPoint.id
                                                : 'Koniec sieci'}
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
                                            value={_length}
                                            onChange={e =>
                                                setLength(
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                    </>
                                    <PointsSelector
                                        cb={(p: Point) => {
                                            setStartPoint(p);
                                            changePage(0);
                                        }}
                                        cbPage={3}
                                    />
                                    <PointsSelector
                                        cb={(p: Point) => {
                                            setEndPoint(p);
                                            changePage(0);
                                        }}
                                        cbPage={4}
                                    />
                                    <>
                                        <FormPoint
                                            onSubmit={e => {
                                                onMainPointsAdd(e);
                                                changePage(1);
                                            }}
                                        />
                                        <Button onClick={() => changePage(1)}>
                                            Anuluj
                                        </Button>
                                    </>
                                    <>
                                        <FormPoint
                                            onSubmit={e => {
                                                onMainPointsAdd(e);
                                                changePage(2);
                                            }}
                                        />
                                        <Button onClick={() => changePage(2)}>
                                            Anuluj
                                        </Button>
                                    </>
                                </Carousel>
                            </Box>
                        </>
                    )}
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
                        {editingMap || (
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setEditingMap(true);
                                    }}
                                >
                                    Dodaj węzły lub odcinki płatne
                                </Button>
                            </div>
                        )}
                        <div>
                            <Button
                                variant="contained"
                                onClick={() => onSave()}
                            >
                                Zapisz
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginLeft: 5 }}
                                onClick={() => onCancel()}
                            >
                                Anuluj
                            </Button>
                        </div>
                    </div>
                </Box>
            </Paper>
        </div>
    );
};
