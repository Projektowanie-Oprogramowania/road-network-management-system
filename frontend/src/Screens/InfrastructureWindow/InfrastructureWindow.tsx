import { useEffect, useState } from 'react';

import { Button, Box } from '@mui/material';
import './InfrastructureStyles.css';

import { deleteRoad, getRoads } from './Logic/RoadLogic';
import { Road } from './Logic/Interfaces';
import { Link, useNavigate } from 'react-router-dom';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import useFetch from 'use-fetch';
import useAlert from '@context/useAlert';

export const InfrastructureWindow = ({ isAdmin = false }) => {
    const [roads, setRoads] = useState<Road[]>([]);
    const navigate = useNavigate();
    const { setAlert } = useAlert();
    const { sendRequest: fetchInfrastructure } = useFetch();

    const updateData: () => Promise<void> = async () => {
        const handleRespnse = (response: any) => {
            console.log(response);
        };

        const fetchInfrastructureRequest = {
            url: `infrastructure`,
        };

        fetchInfrastructure(fetchInfrastructureRequest, handleRespnse);
        const r = await getRoads();
        setRoads(r);
    };

    const handleDelete = async (id: string) => {
        const res = await deleteRoad(id);
        if (res) {
            setAlert(`Usunięto drogę ${id}`);
        } else {
            setAlert('Błąd usuwania');
        }
        updateData();
    };

    useEffect(() => {
        updateData();
    }, []);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    position: 'relative',
                    margin: '10px',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    {roads.map(v => (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Button
                                sx={{ width: '360px' }}
                                variant="contained"
                                onClick={() => navigate(`${v.id}`)}
                            >{`${v.name}`}</Button>
                            {isAdmin || (
                                <>
                                    <Button
                                        sx={{ width: '20px' }}
                                        variant="contained"
                                        color="info"
                                        onClick={() => navigate(`${v.id}/edit`)}
                                    >
                                        <ModeEditOutlineOutlinedIcon />
                                    </Button>
                                    <Button
                                        sx={{ width: '20px' }}
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(v.id)}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </Button>
                                </>
                            )}
                        </Box>
                    ))}
                    <Link to={`new`} style={{ textDecoration: 'none' }}>
                        <Button
                            sx={{ width: '100%' }}
                            variant="outlined"
                        >{`Dodaj siec drogowa`}</Button>
                    </Link>
                </Box>
            </div>
        </div>
    );
};
