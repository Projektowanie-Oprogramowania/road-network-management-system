import useAlert from '@context/useAlert';
import { useRole } from '@context/useRole';
import { Box, Button, Paper } from '@mui/material';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { json } from 'stream/consumers';

export const OfferCreateForm = () => {
    const { id } = useParams();
    const { role } = useRole();
    const navigate = useNavigate();
    const [infoText, setInfoText] = useState('Ładowanie danych...');

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {}, []);

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
                Formularz tworzenia zgłoszenia do przetargu
            </Paper>
        </Box>
    );
};
