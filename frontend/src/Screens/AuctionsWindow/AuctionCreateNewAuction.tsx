import useAlert from '@context/useAlert';
import { useRole } from '@context/useRole';
import { Box, Button, Paper, TextField } from '@mui/material';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { json } from 'stream/consumers';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const AuctionCreateNewForm = () => {
    const { id } = useParams();
    const { role } = useRole();

    const [name, setName] = useState('');
    const [date, setDate] = useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const isEditing = id !== undefined;

    const [loading, setLoading] = useState(isEditing);

    const handleSave = () => {};
    const handleEditSave = () => {};

    //Wczytywanie danych jeśli jest id
    const loadData = async () => {
        setLoading(false);
    };

    useEffect(() => {
        if (isEditing) loadData();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                margin: '20px',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Paper
                    sx={{
                        width: '700px',
                        padding: '25px',
                        gap: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    elevation={6}
                >
                    <Box>
                        {isEditing
                            ? 'Edycja przetargu'
                            : 'Tworzenie nowego przetargu'}
                    </Box>
                    {loading ? (
                        <Box>Ładowanie Danych...</Box>
                    ) : (
                        <>
                            <TextField
                                id="outlined-basic"
                                label="Nazwa"
                                variant="outlined"
                                autoComplete="off"
                                value={name}
                                onChange={v => setName(v.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Opis infrastruktury"
                                variant="outlined"
                                autoComplete="off"
                                value={description}
                                onChange={v => setDescription(v.target.value)}
                            />
                            <DesktopDatePicker
                                label="Data zakończenia przetargu"
                                inputFormat="MM/DD/YYYY"
                                value={date}
                                onChange={setDate}
                                renderInput={params => (
                                    <TextField {...params} />
                                )}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Cena wywoławcza"
                                variant="outlined"
                                autoComplete="off"
                                type="number"
                                value={price.toString()}
                                onChange={v => setPrice(Number(v.target.value))}
                            />
                            <Button
                                variant="contained"
                                onClick={
                                    isEditing ? handleEditSave : handleSave
                                }
                            >
                                Zapisz
                            </Button>
                        </>
                    )}
                </Paper>
            </LocalizationProvider>
        </Box>
    );
};
