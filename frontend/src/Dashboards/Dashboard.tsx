import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { Navbar } from '../components/navbar/Navbar';
import { InfrastructureWindow } from '../Screens/InfrastructureWindow/InfrastructureWindow';
import { InfrastructureWindowMap } from 'Screens/InfrastructureWindow/InfrastructureWindowMap';
import { RoadcreateWindow } from 'Screens/InfrastructureWindow/RoadcreateWindow';
import { InfrastructureWindowMapEdit } from 'Screens/InfrastructureWindow/InfrastructureWindowMapEdit';
import { NavigateWindow } from '../Screens/NavigationWindow/NavigationWindow';

import { HomeMenu } from './HomeMenu';
import { navList } from './navList';
import TariffWindow from 'Screens/TariffWindow/TariffWindow';

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
                <Route path="" element={<HomeMenu />}></Route>
                <Route path="navigate" element={<NavigateWindow />}></Route>
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
                <Route
                    path="tariff"
                    element={<TariffWindow />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default MenuWindow;
