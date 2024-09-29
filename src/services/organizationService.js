import { httpCovidContact } from "./httpClient";

export const getOrganizationsRequest = () => {
  return httpCovidContact.get(`organizations`);
};

export const registerOrganizationRequest = (userData) => {
  return httpCovidContact.post(`organization`, userData);
};

export const getOrganizationByIdRequest = (organizationId) => {
  return httpCovidContact.get(`organization/${organizationId}`);
};

export const putOrganizationRequest = (userData) => {
  return httpCovidContact.put(`organization`, userData);
};

export const getPandemicContactsRequest = () => {
  return httpCovidContact.get(`pandemic-contacts`);
};

export const postPandemicContactRequest = (userData) => {
  return httpCovidContact.post(`pandemic-contact`, userData);
};

export const getPandemicContactByIdRequest = (pandemicContactId) => {
  return httpCovidContact.get(`pandemic-contact/${pandemicContactId}`);
};

export const putPandemicContactRequest = (userData) => {
  return httpCovidContact.put(`pandemic-contact`, userData);
};

export const getPandemicContactsByOrgIdRequest = (organizationIdId) => {
  return httpCovidContact.get(
    `pandemic-contact?organizationId=${organizationIdId}`
  );
};
