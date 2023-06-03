const defaultState = {
    isAuth: false,
    user: {}
}

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuth: true,
                user: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                user: {}
            }
        default:
            return state
    }
}

export const loginAction = (user) => ({type: LOGIN, payload: user})

export const logoutAction = () => ({type: LOGOUT})
