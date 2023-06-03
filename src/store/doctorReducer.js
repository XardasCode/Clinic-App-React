const defaultState = {
    doctors: [],
}

const ADD_DOCTOR = "ADD_DOCTOR";
const DELETE_DOCTOR = "DELETE_DOCTOR";
const ADD_MANY_DOCTORS = "ADD_MANY_DOCTORS";


export const doctorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_DOCTOR:
            return {
                ...state,
                doctors: [...state.doctors, action.payload]
            }
        case DELETE_DOCTOR:
            return {
                ...state,
                doctors: state.doctors.filter(doctor => doctor.id !== action.payload)
            }
        case ADD_MANY_DOCTORS:
            return {
                ...state,
                doctors: [...state.doctors, ...action.payload]
            }
        default:
            return state
    }
}

export const addDoctorAction = (doctor) => ({type: ADD_DOCTOR, payload: doctor})
export const deleteDoctorAction = (id) => ({type: DELETE_DOCTOR, payload: id})
export const addManyDoctorsAction = (doctors) => ({type: ADD_MANY_DOCTORS, payload: doctors})