import React, { useState } from 'react';

import { FormComponent } from '../../components/form/Form';
import { FormPoint } from './Forms/FormPoint';
import { FormRoad, FormRoadSelect } from './Forms/FormRoad';
import { FormNewNetwork } from './Forms/FormNewNetwork';
import { Graph, mapConfig } from './Map';

import {
    getInfrastructure,
    addRoad,
    addPoint,
    editPoint,
    removePoint,
    editRoad,
    removeRoad,
    getNetworks,
} from './Logic/InfrastructureLogic';
import { Point, Road, IRoadNetwork } from './Logic/Interfaces';

import { Button, Box, Paper, TextField } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import './InfrastructureStyles.css';

import { SimpleComponent } from '@components/lists/simpleComponent';
import { margin } from '@mui/system';

export const InfrastructureWindow = () => {
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

    const mapData = getInfrastructure();
    const { data } = React.useMemo(
        () => ({
            data: {
                nodes: mapData.points.map(v => ({
                    index: v.index,
                    id: v.id,
                    x: v.x,
                    y: v.y,
                })),
                links: mapData.roads
                    .filter(
                        v =>
                            mapData.points.findIndex(
                                p => p.id === v.startingPointId,
                            ) != -1 &&
                            mapData.points.findIndex(
                                p => p.id === v.endingPointId,
                            ) != -1,
                    )
                    .map(v => ({
                        id: v.id,
                        source: v.startingPointId,
                        target: v.endingPointId,
                        length: v.length,
                        region: v.region,
                    })),
            },
        }),
        [mapData],
    );

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

    const onDeletePointClick = function (currentPoint: string) {
        removePoint(currentPoint);
        setFormIsActive(false);
    };

    const onEditPointClick = function (
        currentPoint: React.FormEvent<HTMLFormElement>,
    ) {
        editPoint(currentPoint);
        setFormIsActive(false);
    };

    const onDeleteRoadClick = function (currentRoad: number) {
        removeRoad(currentRoad);
        setFormIsActive(false);
    };

    const onEditRoadClick = function (
        currentRoad: React.FormEvent<HTMLFormElement>,
    ) {
        editRoad(currentRoad);
        setFormIsActive(false);
    };

    const onAddPointClick = function (
        currentRoad: React.FormEvent<HTMLFormElement>,
    ) {
        addPoint(currentRoad);
        setFormIsActive(false);
    };

    const OnAddRoadClick = function (
        currentRoad: React.FormEvent<HTMLFormElement>,
    ) {
        addRoad(currentRoad);
        setFormIsActive(false);
    };

    const ControlListPanel = () => {
        if (adding) {
            return (
                <>
                    <FormNewNetwork
                        points={mapData.points}
                        roads={mapData.roads}
                        setAdding={setAdding}
                        mapEdit={(n: number) => {
                            setCurrentNetwork({
                                name: 'nazwa',
                                startingNode: 'start',
                                endingNode: 'koniec',
                            });
                            setCurrentPage(n);
                        }}
                        addPoint={() => {
                            setFormIsActive(true);
                            setFormId(0);
                        }}
                        addRoad={() => {
                            setFormIsActive(true);
                            setFormId(1);
                        }}
                        pageNumber={currentPage}
                    />
                </>
            );
        } else {
            return (
                <>
                    <Box sx={{ height: '95%' }}>
                        {(roadNetworks.length > 0 &&
                            roadNetworks.map((v, i) => (
                                <SimpleComponent
                                    id={i}
                                    label={`${v.name}(${v.startingNode}-${v.endingNode})`}
                                    choosen={currentNetwork == v}
                                    onChoose={() => {
                                        console.log(`wybrano wezel ${v}`);
                                        setCurrentNetwork(v);
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
                </>
            );
        }
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
                {/* W tym elemencie będą wyświetlane formularze*/}
                {formIsActive && (
                    <div className="fill-window">
                        <div className="form-overlay" />
                        <div className="form-container">
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
                                        onSubmit={editRoad}
                                        onDelete={onDeleteRoadClick}
                                        data={currentRoad}
                                    />
                                )}
                            </Box>
                        </div>
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
                    <ControlListPanel />
                </Paper>
            </div>
        </div>
    );
};
