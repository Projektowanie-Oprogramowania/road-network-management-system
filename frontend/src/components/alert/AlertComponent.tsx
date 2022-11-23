import React from 'react';
import { Alert, Box, Button, Paper } from '@mui/material';
import useAlert from '@context/useAlert';

const FullScreenAlert = () => {
    const { message, visible, closeAlert } = useAlert();

    if (message && visible) {
        console.log('trying');
        return (
            <>
                <Box
                    sx={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        bgcolor: 'black',
                        opacity: '50%',
                        zIndex: 10,
                    }}
                ></Box>
                <Paper
                    elevation={12}
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        borderColor: 'primary.main',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 5,
                        padding: 5,
                    }}
                >
                    {message}
                    <Button onClick={closeAlert}>OK</Button>
                </Paper>
            </>
        );
    } else {
        console.log('trying empty XD');
        return <></>;
    }
};

export default FullScreenAlert;
