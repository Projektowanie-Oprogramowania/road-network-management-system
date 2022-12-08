import useAlert from '@context/useAlert';
import { Box, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editCharge, Fee, getChargeByID } from './Logic/FeesLogic';

export const FeesWindowItem = () => {
    const { id } = useParams();

    const [charge, setCharge] = useState<Fee>();
    const { setAlert } = useAlert();

    const updateData = async () => {
        if (id) {
            const c = await getChargeByID(id);
            if (c) {
                setCharge(c);
            } else {
                setAlert('Wystąpił błąd');
            }
        }
    };

    useEffect(() => {
        updateData();
    });

    const onStartPayment = async () => {
        setAlert('Płatność w toku...');
        await new Promise(r => setTimeout(r, 2000));
        if (Math.random() > 0.5 && charge) {
            await editCharge({
                id: charge.id,
                amount: charge.amount,
                chargeType: charge.chargeType,
                date: charge.date,
                description: charge.description,
                paid: true,
                userID: charge.userID,
            });
            setAlert('Opłacono :)');
        } else {
            setAlert('Błąd płatności :(');
        }
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
            <Paper sx={{ width: '700px', padding: '25px' }} elevation={6}>
                {(charge && (
                    <Box>
                        <Box>Rodzaj opłaty: {charge?.chargeType}</Box>
                        <Box>
                            Data:{' '}
                            {charge?.date
                                ? new Date(charge?.date).toISOString()
                                : 'brak'}
                        </Box>
                        <Box>Opis: {charge?.description}</Box>
                        <Box>User: {charge?.userID}</Box>
                    </Box>
                )) || <Box>Ładowanie danych...</Box>}
                <Box sx={{ marginTop: '30px' }}>
                    <Box>Kwota do zapłaty: {charge?.amount.toFixed(2)} zł</Box>
                    <Box>
                        {charge?.paid ? (
                            'Opłacono'
                        ) : (
                            <Button
                                variant="contained"
                                onClick={onStartPayment}
                            >
                                Opłać
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
