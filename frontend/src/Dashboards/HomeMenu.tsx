import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import { navList } from './navList';

export const HomeMenu = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '80%',
                flexWrap: 'wrap',
                gap: '40px',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '40px',
            }}
        >
            {navList.slice(1).map(v => (
                <Link
                    style={{
                        width: '48%',
                        justifyContent: 'center',
                    }}
                    to={v.path}
                >
                    <Paper
                        sx={{
                            width: '100%',
                            justifyContent: 'center',
                            padding: '30px',
                            ':hover': {
                                boxShadow: 18,
                            },
                        }}
                        elevation={10}
                    >
                        <Box>Image Placeholder {v.image}</Box>
                        <Box>{v.label}</Box>
                    </Paper>
                </Link>
            ))}
        </Box>
    </Box>
);

export default HomeMenu;
