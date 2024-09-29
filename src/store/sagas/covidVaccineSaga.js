import {
  GET_VACCINES,
  GET_VACCINES_SUCCESS,
  GET_VACCINES_FAILED,
  GET_VACCINATION_CENTRES,
  GET_VACCINATION_CENTRES_SUCCESS,
  GET_VACCINATION_CENTRES_FAILED,
  GET_SCHEDULED_VACCINATION_CENTRES,
  GET_SCHEDULED_VACCINATION_CENTRES_SUCCESS,
  GET_SCHEDULED_VACCINATION_CENTRES_FAILED,
  GET_VACCINE_APPOINTMENTS,
  GET_VACCINE_APPOINTMENTS_SUCCESS,
  GET_VACCINE_APPOINTMENTS_FAILED,
  GET_PANDEMIC_VACCINATIONS,
  GET_PANDEMIC_VACCINATIONS_SUCCESS,
  GET_PANDEMIC_VACCINATIONS_FAILED,
  GET_VACCINE_BY_ID,
  GET_VACCINE_BY_ID_SUCCESS,
  GET_VACCINE_BY_ID_FAILED,
  GET_VACCINATION_CENTRE_BY_ID,
  GET_VACCINATION_CENTRE_BY_ID_SUCCESS,
  GET_VACCINATION_CENTRE_BY_ID_FAILED,
  GET_SCHEDULED_VACCINATION_CENTRE_BY_ID,
  GET_SCHEDULED_VACCINATION_CENTRE_BY_ID_SUCCESS,
  GET_SCHEDULED_VACCINATION_CENTRE_BY_ID_FAILED,
  GET_VACCINE_APPOINTMENT_BY_ID,
  GET_VACCINE_APPOINTMENT_BY_ID_SUCCESS,
  GET_VACCINE_APPOINTMENT_BY_ID_FAILED,
  GET_PANDEMIC_VACCINATION_BY_ID,
  GET_PANDEMIC_VACCINATION_BY_ID_SUCCESS,
  GET_PANDEMIC_VACCINATION_BY_ID_FAILED,
  POST_VACCINE,
  POST_VACCINE_SUCCESS,
  POST_VACCINE_FAILED,
  POST_VACCINATION_CENTRE,
  POST_VACCINATION_CENTRE_SUCCESS,
  POST_VACCINATION_CENTRE_FAILED,
  POST_SCHEDULED_VACCINATION_CENTRE,
  POST_SCHEDULED_VACCINATION_CENTRE_SUCCESS,
  POST_SCHEDULED_VACCINATION_CENTRE_FAILED,
  POST_VACCINE_APPOINTMENT,
  POST_VACCINE_APPOINTMENT_SUCCESS,
  POST_VACCINE_APPOINTMENT_FAILED,
  POST_PANDEMIC_VACCINATION,
  POST_PANDEMIC_VACCINATION_SUCCESS,
  POST_PANDEMIC_VACCINATION_FAILED,
  PUT_VACCINE,
  PUT_VACCINE_SUCCESS,
  PUT_VACCINE_FAILED,
  PUT_VACCINATION_CENTRE,
  PUT_VACCINATION_CENTRE_SUCCESS,
  PUT_VACCINATION_CENTRE_FAILED,
  PUT_SCHEDULED_VACCINATION_CENTRE,
  PUT_SCHEDULED_VACCINATION_CENTRE_SUCCESS,
  PUT_SCHEDULED_VACCINATION_CENTRE_FAILED,
  PUT_VACCINE_APPOINTMENT,
  PUT_VACCINE_APPOINTMENT_SUCCESS,
  PUT_VACCINE_APPOINTMENT_FAILED,
  PUT_PANDEMIC_VACCINATION,
  PUT_PANDEMIC_VACCINATION_SUCCESS,
  PUT_PANDEMIC_VACCINATION_FAILED,
  GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO,
  GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO_SUCCESS,
  GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO_FAILED,
  SUCCESS_TOAST,
} from "../actions";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  getCovidVaccinesRequest,
  getVaccinationCentresRequest,
  getScheduledVaccinationCentresRequest,
  getVaccineAppointmentsRequest,
  getPandemicVaccinationsRequest,
  getCovidVaccineByIdRequest,
  getVaccinationCentreByIdRequest,
  getScheduledVaccinationCentreByIdRequest,
  getVaccineAppointmentByIdRequest,
  getPandemicVaccinationByIdRequest,
  postCovidVaccineRequest,
  postVaccinationCentreRequest,
  postScheduledVaccinationCentreRequest,
  postVaccineAppointmentRequest,
  postPandemicVaccinationRequest,
  putCovidVaccineRequest,
  putVaccinationCentreRequest,
  putScheduledVaccinationCentreRequest,
  putVaccineAppointmentRequest,
  putPandemicVaccinationRequest,
  getScheduledVaccinationCentresByInfoRequest,
} from "../../services";
import { displayError } from "../../utils";

export function* getVaccines() {
  try {
    const receivedData = yield call(getCovidVaccinesRequest);
    yield put({
      type: GET_VACCINES_SUCCESS,
      response: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_VACCINES_FAILED, error });
  }
}

export function* watchGetVaccines() {
  yield takeLatest(GET_VACCINES, getVaccines);
}

export function* getVaccinationCentres() {
  try {
    const receivedData = yield call(getVaccinationCentresRequest);
    yield put({
      type: GET_VACCINATION_CENTRES_SUCCESS,
      resVaccinationCentres: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_VACCINATION_CENTRES_FAILED, error });
  }
}

export function* watchGetVaccinationCentres() {
  yield takeLatest(GET_VACCINATION_CENTRES, getVaccinationCentres);
}

export function* getScheduledVaccinationCentres() {
  try {
    const receivedData = yield call(getScheduledVaccinationCentresRequest);
    yield put({
      type: GET_SCHEDULED_VACCINATION_CENTRES_SUCCESS,
      resScheduledVaccinationCentres: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_SCHEDULED_VACCINATION_CENTRES_FAILED, error });
  }
}

export function* watchGetScheduledVaccinationCentres() {
  yield takeLatest(
    GET_SCHEDULED_VACCINATION_CENTRES,
    getScheduledVaccinationCentres
  );
}

export function* getVaccineAppointments() {
  try {
    const receivedData = yield call(getVaccineAppointmentsRequest);
    yield put({
      type: GET_VACCINE_APPOINTMENTS_SUCCESS,
      resVaccineAppointments: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_VACCINE_APPOINTMENTS_FAILED, error });
  }
}

export function* watchGetVaccineAppointments() {
  yield takeLatest(GET_VACCINE_APPOINTMENTS, getVaccineAppointments);
}

export function* getPandemicVaccinations() {
  try {
    const receivedData = yield call(getPandemicVaccinationsRequest);
    yield put({
      type: GET_PANDEMIC_VACCINATIONS_SUCCESS,
      resPandemicVaccinations: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PANDEMIC_VACCINATIONS_FAILED, error });
  }
}

export function* watchGetPandemicVaccinations() {
  yield takeLatest(GET_PANDEMIC_VACCINATIONS, getPandemicVaccinations);
}

export function* getVaccineById({ vaccineId }) {
  try {
    const receivedData = yield call(getCovidVaccineByIdRequest, vaccineId);
    yield put({
      type: GET_VACCINE_BY_ID_SUCCESS,
      resCovidVaccineById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_VACCINE_BY_ID_FAILED, error });
  }
}

export function* watchGetVaccineById() {
  yield takeLatest(GET_VACCINE_BY_ID, getVaccineById);
}

export function* getVaccinationCentreById({ vaccinationCentreId }) {
  try {
    const receivedData = yield call(
      getVaccinationCentreByIdRequest,
      vaccinationCentreId
    );
    yield put({
      type: GET_VACCINATION_CENTRE_BY_ID_SUCCESS,
      resVaccinationCentreById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_VACCINATION_CENTRE_BY_ID_FAILED, error });
  }
}

export function* watchGetVaccinationCentreById() {
  yield takeLatest(GET_VACCINATION_CENTRE_BY_ID, getVaccinationCentreById);
}

export function* getScheduledVaccinationCentreById({
  scheduledVaccinationCentreId,
}) {
  try {
    const receivedData = yield call(
      getScheduledVaccinationCentreByIdRequest,
      scheduledVaccinationCentreId
    );
    yield put({
      type: GET_SCHEDULED_VACCINATION_CENTRE_BY_ID_SUCCESS,
      resScheduledVaccinationCentreById: receivedData.data.result[0],
    });
  } catch (error) {
    yield put({ type: GET_SCHEDULED_VACCINATION_CENTRE_BY_ID_FAILED, error });
  }
}

export function* watchGetScheduledVaccinationCentreById() {
  yield takeLatest(
    GET_SCHEDULED_VACCINATION_CENTRE_BY_ID,
    getScheduledVaccinationCentreById
  );
}

export function* getVaccineAppointmentById({ vaccineAppointmentId }) {
  try {
    const receivedData = yield call(
      getVaccineAppointmentByIdRequest,
      vaccineAppointmentId
    );
    yield put({
      type: GET_VACCINE_APPOINTMENT_BY_ID_SUCCESS,
      resVaccineAppointmentById: receivedData.data.result[0],
    });
  } catch (error) {
    yield put({ type: GET_VACCINE_APPOINTMENT_BY_ID_FAILED, error });
  }
}

export function* watchGetVaccineAppointmentById() {
  yield takeLatest(GET_VACCINE_APPOINTMENT_BY_ID, getVaccineAppointmentById);
}

export function* getPandemicVaccinationById({ vaccinationId }) {
  try {
    const receivedData = yield call(
      getPandemicVaccinationByIdRequest,
      vaccinationId
    );
    yield put({
      type: GET_PANDEMIC_VACCINATION_BY_ID_SUCCESS,
      resPandemicVaccinationById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PANDEMIC_VACCINATION_BY_ID_FAILED, error });
  }
}

export function* watchGetPandemicVaccinationById() {
  yield takeLatest(GET_PANDEMIC_VACCINATION_BY_ID, getPandemicVaccinationById);
}

export function* createVaccine({ userData, callback }) {
  try {
    yield call(postCovidVaccineRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Vaccine created successfully",
    });
    yield put({ type: GET_VACCINES });
    yield put({
      type: POST_VACCINE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({ type: POST_VACCINE_FAILED, error: displayError(error) });
  }
}

export function* watchCreateVaccine() {
  yield takeLatest(POST_VACCINE, createVaccine);
}

export function* updateVaccine({ userData, callback }) {
  try {
    yield call(putCovidVaccineRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Vaccine updated successfully",
    });
    yield put({ type: GET_VACCINES });
    yield put({
      type: PUT_VACCINE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({ type: PUT_VACCINE_FAILED, error: displayError(error) });
  }
}

export function* watchUpdateVaccine() {
  yield takeLatest(PUT_VACCINE, updateVaccine);
}

export function* createVaccinationCentre({ userData, callback }) {
  try {
    yield call(postVaccinationCentreRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Vaccination Centre created successfully",
    });
    yield put({ type: GET_VACCINATION_CENTRES });
    yield put({
      type: POST_VACCINATION_CENTRE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_VACCINATION_CENTRE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateVaccinationCentre() {
  yield takeLatest(POST_VACCINATION_CENTRE, createVaccinationCentre);
}

export function* updateVaccinationCentre({ userData, callback }) {
  try {
    yield call(putVaccinationCentreRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Vaccination Centre updated successfully",
    });
    yield put({ type: GET_VACCINATION_CENTRES });
    yield put({
      type: PUT_VACCINATION_CENTRE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_VACCINATION_CENTRE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateVaccinationCentre() {
  yield takeLatest(PUT_VACCINATION_CENTRE, updateVaccinationCentre);
}

export function* createScheduledVaccinationCentre({ userData, callback }) {
  try {
    yield call(postScheduledVaccinationCentreRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Scheduled Vaccination Centre created successfully",
    });
    yield put({ type: GET_SCHEDULED_VACCINATION_CENTRES });
    yield put({
      type: POST_SCHEDULED_VACCINATION_CENTRE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_SCHEDULED_VACCINATION_CENTRE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateScheduledVaccinationCentre() {
  yield takeLatest(
    POST_SCHEDULED_VACCINATION_CENTRE,
    createScheduledVaccinationCentre
  );
}

export function* updateScheduledVaccinationCentre({ userData, callback }) {
  try {
    yield call(putScheduledVaccinationCentreRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Scheduled Vaccination Centre updated successfully",
    });
    yield put({ type: GET_SCHEDULED_VACCINATION_CENTRES });
    yield put({
      type: PUT_SCHEDULED_VACCINATION_CENTRE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_SCHEDULED_VACCINATION_CENTRE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateScheduledVaccinationCentre() {
  yield takeLatest(
    PUT_SCHEDULED_VACCINATION_CENTRE,
    updateScheduledVaccinationCentre
  );
}

export function* createVaccineAppointment({ userData, callback }) {
  try {
    yield call(postVaccineAppointmentRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Vaccination appointment created successfully",
    });
    yield put({ type: GET_VACCINE_APPOINTMENTS });
    yield put({
      type: POST_VACCINE_APPOINTMENT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_VACCINE_APPOINTMENT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateVaccineAppointment() {
  yield takeLatest(POST_VACCINE_APPOINTMENT, createVaccineAppointment);
}

export function* updateVaccineAppointment({ userData, callback }) {
  try {
    yield call(putVaccineAppointmentRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Vaccination appointment updated successfully",
    });
    yield put({ type: GET_VACCINE_APPOINTMENTS });
    yield put({
      type: PUT_VACCINE_APPOINTMENT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_VACCINE_APPOINTMENT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateVaccineAppointment() {
  yield takeLatest(PUT_VACCINE_APPOINTMENT, updateVaccineAppointment);
}

export function* createPandemicVaccination({ userData, callback }) {
  try {
    yield call(postPandemicVaccinationRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Vaccination created successfully",
    });
    yield put({ type: GET_PANDEMIC_VACCINATIONS });
    yield put({
      type: POST_PANDEMIC_VACCINATION_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_PANDEMIC_VACCINATION_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreatePandemicVaccination() {
  yield takeLatest(POST_PANDEMIC_VACCINATION, createPandemicVaccination);
}

export function* updatePandemicVaccination({ userData, callback }) {
  try {
    yield call(putPandemicVaccinationRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Vaccination updated successfully",
    });
    yield put({ type: GET_PANDEMIC_VACCINATIONS });
    yield put({
      type: PUT_PANDEMIC_VACCINATION_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_PANDEMIC_VACCINATION_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdatePandemicVaccination() {
  yield takeLatest(PUT_PANDEMIC_VACCINATION, updatePandemicVaccination);
}

export function* getScheduledVaccinationCentresByInfo({ userData, callback }) {
  try {
    const receivedData = yield call(
      getScheduledVaccinationCentresByInfoRequest,
      userData
    );
    yield put({
      type: GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO_SUCCESS,
      resScheduledVaccinationCentresByInfo: receivedData.data.result,
    });
    let receivedDataList = receivedData.data.result.map((element) => ({
      ...element,
      timeSelected: "Forenoon",
      checked: false,
    }));
    callback(receivedDataList);
  } catch (error) {
    yield put({
      type: GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO_FAILED,
      error,
    });
  }
}

export function* watchGetScheduledVaccinationCentresByInfo() {
  yield takeLatest(
    GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO,
    getScheduledVaccinationCentresByInfo
  );
}
