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
import { FeesWindowItem } from 'Screens/FeesWindow/FeesWindowItem';
import FeesWindow from 'Screens/FeesWindow/FeesWindow';
import SubscriptionWindow from 'Screens/SubscriptionWindow/SubscriptionWindow';
import TariffCreateWindow from 'Screens/TariffWindow/TariffCreateWindow';
import { FeesCreateWindow } from 'Screens/FeesWindow/FeesCreateWindow';
import { SubscriptionCreateWindow } from 'Screens/SubscriptionWindow/SubscriptionCreateWindow';

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
                <Route path="tariff" element={<TariffWindow />} />
                <Route path="tariff/add" element={<TariffCreateWindow />} />
                <Route
                    path="tariff/:tariffId/edit"
                    element={<TariffCreateWindow />}
                />
                <Route path="fees" element={<FeesWindow />} />
                <Route path="fees/:id" element={<FeesWindowItem />} />
                <Route path="fees/add" element={<FeesCreateWindow />} />
                {/* Nie ma przypadku wyświetl liste subskrypcji więc wystarczy formularz */}
                <Route
                    path="subscription"
                    element={<SubscriptionCreateWindow />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default MenuWindow;
