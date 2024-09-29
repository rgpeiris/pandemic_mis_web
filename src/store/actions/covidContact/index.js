import {
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_SUCCESS,
  GET_ORGANIZATIONS_FAILED,
  REGISTER_ORGANIZATION,
  REGISTER_ORGANIZATION_SUCCESS,
  REGISTER_ORGANIZATION_FAILED,
  REGISTER_ORGANIZATION_PUBLIC,
  REGISTER_ORGANIZATION_PUBLIC_SUCCESS,
  REGISTER_ORGANIZATION_PUBLIC_FAILED,
  GET_ORGANIZATION_BY_ID,
  GET_ORGANIZATION_BY_ID_SUCCESS,
  GET_ORGANIZATION_BY_ID_FAILED,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_FAILED,
  GET_PANDEMIC_CONTACTS,
  GET_PANDEMIC_CONTACTS_SUCCESS,
  GET_PANDEMIC_CONTACTS_FAILED,
  GET_PANDEMIC_CONTACT_BY_ID,
  GET_PANDEMIC_CONTACT_BY_ID_SUCCESS,
  GET_PANDEMIC_CONTACT_BY_ID_FAILED,
  CREATE_PANDEMIC_CONTACT,
  CREATE_PANDEMIC_CONTACT_SUCCESS,
  CREATE_PANDEMIC_CONTACT_FAILED,
  CREATE_PANDEMIC_CONTACT_PUBLIC,
  CREATE_PANDEMIC_CONTACT_PUBLIC_SUCCESS,
  CREATE_PANDEMIC_CONTACT_PUBLIC_FAILED,
  UPDATE_PANDEMIC_CONTACT,
  UPDATE_PANDEMIC_CONTACT_SUCCESS,
  UPDATE_PANDEMIC_CONTACT_FAILED,
  GET_PANDEMIC_CONTACTS_BY_ORG_ID,
  GET_PANDEMIC_CONTACTS_BY_ORG_ID_SUCCESS,
  GET_PANDEMIC_CONTACTS_BY_ORG_ID_FAILED,
} from "./types";

export const getOrganizations = () => ({
  type: GET_ORGANIZATIONS,
});

export const getOrganizationsSuccess = (response) => ({
  type: GET_ORGANIZATIONS_SUCCESS,
  response,
});

export const getOrganizationsFailed = (error) => ({
  type: GET_ORGANIZATIONS_FAILED,
  error,
});

export const registerOrganization = (userData, callback) => {
  return {
    type: REGISTER_ORGANIZATION,
    userData,
    callback,
  };
};

export const registerOrganizationSuccess = (response) => ({
  type: REGISTER_ORGANIZATION_SUCCESS,
  response,
});

export const registerOrganizationFailed = (error) => ({
  type: REGISTER_ORGANIZATION_FAILED,
  error,
});

export const registerOrganizationPublic = (userData, navigate) => {
  return {
    type: REGISTER_ORGANIZATION_PUBLIC,
    userData,
    navigate,
  };
};

export const registerOrganizationPublicSuccess = (response) => ({
  type: REGISTER_ORGANIZATION_PUBLIC_SUCCESS,
  response,
});

export const registerOrganizationPublicFailed = (error) => ({
  type: REGISTER_ORGANIZATION_PUBLIC_FAILED,
  error,
});

export const getOrganizationById = (organizationId) => ({
  type: GET_ORGANIZATION_BY_ID,
  organizationId,
});

export const getOrganizationByIdSuccess = (response) => ({
  type: GET_ORGANIZATION_BY_ID_SUCCESS,
  response,
});

export const getOrganizationByIdFailed = (error) => ({
  type: GET_ORGANIZATION_BY_ID_FAILED,
  error,
});

export const updateOrganization = (userData, callback) => {
  return {
    type: UPDATE_ORGANIZATION,
    userData,
    callback,
  };
};

export const updateOrganizationSuccess = (response) => ({
  type: UPDATE_ORGANIZATION_SUCCESS,
  response,
});

export const updateOrganizationFailed = (error) => ({
  type: UPDATE_ORGANIZATION_FAILED,
  error,
});

export const getPandemicContacts = () => ({
  type: GET_PANDEMIC_CONTACTS,
});

export const getPandemicContactsSuccess = (response) => ({
  type: GET_PANDEMIC_CONTACTS_SUCCESS,
  response,
});

export const getPandemicContactsFailed = (error) => ({
  type: GET_PANDEMIC_CONTACTS_FAILED,
  error,
});

export const getPandemicContactById = (pandemicContactId) => ({
  type: GET_PANDEMIC_CONTACT_BY_ID,
  pandemicContactId,
});

export const getPandemicContactByIdSuccess = (response) => ({
  type: GET_PANDEMIC_CONTACT_BY_ID_SUCCESS,
  response,
});

export const getPandemicContactByIdFailed = (error) => ({
  type: GET_PANDEMIC_CONTACT_BY_ID_FAILED,
  error,
});

export const createPandemicContact = (userData, callback) => {
  return {
    type: CREATE_PANDEMIC_CONTACT,
    userData,
    callback,
  };
};

export const createPandemicContactSuccess = (response) => ({
  type: CREATE_PANDEMIC_CONTACT_SUCCESS,
  response,
});

export const createPandemicContactFailed = (error) => ({
  type: CREATE_PANDEMIC_CONTACT_FAILED,
  error,
});

export const createPandemicContactPublic = (userData, navigate) => {
  return {
    type: CREATE_PANDEMIC_CONTACT_PUBLIC,
    userData,
    navigate,
  };
};

export const createPandemicContactPublicSuccess = (response) => ({
  type: CREATE_PANDEMIC_CONTACT_PUBLIC_SUCCESS,
  response,
});

export const createPandemicContactPublicFailed = (error) => ({
  type: CREATE_PANDEMIC_CONTACT_PUBLIC_FAILED,
  error,
});

export const updatePandemicContact = (userData, callback) => {
  return {
    type: UPDATE_PANDEMIC_CONTACT,
    userData,
    callback,
  };
};

export const updatePandemicContactSuccess = (response) => ({
  type: UPDATE_PANDEMIC_CONTACT_SUCCESS,
  response,
});

export const updatePandemicContactFailed = (error) => ({
  type: UPDATE_PANDEMIC_CONTACT_FAILED,
  error,
});

export const getPandemicContactsByOrgId = (organizationId) => ({
  type: GET_PANDEMIC_CONTACTS_BY_ORG_ID,
  organizationId,
});

export const getPandemicContactsByOrgIdSuccess = (response) => ({
  type: GET_PANDEMIC_CONTACTS_BY_ORG_ID_SUCCESS,
  response,
});

export const getPandemicContactsByOrgIdFailed = (error) => ({
  type: GET_PANDEMIC_CONTACTS_BY_ORG_ID_FAILED,
  error,
});
