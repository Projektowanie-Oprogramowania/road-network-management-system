import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { Navbar } from '../../components/navbar/Navbar';
import { InfrastructureWindow } from '../../Screens/InfrastructureWindow/InfrastructureWindow';
import { InfrastructureWindowMap } from 'Screens/InfrastructureWindow/InfrastructureWindowMap';
import { RoadcreateWindow } from 'Screens/InfrastructureWindow/RoadcreateWindow';
import { InfrastructureWindowMapEdit } from 'Screens/InfrastructureWindow/InfrastructureWindowMapEdit';

const navList = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Sieci Drogowe',
        path: 'infrastructure',
    },
];

const Layout = () => (
    <>
        <Navbar navbarList={navList} />
        <Outlet />
    </>
);

export const MenuWindow = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<Layout />}>
                <Route
                    path="infrastructure"
                    element={<InfrastructureWindow />}
                ></Route>
                <Route
                    path="infrastructure/:roadId"
                    element={<InfrastructureWindowMap />}
                />
                <Route
                    path="infrastructure/:roadId/edit"
                    element={<InfrastructureWindowMapEdit />}
                />
                <Route
                    path="infrastructure/new"
                    element={<RoadcreateWindow />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default MenuWindow;
