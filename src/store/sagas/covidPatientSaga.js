import {
  GET_PATIENTS,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILED,
  CREATE_COVID_PATIENT,
  CREATE_COVID_PATIENT_SUCCESS,
  CREATE_COVID_PATIENT_FAILED,
  UPDATE_COVID_PATIENT,
  UPDATE_COVID_PATIENT_SUCCESS,
  UPDATE_COVID_PATIENT_FAILED,
  GET_HOSPITALS,
  GET_HOSPITALS_SUCCESS,
  GET_HOSPITALS_FAILED,
  GET_GOV_OFFICERS_IN_CHARGE,
  GET_GOV_OFFICERS_IN_CHARGE_SUCCESS,
  GET_GOV_OFFICERS_IN_CHARGE_FAILED,
  GET_HEALTHCARE_PROFESSIONALS,
  GET_HEALTHCARE_PROFESSIONALS_SUCCESS,
  GET_HEALTHCARE_PROFESSIONALS_FAILED,
  GET_PATIENT_BY_ID,
  GET_PATIENT_BY_ID_SUCCESS,
  GET_PATIENT_BY_ID_FAILED,
  GET_MEDICAL_HISTORIES_BY_ID,
  GET_MEDICAL_HISTORIES_BY_ID_SUCCESS,
  GET_MEDICAL_HISTORIES_BY_ID_FAILED,
  CREATE_MEDICAL_HISTORY,
  CREATE_MEDICAL_HISTORY_SUCCESS,
  CREATE_MEDICAL_HISTORY_FAILED,
  GET_HOSPITAL_BY_ID,
  GET_HOSPITAL_BY_ID_SUCCESS,
  GET_HOSPITAL_BY_ID_FAILED,
  CREATE_HOSPITAL,
  CREATE_HOSPITAL_SUCCESS,
  CREATE_HOSPITAL_FAILED,
  UPDATE_HOSPITAL,
  UPDATE_HOSPITAL_SUCCESS,
  UPDATE_HOSPITAL_FAILED,
  GET_GOV_OFFICERS_IN_CHARGE_BY_ID,
  GET_GOV_OFFICERS_IN_CHARGE_BY_ID_SUCCESS,
  GET_GOV_OFFICERS_IN_CHARGE_BY_ID_FAILED,
  CREATE_GOV_OFFICERS_IN_CHARGE,
  CREATE_GOV_OFFICERS_IN_CHARGE_SUCCESS,
  CREATE_GOV_OFFICERS_IN_CHARGE_FAILED,
  UPDATE_GOV_OFFICERS_IN_CHARGE,
  UPDATE_GOV_OFFICERS_IN_CHARGE_SUCCESS,
  UPDATE_GOV_OFFICERS_IN_CHARGE_FAILED,
  GET_HEALTHCARE_PROFESSIONAL_BY_ID,
  GET_HEALTHCARE_PROFESSIONAL_BY_ID_SUCCESS,
  GET_HEALTHCARE_PROFESSIONAL_BY_ID_FAILED,
  CREATE_HEALTHCARE_PROFESSIONAL,
  CREATE_HEALTHCARE_PROFESSIONAL_SUCCESS,
  CREATE_HEALTHCARE_PROFESSIONAL_FAILED,
  UPDATE_HEALTHCARE_PROFESSIONAL,
  UPDATE_HEALTHCARE_PROFESSIONAL_SUCCESS,
  UPDATE_HEALTHCARE_PROFESSIONAL_FAILED,
  GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE,
  GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE_SUCCESS,
  GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE_FAILED,
  GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL,
  GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL_SUCCESS,
  GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL_FAILED,
  GET_PATIENTS_OVERALL_STATS,
  GET_PATIENTS_OVERALL_STATS_SUCCESS,
  GET_PATIENTS_OVERALL_STATS_FAILED,
  GET_PATIENTS_MONTHLY_CONFIRMED_STATS,
  GET_PATIENTS_MONTHLY_CONFIRMED_STATS_SUCCESS,
  GET_PATIENTS_MONTHLY_CONFIRMED_STATS_FAILED,
  SUCCESS_TOAST,
} from "../actions";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  getCovidPatientsRequest,
  postCovidPatientRequest,
  putCovidPatientRequest,
  getHospitalsRequest,
  getGovOfficersInChargeRequest,
  getHealthcareProfessionalsRequest,
  getCovidPatientByIdRequest,
  getMedicalHistoriesByIdRequest,
  postMedicalHistoryRequest,
  getHospitalByIdRequest,
  getGovOfficersInChargeByIdRequest,
  getHealthcareProfessionalByIdRequest,
  postHospitalRequest,
  putHospitalRequest,
  postGovOfficersInChargeRequest,
  putGovOfficersInChargeRequest,
  postHealthcareProfessionalRequest,
  putHealthcareProfessionalRequest,
  getCovidPatientsByGovernmentInChargeRequest,
  getCovidPatientsByHealthcareProfessionalRequest,
  getCovidPatientsOverallStatsRequest,
  getCovidPatientsMonthlyConfirmedStatsRequest,
} from "../../services";
import { displayError } from "../../utils";

export function* getPatients() {
  try {
    const receivedData = yield call(getCovidPatientsRequest);
    yield put({
      type: GET_PATIENTS_SUCCESS,
      response: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PATIENTS_FAILED, error });
  }
}

export function* watchGetPatients() {
  yield takeLatest(GET_PATIENTS, getPatients);
}

export function* getPatientsOverallStats() {
  try {
    const receivedData = yield call(getCovidPatientsOverallStatsRequest);
    var overallStatus = [
      { type: "TOTAL CONFIRMED", count: 0 },
      { type: "ACTIVE", count: 0 },
      { type: "RECOVERED", count: 0 },
      { type: "DEATHS", count: 0 },
    ];

    for (var key in receivedData.data.result) {
      var obj = receivedData.data.result[key];

      if (
        obj.status === "Registration Completed" ||
        obj.status === "Home Quarantined" ||
        obj.status === "Hospitalized" ||
        obj.status === "Approval Pending"
      ) {
        overallStatus[1].count += obj.count;
      }
      if (obj.status === "Released") {
        overallStatus[2].count += obj.count;
      }
      if (obj.status === "Deceased" || obj.type === "Deceased After Realease") {
        overallStatus[3].count += obj.count;
      }
    }

    overallStatus[0].count =
      overallStatus[1].count + overallStatus[2].count + overallStatus[3].count;

    yield put({
      type: GET_PATIENTS_OVERALL_STATS_SUCCESS,
      resCovidPatientsOverallStats: overallStatus,
    });
  } catch (error) {
    yield put({ type: GET_PATIENTS_OVERALL_STATS_FAILED, error });
  }
}

export function* watchGetPatientsOverallStats() {
  yield takeLatest(GET_PATIENTS_OVERALL_STATS, getPatientsOverallStats);
}

export function* getPatientsMonthlyConfirmedStats() {
  try {
    const receivedData = yield call(
      getCovidPatientsMonthlyConfirmedStatsRequest
    );
    var dataset = [
      {
        count: 0,
        month: "Jan",
      },
      {
        count: 2,
        month: "Feb",
      },
      {
        count: 1,
        month: "Mar",
      },
      {
        count: 0,
        month: "Apr",
      },
      {
        count: 0,
        month: "May",
      },
      {
        count: 0,
        month: "June",
      },
      {
        count: 0,
        month: "July",
      },
      {
        count: 0,
        month: "Aug",
      },
      {
        count: 0,
        month: "Sept",
      },
      {
        count: 0,
        month: "Oct",
      },
      {
        count: 0,
        month: "Nov",
      },
      {
        count: 0,
        month: "Dec",
      },
    ];

    for (var key in receivedData.data.result) {
      var obj = receivedData.data.result[key];

      if (obj.month === 1) {
        dataset[0].count = obj.count;
      }
      if (obj.month === 2) {
        dataset[1].count = obj.count;
      }
      if (obj.month === 3) {
        dataset[2].count = obj.count;
      }
      if (obj.month === 4) {
        dataset[3].count = obj.count;
      }
      if (obj.month === 5) {
        dataset[4].count = obj.count;
      }
      if (obj.month === 6) {
        dataset[5].count = obj.count;
      }
      if (obj.month === 7) {
        dataset[6].count = obj.count;
      }
      if (obj.month === 8) {
        dataset[7].count = obj.count;
      }
      if (obj.month === 9) {
        dataset[8].count = obj.count;
      }
      if (obj.month === 10) {
        dataset[9].count = obj.count;
      }
      if (obj.month === 11) {
        dataset[10].count = obj.count;
      }
      if (obj.month === 12) {
        dataset[11].count = obj.count;
      }
    }

    yield put({
      type: GET_PATIENTS_MONTHLY_CONFIRMED_STATS_SUCCESS,
      resCovidPatientsMonthlyConfirmedStats: dataset,
    });
  } catch (error) {
    yield put({ type: GET_PATIENTS_MONTHLY_CONFIRMED_STATS_FAILED, error });
  }
}

export function* watchGetPatientsMonthlyConfirmedStats() {
  yield takeLatest(
    GET_PATIENTS_MONTHLY_CONFIRMED_STATS,
    getPatientsMonthlyConfirmedStats
  );
}

export function* getPatientById({ patientId }) {
  try {
    const receivedData = yield call(getCovidPatientByIdRequest, patientId);
    yield put({
      type: GET_PATIENT_BY_ID_SUCCESS,
      resCovidPatientById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PATIENT_BY_ID_FAILED, error });
  }
}

export function* watchGetPatientById() {
  yield takeLatest(GET_PATIENT_BY_ID, getPatientById);
}

export function* createCovidPatient({ userData, callback }) {
  try {
    yield call(postCovidPatientRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Patient created successfully",
    });
    yield put({ type: GET_PATIENTS });
    yield put({
      type: CREATE_COVID_PATIENT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: CREATE_COVID_PATIENT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateCovidPatient() {
  yield takeLatest(CREATE_COVID_PATIENT, createCovidPatient);
}

export function* updateCovidPatient({ userData, navigate }) {
  try {
    yield call(putCovidPatientRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Patient updated successfully",
    });
    yield put({ type: GET_PATIENTS });
    yield put({
      type: UPDATE_COVID_PATIENT_SUCCESS,
    });
    navigate("/covid-patient-management");
  } catch (error) {
    yield put({
      type: UPDATE_COVID_PATIENT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateCovidPatient() {
  yield takeLatest(UPDATE_COVID_PATIENT, updateCovidPatient);
}

export function* getHospitals() {
  try {
    const receivedData = yield call(getHospitalsRequest);
    yield put({
      type: GET_HOSPITALS_SUCCESS,
      resHospitals: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_HOSPITALS_FAILED, error });
  }
}

export function* watchGetHospitals() {
  yield takeLatest(GET_HOSPITALS, getHospitals);
}

export function* getGovOfficersInCharge() {
  try {
    const receivedData = yield call(getGovOfficersInChargeRequest);
    yield put({
      type: GET_GOV_OFFICERS_IN_CHARGE_SUCCESS,
      resGovOfficersInCharge: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_GOV_OFFICERS_IN_CHARGE_FAILED, error });
  }
}

export function* watchGetGovOfficersInCharge() {
  yield takeLatest(GET_GOV_OFFICERS_IN_CHARGE, getGovOfficersInCharge);
}

export function* getHealthcareProfessionals() {
  try {
    const receivedData = yield call(getHealthcareProfessionalsRequest);
    yield put({
      type: GET_HEALTHCARE_PROFESSIONALS_SUCCESS,
      resHealthcareProfessionals: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_HEALTHCARE_PROFESSIONALS_FAILED, error });
  }
}

export function* watchGetHealthcareProfessionals() {
  yield takeLatest(GET_HEALTHCARE_PROFESSIONALS, getHealthcareProfessionals);
}

export function* getMedicalHistoriesById({ patientId }) {
  try {
    const receivedData = yield call(getMedicalHistoriesByIdRequest, patientId);
    yield put({
      type: GET_MEDICAL_HISTORIES_BY_ID_SUCCESS,
      resMedicalHistoriesById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_MEDICAL_HISTORIES_BY_ID_FAILED, error });
  }
}

export function* watchGetMedicalHistoriesById() {
  yield takeLatest(GET_MEDICAL_HISTORIES_BY_ID, getMedicalHistoriesById);
}

export function* createMedicalHistory({ userData, callback }) {
  try {
    yield call(postMedicalHistoryRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Medical history created successfully",
    });
    yield put({
      type: GET_MEDICAL_HISTORIES_BY_ID,
      patientId: userData?.patientId,
    });
    yield put({
      type: CREATE_MEDICAL_HISTORY_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: CREATE_MEDICAL_HISTORY_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateMedicalHistory() {
  yield takeLatest(CREATE_MEDICAL_HISTORY, createMedicalHistory);
}

export function* getHospitalById({ hospitalId }) {
  try {
    const receivedData = yield call(getHospitalByIdRequest, hospitalId);
    yield put({
      type: GET_HOSPITAL_BY_ID_SUCCESS,
      resHospitalById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_HOSPITAL_BY_ID_FAILED, error });
  }
}

export function* watchGetHospitalById() {
  yield takeLatest(GET_HOSPITAL_BY_ID, getHospitalById);
}

export function* createHospital({ userData, callback }) {
  try {
    yield call(postHospitalRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Hospital created successfully",
    });
    yield put({ type: GET_HOSPITALS });
    yield put({
      type: CREATE_HOSPITAL_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: CREATE_HOSPITAL_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateHospital() {
  yield takeLatest(CREATE_HOSPITAL, createHospital);
}

export function* updateHospital({ userData, callback }) {
  try {
    yield call(putHospitalRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Hospital updated successfully",
    });
    yield put({ type: GET_HOSPITALS });
    yield put({
      type: UPDATE_HOSPITAL_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: UPDATE_HOSPITAL_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateHospital() {
  yield takeLatest(UPDATE_HOSPITAL, updateHospital);
}

export function* getGovOfficersInChargeById({ govOfficerInChargeId }) {
  try {
    const receivedData = yield call(
      getGovOfficersInChargeByIdRequest,
      govOfficerInChargeId
    );
    yield put({
      type: GET_GOV_OFFICERS_IN_CHARGE_BY_ID_SUCCESS,
      resGovOfficerInChargeById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_GOV_OFFICERS_IN_CHARGE_BY_ID_FAILED, error });
  }
}

export function* watchGetGovOfficersInChargeById() {
  yield takeLatest(
    GET_GOV_OFFICERS_IN_CHARGE_BY_ID,
    getGovOfficersInChargeById
  );
}

export function* createGovOfficersInCharge({ userData, callback }) {
  try {
    yield call(postGovOfficersInChargeRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Government officer in charge created successfully",
    });
    yield put({ type: GET_GOV_OFFICERS_IN_CHARGE });
    yield put({
      type: CREATE_GOV_OFFICERS_IN_CHARGE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: CREATE_GOV_OFFICERS_IN_CHARGE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateGovOfficersInCharge() {
  yield takeLatest(CREATE_GOV_OFFICERS_IN_CHARGE, createGovOfficersInCharge);
}

export function* updateGovOfficersInCharge({ userData, callback }) {
  try {
    yield call(putGovOfficersInChargeRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Government officer in charge updated successfully",
    });
    yield put({ type: GET_GOV_OFFICERS_IN_CHARGE });
    yield put({
      type: UPDATE_GOV_OFFICERS_IN_CHARGE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: UPDATE_GOV_OFFICERS_IN_CHARGE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateGovOfficersInCharge() {
  yield takeLatest(UPDATE_GOV_OFFICERS_IN_CHARGE, updateGovOfficersInCharge);
}

export function* getHealthcareProfessionalById({ healthcareProfessionalId }) {
  try {
    const receivedData = yield call(
      getHealthcareProfessionalByIdRequest,
      healthcareProfessionalId
    );
    yield put({
      type: GET_HEALTHCARE_PROFESSIONAL_BY_ID_SUCCESS,
      resHealthcareProfessionalById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_HEALTHCARE_PROFESSIONAL_BY_ID_FAILED, error });
  }
}

export function* watchGetHealthcareProfessionalById() {
  yield takeLatest(
    GET_HEALTHCARE_PROFESSIONAL_BY_ID,
    getHealthcareProfessionalById
  );
}

export function* createHealthcareProfessional({ userData, callback }) {
  try {
    yield call(postHealthcareProfessionalRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Healthcare Professional created successfully",
    });
    yield put({ type: GET_HEALTHCARE_PROFESSIONALS });
    yield put({
      type: CREATE_HEALTHCARE_PROFESSIONAL_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: CREATE_HEALTHCARE_PROFESSIONAL_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateHealthcareProfessional() {
  yield takeLatest(
    CREATE_HEALTHCARE_PROFESSIONAL,
    createHealthcareProfessional
  );
}

export function* updateHealthcareProfessional({ userData, callback }) {
  try {
    yield call(putHealthcareProfessionalRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Healthcare Professional updated successfully",
    });
    yield put({ type: GET_HEALTHCARE_PROFESSIONALS });
    yield put({
      type: UPDATE_HEALTHCARE_PROFESSIONAL_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: UPDATE_HEALTHCARE_PROFESSIONAL_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateHealthcareProfessional() {
  yield takeLatest(
    UPDATE_HEALTHCARE_PROFESSIONAL,
    updateHealthcareProfessional
  );
}

export function* getPatientsByGovernmentInCharge({ governmentInCharge }) {
  try {
    const receivedData = yield call(
      getCovidPatientsByGovernmentInChargeRequest,
      governmentInCharge
    );
    yield put({
      type: GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE_SUCCESS,
      resCovidPatientsByGovernmentInCharge: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE_FAILED, error });
  }
}

export function* watchGetPatientsByGovernmentInCharge() {
  yield takeLatest(
    GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE,
    getPatientsByGovernmentInCharge
  );
}

export function* getPatientsByHealthcareProfessional({
  healthcareProfessional,
}) {
  try {
    const receivedData = yield call(
      getCovidPatientsByHealthcareProfessionalRequest,
      healthcareProfessional
    );
    yield put({
      type: GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL_SUCCESS,
      resCovidPatientsByHealthcareProfessional: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL_FAILED, error });
  }
}

export function* watchGetPatientsByHealthcareProfessional() {
  yield takeLatest(
    GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL,
    getPatientsByHealthcareProfessional
  );
}
