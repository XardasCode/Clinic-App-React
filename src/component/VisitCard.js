import React, {useEffect} from 'react';
import axios from "axios";
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";

const VisitCard = () => {
    const user = useSelector(state => state.userAuth.user);
    const [appointment, setAppointment] = React.useState({});
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [diagnosis, setDiagnosis] = React.useState("");
    const [treatment, setTreatment] = React.useState("");

    useEffect(() => {
        fetchAllData();
    }, [])

    const fetchAllData = async () => {
        setLoading(true);
        await fetchAppointment();
        setLoading(false);
    }

    const fetchAppointment = async () => {
        const appointmentId = window.location.pathname.split("/")[2];
        await axios.get('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/visits/' + appointmentId)
            .then(response => {
                    setAppointment(response.data);
                    setError("");
                }
            ).catch(e => {
                console.log(e);
                setError("Error");
            })
    }

    const cancelAppointment = async () => {
        setLoading(true)
        const appointmentId = window.location.pathname.split("/")[2];

        await axios.patch('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/visits/' + appointmentId + '/cancel')
            .then(response => {
                    setAppointment(response.data);
                    setError("");
                }
            ).catch(e => {
                    console.log(e);
                    setError("Error");
                }
            )
        await fetchAppointment();
        setLoading(false);
    }

    const takeInProgress = async () => {
        setLoading(true)
        const appointmentId = window.location.pathname.split("/")[2];

        await axios.patch('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/visits/' + appointmentId + '/in-progress')
            .then(response => {
                    setAppointment(response.data);
                    setError("");
                }
            ).catch(e => {
                    console.log(e);
                    setError("Error");
                }
            )
        await fetchAppointment();
        setLoading(false);
    }


    const renderError = () => {
        if (error) {
            return (
                <div className="alert alert-danger fade show" role="alert">
                    "Whoops, something went wrong! Please try again later"
                </div>
            )
        }
    }

    const handleVisit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const appointmentId = window.location.pathname.split("/")[2];

        const visit = {
            diagnosis: diagnosis,
            treatment: treatment,
            problem: appointment.problem,
            date: appointment.date,
            doctorId: parseInt(appointment.doctorId),
            patientId: parseInt(appointment.userId),
            statusId: 2
        }
        console.log(visit);

        await axios.put('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/visits/' + appointmentId, visit)
            .then(response => {
                    setAppointment(response.data);
                    setError("");
                }
            ).catch(e => {
                    console.log(e);
                    setError("Error");
                }
            )
        await fetchAppointment();
        setLoading(false);
    }


    return (
        <div>
            {renderError()}
            <div className={"row"}>
                {!loading && (
                    <div className={"card text-center"}>
                        <div className={"card-body"}>
                            <p className={"lead"}><strong>Date:</strong> {appointment.date}</p>
                            <p className={"lead"}><strong>Doctor:</strong> {appointment.doctorName}</p>
                            <p className={"lead"}><strong>Patient:</strong> {appointment.patientName}</p>
                            <p className={"lead"}><strong>Problem:</strong> {appointment.problem}</p>
                            <p className={"lead"}><strong>Status:</strong> {appointment.status}</p>
                            {appointment.status === "Done" && (
                                <div>
                                    <p className={"lead"}><strong>Diagnosis:</strong> {appointment.diagnosis}</p>
                                    <p className={"lead"}><strong>Treatment:</strong> {appointment.treatment}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {!loading && (
                    <div className={"mb-5"}>
                        {appointment.status === "Pending" && (
                            <div className={"d-grid gap-2"}>
                                <button className={"btn btn-danger mx-auto mt-3"} onClick={cancelAppointment}
                                >Cancel
                                </button>
                                {user.role === "DOCTOR" && (
                                    <button className={"btn btn-success mx-auto mt-3"} onClick={takeInProgress}>
                                        Take in progress
                                    </button>
                                )}
                            </div>
                        )}

                        {user.role === "DOCTOR" && appointment.status === "In progress" && (
                            <form className={"mt-3"} onSubmit={handleVisit}>
                                <div className={"mb-3"}>
                                    <h3 className={"text-center"}>Visit is in progress. Please fill in the form to end
                                        visit</h3>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"diagnosis"} className={"form-label"}>Diagnosis</label>
                                    <input type={"text"} className={"form-control"} id={"diagnosis"}
                                           placeholder={"Diagnosis"} value={diagnosis}
                                           required={true}
                                           onChange={(e) => setDiagnosis(e.target.value)}/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"treatment"} className={"form-label"}>Treatment</label>
                                    <textarea className={"form-control"} id={"treatment"}
                                              placeholder={"Treatment"} value={treatment}
                                              required={true}
                                              onChange={(e) => setTreatment(e.target.value)}/>
                                </div>
                                <div className={"d-grid gap-2"}>
                                    <button className={"btn btn-success mx-auto mt-3"} type={"submit"}>Done visit
                                    </button>
                                </div>
                            </form>
                        )}
                        {user.role === "DOCTOR" && appointment.status === "Done" && (
                            <form className={"mt-3 mb-5"} onSubmit={handleVisit}>
                                <div>
                                    <h3 className={"text-center"}>Visit already done. You can update visit details</h3>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"diagnosis"} className={"form-label"}>Diagnosis</label>
                                    <input type={"text"} className={"form-control"} id={"diagnosis"}
                                           placeholder={"Diagnosis"} value={diagnosis}
                                           required={true}
                                           onChange={(e) => setDiagnosis(e.target.value)}/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"treatment"} className={"form-label"}>Treatment</label>
                                    <textarea className={"form-control"} id={"treatment"}
                                              placeholder={"Treatment"} value={treatment}
                                              required={true}
                                              onChange={(e) => setTreatment(e.target.value)}/>
                                </div>
                                <div className={"d-grid gap-2"}>
                                    <button className={"btn btn-success mx-auto mt-3"} type={"submit"}>Update visit
                                        details
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
                {loading && (
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={loading}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                )}
            </div>
        </div>
    )
};

export default VisitCard;