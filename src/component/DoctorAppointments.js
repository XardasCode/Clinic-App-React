import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addManyAppointmentsAction} from "../store/appointmentReducer";
import {Backdrop, CircularProgress} from "@mui/material";

const DoctorAppointments = () => {
    const user = useSelector(state => state.userAuth.user);
    const appointments = useSelector(state => state.appointments.appointments);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState([]);
    const [dateFrom, setDateFrom] = React.useState('');
    const [dateTo, setDateTo] = React.useState('');
    const [patientName, setPatientName] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('');
    const [sortField, setSortField] = React.useState('date');
    const [sortDirectionASC, setSortDirection] = React.useState(true);

    const getUserAppointments = async () => {
        const baseURL = "https://clinic-dev-app-api.lm.r.appspot.com/api/v1/visits";
        const size = "size=5";
        const sorting = "sortField=" + sortField;
        const sortingOrder = sortDirectionASC ? "ASC" : "DESC";
        const pagination = "page=" + page;
        const filterById = "doctorId:" + user.id;
        const filterByStatus = statusFilter ? ",status:" + statusFilter : "";
        const filterByDateFrom = dateFrom ? ",dateFrom:" + dateFrom : "";
        const filterByDateTo = dateTo ? ",dateTo:" + dateTo : "";
        const filterByPatientName = patientName ? ",patient:" + patientName : "";
        const fullURL = baseURL + "?" + pagination + "&" + size + "&" + sorting + "&direction=" + sortingOrder
            + "&filter=" + filterById + filterByDateFrom + filterByDateTo + filterByPatientName + filterByStatus;
        await axios.get(fullURL)
            .then(response => {
                dispatch(addManyAppointmentsAction(response.data));
                setError(false);
            })
            .catch(error => {
                    console.log(error);
                    setError(true);
                }
            )
    }

    const getUserAppointmentsPageCount = async () => {
        const baseURL = "https://clinic-dev-app-api.lm.r.appspot.com/api/v1/visits/page-count";
        const size = "size=5";
        const filterById = "doctorId:" + user.id;
        const filterByDateFrom = dateFrom ? ",dateFrom:" + dateFrom : "";
        const filterByDateTo = dateTo ? ",dateTo:" + dateTo : "";
        const filterByStatus = statusFilter ? ",status:" + statusFilter : "";
        const filterByPatientName = patientName ? ",patient:" + patientName : "";
        const fullURL = baseURL + "?" + size + "&filter=" + filterById + filterByDateFrom + filterByDateTo + filterByPatientName + filterByStatus;
        await axios.get(fullURL)
            .then(response => {
                const pagesArray = [];
                for (let i = 1; i <= response.data; i++) {
                    pagesArray.push(i);
                }
                setPages(pagesArray);
                setError(false);
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
    }

    React.useEffect(() => {
        fetchAllData();
    }, [page]);

    React.useEffect(() => {
        fetchAllData();
    }, [sortField]);

    React.useEffect(() => {
        fetchAllData();
    }, [sortDirectionASC]);

    const fetchAllData = async () => {
        setLoading(true)
        await getUserAppointments();
        await getUserAppointmentsPageCount();
        setLoading(false)
    }

    const renderError = () => {
        if (error) {
            return (
                <div className="d-grid gap-2 col-6 mx-auto">
                    <div className="alert alert-danger mx-auto" role="alert">
                        Something went wrong...
                    </div>
                </div>
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1)
        fetchAllData();
    }

    return (
        <div>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="inputDate" className="form-label">Date from</label>
                    <input type="date" className="form-control" id="inputDate"
                           onChange={e => setDateFrom(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputDate" className="form-label">Date to</label>
                    <input type="date" className="form-control" id="inputDate"
                           onChange={e => setDateTo(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPatient" className="form-label">Patient</label>
                    <input type="text" className="form-control" id="inputPatient"
                           onChange={e => setPatientName(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor={"status"} className="form-label">Status</label>
                    <select className="form-select" id="status" onChange={e => setStatusFilter(e.target.value)}>
                        <option value="">-</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-primary mx-auto">Search</button>
                </div>
            </form>

            <hr className={"mt-5 mb-4"}/>

            <div className="col-2 mb-3">
                <label htmlFor="inputSort" className="form-label fw-bold">Sort by</label>
                <select className="form-select" id="inputSort" onChange={e => setSortField(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="doctorName">Doctor</option>
                    <option value="doctorSpecialization">Specialization</option>
                    <option value="status">Status</option>
                </select>
                <div className="form-check mt-3 mb-3">
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                           checked={sortDirectionASC}
                           onChange={e => setSortDirection(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Ascending
                    </label>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Patient</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                {renderError()}
                {!loading && (
                    <tbody>
                    {appointments.map(appointment =>
                        <tr key={appointment.id}>
                            <td>{appointment.date}</td>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.status}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => {
                                    window.location.href = "/appointment/" + appointment.id
                                }}>
                                    Show more
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                )}
            </table>
            {
                !loading && (
                    <div className={"row mb-5"}>
                        {!loading && (
                            <nav>
                                <ul className="pagination justify-content-center">
                                    {pages.map(pageNumber => (
                                        <li className="page-item">
                                            {pageNumber === page && (
                                                <button className="page-link active" aria-current="page" disabled>
                                                    {pageNumber}
                                                </button>
                                            )}
                                            {pageNumber !== page && (
                                                <button className="page-link"
                                                        onClick={() => setPage(pageNumber)}>
                                                    {pageNumber}
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                )
            }

            {
                loading && (
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={loading}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>)
            }
        </div>
    )
        ;
};


export default DoctorAppointments;