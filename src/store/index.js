import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {doctorReducer} from "./doctorReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {appointmentReducer} from "./appointmentReducer";

const rootReducer = combineReducers({
    doctors: doctorReducer,
    userAuth: authReducer,
    appointments: appointmentReducer
});

const persistConfig = {
    key: 'root',
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);