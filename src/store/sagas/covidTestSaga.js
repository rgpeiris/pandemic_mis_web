import {
  GET_TESTINGS,
  GET_TESTINGS_SUCCESS,
  GET_TESTINGS_FAILED,
  GET_TEST_CENTRES,
  GET_TEST_CENTRES_SUCCESS,
  GET_TEST_CENTRES_FAILED,
  GET_SCHEDULED_TEST_CENTRES,
  GET_SCHEDULED_TEST_CENTRES_SUCCESS,
  GET_SCHEDULED_TEST_CENTRES_FAILED,
  GET_TESTS_APPOINTMENTS,
  GET_TESTS_APPOINTMENTS_SUCCESS,
  GET_TESTS_APPOINTMENTS_FAILED,
  GET_PANDEMIC_TEST_RESULTS,
  GET_PANDEMIC_TEST_RESULTS_SUCCESS,
  GET_PANDEMIC_TEST_RESULTS_FAILED,
  GET_TESTING_BY_ID,
  GET_TESTING_BY_ID_SUCCESS,
  GET_TESTING_BY_ID_FAILED,
  GET_TEST_CENTRE_BY_ID,
  GET_TEST_CENTRE_BY_ID_SUCCESS,
  GET_TEST_CENTRE_BY_ID_FAILED,
  GET_SCHEDULED_TEST_CENTRE_BY_ID,
  GET_SCHEDULED_TEST_CENTRE_BY_ID_SUCCESS,
  GET_SCHEDULED_TEST_CENTRE_BY_ID_FAILED,
  GET_TESTS_APPOINTMENT_BY_ID,
  GET_TESTS_APPOINTMENT_BY_ID_SUCCESS,
  GET_TESTS_APPOINTMENT_BY_ID_FAILED,
  GET_PANDEMIC_TEST_RESULT_BY_ID,
  GET_PANDEMIC_TEST_RESULT_BY_ID_SUCCESS,
  GET_PANDEMIC_TEST_RESULT_BY_ID_FAILED,
  POST_TESTING,
  POST_TESTING_SUCCESS,
  POST_TESTING_FAILED,
  POST_TEST_CENTRE,
  POST_TEST_CENTRE_SUCCESS,
  POST_TEST_CENTRE_FAILED,
  POST_SCHEDULED_TEST_CENTRE,
  POST_SCHEDULED_TEST_CENTRE_SUCCESS,
  POST_SCHEDULED_TEST_CENTRE_FAILED,
  POST_TESTS_APPOINTMENT,
  POST_TESTS_APPOINTMENT_SUCCESS,
  POST_TESTS_APPOINTMENT_FAILED,
  POST_PANDEMIC_TEST_RESULT,
  POST_PANDEMIC_TEST_RESULT_SUCCESS,
  POST_PANDEMIC_TEST_RESULT_FAILED,
  PUT_TESTING,
  PUT_TESTING_SUCCESS,
  PUT_TESTING_FAILED,
  PUT_TEST_CENTRE,
  PUT_TEST_CENTRE_SUCCESS,
  PUT_TEST_CENTRE_FAILED,
  PUT_SCHEDULED_TEST_CENTRE,
  PUT_SCHEDULED_TEST_CENTRE_SUCCESS,
  PUT_SCHEDULED_TEST_CENTRE_FAILED,
  PUT_TESTS_APPOINTMENT,
  PUT_TESTS_APPOINTMENT_SUCCESS,
  PUT_TESTS_APPOINTMENT_FAILED,
  PUT_PANDEMIC_TEST_RESULT,
  PUT_PANDEMIC_TEST_RESULT_SUCCESS,
  PUT_PANDEMIC_TEST_RESULT_FAILED,
  GET_SCHEDULED_TEST_CENTRES_BY_INFO,
  GET_SCHEDULED_TEST_CENTRES_BY_INFO_SUCCESS,
  GET_SCHEDULED_TEST_CENTRES_BY_INFO_FAILED,
  SUCCESS_TOAST,
} from "../actions";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  getCovidTestingsRequest,
  getTestCentresRequest,
  getScheduledTestCentresRequest,
  getTestsAppointmentsRequest,
  getPandemicTestResultsRequest,
  getCovidTestingByIdRequest,
  getTestCentreByIdRequest,
  getScheduledTestCentreByIdRequest,
  getTestsAppointmentByIdRequest,
  getPandemicTestResultByIdRequest,
  postCovidTestingRequest,
  postTestCentreRequest,
  postScheduledTestCentreRequest,
  postTestsAppointmentRequest,
  postPandemicTestResultRequest,
  putCovidTestingRequest,
  putTestCentreRequest,
  putScheduledTestCentreRequest,
  putTestsAppointmentRequest,
  putPandemicTestResultRequest,
  getScheduledTestCentresByInfoRequest,
} from "../../services";
import { displayError } from "../../utils";

export function* getTestings() {
  try {
    const receivedData = yield call(getCovidTestingsRequest);
    yield put({
      type: GET_TESTINGS_SUCCESS,
      response: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_TESTINGS_FAILED, error });
  }
}

export function* watchGetTestings() {
  yield takeLatest(GET_TESTINGS, getTestings);
}

export function* getTestCentres() {
  try {
    const receivedData = yield call(getTestCentresRequest);
    yield put({
      type: GET_TEST_CENTRES_SUCCESS,
      resTestCentres: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_TEST_CENTRES_FAILED, error });
  }
}

export function* watchGetTestCentres() {
  yield takeLatest(GET_TEST_CENTRES, getTestCentres);
}

export function* getScheduledTestCentres() {
  try {
    const receivedData = yield call(getScheduledTestCentresRequest);
    yield put({
      type: GET_SCHEDULED_TEST_CENTRES_SUCCESS,
      resScheduledTestCentres: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_SCHEDULED_TEST_CENTRES_FAILED, error });
  }
}

export function* watchGetScheduledTestCentres() {
  yield takeLatest(GET_SCHEDULED_TEST_CENTRES, getScheduledTestCentres);
}

export function* getTestsAppointments() {
  try {
    const receivedData = yield call(getTestsAppointmentsRequest);
    yield put({
      type: GET_TESTS_APPOINTMENTS_SUCCESS,
      resTestsAppointments: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_TESTS_APPOINTMENTS_FAILED, error });
  }
}

export function* watchGetTestsAppointments() {
  yield takeLatest(GET_TESTS_APPOINTMENTS, getTestsAppointments);
}

export function* getPandemicTestResults() {
  try {
    const receivedData = yield call(getPandemicTestResultsRequest);
    yield put({
      type: GET_PANDEMIC_TEST_RESULTS_SUCCESS,
      resPandemicTestResults: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PANDEMIC_TEST_RESULTS_FAILED, error });
  }
}

export function* watchGetPandemicTestResults() {
  yield takeLatest(GET_PANDEMIC_TEST_RESULTS, getPandemicTestResults);
}

export function* getTestingById({ testingId }) {
  try {
    const receivedData = yield call(getCovidTestingByIdRequest, testingId);
    yield put({
      type: GET_TESTING_BY_ID_SUCCESS,
      resCovidTestingById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_TESTING_BY_ID_FAILED, error });
  }
}

export function* watchGetTestingById() {
  yield takeLatest(GET_TESTING_BY_ID, getTestingById);
}

export function* getTestCentreById({ testCentreId }) {
  try {
    const receivedData = yield call(getTestCentreByIdRequest, testCentreId);
    yield put({
      type: GET_TEST_CENTRE_BY_ID_SUCCESS,
      resTestCentreById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_TEST_CENTRE_BY_ID_FAILED, error });
  }
}

export function* watchGetTestCentreById() {
  yield takeLatest(GET_TEST_CENTRE_BY_ID, getTestCentreById);
}

export function* getScheduledTestCentreById({ scheduledTestCentreId }) {
  try {
    const receivedData = yield call(
      getScheduledTestCentreByIdRequest,
      scheduledTestCentreId
    );
    yield put({
      type: GET_SCHEDULED_TEST_CENTRE_BY_ID_SUCCESS,
      resScheduledTestCentreById: receivedData.data.result[0],
    });
  } catch (error) {
    yield put({ type: GET_SCHEDULED_TEST_CENTRE_BY_ID_FAILED, error });
  }
}

export function* watchGetScheduledTestCentreById() {
  yield takeLatest(GET_SCHEDULED_TEST_CENTRE_BY_ID, getScheduledTestCentreById);
}

export function* getTestsAppointmentById({ testAppointmentId }) {
  try {
    const receivedData = yield call(
      getTestsAppointmentByIdRequest,
      testAppointmentId
    );
    yield put({
      type: GET_TESTS_APPOINTMENT_BY_ID_SUCCESS,
      resTestsAppointmentById: receivedData.data.result[0],
    });
  } catch (error) {
    yield put({ type: GET_TESTS_APPOINTMENT_BY_ID_FAILED, error });
  }
}

export function* watchGetTestsAppointmentById() {
  yield takeLatest(GET_TESTS_APPOINTMENT_BY_ID, getTestsAppointmentById);
}

export function* getPandemicTestResultById({ testResultId }) {
  try {
    const receivedData = yield call(
      getPandemicTestResultByIdRequest,
      testResultId
    );
    yield put({
      type: GET_PANDEMIC_TEST_RESULT_BY_ID_SUCCESS,
      resPandemicTestResultById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PANDEMIC_TEST_RESULT_BY_ID_FAILED, error });
  }
}

export function* watchGetPandemicTestResultById() {
  yield takeLatest(GET_PANDEMIC_TEST_RESULT_BY_ID, getPandemicTestResultById);
}

export function* createTesting({ userData, callback }) {
  try {
    yield call(postCovidTestingRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Testing created successfully",
    });
    yield put({ type: GET_TESTINGS });
    yield put({
      type: POST_TESTING_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_TESTING_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateTesting() {
  yield takeLatest(POST_TESTING, createTesting);
}

export function* updateTesting({ userData, callback }) {
  try {
    yield call(putCovidTestingRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Testing updated successfully",
    });
    yield put({ type: GET_TESTINGS });
    yield put({
      type: PUT_TESTING_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_TESTING_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateTesting() {
  yield takeLatest(PUT_TESTING, updateTesting);
}

export function* createTestCentre({ userData, callback }) {
  try {
    yield call(postTestCentreRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Test Centre created successfully",
    });
    yield put({ type: GET_TEST_CENTRES });
    yield put({
      type: POST_TEST_CENTRE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_TEST_CENTRE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateTestCentre() {
  yield takeLatest(POST_TEST_CENTRE, createTestCentre);
}

export function* updateTestCentre({ userData, callback }) {
  try {
    yield call(putTestCentreRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Test Centre updated successfully",
    });
    yield put({ type: GET_TEST_CENTRES });
    yield put({
      type: PUT_TEST_CENTRE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_TEST_CENTRE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateTestCentre() {
  yield takeLatest(PUT_TEST_CENTRE, updateTestCentre);
}

export function* createScheduledTestCentre({ userData, callback }) {
  try {
    yield call(postScheduledTestCentreRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Test Centre created successfully",
    });
    yield put({ type: GET_SCHEDULED_TEST_CENTRES });
    yield put({
      type: POST_SCHEDULED_TEST_CENTRE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_SCHEDULED_TEST_CENTRE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateScheduledTestCentre() {
  yield takeLatest(POST_SCHEDULED_TEST_CENTRE, createScheduledTestCentre);
}

export function* updateScheduledTestCentre({ userData, callback }) {
  try {
    yield call(putScheduledTestCentreRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Test Centre updated successfully",
    });
    yield put({ type: GET_SCHEDULED_TEST_CENTRES });
    yield put({
      type: PUT_SCHEDULED_TEST_CENTRE_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_SCHEDULED_TEST_CENTRE_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateScheduledTestCentre() {
  yield takeLatest(PUT_SCHEDULED_TEST_CENTRE, updateScheduledTestCentre);
}

export function* createTestsAppointment({ userData, callback }) {
  try {
    yield call(postTestsAppointmentRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Test appointment created successfully",
    });
    yield put({ type: GET_TESTS_APPOINTMENTS });
    yield put({
      type: POST_TESTS_APPOINTMENT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_TESTS_APPOINTMENT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreateTestsAppointment() {
  yield takeLatest(POST_TESTS_APPOINTMENT, createTestsAppointment);
}

export function* updateTestsAppointment({ userData, callback }) {
  try {
    yield call(putTestsAppointmentRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Test appointment updated successfully",
    });
    yield put({ type: GET_TESTS_APPOINTMENTS });
    yield put({
      type: PUT_TESTS_APPOINTMENT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_TESTS_APPOINTMENT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateTestsAppointment() {
  yield takeLatest(PUT_TESTS_APPOINTMENT, updateTestsAppointment);
}

export function* createPandemicTestResult({ userData, callback }) {
  try {
    yield call(postPandemicTestResultRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Test result created successfully",
    });
    yield put({ type: GET_PANDEMIC_TEST_RESULTS });
    yield put({
      type: POST_PANDEMIC_TEST_RESULT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: POST_PANDEMIC_TEST_RESULT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreatePandemicTestResult() {
  yield takeLatest(POST_PANDEMIC_TEST_RESULT, createPandemicTestResult);
}

export function* updatePandemicTestResult({ userData, callback }) {
  try {
    yield call(putPandemicTestResultRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Test result updated successfully",
    });
    yield put({ type: GET_PANDEMIC_TEST_RESULTS });
    yield put({
      type: PUT_PANDEMIC_TEST_RESULT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: PUT_PANDEMIC_TEST_RESULT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdatePandemicTestResult() {
  yield takeLatest(PUT_PANDEMIC_TEST_RESULT, updatePandemicTestResult);
}

export function* getScheduledTestCentresByInfo({ userData, callback }) {
  try {
    const receivedData = yield call(
      getScheduledTestCentresByInfoRequest,
      userData
    );
    yield put({
      type: GET_SCHEDULED_TEST_CENTRES_BY_INFO_SUCCESS,
      resScheduledTestCentresByInfo: receivedData.data.result,
    });
    let receivedDataList = receivedData.data.result.map((element) => ({
      ...element,
      timeSelected: "Forenoon",
      checked: false,
    }));
    callback(receivedDataList);
  } catch (error) {
    yield put({
      type: GET_SCHEDULED_TEST_CENTRES_BY_INFO_FAILED,
      error,
    });
  }
}

export function* watchGetScheduledTestCentresByInfo() {
  yield takeLatest(
    GET_SCHEDULED_TEST_CENTRES_BY_INFO,
    getScheduledTestCentresByInfo
  );
}
