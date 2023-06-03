import {useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {loginAction} from "../store/authReducer";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email: ' + email);
        console.log('Password: ' + password);


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
    }


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
            <button type="submit" className="btn btn-primary d-flex mx-auto">Submit</button>
        </form>
    )
}

export default LoginForm;