import {addManyDoctorsAction} from "../store/doctorReducer";
import axios from "axios";


export const fetchDoctors = () => {
    return async function (dispatch) {
        await axios.get('https://clinic-dev-app-api.lm.r.appspot.com/api/v1/users?size=10&page=1&sortField=name&filter=role:DOCTOR')
            .then(response => dispatch(addManyDoctorsAction(response.data)))
    }
}