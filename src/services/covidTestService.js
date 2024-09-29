import { httpCovidTest } from "./httpClient";

export const getCovidTestingsRequest = () => {
  return httpCovidTest.get(`viral-tests`);
};

export const getTestCentresRequest = () => {
  return httpCovidTest.get(`viral-test-centres`);
};

export const getScheduledTestCentresRequest = () => {
  return httpCovidTest.get(`scheduled-viral-test-centres/all`);
};

export const getTestsAppointmentsRequest = () => {
  return httpCovidTest.get(`viral-test-appointments/all`);
};

export const getPandemicTestResultsRequest = () => {
  return httpCovidTest.get(`viral-test-results`);
};

export const getCovidTestingByIdRequest = (testingId) => {
  return httpCovidTest.get(`viral-test/${testingId}`);
};

export const getTestCentreByIdRequest = (testCentreId) => {
  return httpCovidTest.get(`viral-test-centre/${testCentreId}`);
};

export const getScheduledTestCentreByIdRequest = (scheduledTestCentreId) => {
  return httpCovidTest.get(
    `scheduled-viral-test-centre/${scheduledTestCentreId}`
  );
};

export const getTestsAppointmentByIdRequest = (testAppointmentId) => {
  return httpCovidTest.get(`viral-test-appointment/${testAppointmentId}`);
};

export const getPandemicTestResultByIdRequest = (testResultId) => {
  return httpCovidTest.get(`viral-test-result/${testResultId}`);
};

export const postCovidTestingRequest = (userData) => {
  return httpCovidTest.post(`viral-test`, userData);
};

export const postTestCentreRequest = (userData) => {
  return httpCovidTest.post(`viral-test-centre`, userData);
};

export const postScheduledTestCentreRequest = (userData) => {
  return httpCovidTest.post(`scheduled-viral-test-centre`, userData);
};

export const postTestsAppointmentRequest = (userData) => {
  return httpCovidTest.post(`viral-test-appointment`, userData);
};

export const postPandemicTestResultRequest = (userData) => {
  return httpCovidTest.post(`viral-test-result`, userData);
};

export const putCovidTestingRequest = (userData) => {
  return httpCovidTest.put(`viral-test`, userData);
};

export const putTestCentreRequest = (userData) => {
  return httpCovidTest.put(`viral-test-centre`, userData);
};

export const putScheduledTestCentreRequest = (userData) => {
  return httpCovidTest.put(`scheduled-viral-test-centre`, userData);
};

export const putTestsAppointmentRequest = (userData) => {
  return httpCovidTest.put(`viral-test-appointment`, userData);
};

export const putPandemicTestResultRequest = (userData) => {
  return httpCovidTest.put(`viral-test-result`, userData);
};

export const getScheduledTestCentresByInfoRequest = (userData) => {
  return httpCovidTest.get(
    `scheduled-viral-test-centres?district=${userData.district}&city=${userData.city}&date=${userData.date}`
  );
};
