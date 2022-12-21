import { useRole } from '@context/useRole';
import { Box, Button, Checkbox, FormControlLabel, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Auction, AuctionStatesTłumacz } from './Logic/interface';
import { closeAuction, getAuctions } from './Logic/AuctionsLogic';
import dayjs from 'dayjs';

const headerStyle = {
    fontWeight: 'bold',
    backgroundColor: 'rgb(35, 35, 35)',
};

const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(43, 45, 50)',
};

const cellStyle = {
    display: 'flex',
    margin: '20px',
    width: '300px',
    alignItems: 'center',
    justifyContent: 'center',
};

const DeleteWindowRender = (
    id: string,
    onClose: (r: boolean) => void,
): JSX.Element => {
    const handleDelete = async () => {
        await closeAuction(id);
        onClose(true);
    };

    return (
        <Paper
            sx={{
                padding: '10px',
                width: '300px',
                paddingRight: 0,
                position: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                right: '50%',
                top: '40%',
                transform: 'translate(50%, 0)',
            }}
            elevation={6}
        >
            <Box>Czy chcesz zamknąć przetarg?</Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '50px',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={() => handleDelete()} variant="contained">
                    Tak
                </Button>
                <Button
                    onClick={() => onClose(false)}
                    variant="contained"
                    color="error"
                >
                    Nie
                </Button>
            </Box>
        </Paper>
    );
};

export const AuctionsWindow = () => {
    const { id } = useParams();
    const { role } = useRole();
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState<Auction[]>([]);
    const [loading, setLoading] = useState(false);

    const isAdmin = role === 'admin';

    const updateData = async () => {
        setLoading(true);
        const d = await getAuctions();
        setData(d);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        updateData();
    }, []);

    const [deleteOn, setDeleteOn] = useState(false);
    const [deleteID, setDeleteID] = useState('');
    const handleClose = (id: string) => {
        setDeleteID(id);
        setDeleteOn(true);
    };

    const renderList = (): JSX.Element => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ ...rowStyle, ...headerStyle }}>
                    <Box sx={cellStyle}>Przetarg</Box>
                    <Box sx={cellStyle}>Termin</Box>
                    <Box sx={cellStyle}>Lokalizacja</Box>
                    <Box sx={cellStyle}>Stan</Box>
                    <Box sx={cellStyle}></Box>
                </Box>
                {data.map(v => (
                    <Box sx={rowStyle}>
                        <Box sx={cellStyle}>{v.name}</Box>
                        <Box sx={cellStyle}>
                            {dayjs(v.endDate).format('DD/MM/YYYY')}
                        </Box>
                        <Box sx={cellStyle}>{v.location}</Box>
                        <Box sx={cellStyle}>
                            {AuctionStatesTłumacz[v.state]}
                        </Box>
                        <Box sx={{ ...cellStyle, ...{ gap: '5px' } }}>
                            <Button
                                variant="contained"
                                onClick={() => navigate(`./${v.id}`)}
                            >
                                Szczegóły
                            </Button>
                            {isAdmin && editMode && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() =>
                                            navigate(`./${v.id}/edit`)
                                        }
                                    >
                                        Edytuj
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleClose(v.id)}
                                    >
                                        Zamknij
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
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
            <Paper sx={{ padding: '25px' }} elevation={6}>
                <Box sx={{ margin: '10px', fontSize: '30px' }}>
                    Lista Przetargów
                </Box>
                <Box>{loading ? 'Ładowanie danych...' : renderList()}</Box>
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
            {deleteOn &&
                DeleteWindowRender(deleteID, (refresh: boolean) => {
                    setDeleteOn(false);
                    if (refresh) {
                        updateData();
                    }
                })}
        </Box>
    );
};
