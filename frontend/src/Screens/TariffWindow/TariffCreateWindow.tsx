import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { VehicleType, VehicleTypeTranslate } from './Logic/interfaces';
import { getTerifficator } from './Logic/tariffsLogic';
import useAlert from '@context/useAlert';

const TariffCreateWindow = (): JSX.Element => {
    const { tariffId } = useParams();
    const { setAlert } = useAlert();
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const [tariffs, setTariffs] = useState<{
        [key: string]: number;
    }>();

    const initializeData = async (): Promise<void> => {
        if (tariffId) {
            const t = await getTerifficator(tariffId);
            if (t) {
                setId(t.id);
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

    const handleSubmit = () => {
        setAlert('Submit handling need to be implemented');
    };

    const onReturn = () => {
        setAlert('On return need to be implemented');
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
                                value={v}
                                onChange={e => {
                                    const newT = { ...tariffs };
                                    newT[k] = Number(e.target.value);
                                    setTariffs(newT);
                                }}
                            />
                        </>
                    ))}
                {/* not added ceny */}
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
