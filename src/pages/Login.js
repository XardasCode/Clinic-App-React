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
                        <h2 className="text-center mb-2">Login</h2>
                        <hr/>
                        <LoginForm/>
                        <div className="text-center mt-3">
                            <p className="mb-0">Don't have an account? <a href="/registration" className="text-primary">Sign
                                up here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Login;