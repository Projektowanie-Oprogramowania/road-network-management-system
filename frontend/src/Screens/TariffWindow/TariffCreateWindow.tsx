import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { VehicleType, VehicleTypeTranslate } from './Logic/interfaces';
import {
    addTerifficator,
    editTerifficator,
    getTerifficator,
} from './Logic/tariffsLogic';
import useAlert from '@context/useAlert';

const TariffCreateWindow = (): JSX.Element => {
    const { tariffId } = useParams();
    const { setAlert } = useAlert();
    const [name, setName] = useState('');

    const [tariffs, setTariffs] = useState<{
        [key: string]: number;
    }>();

    const initializeData = async (): Promise<void> => {
        if (tariffId) {
            const t = await getTerifficator(tariffId);
            if (t) {
                setName(t.name);
                setTariffs(t.pricesPerKilometer);
                Object.entries(t.pricesPerKilometer).forEach(
                    ([key, value], index) => {
                        // 👇️ name Tom 0, country Chile 1
                        console.log(key, value, index);
                    },
                );
            } else {
                setAlert('Wystąpił błąd pobierania taryfikatora!');
            }
        }
    };

    useEffect(() => {
        initializeData();
    }, [tariffId]);

    const handleSubmit = async () => {
        if (!name) {
            setAlert('Blad nie wprowadzono nazwy taryfikatora');
            return;
        }
        if (!tariffs) {
            setAlert('Blad nie wprowadzono cen taryfikatora');
            return;
        }
        if (tariffId) {
            const res = await editTerifficator({
                id: tariffId,
                name: name,
                pricesPerKilometer: tariffs,
            });
            if (res) {
                setAlert(`Edytowano tarryfikator o id ${res.id}`);
                return;
            }
            setAlert('Blad podczas edycji taryfikatora');
        }
        const res = await addTerifficator({
            name: name,
            pricesPerKilometer: tariffs,
        });
        if (res) {
            setAlert(`Dodano tarryfikator o id ${res.id}`);
            return;
        }
        setAlert('Blad podczas dodawania taryfikatora');
    };

    const onReturn = () => {
        setAlert('On return need to be implemented');
    };

    const [vehiclesToAdd] = React.useMemo(() => {
        const vehiclesToAdd = VehicleType.filter(
            v => !tariffs || (tariffs && !Object.keys(tariffs).includes(v)),
        );
        return [vehiclesToAdd];
    }, [tariffs]);

    const addNewVehicleToTarrif = (e: SelectChangeEvent<string>) => {
        const newT = { ...tariffs };
        newT[e.target.value] = 0;
        setTariffs(newT);
    };

    return (
        <Box
            sx={{
                width: '96%',
                margin: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '300px',
                    padding: '30px',
                }}
                elevation={10}
            >
                <Box>
                    {tariffId
                        ? `Edycja teryfikatora id: ${tariffId}`
                        : 'Formularz nowego Taryfikatora'}
                </Box>
                <TextField
                    id="outlined-basic"
                    label={`Nazwa taryfikatora`}
                    variant="outlined"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                {tariffs &&
                    Object.entries(tariffs).map(([k, v], index) => (
                        <>
                            <TextField
                                id="outlined-basic"
                                label={`Opłata za ${VehicleTypeTranslate[k]}`}
                                variant="outlined"
                                type="number"
                                autoComplete="off"
                                value={v.toString()}
                                onChange={e => {
                                    const newT = { ...tariffs };
                                    newT[k] = Number(e.target.value);
                                    setTariffs(newT);
                                }}
                            />
                        </>
                    ))}
                {
                    vehiclesToAdd.length > 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '20px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Box>Dodaj nowa oplate</Box>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value=""
                                onChange={addNewVehicleToTarrif}
                            >
                                {vehiclesToAdd.map(v => (
                                    <MenuItem value={v}>
                                        {VehicleTypeTranslate[v]} +
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    )
                    /* not added ceny */
                }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Zapisz
                </Button>
                <Button variant="contained" color="error" onClick={onReturn}>
                    Anuluj
                </Button>
            </Paper>
        </Box>
    );
};

export default TariffCreateWindow;
