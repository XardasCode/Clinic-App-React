import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {loginAction} from "../store/authReducer";
import * as ReactBootStrap from "react-bootstrap";


const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const login = async (userId) => {
        await axios.get('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/users/' + userId)
            .then(response => {
                dispatch(loginAction(response.data));
                setError(false);
                console.log('Login success');
            })
            .catch(e => {
                console.log(e);
                setError(true);
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userJson = {
            email: email,
            name: username,
            password: password
        }
        await axios.post('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/users', userJson)
            .then(response => {
                const userId = response.data.message;
                setError(false);
                login(userId);
                console.log('Registration success');
            })
            .catch(e => {
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

    const renderEmailError = () => {
        if (error) {
            return (
                <div className="alert alert-danger fade show" role="alert">
                    This email is already registered. Please try again.
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
                       id="email" aria-describedby="emailHelp" required={true}/>
            </div>

            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"
                       className="form-control"
                       id="username" aria-describedby="usernameHelp" required={true}
                       pattern={"[A-Za-zА-Яа-я ]+"}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                       className="form-control"
                       id="password"
                       required={true}
                       minLength={5}
                       aria-describedby="passwordHelp"
                       placeholder={"Password must be at least 5 characters"}/>
            </div>

            {renderEmailError()}

            <div className="d-grid gap-2 col-6 mx-auto">
                {loading ? (
                    <ReactBootStrap.Spinner animation="border" role="status" className={"mx-auto"}>
                        <span className="visually-hidden">Loading...</span>
                    </ReactBootStrap.Spinner>
                ) : (
                    <button className="btn btn-primary" type="submit">Register</button>
                )}
            </div>
        </form>
    )
}

export default RegistrationForm;