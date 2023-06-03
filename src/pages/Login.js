import LoginForm from "../component/LoginForm";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


const Login = () => {
    const isAuth = useSelector(state => state.userAuth.isAuth);
    if (isAuth) {
        return <Navigate to={'/'} replace/>
    }
    return (
        <section className="vh-100">
            <div className="container py-5 h-150">
                <div className="row d-flex justify-content-center align-items-center h-100 mt-5">
                    <div className="col-5 mt-5">
                        <LoginForm/>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Login;