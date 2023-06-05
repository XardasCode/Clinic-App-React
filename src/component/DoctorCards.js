import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {addManyDoctorsAction} from "../store/doctorReducer";
import {Backdrop, CircularProgress} from "@mui/material";


const DoctorCards = () => {
    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctors.doctors);
    const [nameFilter, setNameFilter] = useState('');
    const [specializationFilter, setSpecializationFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [pages, setPages] = useState([]);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState("ASC");

    const fetchDoctors = async () => {
        const baseURL = 'https://clinic-dev-app-api.lm.r.appspot.com/api/v1/users'
        const size = 'size=8'
        const pagination = 'page=' + page
        const sorting = 'sortField=' + sortField
        const direction = 'direction=' + sortDirection
        const filter = 'filter=role:DOCTOR'
        const nameFilterString = nameFilter ? ',name:' + nameFilter : ''
        const specializationFilterString = specializationFilter ? ',specialization:' + specializationFilter : ''
        const fullURL = baseURL + '?' + size + '&' + pagination + '&' + sorting + '&' + direction
            + '&' + filter + nameFilterString + specializationFilterString
        try {
            await axios
                .get(fullURL)
                .then(response => dispatch(addManyDoctorsAction(response.data)))
        } catch (e) {
            console.error(e)
        }

    }

    const fetchPages = async () => {
        const baseURL = 'https://clinic-dev-app-api.lm.r.appspot.com/api/v1/users/page-count'
        const size = 'size=8'
        const filter = 'filter=role:DOCTOR'
        const nameFilterString = nameFilter ? ',name:' + nameFilter : ''
        const specializationFilterString = specializationFilter ? ',specialization:' + specializationFilter : ''
        const fullURL = baseURL + '?' + size + '&' + filter + nameFilterString + specializationFilterString
        try {
            await axios
                .get(fullURL)
                .then(response => {
                    setPageCount(response.data)
                    const pagesArray = []
                    for (let i = 1; i <= response.data; i++) {
                        pagesArray.push(i)
                    }
                    setPages(pagesArray)
                });
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (loading) {
            document.body.style.pointerEvents = 'none';
        } else {
            document.body.style.pointerEvents = 'auto';
        }
    }, [loading])

    const getDoctors = async () => {
        setLoading(true);
        await fetchDoctors();
        await fetchPages();
        setLoading(false);
    }

    const filterDoctors = () => {
        setPage(1)
        getDoctors();

    }

    const changePage = async (nextPage) => {
        if (nextPage !== page && nextPage > 0 && nextPage <= pageCount) {
            setPage(nextPage);
        }
    }

    useEffect(() => {
        getDoctors();
    }, [page])

    useEffect(() => {
        getDoctors();
    }, [sortField])

    useEffect(() => {
        getDoctors();
    }, [sortDirection])


    return (
        <div className={"row"}>
            <div className={"col-12"}>
                <h2>Filter doctors</h2>
                <p className={"lead mt-3"}>You can filter doctors by name or specialization.</p>


                <div className={"row"}>
                    <div className={"col-6"}>
                        <div className={"form-group"}>
                            <label htmlFor={"name"} className={"fw-bold"}>Name</label>
                            <input type={"text"} className={"form-control"} id={"name"} onChange={e => {
                                setNameFilter(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"form-group"}>
                            <label htmlFor={"specialization"} className={"fw-bold"}>Specialization</label>
                            <input type={"text"} className={"form-control"} id={"specialization"} onChange={e => {
                                setSpecializationFilter(e.target.value)
                            }}/>
                        </div>
                    </div>
                </div>
                <div className={"mt-3 text-center"}>
                    <button className={"btn btn-primary"}
                            onClick={filterDoctors}>
                        Filter
                    </button>
                </div>
            </div>
            <hr className={"mb-3 mt-4"}/>

            {/*Select sortField and direction of sorting*/}
            <div className={"col-12 mb-3"}>
                <div className={"row"}>
                    <div className={"col-3"}>
                        <div className={"form-group"}>
                            <label htmlFor={"sortField"} className={"fw-bold"}>Sort by</label>
                            <select className={"form-control"} id={"sortField"} onChange={e => {
                                setSortField(e.target.value)
                            }}>
                                <option value={"name"}>Name</option>
                                <option value={"specialization"}>Specialization</option>
                            </select>
                        </div>
                    </div>
                    <div className={"col-3"}>
                        <div className={"form-group"}>
                            <label htmlFor={"sortDirection"} className={"fw-bold"}>Direction</label>
                            <select className={"form-control"} id={"sortDirection"} onChange={e => {
                                setSortDirection(e.target.value)
                            }}>
                                <option value={"ASC"}>Ascending</option>
                                <option value={"DESC"}>Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"col-12"}>
                {!loading && (
                    <div className={"row"}>
                        <h2 className={"mb-4"}>Doctors</h2>
                        {doctors.map(doctor => (
                            <div className={"col-3"}>
                                <div className={"card mb-4"}>
                                    <div className={"card-body"}>
                                        <h5 className={"card-title"}>{doctor.name}</h5>
                                        <p className={"card-text"}>{doctor.specialization}</p>
                                        <a href={"/create-appointment/" + doctor.id} className={"btn btn-primary"}>
                                            Make an appointment</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={"col-12"}>
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
                                                onClick={() => changePage(pageNumber)}>
                                            {pageNumber}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
            {loading && (
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>)
            }
        </div>
    )
};

export default DoctorCards;