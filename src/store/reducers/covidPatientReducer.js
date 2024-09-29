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
} from "../actions";

export const initialState = {
  isGettingPatients: false,
  isErrorGettingPatients: false,
  covidPatients: [],
  isGettingPatientsOverallStats: false,
  isErrorGettingPatientsOverallStats: false,
  covidPatientsOverallStats: [],
  isGettingPatientsMonthlyConfirmedStats: false,
  isErrorGettingPatientsMonthlyConfirmedStats: false,
  covidPatientsMonthlyConfirmedStats: [
    {
      count: 0,
      month: "Jan",
    },
  ],
  isCreatingCovidPatient: false,
  isErrorCreatingCovidPatient: false,
  isUpdatingCovidPatient: false,
  isErrorUpdatingCovidPatient: false,
  isGettingHospitals: false,
  isErrorGettingHospitals: false,
  hospitals: [],
  isGettingGovOfficersInCharge: false,
  isErrorGettingGovOfficersInCharge: false,
  govOfficersInCharge: [],
  isGettingHealthcareProfessionals: false,
  isErrorGettingHealthcareProfessionals: false,
  healthcareProfessionals: [],
  isGettingPatientById: false,
  isErrorGettingPatientById: false,
  covidPatientById: [],
  isGettingMedicalHistoriesById: false,
  isErrorGettingMedicalHistoriesById: false,
  medicalHistoriesById: [],
  isCreatingMedicalHistory: false,
  isErrorCreatingMedicalHistory: false,
  isGettingHospitalById: false,
  isErrorGettingHospitalById: false,
  hospitalById: {},
  isGettingGovOfficerInChargeById: false,
  isErrorGettingGovOfficerInChargeById: false,
  govOfficerInChargeById: {},
  isGettingHealthcareProfessionalById: false,
  isErrorGettingHealthcareProfessionalById: false,
  healthcareProfessionalById: {},
  isCreatingHospital: false,
  isErrorCreatingHospital: false,
  isUpdatingHospital: false,
  isErrorUpdatingHospital: false,
  isCreatingGovOfficerInCharge: false,
  isErrorCreatingGovOfficerInCharge: false,
  isUpdatingGovOfficerInCharge: false,
  isErrorUpdatingGovOfficerInCharge: false,
  isCreatingHealthcareProfessional: false,
  isErrorCreatingHealthcareProfessional: false,
  isUpdatingHealthcareProfessional: false,
  isErrorUpdatingHealthcareProfessional: false,
  isGettingPatientsByGovernmentInCharge: false,
  isErrorGettingPatientsByGovernmentInCharge: false,
  covidPatientsByGovernmentInCharge: [],
  isGettingPatientsByHealthcareProfessional: false,
  isErrorGettingPatientsByHealthcareProfessional: false,
  covidPatientsByHealthcareProfessional: [],
};

const covidPatientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        isGettingPatients: true,
        isErrorGettingPatients: false,
      };

    case GET_PATIENTS_SUCCESS:
      const { response } = action;
      return {
        ...state,
        isGettingPatients: false,
        covidPatients: response,
      };

    case GET_PATIENTS_FAILED:
      return {
        ...state,
        isGettingPatients: false,
        isErrorGettingPatients: true,
      };

    case GET_PATIENTS_OVERALL_STATS:
      return {
        ...state,
        isGettingPatientsOverallStats: true,
        isErrorGettingPatientsOverallStats: false,
      };

    case GET_PATIENTS_OVERALL_STATS_SUCCESS:
      const { resCovidPatientsOverallStats } = action;
      return {
        ...state,
        isGettingPatientsOverallStats: false,
        covidPatientsOverallStats: resCovidPatientsOverallStats,
      };

    case GET_PATIENTS_OVERALL_STATS_FAILED:
      return {
        ...state,
        isGettingPatientsOverallStats: false,
        isErrorGettingPatientsOverallStats: true,
      };

    case GET_PATIENTS_MONTHLY_CONFIRMED_STATS:
      return {
        ...state,
        isGettingPatientsMonthlyConfirmedStats: true,
        isErrorGettingPatientsMonthlyConfirmedStats: false,
      };

    case GET_PATIENTS_MONTHLY_CONFIRMED_STATS_SUCCESS:
      const { resCovidPatientsMonthlyConfirmedStats } = action;
      return {
        ...state,
        isGettingPatientsMonthlyConfirmedStats: false,
        covidPatientsMonthlyConfirmedStats:
          resCovidPatientsMonthlyConfirmedStats,
      };

    case GET_PATIENTS_MONTHLY_CONFIRMED_STATS_FAILED:
      return {
        ...state,
        isGettingPatientsMonthlyConfirmedStats: false,
        isErrorGettingPatientsMonthlyConfirmedStats: true,
      };

    case CREATE_COVID_PATIENT:
      return {
        ...state,
        isCreatingCovidPatient: true,
        isErrorCreatingCovidPatient: false,
      };

    case CREATE_COVID_PATIENT_SUCCESS:
      return {
        ...state,
        isCreatingCovidPatient: false,
      };

    case CREATE_COVID_PATIENT_FAILED:
      return {
        ...state,
        isCreatingCovidPatient: false,
        isErrorCreatingCovidPatient: true,
      };

    case UPDATE_COVID_PATIENT:
      return {
        ...state,
        isUpdatingCovidPatient: true,
        isErrorUpdatingCovidPatient: false,
      };

    case UPDATE_COVID_PATIENT_SUCCESS:
      return {
        ...state,
        isUpdatingCovidPatient: false,
      };

    case UPDATE_COVID_PATIENT_FAILED:
      return {
        ...state,
        isUpdatingCovidPatient: false,
        isErrorUpdatingCovidPatient: true,
      };

    case GET_HOSPITALS:
      return {
        ...state,
        isGettingHospitals: true,
        isErrorGettingHospitals: false,
      };

    case GET_HOSPITALS_SUCCESS:
      const { resHospitals } = action;
      return {
        ...state,
        isGettingHospitals: false,
        hospitals: resHospitals,
      };

    case GET_HOSPITALS_FAILED:
      return {
        ...state,
        isGettingHospitals: false,
        isErrorGettingHospitals: true,
      };

    case GET_GOV_OFFICERS_IN_CHARGE:
      return {
        ...state,
        isGettingGovOfficersInCharge: true,
        isErrorGettingGovOfficersInCharge: false,
      };

    case GET_GOV_OFFICERS_IN_CHARGE_SUCCESS:
      const { resGovOfficersInCharge } = action;
      return {
        ...state,
        isGettingGovOfficersInCharge: false,
        govOfficersInCharge: resGovOfficersInCharge,
      };

    case GET_GOV_OFFICERS_IN_CHARGE_FAILED:
      return {
        ...state,
        isGettingGovOfficersInCharge: false,
        isErrorGettingGovOfficersInCharge: true,
      };

    case GET_HEALTHCARE_PROFESSIONALS:
      return {
        ...state,
        isGettingHealthcareProfessionals: true,
        isErrorGettingHealthcareProfessionals: false,
      };

    case GET_HEALTHCARE_PROFESSIONALS_SUCCESS:
      const { resHealthcareProfessionals } = action;
      return {
        ...state,
        isGettingHealthcareProfessionals: false,
        healthcareProfessionals: resHealthcareProfessionals,
      };

    case GET_HEALTHCARE_PROFESSIONALS_FAILED:
      return {
        ...state,
        isGettingHealthcareProfessionals: false,
        isErrorGettingHealthcareProfessionals: true,
      };

    case GET_PATIENT_BY_ID:
      return {
        ...state,
        isGettingPatientById: true,
        isErrorGettingPatientById: false,
      };

    case GET_PATIENT_BY_ID_SUCCESS:
      const { resCovidPatientById } = action;
      return {
        ...state,
        isGettingPatientById: false,
        covidPatientById: resCovidPatientById,
      };

    case GET_PATIENT_BY_ID_FAILED:
      return {
        ...state,
        isGettingPatientById: false,
        isErrorGettingPatientById: true,
      };

    case GET_MEDICAL_HISTORIES_BY_ID:
      return {
        ...state,
        isGettingMedicalHistoriesById: true,
        isErrorGettingMedicalHistoriesById: false,
      };

    case GET_MEDICAL_HISTORIES_BY_ID_SUCCESS:
      const { resMedicalHistoriesById } = action;
      return {
        ...state,
        isGettingMedicalHistoriesById: false,
        medicalHistoriesById: resMedicalHistoriesById,
      };

    case GET_MEDICAL_HISTORIES_BY_ID_FAILED:
      return {
        ...state,
        isGettingMedicalHistoriesById: false,
        isErrorGettingMedicalHistoriesById: true,
      };

    case CREATE_MEDICAL_HISTORY:
      return {
        ...state,
        isCreatingMedicalHistory: true,
        isErrorCreatingMedicalHistory: false,
      };

    case CREATE_MEDICAL_HISTORY_SUCCESS:
      return {
        ...state,
        isCreatingMedicalHistory: false,
      };

    case CREATE_MEDICAL_HISTORY_FAILED:
      return {
        ...state,
        isCreatingMedicalHistory: false,
        isErrorCreatingMedicalHistory: true,
      };

    case GET_HOSPITAL_BY_ID:
      return {
        ...state,
        isGettingHospitalById: true,
        isErrorGettingHospitalById: false,
      };

    case GET_HOSPITAL_BY_ID_SUCCESS:
      const { resHospitalById } = action;
      return {
        ...state,
        isGettingHospitalById: false,
        hospitalById: resHospitalById,
      };

    case GET_HOSPITAL_BY_ID_FAILED:
      return {
        ...state,
        isGettingHospitalById: false,
        isErrorGettingHospitalById: true,
      };

    case GET_GOV_OFFICERS_IN_CHARGE_BY_ID:
      return {
        ...state,
        isGettingGovOfficerInChargeById: true,
        isErrorGettingGovOfficerInChargeById: false,
      };

    case GET_GOV_OFFICERS_IN_CHARGE_BY_ID_SUCCESS:
      const { resGovOfficerInChargeById } = action;
      return {
        ...state,
        isGettingGovOfficerInChargeById: false,
        govOfficerInChargeById: resGovOfficerInChargeById,
      };

    case GET_GOV_OFFICERS_IN_CHARGE_BY_ID_FAILED:
      return {
        ...state,
        isGettingGovOfficerInChargeById: false,
        isErrorGettingGovOfficerInChargeById: true,
      };

    case GET_HEALTHCARE_PROFESSIONAL_BY_ID:
      return {
        ...state,
        isGettingHealthcareProfessionalById: true,
        isErrorGettingHealthcareProfessionalById: false,
      };

    case GET_HEALTHCARE_PROFESSIONAL_BY_ID_SUCCESS:
      const { resHealthcareProfessionalById } = action;
      return {
        ...state,
        isGettingHealthcareProfessionalById: false,
        healthcareProfessionalById: resHealthcareProfessionalById,
      };

    case GET_HEALTHCARE_PROFESSIONAL_BY_ID_FAILED:
      return {
        ...state,
        isGettingHealthcareProfessionalById: false,
        isErrorGettingHealthcareProfessionalById: true,
      };

    case CREATE_HOSPITAL:
      return {
        ...state,
        isCreatingHospital: true,
        isErrorCreatingHospital: false,
      };

    case CREATE_HOSPITAL_SUCCESS:
      return {
        ...state,
        isCreatingHospital: false,
      };

    case CREATE_HOSPITAL_FAILED:
      return {
        ...state,
        isCreatingHospital: false,
        isErrorCreatingHospital: true,
      };

    case UPDATE_HOSPITAL:
      return {
        ...state,
        isUpdatingHospital: true,
        isErrorUpdatingHospital: false,
      };

    case UPDATE_HOSPITAL_SUCCESS:
      return {
        ...state,
        isUpdatingHospital: false,
      };

    case UPDATE_HOSPITAL_FAILED:
      return {
        ...state,
        isUpdatingHospital: false,
        isErrorUpdatingHospital: true,
      };

    case CREATE_GOV_OFFICERS_IN_CHARGE:
      return {
        ...state,
        isCreatingGovOfficerInCharge: true,
        isErrorCreatingGovOfficerInCharge: false,
      };

    case CREATE_GOV_OFFICERS_IN_CHARGE_SUCCESS:
      return {
        ...state,
        isCreatingGovOfficerInCharge: false,
      };

    case CREATE_GOV_OFFICERS_IN_CHARGE_FAILED:
      return {
        ...state,
        isCreatingGovOfficerInCharge: false,
        isErrorCreatingGovOfficerInCharge: true,
      };

    case UPDATE_GOV_OFFICERS_IN_CHARGE:
      return {
        ...state,
        isUpdatingGovOfficerInCharge: true,
        isErrorUpdatingGovOfficerInCharge: false,
      };

    case UPDATE_GOV_OFFICERS_IN_CHARGE_SUCCESS:
      return {
        ...state,
        isUpdatingGovOfficerInCharge: false,
      };

    case UPDATE_GOV_OFFICERS_IN_CHARGE_FAILED:
      return {
        ...state,
        isUpdatingGovOfficerInCharge: false,
        isErrorUpdatingGovOfficerInCharge: true,
      };

    case CREATE_HEALTHCARE_PROFESSIONAL:
      return {
        ...state,
        isCreatingHealthcareProfessional: true,
        isErrorCreatingHealthcareProfessional: false,
      };

    case CREATE_HEALTHCARE_PROFESSIONAL_SUCCESS:
      return {
        ...state,
        isCreatingHealthcareProfessional: false,
      };

    case CREATE_HEALTHCARE_PROFESSIONAL_FAILED:
      return {
        ...state,
        isCreatingHealthcareProfessional: false,
        isErrorCreatingHealthcareProfessional: true,
      };

    case UPDATE_HEALTHCARE_PROFESSIONAL:
      return {
        ...state,
        isUpdatingHealthcareProfessional: true,
        isErrorUpdatingHealthcareProfessional: false,
      };

    case UPDATE_HEALTHCARE_PROFESSIONAL_SUCCESS:
      return {
        ...state,
        isUpdatingHealthcareProfessional: false,
      };

    case UPDATE_HEALTHCARE_PROFESSIONAL_FAILED:
      return {
        ...state,
        isUpdatingHealthcareProfessional: false,
        isErrorUpdatingHealthcareProfessional: true,
      };

    case GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE:
      return {
        ...state,
        isGettingPatientsByGovernmentInCharge: true,
        isErrorGettingPatientsByGovernmentInCharge: false,
      };

    case GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE_SUCCESS:
      const { resCovidPatientsByGovernmentInCharge } = action;
      return {
        ...state,
        isGettingPatientsByGovernmentInCharge: false,
        covidPatientsByGovernmentInCharge: resCovidPatientsByGovernmentInCharge,
      };

    case GET_PATIENTS_BY_GOVERNMENT_IN_CHARGE_FAILED:
      return {
        ...state,
        isGettingPatientsByGovernmentInCharge: false,
        isErrorGettingPatientsByGovernmentInCharge: true,
      };

    case GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL:
      return {
        ...state,
        isGettingPatientsByHealthcareProfessional: true,
        isErrorGettingPatientsByHealthcareProfessional: false,
      };

    case GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL_SUCCESS:
      const { resCovidPatientsByHealthcareProfessional } = action;
      return {
        ...state,
        isGettingPatientsByHealthcareProfessional: false,
        covidPatientsByHealthcareProfessional:
          resCovidPatientsByHealthcareProfessional,
      };

    case GET_PATIENTS_BY_HEALTHCARE_PROFESSIONAL_FAILED:
      return {
        ...state,
        isGettingPatientsByHealthcareProfessional: false,
        isErrorGettingPatientsByHealthcareProfessional: true,
      };

    default:
      return state;
  }
};

export default covidPatientReducer;
