import useAlert from '@context/useAlert';
import { useRole } from '@context/useRole';
import { Box, Button, Paper } from '@mui/material';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { json } from 'stream/consumers';

export const AuctionDetailWindow = () => {
    const { id } = useParams();
    const { role } = useRole();

    useEffect(() => {}, []);

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
            <Paper sx={{ width: '700px', padding: '25px' }} elevation={6}>
                detale przetargu {id}
            </Paper>
        </Box>
    );
};
