import React from 'react';
import VisitCard from "../component/VisitCard";
import {useSelector} from "react-redux";

const Appointment = () => {
    const user = useSelector(state => state.userAuth.user);

    return (
        <div>
            <h1>Appointment information</h1>
            <hr className={"mb-5 mt-4"}/>
                <VisitCard/>
        </div>
    );
};

export default Appointment;