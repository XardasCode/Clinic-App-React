import {useDispatch} from "react-redux";
import {logoutAction} from "../store/authReducer";
import {Navigate} from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    dispatch(logoutAction());
    return <Navigate to={'/login'} replace/>
}

export default Logout;