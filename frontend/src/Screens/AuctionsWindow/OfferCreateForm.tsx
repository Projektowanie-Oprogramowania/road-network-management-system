import useAlert from '@context/useAlert';
import { useRole } from '@context/useRole';
import { Box, Button, Paper, TextField } from '@mui/material';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CancelButton, ReturnButton } from 'shared/ReturnButton';
import { json } from 'stream/consumers';
import { Currencies, addOffer } from './Logic/OfferLogic';

export const OfferCreateForm = () => {
    const { id } = useParams();
    const { role, userId } = useRole();
    const { setAlert } = useAlert();
    const navigate = useNavigate();
    const [infoText, setInfoText] = useState('Ładowanie danych...');

    const [loading, setLoading] = useState(false);

    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState('PLN');

    useEffect(() => {}, []);

    const handleSubmit = async () => {
        if (!id) {
            setAlert('Błąd aukcji!');
            return;
        }
        if (!userId) {
            setAlert('Brak nazwy użytkownika!');
            return;
        }
        if (!price || price < 0) {
            setAlert('Błędna cena!');
            return;
        }
        if (!Currencies.includes(currency)) {
            setAlert(
                `Błędna waluta!\n Obsługiwane waluty: \n ${Currencies.join(
                    ', ',
                )}`,
            );
            return;
        }
        const response = await addOffer({
            auctionID: id,
            currency: currency,
            price: price,
            userName: userId,
        });
        if (!response) {
            setAlert('Błąd zapisu oferty!');
            return;
        }
        setAlert('Złożono ofertę :)');
        navigate(-1);
        return;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                margin: '20px',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                sx={{ width: '700px', padding: '25px', gap: '10px' }}
                elevation={6}
            >
                <Box>Formularz tworzenia zgłoszenia do przetargu</Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '20px',
                        gap: '10px',
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label={`Cena`}
                        variant="outlined"
                        type="number"
                        autoComplete="off"
                        value={price}
                        onChange={e => {
                            setPrice(Number(e.target.value));
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label={`Waluta`}
                        variant="outlined"
                        type="text"
                        autoComplete="off"
                        value={currency}
                        onChange={e => {
                            setCurrency(e.target.value);
                        }}
                    />
                    <Button onClick={handleSubmit} variant="contained">
                        Zatwierdź ofertę
                    </Button>
                    <CancelButton />
                </Box>
            </Paper>
        </Box>
    );
};
