import React, { useEffect, useState } from 'react';
import useFetch from 'use-fetch';
import { FormComponent } from '../../components/form/Form';
import { Point, Road } from '../InfrastructureWindow/Logic/Interfaces';
import { Box, Button, Paper } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { getCities } from 'Screens/InfrastructureWindow/Logic/PointLogic';
import {
    getSegments,
    Segment,
} from 'Screens/InfrastructureWindow/Logic/SegmentLogic';
import { getRoads } from 'Screens/InfrastructureWindow/Logic';
import { fetchFullMapData, getSegmentFromLink } from 'shared/mapLogic';
import {
    appendSegments,
    colorSegments,
    Graph,
    IMapData,
    mapConfigSmall,
} from 'Screens/InfrastructureWindow/Map';
import useAlert from '@context/useAlert';
import { gemerateCharge } from 'Screens/FeesWindow/Logic/FeesLogic';
import { useNavigate } from 'react-router-dom';
import { addRide } from './Logic/RideLogic';

const onSubmitDirection: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const point_1 = (event.currentTarget[0] as HTMLInputElement).value;
    const point_2 = (event.currentTarget[1] as HTMLInputElement).value;
    //const p = points.find(x => x.id === id);
    if (point_1 != null && point_2 != null) {
        window.open(
            'https://maps.google.com/maps/dir/' + point_1 + '/' + point_2,
        );
    } else {
        window.alert('Nie znaleziono Id!');
    }
};

const IdForm = [
    {
        name: 'navigate from',
        type: 'text',
    },
    {
        name: 'navigate to',
        type: 'text',
    },
];

let sendRequest = false;

export const NavigateWindow = () => {
    const [startTime, setStartTime] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );
    const [endTime, setEndTime] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );
    const [registrationNumber, setRegistrationNumber] = useState<string>();
    // REQUEST EXAMPLE
    const { sendRequest: fetchInfrastructure } = useFetch();
    const [cities, setCities] = useState<Point[]>([]);
    const [roads, setRoads] = useState<Road[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [selectedSegments, setSelectedSegments] = useState<Segment[]>([]);
    const [map, setMap] = useState<IMapData>();
    const { setAlert } = useAlert();
    const navigate = useNavigate();

    const updateMap = async () => {
        const { cities, roads, mapData, segments } = await fetchFullMapData();
        setCities(cities);
        setRoads(roads);
        setMap(mapData);
        setSegments(segments);
    };

    useEffect(() => {
        const handleRespnse = (response: any) => {
            console.log(response);
        };

        const fetchInfrastructureRequest = {
            url: `infrastructure`,
        };

        updateMap();
        fetchInfrastructure(fetchInfrastructureRequest, handleRespnse);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initMap = async () => {};

    const updateMapV = () => {
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
        updateMapV();
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

    const createRide = async () => {
        if (
            registrationNumber &&
            endTime &&
            startTime &&
            selectedSegments.length > 0
        ) {
            setAlert('Zapisywanie przejazdu...');
            const c = await gemerateCharge(
                'przejazd',
                `opłata naliczona za przejazd pojazdu ${registrationNumber}`,
            );
            if (c) {
                await addRide({
                    carRegistrationNumber: registrationNumber,
                    chargeID: String(c.id),
                    endDate: endTime.toDate(),
                    segments: selectedSegments.map(s => s.id),
                    startDate: startTime.toDate(),
                });
                setAlert('Zapisano przejazd przejdź do opłat, aby opłacić');
                navigate('/');
            } else {
                setAlert('Wystąpił błąd.');
            }
        } else {
            setAlert('Wystąpił błąd.');
        }
    };

    return (
        <div>
            <div style={{ height: 40 }} />
            <FormComponent onSubmit={onSubmitDirection} fields={IdForm} />
            <div style={{ height: 40 }} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
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
                <Paper sx={{ width: '500px', padding: '20px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                            <TextField
                                id="outlined-basic"
                                sx={{
                                    label: { color: 'white' },
                                    input: { color: 'white' },
                                }}
                                label="Numer rejestracyjny"
                                variant="outlined"
                                type="text"
                                autoComplete="off"
                                defaultValue={registrationNumber}
                                onChange={e => {
                                    e.preventDefault();
                                    setRegistrationNumber(e.target.value);
                                }}
                            />
                            <Box>Data początku przejazdu</Box>
                            <DateTimePicker
                                label="Date&Time picker"
                                value={startTime}
                                onChange={setStartTime}
                                renderInput={params => (
                                    <TextField {...params} />
                                )}
                            />
                            <Box>Data zakończenia przejazdu</Box>
                            <DateTimePicker
                                label="Date&Time picker"
                                value={endTime}
                                onChange={setEndTime}
                                renderInput={params => (
                                    <TextField {...params} />
                                )}
                            />
                            <Box>
                                {selectedSegments && (
                                    <Box>{`Przejazd po odcinkach (id) [${selectedSegments
                                        .map(s => s.id)
                                        .join(', ')}]`}</Box>
                                )}
                            </Box>
                            <Button onClick={createRide}>
                                Zapisz przejazd
                            </Button>
                        </Stack>
                    </LocalizationProvider>
                </Paper>
            </Box>
        </div>
    );
};
