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
} from "../actions";

export const initialState = {
  isGettingOrganizations: false,
  isErrorGettingOrganizations: false,
  organizations: [],
  isRegisteringOrganization: false,
  isErrorRegisteringOrganization: false,
  registeredOrganization: {},
  isRegisteringOrganizationPublic: false,
  isErrorRegisteringOrganizationPublic: false,
  registeredOrganizationPublic: {},
  isGettingOrganizationById: false,
  isErrorGettingOrganizationById: false,
  organizationById: {},
  isUpdatingOrganization: false,
  isErrorUpdatingOrganization: false,
  isGettingPandemicContacts: false,
  isErrorGettingPandemicContacts: false,
  pandemicContacts: [],
  isGettingPandemicContactById: false,
  isErrorGettingPandemicContactById: false,
  pandemicContactById: {},
  isCreatingPandemicContact: false,
  isErrorCreatingPandemicContact: false,
  isCreatingPandemicContactPublic: false,
  isErrorCreatingPandemicContactPublic: false,
  isUpdatingPandemicContact: false,
  isErrorUpdatingPandemicContact: false,
  isGettingPandemicContactsByOrgId: false,
  isErrorGettingPandemicContactsByOrgId: false,
  pandemicContactsByOrgId: [],
};

const covidContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS:
      return {
        ...state,
        isGettingOrganizations: true,
        isErrorGettingOrganizations: false,
      };

    case GET_ORGANIZATIONS_SUCCESS:
      const { response } = action;
      return {
        ...state,
        isGettingOrganizations: false,
        organizations: response,
      };

    case GET_ORGANIZATIONS_FAILED:
      return {
        ...state,
        isGettingOrganizations: false,
        isErrorGettingOrganizations: true,
      };

    case REGISTER_ORGANIZATION:
      return {
        ...state,
        isRegisteringOrganization: true,
        isErrorRegisteringOrganization: false,
      };

    case REGISTER_ORGANIZATION_SUCCESS:
      const { resRegisteredOrganization } = action;
      return {
        ...state,
        isRegisteringOrganization: false,
        registeredOrganization: resRegisteredOrganization,
      };

    case REGISTER_ORGANIZATION_FAILED:
      return {
        ...state,
        isRegisteringOrganization: false,
        isErrorRegisteringOrganization: true,
      };

    case REGISTER_ORGANIZATION_PUBLIC:
      return {
        ...state,
        isRegisteringOrganizationPublic: true,
        isErrorRegisteringOrganizationPublic: false,
      };

    case REGISTER_ORGANIZATION_PUBLIC_SUCCESS:
      const { resRegisteredOrganizationPublic } = action;
      return {
        ...state,
        isRegisteringOrganizationPublic: false,
        registeredOrganizationPublic: resRegisteredOrganizationPublic,
      };

    case REGISTER_ORGANIZATION_PUBLIC_FAILED:
      return {
        ...state,
        isRegisteringOrganizationPublic: false,
        isErrorRegisteringOrganizationPublic: true,
      };

    case GET_ORGANIZATION_BY_ID:
      return {
        ...state,
        isGettingOrganizationById: true,
        isErrorGettingOrganizationById: false,
      };

    case GET_ORGANIZATION_BY_ID_SUCCESS:
      const { resOrganizationById } = action;
      return {
        ...state,
        isGettingOrganizationById: false,
        organizationById: resOrganizationById,
      };

    case GET_ORGANIZATION_BY_ID_FAILED:
      return {
        ...state,
        isGettingOrganizationById: false,
        isErrorGettingOrganizationById: true,
      };

    case UPDATE_ORGANIZATION:
      return {
        ...state,
        isUpdatingOrganization: true,
        isErrorUpdatingOrganization: false,
      };

    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        isUpdatingOrganization: false,
      };

    case UPDATE_ORGANIZATION_FAILED:
      return {
        ...state,
        isUpdatingOrganization: false,
        isErrorUpdatingOrganization: true,
      };

    case GET_PANDEMIC_CONTACTS:
      return {
        ...state,
        isGettingPandemicContacts: true,
        isErrorGettingPandemicContacts: false,
      };

    case GET_PANDEMIC_CONTACTS_SUCCESS:
      const { resPandemicContacts } = action;
      return {
        ...state,
        isGettingPandemicContacts: false,
        pandemicContacts: resPandemicContacts,
      };

    case GET_PANDEMIC_CONTACTS_FAILED:
      return {
        ...state,
        isGettingPandemicContacts: false,
        isErrorGettingPandemicContacts: true,
      };

    case GET_PANDEMIC_CONTACT_BY_ID:
      return {
        ...state,
        isGettingPandemicContactById: true,
        isErrorGettingPandemicContactById: false,
      };

    case GET_PANDEMIC_CONTACT_BY_ID_SUCCESS:
      const { resPandemicContactById } = action;
      return {
        ...state,
        isGettingPandemicContactById: false,
        pandemicContactById: resPandemicContactById,
      };

    case GET_PANDEMIC_CONTACT_BY_ID_FAILED:
      return {
        ...state,
        isGettingPandemicContactById: false,
        isErrorGettingPandemicContactById: true,
      };

    case CREATE_PANDEMIC_CONTACT:
      return {
        ...state,
        isCreatingPandemicContact: true,
        isErrorCreatingPandemicContact: false,
      };

    case CREATE_PANDEMIC_CONTACT_SUCCESS:
      return {
        ...state,
        isCreatingPandemicContact: false,
      };

    case CREATE_PANDEMIC_CONTACT_FAILED:
      return {
        ...state,
        isCreatingPandemicContact: false,
        isErrorCreatingPandemicContact: true,
      };

    case CREATE_PANDEMIC_CONTACT_PUBLIC:
      return {
        ...state,
        isCreatingPandemicContactPublic: true,
        isErrorCreatingPandemicContactPublic: false,
      };

    case CREATE_PANDEMIC_CONTACT_PUBLIC_SUCCESS:
      return {
        ...state,
        isCreatingPandemicContactPublic: false,
      };

    case CREATE_PANDEMIC_CONTACT_PUBLIC_FAILED:
      return {
        ...state,
        isCreatingPandemicContactPublic: false,
        isErrorCreatingPandemicContactPublic: true,
      };

    case UPDATE_PANDEMIC_CONTACT:
      return {
        ...state,
        isUpdatingPandemicContact: true,
        isErrorUpdatingPandemicContact: false,
      };

    case UPDATE_PANDEMIC_CONTACT_SUCCESS:
      return {
        ...state,
        isUpdatingPandemicContact: false,
      };

    case UPDATE_PANDEMIC_CONTACT_FAILED:
      return {
        ...state,
        isUpdatingPandemicContact: false,
        isErrorUpdatingPandemicContact: true,
      };

    case GET_PANDEMIC_CONTACTS_BY_ORG_ID:
      return {
        ...state,
        isGettingPandemicContactsByOrgId: true,
        isErrorGettingPandemicContactsByOrgId: false,
      };

    case GET_PANDEMIC_CONTACTS_BY_ORG_ID_SUCCESS:
      const { resPandemicContactsByOrgId } = action;
      return {
        ...state,
        isGettingPandemicContactsByOrgId: false,
        pandemicContactsByOrgId: resPandemicContactsByOrgId,
      };

    case GET_PANDEMIC_CONTACTS_BY_ORG_ID_FAILED:
      return {
        ...state,
        isGettingPandemicContactsByOrgId: false,
        isErrorGettingPandemicContactsByOrgId: true,
      };

    default:
      return state;
  }
};

export default covidContactReducer;
