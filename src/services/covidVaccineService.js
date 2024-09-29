import { httpCovidVaccine } from "./httpClient";

export const getCovidVaccinesRequest = () => {
  return httpCovidVaccine.get(`vaccines`);
};

export const getVaccinationCentresRequest = () => {
  return httpCovidVaccine.get(`vaccination-centres`);
};

export const getScheduledVaccinationCentresRequest = () => {
  return httpCovidVaccine.get(`scheduled-vaccination-centres/all`);
};

export const getVaccineAppointmentsRequest = () => {
  return httpCovidVaccine.get(`vaccination-appointments/all`);
};

export const getPandemicVaccinationsRequest = () => {
  return httpCovidVaccine.get(`vaccinations`);
};

export const getCovidVaccineByIdRequest = (vaccineId) => {
  return httpCovidVaccine.get(`vaccine/${vaccineId}`);
};

export const getVaccinationCentreByIdRequest = (vaccinationCentreId) => {
  return httpCovidVaccine.get(`vaccination-centre/${vaccinationCentreId}`);
};

export const getScheduledVaccinationCentreByIdRequest = (
  scheduledVaccinationCentreId
) => {
  return httpCovidVaccine.get(
    `scheduled-vaccination-centre/${scheduledVaccinationCentreId}`
  );
};

export const getVaccineAppointmentByIdRequest = (vaccineAppointmentId) => {
  return httpCovidVaccine.get(
    `vaccination-appointment/${vaccineAppointmentId}`
  );
};

export const getPandemicVaccinationByIdRequest = (vaccinationId) => {
  return httpCovidVaccine.get(`vaccination/${vaccinationId}`);
};

export const postCovidVaccineRequest = (userData) => {
  return httpCovidVaccine.post(`vaccine`, userData);
};

export const postVaccinationCentreRequest = (userData) => {
  return httpCovidVaccine.post(`vaccination-centre`, userData);
};

export const postScheduledVaccinationCentreRequest = (userData) => {
  return httpCovidVaccine.post(`scheduled-vaccination-centre`, userData);
};

export const postVaccineAppointmentRequest = (userData) => {
  return httpCovidVaccine.post(`vaccination-appointment`, userData);
};

export const postPandemicVaccinationRequest = (userData) => {
  return httpCovidVaccine.post(`vaccination`, userData);
};

export const putCovidVaccineRequest = (userData) => {
  return httpCovidVaccine.put(`vaccine`, userData);
};

export const putVaccinationCentreRequest = (userData) => {
  return httpCovidVaccine.put(`vaccination-centre`, userData);
};

export const putScheduledVaccinationCentreRequest = (userData) => {
  return httpCovidVaccine.put(`scheduled-vaccination-centre`, userData);
};

export const putVaccineAppointmentRequest = (userData) => {
  return httpCovidVaccine.put(`vaccination-appointment`, userData);
};

export const putPandemicVaccinationRequest = (userData) => {
  return httpCovidVaccine.put(`vaccination`, userData);
};

export const getScheduledVaccinationCentresByInfoRequest = (userData) => {
  return httpCovidVaccine.get(
    `scheduled-vaccination-centres?district=${userData.district}&city=${userData.city}&date=${userData.date}`
  );
};
