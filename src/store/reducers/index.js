import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage/session";

import authReducer from "./authReducer";
import toastReducer from "./toastReducer";
import covidNewsReducer from "./covidNewsReducer";
import covidContactReducer from "./covidContactReducer";
import covidVaccineReducer from "./covidVaccineReducer";
import covidTestReducer from "./covidTestReducer";
import covidPatientReducer from "./covidPatientReducer";

import { USER_LOGOUT } from "../actions";

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  covidNews: covidNewsReducer,
  covidContact: covidContactReducer,
  covidVaccine: covidVaccineReducer,
  covidTest: covidTestReducer,
  covidPatient: covidPatientReducer,
});

const reducers = (state, action) => {
  if (action.type === USER_LOGOUT) {
    storage.removeItem("persist:keys");
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};

export default reducers;
