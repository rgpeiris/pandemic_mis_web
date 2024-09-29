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
} from "./types";

export const getPatients = () => ({
  type: GET_PATIENTS,
});

export const getPatientsSuccess = (response) => ({
  type: GET_PATIENTS_SUCCESS,
  response,
});

export const getPatientsFailed = (error) => ({
  type: GET_PATIENTS_FAILED,
  error,
});

export const getPatientsOverallStats = () => ({
  type: GET_PATIENTS_OVERALL_STATS,
});

export const getPatientsOverallStatsSuccess = (response) => ({
  type: GET_PATIENTS_OVERALL_STATS_SUCCESS,
  response,
});

export const getPatientsOverallStatsFailed = (error) => ({
  type: GET_PATIENTS_OVERALL_STATS_FAILED,
  error,
});

export const getPatientsMonthlyConfirmedStats = () => ({
  type: GET_PATIENTS_MONTHLY_CONFIRMED_STATS,
});

export const getPatientsMonthlyConfirmedStatsSuccess = (response) => ({
  type: GET_PATIENTS_MONTHLY_CONFIRMED_STATS_SUCCESS,
  response,
});

export const getPatientsMonthlyConfirmedStatsFailed = (error) => ({
  type: GET_PATIENTS_MONTHLY_CONFIRMED_STATS_FAILED,
  error,
});

export const getPatientById = (patientId) => ({
  type: GET_PATIENT_BY_ID,
  patientId,
});

export const getPatientByIdSuccess = (response) => ({
  type: GET_PATIENT_BY_ID_SUCCESS,
  response,
});

export const getPatientByIdFailed = (error) => ({
  type: GET_PATIENT_BY_ID_FAILED,
  error,
});

export const createCovidPatient = (userData, callback) => {
  return {
    type: CREATE_COVID_PATIENT,
    userData,
    callback,
  };
};

export const createCovidPatientSuccess = (response) => ({
  type: CREATE_COVID_PATIENT_SUCCESS,
  response,
});

export const createCovidPatientFailed = (error) => ({
  type: CREATE_COVID_PATIENT_FAILED,
  error,
});

export const updateCovidPatient = (userData, navigate) => {
  return {
    type: UPDATE_COVID_PATIENT,
    userData,
    navigate,
  };
};

export const updateCovidPatientSuccess = (response) => ({
  type: UPDATE_COVID_PATIENT_SUCCESS,
  response,
});

export const updateCovidPatientFailed = (error) => ({
  type: UPDATE_COVID_PATIENT_FAILED,
  error,
});

export const getHospitals = () => ({
  type: GET_HOSPITALS,
});

export const getHospitalsSuccess = (response) => ({
  type: GET_HOSPITALS_SUCCESS,
  response,
});

export const getHospitalsFailed = (error) => ({
  type: GET_HOSPITALS_FAILED,
  error,
});

export const getGovOfficersInCharge = () => ({
  type: GET_GOV_OFFICERS_IN_CHARGE,
});

export const getGovOfficersInChargeSuccess = (response) => ({
  type: GET_GOV_OFFICERS_IN_CHARGE_SUCCESS,
  response,
});

export const getGovOfficersInChargeFailed = (error) => ({
  type: GET_GOV_OFFICERS_IN_CHARGE_FAILED,
  error,
});

export const getHealthcareProfessionals = () => ({
  type: GET_HEALTHCARE_PROFESSIONALS,
});

export const getHealthcareProfessionalsSuccess = (response) => ({
  type: GET_HEALTHCARE_PROFESSIONALS_SUCCESS,
  response,
});

export const getHealthcareProfessionalsFailed = (error) => ({
  type: GET_HEALTHCARE_PROFESSIONALS_FAILED,
  error,
});

export const getMedicalHistoryById = (patientId) => ({
  type: GET_MEDICAL_HISTORIES_BY_ID,
  patientId,
});

export const getMedicalHistoryByIdSuccess = (response) => ({
  type: GET_MEDICAL_HISTORIES_BY_ID_SUCCESS,
  response,
});

export const getMedicalHistoryByIdFailed = (error) => ({
  type: GET_MEDICAL_HISTORIES_BY_ID_FAILED,
  error,
});

export const createMedicalHistory = (userData, callback) => {
  return {
    type: CREATE_MEDICAL_HISTORY,
    userData,
    callback,
  };
};

export const createMedicalHistorySuccess = (response) => ({
  type: CREATE_MEDICAL_HISTORY_SUCCESS,
  response,
});

export const createMedicalHistoryFailed = (error) => ({
  type: CREATE_MEDICAL_HISTORY_FAILED,
  error,
});

export const getHospitalById = (hospitalId) => ({
  type: GET_HOSPITAL_BY_ID,
  hospitalId,
});

export const getHospitalByIdSuccess = (response) => ({
  type: GET_HOSPITAL_BY_ID_SUCCESS,
  response,
});

export const getHospitalByIdFailed = (error) => ({
  type: GET_HOSPITAL_BY_ID_FAILED,
  error,
});

export const createHospital = (userData, callback) => {
  return {
    type: CREATE_HOSPITAL,
    userData,
    callback,
  };
};

export const createHospitalSuccess = (response) => ({
  type: CREATE_HOSPITAL_SUCCESS,
  response,
});

export const createHospitalFailed = (error) => ({
  type: CREATE_HOSPITAL_FAILED,
  error,
});

export const updateHospital = (userData, callback) => {
  return {
    type: UPDATE_HOSPITAL,
    userData,
    callback,
  };
};

export const updateHospitalSuccess = (response) => ({
  type: UPDATE_HOSPITAL_SUCCESS,
  response,
});

export const updateHospitalFailed = (error) => ({
  type: UPDATE_HOSPITAL_FAILED,
  error,
});

export const getGovOfficersInChargeById = (govOfficerInChargeId) => ({
  type: GET_GOV_OFFICERS_IN_CHARGE_BY_ID,
  govOfficerInChargeId,
});

export const getGovOfficersInChargeByIdSuccess = (response) => ({
  type: GET_GOV_OFFICERS_IN_CHARGE_BY_ID_SUCCESS,
  response,
});

export const getGovOfficersInChargeByIdFailed = (error) => ({
  type: GET_GOV_OFFICERS_IN_CHARGE_BY_ID_FAILED,
  error,
});

export const createGovOfficersInCharge = (userData, callback) => {
  return {
    type: CREATE_GOV_OFFICERS_IN_CHARGE,
    userData,
    callback,
  };
};

export const createGovOfficersInChargeSuccess = (response) => ({
  type: CREATE_GOV_OFFICERS_IN_CHARGE_SUCCESS,
  response,
});

export const createGovOfficersInChargeFailed = (error) => ({
  type: CREATE_GOV_OFFICERS_IN_CHARGE_FAILED,
  error,
});

export const updateGovOfficersInCharge = (userData, callback) => {
  return {
    type: UPDATE_GOV_OFFICERS_IN_CHARGE,
    userData,
    callback,
  };
};

export const updateGovOfficersInChargeSuccess = (response) => ({
  type: UPDATE_GOV_OFFICERS_IN_CHARGE_SUCCESS,
  response,
});

export const updateGovOfficersInChargeFailed = (error) => ({
  type: UPDATE_GOV_OFFICERS_IN_CHARGE_FAILED,
  error,
});

export const getHealthcareProfessionalById = (healthcareProfessionalId) => ({
  type: GET_HEALTHCARE_PROFESSIONAL_BY_ID,
  healthcareProfessionalId,
});

export const getHealthcareProfessionalByIdSuccess = (response) => ({
  type: GET_HEALTHCARE_PROFESSIONAL_BY_ID_SUCCESS,
  response,
});

export const getHealthcareProfessionalByIdFailed = (error) => ({
  type: GET_HEALTHCARE_PROFESSIONAL_BY_ID_FAILED,
  error,
});

export const createHealthcareProfessional = (userData, callback) => {
  return {
    type: CREATE_HEALTHCARE_PROFESSIONAL,
    userData,
    callback,
  };
};

export const createHealthcareProfessionalSuccess = (response) => ({
  type: CREATE_HEALTHCARE_PROFESSIONAL_SUCCESS,
  response,
});

export const createHealthcareProfessionalFailed = (error) => ({
  type: CREATE_HEALTHCARE_PROFESSIONAL_FAILED,
  error,
});

export const updateHealthcareProfessional = (userData, callback) => {
  return {
    type: UPDATE_HEALTHCARE_PROFESSIONAL,
    userData,
    callback,
  };
};

export const updateHealthcareProfessionalSuccess = (response) => ({
  type: UPDATE_HEALTHCARE_PROFESSIONAL_SUCCESS,
  response,
});

export const updateHealthcareProfessionalFailed = (error) => ({
  type: UPDATE_HEALTHCARE_PROFESSIONAL_FAILED,
  error,
});

export const getPatientsByGovernmentInCharge = (governmentInCharge) => ({
  type: GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE,
  governmentInCharge,
});

export const getPatientsByGovernmentInChargeSuccess = (response) => ({
  type: GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE_SUCCESS,
  response,
});

export const getPatientsByGovernmentInChargeFailed = (error) => ({
  type: GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE_FAILED,
  error,
});

export const getPatientsByHealthcareProfessional = (
  healthcareProfessional
) => ({
  type: GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL,
  healthcareProfessional,
});

export const getPatientsByHealthcareProfessionalSuccess = (response) => ({
  type: GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL_SUCCESS,
  response,
});

export const getPatientsByHealthcareProfessionalFailed = (error) => ({
  type: GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL_FAILED,
  error,
});
