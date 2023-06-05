import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {loginAction} from "../store/authReducer";
import * as ReactBootStrap from "react-bootstrap";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.get('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/users/login?email=' + email + '&password=' + password)
            .then(response => {
                    dispatch(loginAction(response.data));
                    setError(false);
                    console.log('Login success');
                }
            ).catch(e => {
                console.log(e);
                setError(true);
            })
        setLoading(false);
    }

    // disable page if loading
    useEffect(() => {
        if (loading) {
            document.body.style.pointerEvents = 'none';
        } else {
            document.body.style.pointerEvents = 'auto';
        }
    }, [loading])


    const renderError = () => {
        if (error) {
            return (
                <div className="alert alert-danger fade show" role="alert">
                    Invalid email or password
                </div>
            )
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                       className="form-control"
                       id="email" aria-describedby="emailHelp"/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                       className="form-control" id="password"/>
            </div>
            {renderError()}
            <div className="d-grid gap-2 col-6 mx-auto">
                {loading ? (
                    <ReactBootStrap.Spinner animation="border" variant="primary" className="mx-auto">
                        <span className="visually-hidden">Loading...</span>
                    </ReactBootStrap.Spinner>
                ) : (
                    <button type="submit" className="btn btn-primary">Submit</button>
                )}
            </div>
        </form>
    )
}

export default LoginForm;