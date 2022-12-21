import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ReturnButton = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Button variant="contained" onClick={() => navigate(-1)}>
            Powrót
        </Button>
    );
};

export const CancelButton = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Button variant="contained" color="error" onClick={() => navigate(-1)}>
            Anuluj
        </Button>
    );
};
