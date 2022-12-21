import useAlert from '@context/useAlert';
import { useRole } from '@context/useRole';
import { Box, Button, Paper, TextField } from '@mui/material';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { json } from 'stream/consumers';
import { getAuctionById } from './Logic/AuctionsLogic';
import { Auction } from './Logic/interface';
import { Dayjs } from 'dayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReturnButton } from 'shared/ReturnButton';

export const AuctionDetailWindow = () => {
    const { id } = useParams();
    const { role } = useRole();
    const navigate = useNavigate();
    const [infoText, setInfoText] = useState('Ładowanie danych...');

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<Auction>();

    const updateData = async () => {
        setLoading(true);
        if (!id) {
            setInfoText('Błąd id przetargu');
            return;
        }
        const r = await getAuctionById(id);
        if (r) {
            setData(r);
            setLoading(false);
        } else {
            setInfoText(`Błąd pobierania danych o przetargu ${id}`);
        }
    };

    useEffect(() => {
        updateData();
    }, [id]);

    const isAdmin = role === 'admin';

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
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                    elevation={6}
                >
                    <TextField
                        id="outlined-basic"
                        label="Numer Przetargu"
                        variant="outlined"
                        autoComplete="off"
                        value={data?.id}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Nazwa"
                        variant="outlined"
                        autoComplete="off"
                        value={data?.name}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Lokalizacja"
                        variant="outlined"
                        autoComplete="off"
                        value={data?.location}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Opis infrastruktury"
                        variant="outlined"
                        autoComplete="off"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        value={data?.description}
                        sx={{ width: '50%' }}
                    />
                    <DesktopDatePicker
                        label="Data zakończenia przetargu"
                        inputFormat="MM/DD/YYYY"
                        value={data?.endDate}
                        readOnly={true}
                        renderInput={params => <TextField {...params} />}
                        onChange={function (
                            value: Dayjs | null | undefined,
                            keyboardInputValue?: string | undefined,
                        ): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Cena wywoławcza"
                        variant="outlined"
                        autoComplete="off"
                        type="number"
                        value={data?.maxPrice}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '50%' }}
                    />
                    <Box sx={{ display: 'flex', gap: '30px' }}>
                        <ReturnButton />
                        {isAdmin && (
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => navigate('./edit')}
                            >
                                Edycja
                            </Button>
                        )}
                    </Box>
                </Paper>
            </LocalizationProvider>
        </Box>
    );
};
