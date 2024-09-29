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
} from "../actions";

export const initialState = {
  isGettingVaccines: false,
  isErrorGettingVaccines: false,
  covidVaccines: [],
  isGettingVaccinationCentres: false,
  isErrorGettingVaccinationCentres: false,
  vaccinationCentres: [],
  isGettingScheduledVaccinationCentres: false,
  isErrorGettingScheduledVaccinationCentres: false,
  scheduledVaccinationCentres: [],
  isGettingVaccineAppointments: false,
  isErrorGettingVaccineAppointments: false,
  vaccineAppointments: [],
  isGettingPandemicVaccinations: false,
  isErrorGettingPandemicVaccinations: false,
  pandemicVaccinations: [],
  isGettingVaccineById: false,
  isErrorGettingVaccineById: false,
  covidVaccineById: {},
  isGettingVaccinationCentreById: false,
  isErrorGettingVaccinationCentreById: false,
  vaccinationCentreById: {},
  isGettingScheduledVaccinationCentreById: false,
  isErrorGettingScheduledVaccinationCentreById: false,
  scheduledVaccinationCentreById: {},
  isGettingVaccineAppointmentById: false,
  isErrorGettingVaccineAppointmentById: false,
  vaccineAppointmentById: {},
  isGettingPandemicVaccinationById: false,
  isErrorGettingPandemicVaccinationById: false,
  pandemicVaccinationById: {},
  isCreatingVaccine: false,
  isErrorCreatingVaccine: false,
  isUpdatingVaccine: false,
  isErrorUpdatingVaccine: false,
  isCreatingVaccinationCentre: false,
  isErrorCreatingVaccinationCentre: false,
  isUpdatingVaccinationCentre: false,
  isErrorUpdatingVaccinationCentre: false,
  isCreatingScheduledVaccinationCentre: false,
  isErrorCreatingScheduledVaccinationCentre: false,
  isUpdatingScheduledVaccinationCentre: false,
  isErrorUpdatingScheduledVaccinationCentre: false,
  isCreatingVaccineAppointment: false,
  isErrorCreatingVaccineAppointment: false,
  isUpdatingVaccineAppointment: false,
  isErrorUpdatingVaccineAppointment: false,
  isCreatingPandemicVaccination: false,
  isErrorCreatingPandemicVaccination: false,
  isUpdatingPandemicVaccination: false,
  isErrorUpdatingPandemicVaccination: false,
  isGettingScheduledVaccinationCentresByInfo: false,
  isErrorGettingScheduledVaccinationCentresByInfo: false,
  scheduledVaccinationCentresByInfo: [],
};

const covidVaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VACCINES:
      return {
        ...state,
        isGettingVaccines: true,
        isErrorGettingVaccines: false,
      };

    case GET_VACCINES_SUCCESS:
      const { response } = action;
      return {
        ...state,
        isGettingVaccines: false,
        covidVaccines: response,
      };

    case GET_VACCINES_FAILED:
      return {
        ...state,
        isGettingVaccines: false,
        isErrorGettingVaccines: true,
      };

    case GET_VACCINATION_CENTRES:
      return {
        ...state,
        isGettingVaccinationCentres: true,
        isErrorGettingVaccinationCentres: false,
      };

    case GET_VACCINATION_CENTRES_SUCCESS:
      const { resVaccinationCentres } = action;
      return {
        ...state,
        isGettingVaccinationCentres: false,
        vaccinationCentres: resVaccinationCentres,
      };

    case GET_VACCINATION_CENTRES_FAILED:
      return {
        ...state,
        isGettingVaccinationCentres: false,
        isErrorGettingVaccinationCentres: true,
      };

    case GET_SCHEDULED_VACCINATION_CENTRES:
      return {
        ...state,
        isGettingScheduledVaccinationCentres: true,
        isErrorGettingScheduledVaccinationCentres: false,
      };

    case GET_SCHEDULED_VACCINATION_CENTRES_SUCCESS:
      const { resScheduledVaccinationCentres } = action;
      return {
        ...state,
        isGettingScheduledVaccinationCentres: false,
        scheduledVaccinationCentres: resScheduledVaccinationCentres,
      };

    case GET_SCHEDULED_VACCINATION_CENTRES_FAILED:
      return {
        ...state,
        isGettingScheduledVaccinationCentres: false,
        isErrorGettingScheduledVaccinationCentres: true,
      };

    case GET_VACCINE_APPOINTMENTS:
      return {
        ...state,
        isGettingVaccineAppointments: true,
        isErrorGettingVaccineAppointments: false,
      };

    case GET_VACCINE_APPOINTMENTS_SUCCESS:
      const { resVaccineAppointments } = action;
      return {
        ...state,
        isGettingVaccineAppointments: false,
        vaccineAppointments: resVaccineAppointments,
      };

    case GET_VACCINE_APPOINTMENTS_FAILED:
      return {
        ...state,
        isGettingVaccineAppointments: false,
        isErrorGettingVaccineAppointments: true,
      };

    case GET_PANDEMIC_VACCINATIONS:
      return {
        ...state,
        isGettingPandemicVaccinations: true,
        isErrorGettingPandemicVaccinations: false,
      };

    case GET_PANDEMIC_VACCINATIONS_SUCCESS:
      const { resPandemicVaccinations } = action;
      return {
        ...state,
        isGettingPandemicVaccinations: false,
        pandemicVaccinations: resPandemicVaccinations,
      };

    case GET_PANDEMIC_VACCINATIONS_FAILED:
      return {
        ...state,
        isGettingPandemicVaccinations: false,
        isErrorGettingPandemicVaccinations: true,
      };

    case GET_VACCINE_BY_ID:
      return {
        ...state,
        isGettingVaccineById: true,
        isErrorGettingVaccineById: false,
      };

    case GET_VACCINE_BY_ID_SUCCESS:
      const { resCovidVaccineById } = action;
      return {
        ...state,
        isGettingVaccineById: false,
        covidVaccineById: resCovidVaccineById,
      };

    case GET_VACCINE_BY_ID_FAILED:
      return {
        ...state,
        isGettingVaccineById: false,
        isErrorGettingVaccineById: true,
      };

    case GET_VACCINATION_CENTRE_BY_ID:
      return {
        ...state,
        isGettingVaccinationCentreById: true,
        isErrorGettingVaccinationCentreById: false,
      };

    case GET_VACCINATION_CENTRE_BY_ID_SUCCESS:
      const { resVaccinationCentreById } = action;
      return {
        ...state,
        isGettingVaccinationCentreById: false,
        vaccinationCentreById: resVaccinationCentreById,
      };

    case GET_VACCINATION_CENTRE_BY_ID_FAILED:
      return {
        ...state,
        isGettingVaccinationCentreById: false,
        isErrorGettingVaccinationCentreById: true,
      };

    case GET_SCHEDULED_VACCINATION_CENTRE_BY_ID:
      return {
        ...state,
        isGettingScheduledVaccinationCentreById: true,
        isErrorGettingScheduledVaccinationCentreById: false,
      };

    case GET_SCHEDULED_VACCINATION_CENTRE_BY_ID_SUCCESS:
      const { resScheduledVaccinationCentreById } = action;
      return {
        ...state,
        isGettingScheduledVaccinationCentreById: false,
        scheduledVaccinationCentreById: resScheduledVaccinationCentreById,
      };

    case GET_SCHEDULED_VACCINATION_CENTRE_BY_ID_FAILED:
      return {
        ...state,
        isGettingScheduledVaccinationCentreById: false,
        isErrorGettingScheduledVaccinationCentreById: true,
      };

    case GET_VACCINE_APPOINTMENT_BY_ID:
      return {
        ...state,
        isGettingVaccineAppointmentById: true,
        isErrorGettingVaccineAppointmentById: false,
      };

    case GET_VACCINE_APPOINTMENT_BY_ID_SUCCESS:
      const { resVaccineAppointmentById } = action;
      return {
        ...state,
        isGettingVaccineAppointmentById: false,
        vaccineAppointmentById: resVaccineAppointmentById,
      };

    case GET_VACCINE_APPOINTMENT_BY_ID_FAILED:
      return {
        ...state,
        isGettingVaccineAppointmentById: false,
        isErrorGettingVaccineAppointmentById: true,
      };

    case GET_PANDEMIC_VACCINATION_BY_ID:
      return {
        ...state,
        isGettingPandemicVaccinationById: true,
        isErrorGettingPandemicVaccinationById: false,
      };

    case GET_PANDEMIC_VACCINATION_BY_ID_SUCCESS:
      const { resPandemicVaccinationById } = action;
      return {
        ...state,
        isGettingPandemicVaccinationById: false,
        pandemicVaccinationById: resPandemicVaccinationById,
      };

    case GET_PANDEMIC_VACCINATION_BY_ID_FAILED:
      return {
        ...state,
        isGettingPandemicVaccinationById: false,
        isErrorGettingPandemicVaccinationById: true,
      };

    case POST_VACCINE:
      return {
        ...state,
        isCreatingVaccine: true,
        isErrorCreatingVaccine: false,
      };

    case POST_VACCINE_SUCCESS:
      return {
        ...state,
        isCreatingVaccine: false,
      };

    case POST_VACCINE_FAILED:
      return {
        ...state,
        isCreatingVaccine: false,
        isErrorCreatingVaccine: true,
      };

    case PUT_VACCINE:
      return {
        ...state,
        isUpdatingVaccine: true,
        isErrorUpdatingVaccine: false,
      };

    case PUT_VACCINE_SUCCESS:
      return {
        ...state,
        isUpdatingVaccine: false,
      };

    case PUT_VACCINE_FAILED:
      return {
        ...state,
        isUpdatingVaccine: false,
        isErrorUpdatingVaccine: true,
      };

    case POST_VACCINATION_CENTRE:
      return {
        ...state,
        isCreatingVaccinationCentre: true,
        isErrorCreatingVaccinationCentre: false,
      };

    case POST_VACCINATION_CENTRE_SUCCESS:
      return {
        ...state,
        isCreatingVaccinationCentre: false,
      };

    case POST_VACCINATION_CENTRE_FAILED:
      return {
        ...state,
        isCreatingVaccinationCentre: false,
        isErrorCreatingVaccinationCentre: true,
      };

    case PUT_VACCINATION_CENTRE:
      return {
        ...state,
        isUpdatingVaccinationCentre: true,
        isErrorUpdatingVaccinationCentre: false,
      };

    case PUT_VACCINATION_CENTRE_SUCCESS:
      return {
        ...state,
        isUpdatingVaccinationCentre: false,
      };

    case PUT_VACCINATION_CENTRE_FAILED:
      return {
        ...state,
        isUpdatingVaccinationCentre: false,
        isErrorUpdatingVaccinationCentre: true,
      };

    case POST_SCHEDULED_VACCINATION_CENTRE:
      return {
        ...state,
        isCreatingScheduledVaccinationCentre: true,
        isErrorCreatingScheduledVaccinationCentre: false,
      };

    case POST_SCHEDULED_VACCINATION_CENTRE_SUCCESS:
      return {
        ...state,
        isCreatingScheduledVaccinationCentre: false,
      };

    case POST_SCHEDULED_VACCINATION_CENTRE_FAILED:
      return {
        ...state,
        isCreatingScheduledVaccinationCentre: false,
        isErrorCreatingScheduledVaccinationCentre: true,
      };

    case PUT_SCHEDULED_VACCINATION_CENTRE:
      return {
        ...state,
        isUpdatingScheduledVaccinationCentre: true,
        isErrorUpdatingScheduledVaccinationCentre: false,
      };

    case PUT_SCHEDULED_VACCINATION_CENTRE_SUCCESS:
      return {
        ...state,
        isUpdatingScheduledVaccinationCentre: false,
      };

    case PUT_SCHEDULED_VACCINATION_CENTRE_FAILED:
      return {
        ...state,
        isUpdatingScheduledVaccinationCentre: false,
        isErrorUpdatingScheduledVaccinationCentre: true,
      };

    case POST_VACCINE_APPOINTMENT:
      return {
        ...state,
        isCreatingVaccineAppointment: true,
        isErrorCreatingVaccineAppointment: false,
      };

    case POST_VACCINE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isCreatingVaccineAppointment: false,
      };

    case POST_VACCINE_APPOINTMENT_FAILED:
      return {
        ...state,
        isCreatingVaccineAppointment: false,
        isErrorCreatingVaccineAppointment: true,
      };

    case PUT_VACCINE_APPOINTMENT:
      return {
        ...state,
        isUpdatingVaccineAppointment: true,
        isErrorUpdatingVaccineAppointment: false,
      };

    case PUT_VACCINE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isUpdatingVaccineAppointment: false,
      };

    case PUT_VACCINE_APPOINTMENT_FAILED:
      return {
        ...state,
        isUpdatingVaccineAppointment: false,
        isErrorUpdatingVaccineAppointment: true,
      };

    case POST_PANDEMIC_VACCINATION:
      return {
        ...state,
        isCreatingPandemicVaccination: true,
        isErrorCreatingPandemicVaccination: false,
      };

    case POST_PANDEMIC_VACCINATION_SUCCESS:
      return {
        ...state,
        isCreatingPandemicVaccination: false,
      };

    case POST_PANDEMIC_VACCINATION_FAILED:
      return {
        ...state,
        isCreatingPandemicVaccination: false,
        isErrorCreatingPandemicVaccination: true,
      };

    case PUT_PANDEMIC_VACCINATION:
      return {
        ...state,
        isUpdatingPandemicVaccination: true,
        isErrorUpdatingPandemicVaccination: false,
      };

    case PUT_PANDEMIC_VACCINATION_SUCCESS:
      return {
        ...state,
        isUpdatingPandemicVaccination: false,
      };

    case PUT_PANDEMIC_VACCINATION_FAILED:
      return {
        ...state,
        isUpdatingPandemicVaccination: false,
        isErrorUpdatingPandemicVaccination: true,
      };

    case GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO:
      return {
        ...state,
        isGettingScheduledVaccinationCentresByInfo: true,
        isErrorGettingScheduledVaccinationCentresByInfo: false,
      };

    case GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO_SUCCESS:
      const { resScheduledVaccinationCentresByInfo } = action;
      return {
        ...state,
        isGettingScheduledVaccinationCentresByInfo: false,
        scheduledVaccinationCentresByInfo: resScheduledVaccinationCentresByInfo,
      };

    case GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO_FAILED:
      return {
        ...state,
        isGettingScheduledVaccinationCentresByInfo: false,
        isErrorGettingScheduledVaccinationCentresByInfo: true,
      };

    default:
      return state;
  }
};

export default covidVaccineReducer;
