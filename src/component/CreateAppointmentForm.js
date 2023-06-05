import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {Backdrop, CircularProgress} from "@mui/material";


const CreateAppointmentForm = () => {
    const [problem, setProblem] = useState('')
    const [date, setDate] = useState('')
    const [doctor, setDoctor] = useState({})
    const [error, setError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.userAuth.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!dateError) {
            createAppointment().then(r => window.location.href = '/appointments');
        }
    }

    const createAppointment = async () => {
        setLoading(true)

        const visit = {
            problem: problem,
            date: date,
            doctorId: doctor.id,
            patientId: user.id,
            statusId: 1
        }

        axios.post('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/visits', visit)
            .then(response => {
                console.log(response.data.status);
                console.log(response.data.message);
                setError(false);

            })
            .catch(e => {
                console.log(e);
                setError(true);

            })
        setLoading(false);
    }

    useEffect(() => {
        if (loading) {
            document.body.style.pointerEvents = 'none';
        } else {
            document.body.style.pointerEvents = 'auto';
        }
    }, [loading])

    useEffect(() => {
        setLoading(true)

        const doctorId = window.location.pathname.split('/')[2];

        const getDoctor = async () => {
            await axios.get('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/users/' + doctorId)
                .then(response => {
                    setDoctor(response.data);
                    setError(false);
                })
                .catch(e => {
                    console.log(e);
                    setError(true);
                })
        }
        getDoctor().then(() => setLoading(false));
    }, [])


    useEffect(() => {
        // check if date is not in the past
        const today = new Date();
        const dateParts = date.split('-');
        const dateObject = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        if (dateObject < today) {
            setDateError(true);
        } else {
            setDateError(false);
        }
    }, [date])

    const renderDateError = () => {
        if (dateError) {
            return (
                <div className="alert alert-danger" role="alert">
                    Date must be in the future!
                </div>
            )
        }
    }

    const renderError = () => {
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    Something went wrong!
                </div>
            )
        }
    }

    return (
        <div>
            {!loading && (
                <card>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label fw-bold">Date</label>
                                <input value={date} onChange={(e) => setDate(e.target.value)} type="date"
                                       className="form-control"
                                       id="date" aria-describedby="dateHelp" required={true}/>
                            </div>
                            {renderDateError()}
                            <div className="mb-3">
                                <label htmlFor="doctor" className="form-label fw-bold">Doctor</label>
                                <input value={doctor.name} type="text"
                                       className="form-control disabled"
                                       disabled={true}
                                       id="doctor" aria-describedby="doctorHelp" required={true}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="specialization" className="form-label fw-bold">Specialization</label>
                                <input value={doctor.specialization} type="text"
                                       className="form-control disabled"
                                       disabled={true}
                                       id="specialization" aria-describedby="specializationHelp" required={true}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="problem" className="form-label fw-bold">Problem</label>
                                <textarea value={problem} onChange={(e) => setProblem(e.target.value)}
                                          className="form-control"
                                          id="problem" aria-describedby="problemHelp" required={true}
                                          placeholder={"Describe your problem here..."}
                                />
                            </div>
                            {renderError()}
                            {/*center submit button*/}
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button type="submit" className="btn btn-primary mx-auto">Create</button>
                            </div>
                        </form>
                    </div>
                </card>
            )}
            {loading && (
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>)
            }
        </div>
    )
}

export default CreateAppointmentForm
