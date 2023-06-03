import React from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Login from "../pages/Login";

const ProtectedRoutes = () => {
    const isAuth = useSelector(state => state.userAuth.isAuth);
    return isAuth ? <Outlet/> : <Login/>
};

export default ProtectedRoutes;