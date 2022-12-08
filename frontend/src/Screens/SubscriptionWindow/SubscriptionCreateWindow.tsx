import useAlert from '@context/useAlert';
import { Box, Button, Paper, Stack, TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fee, gemerateCharge } from 'Screens/FeesWindow/Logic/FeesLogic';
import { Road, Segment } from 'Screens/InfrastructureWindow/Logic/Interfaces';
import { Point } from 'Screens/InfrastructureWindow/Logic/PointLogic';
import {
    appendSegments,
    colorSegments,
    Graph,
    IMapData,
    mapConfigSmall,
} from 'Screens/InfrastructureWindow/Map';
import { fetchFullMapData, getSegmentFromLink } from 'shared/mapLogic';

export const SubscriptionCreateWindow = () => {
    const [startTime, setStartTime] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );
    const [endTime, setEndTime] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );
    const [cities, setCities] = useState<Point[]>([]);
    const [roads, setRoads] = useState<Road[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [selectedSegments, setSelectedSegments] = useState<Segment[]>([]);
    const [map, setMap] = useState<IMapData>();
    const [charge, setCharge] = useState<Fee | undefined>();
    const { setAlert } = useAlert();
    const navigate = useNavigate();

    const initMap = async () => {
        const { cities, roads, mapData, segments } = await fetchFullMapData();
        setCities(cities);
        setRoads(roads);
        setMap(mapData);
        setSegments(segments);
    };

    const updateMap = () => {
        if (map) {
            let newMapData: IMapData = {
                nodes: map.nodes,
                links: [],
            };
            newMapData = appendSegments(
                newMapData,
                segments.filter(x => !selectedSegments.includes(x)),
            );
            newMapData = colorSegments(newMapData, selectedSegments);
            setMap(newMapData);
        }
    };

    useEffect(() => {
        initMap();
    }, []);

    useEffect(() => {
        updateMap();
    }, [selectedSegments]);

    const onClickNode = (nodeId: string) => {
        setAlert(`Punkt ${nodeId}`);
    };

    const onClickLink = (source: string, target: string) => {
        const id = getSegmentFromLink(target, source, segments);
        if (id != '-1') {
            const s: Segment = segments.filter(v => v.id == id)[0];
            if (selectedSegments.includes(s)) {
                let newSegments = [...selectedSegments];
                const index = newSegments.findIndex(v => v.id == s.id);
                newSegments.splice(index, 1);
                setSelectedSegments(newSegments);
            } else {
                setSelectedSegments([...selectedSegments, s]);
            }
        }
    };

    const createSubscription = async () => {
        setAlert('naliczanie kwoty...');

        const c = await gemerateCharge(
            'subskrypcja',
            'opłata naliczona za subskrypcje',
        );
        if (c) {
            setCharge(c);
        } else {
            setAlert('Wystąpił błąd.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                sx={{
                    width: '1200px',
                    padding: '20px',
                    margin: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                elevation={5}
            >
                {(map && (
                    <Graph
                        id="graph-id" // id is mandatory
                        data={map}
                        config={mapConfigSmall}
                        onClickNode={onClickNode}
                        onClickLink={onClickLink}
                    />
                )) || <Box>Wczytywanie mapy...</Box>}
                <Box>
                    {selectedSegments && (
                        <Box>{`Abonament na odcinki (id) [${selectedSegments
                            .map(s => s.id)
                            .join(', ')}]`}</Box>
                    )}
                </Box>
                <Box
                    sx={{
                        width: '500px',
                        padding: '20px',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                            }}
                        >
                            <Stack spacing={2}>
                                <Box>Data rozpoczęcia subskrypcji</Box>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    value={startTime}
                                    onChange={setStartTime}
                                    renderInput={params => (
                                        <TextField {...params} />
                                    )}
                                />
                            </Stack>
                            <Stack spacing={2}>
                                <Box>Data zakończenia subskrypcji</Box>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    value={endTime}
                                    onChange={setEndTime}
                                    renderInput={params => (
                                        <TextField {...params} />
                                    )}
                                />
                            </Stack>
                        </Box>
                    </LocalizationProvider>
                </Box>
                {(charge && (
                    <Box>
                        <Box>
                            Naliczona opłata: {charge.amount.toFixed(2)}zł
                        </Box>
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate(`/fees/${charge.id}`);
                            }}
                        >
                            Przejdź do zapłaty
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setCharge(undefined)}
                        >
                            Anuluj
                        </Button>
                    </Box>
                )) || (
                    <Button variant="contained" onClick={createSubscription}>
                        Zatwierdź abonament
                    </Button>
                )}
            </Paper>
        </Box>
    );
};
