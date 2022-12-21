import useAlert from '@context/useAlert';
import { useRole } from '@context/useRole';
import { Box, Button, Checkbox, FormControlLabel, Paper } from '@mui/material';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { json } from 'stream/consumers';
import { useNavigate } from 'react-router-dom';
import { Auction } from './Logic/interface';

export const AuctionsWindow = () => {
    const { id } = useParams();
    const { role } = useRole();
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState<Auction[]>([]);

    const isAdmin = role === 'admin';

    useEffect(() => {}, []);

    const renderList = (): JSX.Element => {
        return (
            <>
                {data.map(v => (
                    <Box>AHA</Box>
                ))}
            </>
        );
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
                Lista Przetargów
                {renderList()}
            </Paper>
            {isAdmin && (
                <Paper
                    sx={{
                        padding: '10px',
                        width: '180px',
                        paddingRight: 0,
                        position: 'fixed',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: '10px',
                        top: '100px',
                    }}
                    elevation={6}
                >
                    <FormControlLabel
                        control={
                            <Checkbox onChange={v => setEditMode(!editMode)} />
                        }
                        label={'Edycja'}
                    />
                    {editMode && (
                        <Button
                            variant="contained"
                            onClick={() => navigate(`./new`)}
                        >
                            Dodaj przetarg
                        </Button>
                    )}
                </Paper>
            )}
        </Box>
    );
};
