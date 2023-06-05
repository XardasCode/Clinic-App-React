import {useSelector} from "react-redux";
import CreateAppointmentForm from "../component/CreateAppointmentForm";
import {Navigate} from "react-router-dom";

const CreateAppointment = () => {
    const user = useSelector(state => state.userAuth.user);

    if (user.role !== "USER") {
        return <Navigate to={'/'} replace/>
    }

    return (
        <div>
            <h1>Create Appointment</h1>
            <hr className={"mb-5 mt-4"}/>
            <CreateAppointmentForm/>
        </div>
    )
}

export default CreateAppointment