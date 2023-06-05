const defaultState = {
    appointments: []
}

const ADD_APPOINTMENT = "ADD_APPOINTMENT";

const ADD_MANY_APPOINTMENTS = "ADD_MANY_APPOINTMENTS";

const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";

export const appointmentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_APPOINTMENT:
            return {
                ...state,
                appointments: [...state.appointments, action.payload]
            }
        case DELETE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.filter(appointment => appointment.id !== action.payload)
            }
        case ADD_MANY_APPOINTMENTS:
            // delete all appointments and add new
            return {
                ...state,
                appointments: action.payload
            }
        default:
            return state
    }
}

export const addAppointmentAction = (appointment) => ({type: ADD_APPOINTMENT, payload: appointment})

export const deleteAppointmentAction = (id) => ({type: DELETE_APPOINTMENT, payload: id})

export const addManyAppointmentsAction = (appointments) => ({type: ADD_MANY_APPOINTMENTS, payload: appointments})