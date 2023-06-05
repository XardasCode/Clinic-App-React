import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {store, persistor} from "./store";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./component/ProtectedRoutes";
import {PersistGate} from "redux-persist/integration/react";
import Layout from "./pages/Layout";
import Logout from "./pages/Logout";
import Registration from "./pages/Registration";
import CreateAppointment from "./pages/CreateAppointment";
import Appointments from "./pages/Appointments";
import Appointment from "./pages/Appointment";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/" element={<Layout><Home/></Layout>}/>
                    <Route path="/profile" element={<Layout><Profile/></Layout>}/>
                    <Route path={"/logout"} element={<Logout/>}/>
                    <Route path={"/create-appointment/:id"} element={<Layout><CreateAppointment/></Layout>}/>
                    <Route path={"/appointments"} element={<Layout><Appointments/></Layout>}/>
                    <Route path={"/appointment/:id"} element={<Layout><Appointment/></Layout>}/>
                </Route>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
);

reportWebVitals();
