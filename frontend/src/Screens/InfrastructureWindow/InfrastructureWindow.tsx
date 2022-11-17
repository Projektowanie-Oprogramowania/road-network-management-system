import React, { useState } from 'react';

import { FormComponent } from '../../components/form/Form';
import { FormPoint } from './Forms/FormPoint';
import { FormRoad, FormRoadSelect } from './Forms/FormRoad';
import { FormNewNetwork } from './Forms/FormNewNetwork';
import { Graph, mapConfig, mapPointsAndRoads } from './Map';

import {
    getInfrastructure,
    addRoad,
    addPoint,
    editPoint,
    removePoint,
    editRoad,
    removeRoad,
    getNetworks,
    getPoints,
    getRoads,
} from './Logic/InfrastructureLogic';
import { Point, Road, IRoadNetwork } from './Logic/Interfaces';

import { Button, Box, Paper, TextField } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import './InfrastructureStyles.css';

import { SimpleComponent } from '@components/lists/simpleComponent';
import { margin } from '@mui/system';

import { FormNetwork } from './Forms/FormNetwork';

export const InfrastructureWindow = () => {
    const [data, setData] = React.useState<any>(undefined);
    const [points, setPoints] = React.useState<Point[]>([]);
    const [roads, setRoads] = React.useState<Road[]>([]);
    const [formIsActive, setFormIsActive] = React.useState(false);
    const [formId, setFormId] = React.useState(0);
    const [currentPage, setCurrentPage] = useState(0);

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

    //dodawanie nowej sieci drogowej
    const [adding, setAdding] = useState(false);
    const [editingMap, setEditingMap] = useState(false);

    const mapData = getInfrastructure();

    const updateMapData = async () => {
        //TODO dodać po id pobieranie informacji
        //currentNetwork?.name
        const points = (await getPoints()).value;
        const roads = (await getRoads()).value;
        setPoints(points);
        setRoads(roads);
        setData(mapPointsAndRoads(points, roads));
    };

    React.useMemo(() => {
        updateMapData().then(() => {
            //Loading false
        });
    }, []);

    const onClickNode = function (nodeId: any) {
        console.log(`Wybrano punkt ${nodeId}`);

        setFormIsActive(true);
        setFormId(4);
        if (data)
            setCurrentPoint(
                data.data.nodes.filter((v: { id: any }) => v.id === nodeId)[0],
            );
    };

    const onClickLink = function (source: any, target: any) {
        console.log(`Wybrano droge ${source} - ${target}`);

        setFormIsActive(true);
        setFormId(5);
        if (data) {
            const link = data.data.links.filter(
                (v: { source: any; target: any }) =>
                    v.source === source && v.target === target,
            )[0];
            setCurrentRoad({
                id: link.id,
                startingPointId: link.source,
                endingPointId: link.target,
                length: link.length,
                region: link.region,
            });
        }
    };

    const handleEdit = (v: IRoadNetwork) => {
        setCurrentNetwork(v);
        setEditingMap(true);
        setAdding(true);
    };

    const handleDelete = (v: IRoadNetwork) => {
        //DELETE
        const index = roadNetworks.findIndex(_v => _v.name == v.name);
        const tmp = [...roadNetworks];
        tmp.splice(index, 1);
        setRoadNetworks(tmp);
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '960px',
                }}
            >
                {adding ? (
                    editingMap ? (
                        <FormNetwork
                            name={'test'}
                            length={15}
                            startPoint={points.find(
                                v => v.id == currentNetwork?.startingNode,
                            )}
                            endPoint={points.find(
                                v => v.id == currentNetwork?.endingNode,
                            )}
                            points={points}
                            roads={roads}
                            onClose={() => setAdding(false)}
                        />
                    ) : (
                        <FormNetwork onClose={() => setAdding(false)} />
                    )
                ) : (
                    <>
                        <Paper
                            style={{
                                padding: 30,
                                margin: 20,
                                width: '80%',
                                height: '90%',
                            }}
                        >
                            {(currentNetwork && (
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
                                    Wybierz sieć drogową z listy obok aby ją
                                    edytować
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
                            <Box sx={{ height: '95%' }}>
                                {(roadNetworks.length > 0 &&
                                    roadNetworks.map((v, i) => (
                                        <SimpleComponent
                                            id={i}
                                            label={`${v.name}(${v.startingNode}-${v.endingNode})`}
                                            choosen={currentNetwork == v}
                                            onChoose={() => {
                                                console.log(
                                                    `wybrano siec ${v}`,
                                                );
                                                setCurrentNetwork(v);
                                            }}
                                            onEdit={() => {
                                                console.log(
                                                    `wybrano siec do edycji ${v}`,
                                                );
                                                handleEdit(v);
                                            }}
                                            onDelete={() => {
                                                console.log(
                                                    `wybrano siec do usuniecia ${v}`,
                                                );
                                                handleDelete(v);
                                            }}
                                        />
                                    ))) || <div>Brak sieci drogowych</div>}
                            </Box>
                            <Box
                                sx={{
                                    height: '5%',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    width: '100%',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setCurrentNetwork(undefined);
                                        setAdding(true);
                                    }}
                                >
                                    Dodaj sieć drogowa
                                </Button>
                            </Box>
                        </Paper>
                    </>
                )}
            </div>
        </div>
    );
};
