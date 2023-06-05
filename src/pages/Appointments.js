import React from 'react';
import UserAppointments from "../component/UserAppointments";
import {useSelector} from "react-redux";
import DoctorAppointments from "../component/DoctorAppointments";

const Appointments = () => {
    const user = useSelector(state => state.userAuth.user);

    return (
        <div>
            <h1>Appointments</h1>
            <hr className={"mb-5 mt-4"}/>
            {user.role === "USER" && (
                <UserAppointments/>
            )}
            {user.role === "DOCTOR" && (
                <DoctorAppointments/>
            )}
        </div>
    );
};

export default Appointments;