import {useDispatch, useSelector} from "react-redux";
import {addDoctorAction, deleteDoctorAction} from "../store/doctorReducer";
import {fetchDoctors} from "../api/getDoctors";

const Home = () => {
    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctors.doctors);

    const addDoctor = (name) => {
        const doctor = {
            id: Math.floor(Math.random() * 1000),
            name: name
        }
        dispatch(addDoctorAction(doctor))
    }

    const deleteDoctor = (id) => {
        dispatch(deleteDoctorAction(id))
    }

    const getDoctors = () => {
        dispatch(fetchDoctors())

    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    <h1>Home</h1>
                    <button className={"btn btn-primary m-3"} onClick={() => addDoctor(prompt())}>Add Doctor</button>
                    <button className={"btn btn-primary m-3"} onClick={() => getDoctors()}>Get Doctors</button>
                </div>
            </div>
            {doctors.length > 0 && (
                <div className={"row"}>
                    <div className={"col-12"}>
                        <h1>Doctors</h1>
                        <ul>
                            {doctors.map(doctor => (
                                <li key={doctor.id} onClick={() => deleteDoctor(doctor.id)}>
                                    {doctor.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {doctors.length === 0 && (
                <div className={"row"}>
                    <div className={"col-12"}>
                        <h1>No Doctors</h1>
                    </div>
                </div>
            )
            }
        </div>
    )
};
export default Home;