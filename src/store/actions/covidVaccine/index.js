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
} from "./types";

export const getVaccines = () => ({
  type: GET_VACCINES,
});

export const getVaccinesSuccess = (response) => ({
  type: GET_VACCINES_SUCCESS,
  response,
});

export const getVaccinesFailed = (error) => ({
  type: GET_VACCINES_FAILED,
  error,
});

export const getVaccinationCentres = () => ({
  type: GET_VACCINATION_CENTRES,
});

export const getVaccinationCentresSuccess = (response) => ({
  type: GET_VACCINATION_CENTRES_SUCCESS,
  response,
});

export const getVaccinationCentresFailed = (error) => ({
  type: GET_VACCINATION_CENTRES_FAILED,
  error,
});

export const getScheduledVaccinationCentres = () => ({
  type: GET_SCHEDULED_VACCINATION_CENTRES,
});

export const getScheduledVaccinationCentresSuccess = (response) => ({
  type: GET_SCHEDULED_VACCINATION_CENTRES_SUCCESS,
  response,
});

export const getScheduledVaccinationCentresFailed = (error) => ({
  type: GET_SCHEDULED_VACCINATION_CENTRES_FAILED,
  error,
});

export const getVaccineAppointments = () => ({
  type: GET_VACCINE_APPOINTMENTS,
});

export const getVaccineAppointmentsSuccess = (response) => ({
  type: GET_VACCINE_APPOINTMENTS_SUCCESS,
  response,
});

export const getVaccineAppointmentsFailed = (error) => ({
  type: GET_VACCINE_APPOINTMENTS_FAILED,
  error,
});

export const getPandemicVaccinations = () => ({
  type: GET_PANDEMIC_VACCINATIONS,
});

export const getPandemicVaccinationsSuccess = (response) => ({
  type: GET_PANDEMIC_VACCINATIONS_SUCCESS,
  response,
});

export const getPandemicVaccinationsFailed = (error) => ({
  type: GET_PANDEMIC_VACCINATIONS_FAILED,
  error,
});

export const getVaccineById = (vaccineId) => ({
  type: GET_VACCINE_BY_ID,
  vaccineId,
});

export const getVaccineByIdSuccess = (response) => ({
  type: GET_VACCINE_BY_ID_SUCCESS,
  response,
});

export const getVaccineByIdFailed = (error) => ({
  type: GET_VACCINE_BY_ID_FAILED,
  error,
});

export const getVaccinationCentreById = (vaccinationCentreId) => ({
  type: GET_VACCINATION_CENTRE_BY_ID,
  vaccinationCentreId,
});

export const getVaccinationCentreByIdSuccess = (response) => ({
  type: GET_VACCINATION_CENTRE_BY_ID_SUCCESS,
  response,
});

export const getVaccinationCentreByIdFailed = (error) => ({
  type: GET_VACCINATION_CENTRE_BY_ID_FAILED,
  error,
});

export const getScheduledVaccinationCentreById = (
  scheduledVaccinationCentreId
) => ({
  type: GET_SCHEDULED_VACCINATION_CENTRE_BY_ID,
  scheduledVaccinationCentreId,
});

export const getScheduledVaccinationCentreByIdSuccess = (response) => ({
  type: GET_SCHEDULED_VACCINATION_CENTRE_BY_ID_SUCCESS,
  response,
});

export const getScheduledVaccinationCentreByIdFailed = (error) => ({
  type: GET_SCHEDULED_VACCINATION_CENTRE_BY_ID_FAILED,
  error,
});

export const getVaccineAppointmentById = (vaccineAppointmentId) => ({
  type: GET_VACCINE_APPOINTMENT_BY_ID,
  vaccineAppointmentId,
});

export const getVaccineAppointmentByIdSuccess = (response) => ({
  type: GET_VACCINE_APPOINTMENT_BY_ID_SUCCESS,
  response,
});

export const getVaccineAppointmentByIdFailed = (error) => ({
  type: GET_VACCINE_APPOINTMENT_BY_ID_FAILED,
  error,
});

export const getPandemicVaccinationById = (vaccinationId) => ({
  type: GET_PANDEMIC_VACCINATION_BY_ID,
  vaccinationId,
});

export const getPandemicVaccinationByIdSuccess = (response) => ({
  type: GET_PANDEMIC_VACCINATION_BY_ID_SUCCESS,
  response,
});

export const getPandemicVaccinationByIdFailed = (error) => ({
  type: GET_PANDEMIC_VACCINATION_BY_ID_FAILED,
  error,
});

export const createVaccine = (userData, callback) => {
  return {
    type: POST_VACCINE,
    userData,
    callback,
  };
};

export const createVaccineSuccess = (response) => ({
  type: POST_VACCINE_SUCCESS,
  response,
});

export const createVaccineFailed = (error) => ({
  type: POST_VACCINE_FAILED,
  error,
});

export const updateVaccine = (userData, callback) => {
  return {
    type: PUT_VACCINE,
    userData,
    callback,
  };
};

export const updateVaccineSuccess = (response) => ({
  type: PUT_VACCINE_SUCCESS,
  response,
});

export const updateVaccineFailed = (error) => ({
  type: PUT_VACCINE_FAILED,
  error,
});

export const createVaccinationCentre = (userData, callback) => {
  return {
    type: POST_VACCINATION_CENTRE,
    userData,
    callback,
  };
};

export const createVaccinationCentreSuccess = (response) => ({
  type: POST_VACCINATION_CENTRE_SUCCESS,
  response,
});

export const createVaccinationCentreFailed = (error) => ({
  type: POST_VACCINATION_CENTRE_FAILED,
  error,
});

export const updateVaccinationCentre = (userData, callback) => {
  return {
    type: PUT_VACCINATION_CENTRE,
    userData,
    callback,
  };
};

export const updateVaccinationCentreSuccess = (response) => ({
  type: PUT_VACCINATION_CENTRE_SUCCESS,
  response,
});

export const updateVaccinationCentreFailed = (error) => ({
  type: PUT_VACCINATION_CENTRE_FAILED,
  error,
});

export const createScheduledVaccinationCentre = (userData, callback) => {
  return {
    type: POST_SCHEDULED_VACCINATION_CENTRE,
    userData,
    callback,
  };
};

export const createScheduledVaccinationCentreSuccess = (response) => ({
  type: POST_SCHEDULED_VACCINATION_CENTRE_SUCCESS,
  response,
});

export const createScheduledVaccinationCentreFailed = (error) => ({
  type: POST_SCHEDULED_VACCINATION_CENTRE_FAILED,
  error,
});

export const updateScheduledVaccinationCentre = (userData, callback) => {
  return {
    type: PUT_SCHEDULED_VACCINATION_CENTRE,
    userData,
    callback,
  };
};

export const updateScheduledVaccinationCentreSuccess = (response) => ({
  type: PUT_SCHEDULED_VACCINATION_CENTRE_SUCCESS,
  response,
});

export const updateScheduledVaccinationCentreFailed = (error) => ({
  type: PUT_SCHEDULED_VACCINATION_CENTRE_FAILED,
  error,
});

export const createVaccineAppointment = (userData, callback) => {
  return {
    type: POST_VACCINE_APPOINTMENT,
    userData,
    callback,
  };
};

export const createVaccineAppointmentSuccess = (response) => ({
  type: POST_VACCINE_APPOINTMENT_SUCCESS,
  response,
});

export const createVaccineAppointmentFailed = (error) => ({
  type: POST_VACCINE_APPOINTMENT_FAILED,
  error,
});

export const updateVaccineAppointment = (userData, callback) => {
  return {
    type: PUT_VACCINE_APPOINTMENT,
    userData,
    callback,
  };
};

export const updateVaccineAppointmentSuccess = (response) => ({
  type: PUT_VACCINE_APPOINTMENT_SUCCESS,
  response,
});

export const updateVaccineAppointmentFailed = (error) => ({
  type: PUT_VACCINE_APPOINTMENT_FAILED,
  error,
});

export const createPandemicVaccination = (userData, callback) => {
  return {
    type: POST_PANDEMIC_VACCINATION,
    userData,
    callback,
  };
};

export const createPandemicVaccinationSuccess = (response) => ({
  type: POST_PANDEMIC_VACCINATION_SUCCESS,
  response,
});

export const createPandemicVaccinationFailed = (error) => ({
  type: POST_PANDEMIC_VACCINATION_FAILED,
  error,
});

export const updatePandemicVaccination = (userData, callback) => {
  return {
    type: PUT_PANDEMIC_VACCINATION,
    userData,
    callback,
  };
};

export const updatePandemicVaccinationSuccess = (response) => ({
  type: PUT_PANDEMIC_VACCINATION_SUCCESS,
  response,
});

export const updatePandemicVaccinationFailed = (error) => ({
  type: PUT_PANDEMIC_VACCINATION_FAILED,
  error,
});

export const getScheduledVaccinationCentresByInfo = (userData, callback) => ({
  type: GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO,
  userData,
  callback,
});

export const getScheduledVaccinationCentresByInfoSuccess = (response) => ({
  type: GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO_SUCCESS,
  response,
});

export const getScheduledVaccinationCentresByInfoFailed = (error) => ({
  type: GET_SCHEDULED_VACCINATION_CENTRES_BY_INFO_FAILED,
  error,
});
