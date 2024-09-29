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
} from "./types";

export const getTestings = () => ({
  type: GET_TESTINGS,
});

export const getTestingsSuccess = (response) => ({
  type: GET_TESTINGS_SUCCESS,
  response,
});

export const getTestingsFailed = (error) => ({
  type: GET_TESTINGS_FAILED,
  error,
});

export const getTestCentres = () => ({
  type: GET_TEST_CENTRES,
});

export const getTestCentresSuccess = (response) => ({
  type: GET_TEST_CENTRES_SUCCESS,
  response,
});

export const getTestCentresFailed = (error) => ({
  type: GET_TEST_CENTRES_FAILED,
  error,
});

export const getScheduledTestCentres = () => ({
  type: GET_SCHEDULED_TEST_CENTRES,
});

export const getScheduledTestCentresSuccess = (response) => ({
  type: GET_SCHEDULED_TEST_CENTRES_SUCCESS,
  response,
});

export const getScheduledTestCentresFailed = (error) => ({
  type: GET_SCHEDULED_TEST_CENTRES_FAILED,
  error,
});

export const getTestsAppointments = () => ({
  type: GET_TESTS_APPOINTMENTS,
});

export const getTestsAppointmentsSuccess = (response) => ({
  type: GET_TESTS_APPOINTMENTS_SUCCESS,
  response,
});

export const getTestsAppointmentsFailed = (error) => ({
  type: GET_TESTS_APPOINTMENTS_FAILED,
  error,
});

export const getPandemicTestResults = () => ({
  type: GET_PANDEMIC_TEST_RESULTS,
});

export const getPandemicTestResultsSuccess = (response) => ({
  type: GET_PANDEMIC_TEST_RESULTS_SUCCESS,
  response,
});

export const getPandemicTestResultsFailed = (error) => ({
  type: GET_PANDEMIC_TEST_RESULTS_FAILED,
  error,
});

export const getTestingById = (testingId) => ({
  type: GET_TESTING_BY_ID,
  testingId,
});

export const getTestingByIdSuccess = (response) => ({
  type: GET_TESTING_BY_ID_SUCCESS,
  response,
});

export const getTestingByIdFailed = (error) => ({
  type: GET_TESTING_BY_ID_FAILED,
  error,
});

export const getTestCentreById = (testCentreId) => ({
  type: GET_TEST_CENTRE_BY_ID,
  testCentreId,
});

export const getTestCentreByIdSuccess = (response) => ({
  type: GET_TEST_CENTRE_BY_ID_SUCCESS,
  response,
});

export const getTestCentreByIdFailed = (error) => ({
  type: GET_TEST_CENTRE_BY_ID_FAILED,
  error,
});

export const getScheduledTestCentreById = (scheduledTestCentreId) => ({
  type: GET_SCHEDULED_TEST_CENTRE_BY_ID,
  scheduledTestCentreId,
});

export const getScheduledTestCentreByIdSuccess = (response) => ({
  type: GET_SCHEDULED_TEST_CENTRE_BY_ID_SUCCESS,
  response,
});

export const getScheduledTestCentreByIdFailed = (error) => ({
  type: GET_SCHEDULED_TEST_CENTRE_BY_ID_FAILED,
  error,
});

export const getTestsAppointmentById = (testAppointmentId) => ({
  type: GET_TESTS_APPOINTMENT_BY_ID,
  testAppointmentId,
});

export const getTestsAppointmentByIdSuccess = (response) => ({
  type: GET_TESTS_APPOINTMENT_BY_ID_SUCCESS,
  response,
});

export const getTestsAppointmentByIdFailed = (error) => ({
  type: GET_TESTS_APPOINTMENT_BY_ID_FAILED,
  error,
});

export const getPandemicTestResultById = (testResultId) => ({
  type: GET_PANDEMIC_TEST_RESULT_BY_ID,
  testResultId,
});

export const getPandemicTestResultByIdSuccess = (response) => ({
  type: GET_PANDEMIC_TEST_RESULT_BY_ID_SUCCESS,
  response,
});

export const getPandemicTestResultByIdFailed = (error) => ({
  type: GET_PANDEMIC_TEST_RESULT_BY_ID_FAILED,
  error,
});

export const createTesting = (userData, callback) => {
  return {
    type: POST_TESTING,
    userData,
    callback,
  };
};

export const createTestingSuccess = (response) => ({
  type: POST_TESTING_SUCCESS,
  response,
});

export const createTestingFailed = (error) => ({
  type: POST_TESTING_FAILED,
  error,
});

export const updateTesting = (userData, callback) => {
  return {
    type: PUT_TESTING,
    userData,
    callback,
  };
};

export const updateTestingSuccess = (response) => ({
  type: PUT_TESTING_SUCCESS,
  response,
});

export const updateTestingFailed = (error) => ({
  type: PUT_TESTING_FAILED,
  error,
});

export const createTestCentre = (userData, callback) => {
  return {
    type: POST_TEST_CENTRE,
    userData,
    callback,
  };
};

export const createTestCentreSuccess = (response) => ({
  type: POST_TEST_CENTRE_SUCCESS,
  response,
});

export const createTestCentreFailed = (error) => ({
  type: POST_TEST_CENTRE_FAILED,
  error,
});

export const updateTestCentre = (userData, callback) => {
  return {
    type: PUT_TEST_CENTRE,
    userData,
    callback,
  };
};

export const updateTestCentreSuccess = (response) => ({
  type: PUT_TEST_CENTRE_SUCCESS,
  response,
});

export const updateTestCentreFailed = (error) => ({
  type: PUT_TEST_CENTRE_FAILED,
  error,
});

export const createScheduledTestCentre = (userData, callback) => {
  return {
    type: POST_SCHEDULED_TEST_CENTRE,
    userData,
    callback,
  };
};

export const createScheduledTestCentreSuccess = (response) => ({
  type: POST_SCHEDULED_TEST_CENTRE_SUCCESS,
  response,
});

export const createScheduledTestCentreFailed = (error) => ({
  type: POST_SCHEDULED_TEST_CENTRE_FAILED,
  error,
});

export const upateScheduledTestCentre = (userData, callback) => {
  return {
    type: PUT_SCHEDULED_TEST_CENTRE,
    userData,
    callback,
  };
};

export const upateScheduledTestCentreSuccess = (response) => ({
  type: PUT_SCHEDULED_TEST_CENTRE_SUCCESS,
  response,
});

export const upateScheduledTestCentreFailed = (error) => ({
  type: PUT_SCHEDULED_TEST_CENTRE_FAILED,
  error,
});

export const createTestsAppointment = (userData, callback) => {
  return {
    type: POST_TESTS_APPOINTMENT,
    userData,
    callback,
  };
};

export const createTestsAppointmentSuccess = (response) => ({
  type: POST_TESTS_APPOINTMENT_SUCCESS,
  response,
});

export const createTestsAppointmentFailed = (error) => ({
  type: POST_TESTS_APPOINTMENT_FAILED,
  error,
});

export const updateTestsAppointment = (userData, callback) => {
  return {
    type: PUT_TESTS_APPOINTMENT,
    userData,
    callback,
  };
};

export const updateTestsAppointmentSuccess = (response) => ({
  type: PUT_TESTS_APPOINTMENT_SUCCESS,
  response,
});

export const updateTestsAppointmentFailed = (error) => ({
  type: PUT_TESTS_APPOINTMENT_FAILED,
  error,
});

export const createPandemicTestResult = (userData, callback) => {
  return {
    type: POST_PANDEMIC_TEST_RESULT,
    userData,
    callback,
  };
};

export const createPandemicTestResultSuccess = (response) => ({
  type: POST_PANDEMIC_TEST_RESULT_SUCCESS,
  response,
});

export const createPandemicTestResultFailed = (error) => ({
  type: POST_PANDEMIC_TEST_RESULT_FAILED,
  error,
});

export const updatePandemicTestResult = (userData, callback) => {
  return {
    type: PUT_PANDEMIC_TEST_RESULT,
    userData,
    callback,
  };
};

export const updatePandemicTestResultSuccess = (response) => ({
  type: PUT_PANDEMIC_TEST_RESULT_SUCCESS,
  response,
});

export const updatePandemicTestResultFailed = (error) => ({
  type: PUT_PANDEMIC_TEST_RESULT_FAILED,
  error,
});

export const getScheduledTestCentresByInfo = (userData, callback) => ({
  type: GET_SCHEDULED_TEST_CENTRES_BY_INFO,
  userData,
  callback,
});

export const getScheduledTestCentresByInfoSuccess = (response) => ({
  type: GET_SCHEDULED_TEST_CENTRES_BY_INFO_SUCCESS,
  response,
});

export const getScheduledTestCentresByInfoFailed = (error) => ({
  type: GET_SCHEDULED_TEST_CENTRES_BY_INFO_FAILED,
  error,
});
