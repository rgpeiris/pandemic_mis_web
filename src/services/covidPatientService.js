import { httpCovidPatient } from "./httpClient";

export const getCovidPatientsRequest = () => {
  return httpCovidPatient.get(`pandemic-patients`);
};

export const getCovidPatientsOverallStatsRequest = () => {
  return httpCovidPatient.get(`pandemic-patients-overall-stats`);
};

export const getCovidPatientsMonthlyConfirmedStatsRequest = () => {
  return httpCovidPatient.get(`pandemic-patients-monthly-confirmed-stats`);
};

export const postCovidPatientRequest = (userData) => {
  return httpCovidPatient.post(`pandemic-patient`, userData);
};

export const putCovidPatientRequest = (userData) => {
  return httpCovidPatient.put(`pandemic-patient`, userData);
};

export const getHospitalsRequest = () => {
  return httpCovidPatient.get(`hospitals`);
};

export const getGovOfficersInChargeRequest = () => {
  return httpCovidPatient.get(`local-government-in-chargers`);
};

export const getHealthcareProfessionalsRequest = () => {
  return httpCovidPatient.get(`healthcare-professionals`);
};

export const getCovidPatientByIdRequest = (patientId) => {
  return httpCovidPatient.get(`pandemic-patient/${patientId}`);
};

export const getMedicalHistoriesByIdRequest = (patientId) => {
  return httpCovidPatient.get(`patient-medical-history/${patientId}`);
};

export const postMedicalHistoryRequest = (userData) => {
  return httpCovidPatient.post(`patient-medical-history`, userData);
};

export const getHospitalByIdRequest = (hospitalId) => {
  return httpCovidPatient.get(`hospital/${hospitalId}`);
};

export const getGovOfficersInChargeByIdRequest = (govOfficerInChargeId) => {
  return httpCovidPatient.get(
    `local-government-in-charge/${govOfficerInChargeId}`
  );
};

export const getHealthcareProfessionalByIdRequest = (
  healthcareProfessionalId
) => {
  return httpCovidPatient.get(
    `healthcare-professional/${healthcareProfessionalId}`
  );
};

export const postHospitalRequest = (userData) => {
  return httpCovidPatient.post(`hospital`, userData);
};

export const putHospitalRequest = (userData) => {
  return httpCovidPatient.put(`hospital`, userData);
};

export const postGovOfficersInChargeRequest = (userData) => {
  return httpCovidPatient.post(`local-government-in-charge`, userData);
};

export const putGovOfficersInChargeRequest = (userData) => {
  return httpCovidPatient.put(`local-government-in-charge`, userData);
};

export const postHealthcareProfessionalRequest = (userData) => {
  return httpCovidPatient.post(`healthcare-professional`, userData);
};

export const putHealthcareProfessionalRequest = (userData) => {
  return httpCovidPatient.put(`healthcare-professional`, userData);
};

export const getCovidPatientsByGovernmentInChargeRequest = (
  governmentInCharge
) => {
  return httpCovidPatient.get(`pandemic-patients/${governmentInCharge}`);
};

export const getCovidPatientsByHealthcareProfessionalRequest = (
  healthcareProfessional
) => {
  return httpCovidPatient.get(
    `pandemic-patients-by-healthcare-professional?healthcareProfessional=${healthcareProfessional}`
  );
};
