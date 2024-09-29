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
  SUCCESS_TOAST,
} from "../actions";
import { put, call, takeLatest } from "redux-saga/effects";
import { displayError } from "../../utils";

import {
  getOrganizationsRequest,
  registerOrganizationRequest,
  getOrganizationByIdRequest,
  putOrganizationRequest,
  getPandemicContactsRequest,
  getPandemicContactByIdRequest,
  postPandemicContactRequest,
  putPandemicContactRequest,
  getPandemicContactsByOrgIdRequest,
} from "../../services";

export function* getOrganizations() {
  try {
    const receivedData = yield call(getOrganizationsRequest);
    yield put({
      type: GET_ORGANIZATIONS_SUCCESS,
      response: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_ORGANIZATIONS_FAILED, error });
  }
}

export function* watchGetOrganizations() {
  yield takeLatest(GET_ORGANIZATIONS, getOrganizations);
}

export function* registerOrganization({ userData, callback }) {
  try {
    const receivedData = yield call(registerOrganizationRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Organization registered successfully",
    });
    yield put({ type: GET_ORGANIZATIONS });
    yield put({
      type: REGISTER_ORGANIZATION_SUCCESS,
      resRegisteredOrganization: receivedData.data.result,
    });
    callback();
  } catch (error) {
    yield put({
      type: REGISTER_ORGANIZATION_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchRegisterOrganization() {
  yield takeLatest(REGISTER_ORGANIZATION, registerOrganization);
}

export function* registerOrganizationPublic({ userData, navigate }) {
  try {
    const receivedData = yield call(registerOrganizationRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Organization registered successfully",
    });
    yield put({
      type: REGISTER_ORGANIZATION_PUBLIC_SUCCESS,
      resRegisteredOrganizationPublic: receivedData.data.result,
    });
    navigate(`/download-qr-code/${receivedData.data.result?.organizationId}`, {
      replace: true,
    });
  } catch (error) {
    yield put({
      type: REGISTER_ORGANIZATION_PUBLIC_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchRegisterOrganizationPublic() {
  yield takeLatest(REGISTER_ORGANIZATION_PUBLIC, registerOrganizationPublic);
}

export function* getOrganizationById({ organizationId }) {
  try {
    const receivedData = yield call(getOrganizationByIdRequest, organizationId);
    yield put({
      type: GET_ORGANIZATION_BY_ID_SUCCESS,
      resOrganizationById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_ORGANIZATION_BY_ID_FAILED, error });
  }
}

export function* watchGetOrganizationById() {
  yield takeLatest(GET_ORGANIZATION_BY_ID, getOrganizationById);
}

export function* updateOrganization({ userData, callback }) {
  try {
    yield call(putOrganizationRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Organization updated successfully",
    });
    yield put({ type: GET_ORGANIZATIONS });
    yield put({
      type: UPDATE_ORGANIZATION_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: UPDATE_ORGANIZATION_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdateOrganization() {
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganization);
}

export function* getPandemicContacts() {
  try {
    const receivedData = yield call(getPandemicContactsRequest);
    yield put({
      type: GET_PANDEMIC_CONTACTS_SUCCESS,
      resPandemicContacts: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PANDEMIC_CONTACTS_FAILED, error });
  }
}

export function* watchGetPandemicContacts() {
  yield takeLatest(GET_PANDEMIC_CONTACTS, getPandemicContacts);
}

export function* getPandemicContactById({ pandemicContactId }) {
  try {
    const receivedData = yield call(
      getPandemicContactByIdRequest,
      pandemicContactId
    );
    yield put({
      type: GET_PANDEMIC_CONTACT_BY_ID_SUCCESS,
      resPandemicContactById: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PANDEMIC_CONTACT_BY_ID_FAILED, error });
  }
}

export function* watchGetPandemicContactById() {
  yield takeLatest(GET_PANDEMIC_CONTACT_BY_ID, getPandemicContactById);
}

export function* createPandemicContact({ userData, callback }) {
  try {
    yield call(postPandemicContactRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Contact created successfully",
    });
    yield put({ type: GET_PANDEMIC_CONTACTS });
    yield put({
      type: CREATE_PANDEMIC_CONTACT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: CREATE_PANDEMIC_CONTACT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreatePandemicContact() {
  yield takeLatest(CREATE_PANDEMIC_CONTACT, createPandemicContact);
}

export function* createPandemicContactPublic({ userData, navigate }) {
  try {
    yield call(postPandemicContactRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "You Checked-in/Checked-out successfully",
    });
    yield put({
      type: CREATE_PANDEMIC_CONTACT_PUBLIC_SUCCESS,
    });
    navigate("/stay-safe");
  } catch (error) {
    yield put({
      type: CREATE_PANDEMIC_CONTACT_PUBLIC_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchCreatePandemicContactPublic() {
  yield takeLatest(CREATE_PANDEMIC_CONTACT_PUBLIC, createPandemicContactPublic);
}

export function* updatePandemicContact({ userData, callback }) {
  try {
    yield call(putPandemicContactRequest, userData);
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Contact updated successfully",
    });
    yield put({ type: GET_PANDEMIC_CONTACTS });
    yield put({
      type: UPDATE_PANDEMIC_CONTACT_SUCCESS,
    });
    callback();
  } catch (error) {
    yield put({
      type: UPDATE_PANDEMIC_CONTACT_FAILED,
      error: displayError(error),
    });
  }
}

export function* watchUpdatePandemicContact() {
  yield takeLatest(UPDATE_PANDEMIC_CONTACT, updatePandemicContact);
}

export function* getPandemicContactsByOrgId({ organizationId }) {
  try {
    const receivedData = yield call(
      getPandemicContactsByOrgIdRequest,
      organizationId
    );
    yield put({
      type: SUCCESS_TOAST,
      successMsg: "Login successful",
    });
    yield put({
      type: GET_PANDEMIC_CONTACTS_BY_ORG_ID_SUCCESS,
      resPandemicContactsByOrgId: receivedData.data.result,
    });
  } catch (error) {
    yield put({ type: GET_PANDEMIC_CONTACTS_BY_ORG_ID_FAILED, error });
  }
}

export function* watchGetPandemicContactsByOrgId() {
  yield takeLatest(GET_PANDEMIC_CONTACTS_BY_ORG_ID, getPandemicContactsByOrgId);
}
