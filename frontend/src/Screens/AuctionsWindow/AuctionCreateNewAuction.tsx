import useAlert from '@context/useAlert';
import { useRole } from '@context/useRole';
import { Box, Button, Paper, TextField } from '@mui/material';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { json } from 'stream/consumers';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CancelButton } from 'shared/ReturnButton';
import {
    addAuction,
    getAuctionById,
    updateAuction,
} from './Logic/AuctionsLogic';
import { Auction } from './Logic/interface';

export const AuctionCreateNewForm = () => {
    const { id } = useParams();
    const { role } = useRole();
    const { setAlert } = useAlert();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [data, setData] = useState<Auction>();

    const [isEditing, setIsEditing] = useState(id !== undefined);

    const [loading, setLoading] = useState(isEditing);

    const checkFormData = (): boolean => {
        let error = '';
        if (name === '') error += 'Nie podano nazwy.\n';
        if (location === '') error += 'Nie podano lokalizacji.\n';
        if (description === '') error += 'Nie podano opisu.\n';
        if (price <= 0) error += 'Cena musi być większa od zera.\n';
        if (error !== '') {
            setAlert(error);
            return false;
        }
        return true;
    };
    const handleSave = async () => {
        if (checkFormData() && date) {
            const r = await addAuction({
                description: description,
                endDate: date,
                location: location,
                maxPrice: price,
                name: name,
            });
            if (r) {
                setAlert('Utworzono nowy przetarg');
                navigate('/auctions');
            } else {
                setAlert('Wystąpił błąd. Spróbuj ponownie.');
            }
        }
    };
    const handleEditSave = async () => {
        if (checkFormData() && id !== undefined && data !== undefined && date) {
            const r = await updateAuction({
                ...data,
                id: id,
                name: name,
                location: location,
                description: description,
                maxPrice: price,
                endDate: date,
            });
            if (r) {
                setAlert(`Edytowano przetarg ${id}`);
                navigate('/auctions');
            } else {
                setAlert('Wystąpił błąd. Spróbuj ponownie.');
            }
        }
    };

    //Wczytywanie danych jeśli jest id
    const loadData = async () => {
        setLoading(true);
        if (id) {
            const r = await getAuctionById(id);
            if (r) {
                setName(r.name);
                setLocation(r.name);
                setDate(r.endDate);
                setDescription(r.description);
                setPrice(r.maxPrice);
                setData(r);
            } else {
                setIsEditing(false);
                setAlert('Błąd wczytywania danych do edycji');
            }
        } else {
            setIsEditing(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isEditing) loadData();
    }, [id]);

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
                                label="Lokalizacja"
                                variant="outlined"
                                autoComplete="off"
                                value={location}
                                onChange={v => setLocation(v.target.value)}
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '30px',
                                    justifyContent: 'center',
                                }}
                            >
                                <CancelButton />
                                <Button
                                    variant="contained"
                                    onClick={
                                        isEditing ? handleEditSave : handleSave
                                    }
                                >
                                    {isEditing ? 'Zapisz' : 'Dodaj'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </LocalizationProvider>
        </Box>
    );
};
