import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import RegistrationForm from "../component/RegistrationForm";

const Registration = () => {
    const isAuth = useSelector(state => state.userAuth.isAuth);

    if (isAuth) {
        return <Navigate to={'/'} replace/>
    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-150">
                <div className="row d-flex justify-content-center align-items-center h-100 mt-5">
                    <div className="col-5 mt-5">
                        <h2 className="text-center mb-2">Registration</h2>
                        <hr/>
                        <RegistrationForm/>
                        <div className="text-center mt-3">
                            <p className="mb-0">Already have an account? <a href="/login" className="text-primary">Login
                                here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Registration;