import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { Navbar } from '../../components/navbar/Navbar';
import { screenList } from './DashboardProps';

const navList = [ {
        "label":  'Home',
        "path": '/'
    }, ...screenList]

const Layout = () => 
    <>
        <Navbar navbarList={navList} />
        <Outlet />
    </>
    
export const MenuWindow = () => 
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
            {screenList.map((v) => <Route path={v.path} element={<v.element />} />)}
        </Route>
    </Routes>
</BrowserRouter>

export default MenuWindow;
