import {Link} from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Clinic</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/doctors">Doctors</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/patients">Patients</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/appointments">Appointments</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;