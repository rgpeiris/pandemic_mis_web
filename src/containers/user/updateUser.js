import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import {
  checkEmailValidity,
  checkStringValidity,
  checkContactValidity,
  checkNICValidity,
  SALUTATION_LIST,
  GENDER_LIST,
  STATUS_LIST,
} from "../../utils";

import { updateUser } from "../../store/actions";

const UpdateUser = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [salutation, setSalutation] = useState("");
  const [isValidSalutation, setIsValidSalutation] = useState(true);
  const [isClearSalutation, setIsClearSalutation] = useState(false);
  const [username, setUsername] = useState("");
  const [callingName, setCallingName] = useState("");
  const [isValidCallingName, setIsValidCallingName] = useState(true);
  const [gender, setGender] = useState("");
  const [isValidGender, setIsValidGender] = useState(true);
  const [isClearGender, setIsClearGender] = useState(false);
  const [nicNumber, setNicNumber] = useState("");
  const [isValidNicNumber, setIsValidNicNumber] = useState(true);
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [designation, setDesignation] = useState("");
  const [isValidDesignation, setIsValidDesignation] = useState(true);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const { isUpdatingUser, isGettingUserById, systemUserById } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (systemUserById) {
      setUserId(systemUserById?.id);
      setFullName(systemUserById?.fullName);
      setSalutation(systemUserById?.salutation);
      setUsername(systemUserById?.userName);
      setCallingName(systemUserById?.callingName);
      setGender(systemUserById?.gender);
      setNicNumber(systemUserById?.nicNumber);
      setAddress(systemUserById?.address);
      setPhoneNumber(systemUserById?.phoneNumber);
      setEmail(systemUserById?.email);
      setDesignation(systemUserById?.designation);
      setRole(systemUserById?.role);
      setStatus(systemUserById?.isActive ? "Active" : "Inactive");
      setIsValidFullName(true);
      setIsValidSalutation(true);
      setIsClearSalutation(true);
      setIsValidCallingName(true);
      setIsValidGender(true);
      setIsClearGender(true);
      setIsValidNicNumber(true);
      setIsValidAddress(true);
      setIsValidPhoneNumber(true);
      setIsValidEmail(true);
      setIsValidDesignation(true);
      setIsClearStatus(true);
      setIsValidStatus(true);
    }
  }, [systemUserById]);

  const onHandleFullName = (e) => {
    setIsValidFullName(true);
    setFullName(e.target.value);
  };

  const onHandleSalutation = (e) => {
    setIsValidSalutation(true);
    setIsClearSalutation(true);
    setSalutation(e.target.value);
  };

  const onHandleClearSalutation = () => {
    setSalutation("");
    setIsClearSalutation(false);
  };

  const onHandleCallingName = (e) => {
    setIsValidCallingName(true);
    setCallingName(e.target.value);
  };

  const onHandleGender = (e) => {
    setIsValidGender(true);
    setIsClearGender(true);
    setGender(e.target.value);
  };

  const onHandleClearGender = () => {
    setGender("");
    setIsClearGender(false);
  };

  const onHandleNicNumber = (e) => {
    setIsValidNicNumber(true);
    setNicNumber(e.target.value);
  };

  const onHandleAddress = (e) => {
    setIsValidAddress(true);
    setAddress(e.target.value);
  };

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const onHandleEmail = (e) => {
    setIsValidEmail(true);
    setEmail(e.target.value);
  };

  const onHandleDesignation = (e) => {
    setIsValidDesignation(true);
    setDesignation(e.target.value);
  };

  const onHandleStatus = (e) => {
    setIsValidStatus(true);
    setIsClearStatus(true);
    setStatus(e.target.value);
  };

  const onHandleClearStatus = () => {
    setStatus("");
    setIsClearStatus(false);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(salutation)) {
      setIsValidSalutation(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(fullName)) {
      setIsValidFullName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(callingName)) {
      setIsValidCallingName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(gender)) {
      setIsValidGender(false);
      isErrorValidation = true;
    }
    if (!checkNICValidity(nicNumber)) {
      setIsValidNicNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(address)) {
      setIsValidAddress(false);
      isErrorValidation = true;
    }
    if (!checkContactValidity(phoneNumber)) {
      setIsValidPhoneNumber(false);
      isErrorValidation = true;
    }
    if (!checkEmailValidity(email)) {
      setIsValidEmail(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(designation)) {
      setIsValidDesignation(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(status)) {
      setIsValidStatus(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      salutation,
      fullName,
      callingName,
      gender,
      nicNumber,
      address,
      phoneNumber,
      email,
      designation,
      isActive: status === "Active" ? true : false,
      updatedDate: new Date().toISOString(),
    };

    dispatch(updateUser(userId, userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingUserById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update System User"} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Username"}
                value={username || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Salutation *"}
                isShowPlaceholder
                value={salutation || ""}
                selectData={SALUTATION_LIST}
                onChange={onHandleSalutation}
                isValid={isValidSalutation}
                handleClear={onHandleClearSalutation}
                isClear={isClearSalutation}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Full Name"}
                placeholder={"Enter Full Name"}
                inputProps={{ maxLength: 150 }}
                value={fullName}
                multiline
                rows={3}
                onChange={onHandleFullName}
                error={!isValidFullName}
                helperText={!isValidFullName && "* Required Field"}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Calling Name"}
                placeholder={"Enter Calling Name"}
                inputProps={{ maxLength: 50 }}
                value={callingName}
                onChange={onHandleCallingName}
                error={!isValidCallingName}
                helperText={!isValidCallingName && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Gender *"}
                isShowPlaceholder
                value={gender || ""}
                selectData={GENDER_LIST}
                onChange={onHandleGender}
                isValid={isValidGender}
                handleClear={onHandleClearGender}
                isClear={isClearGender}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"NIC Number"}
                placeholder={"Enter NIC Number"}
                inputProps={{ maxLength: 50 }}
                value={nicNumber}
                onChange={onHandleNicNumber}
                error={!isValidNicNumber}
                helperText={
                  !isValidNicNumber
                    ? nicNumber
                      ? "Please enter a valid NIC number"
                      : "* Required Field"
                    : ""
                }
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Address"}
                placeholder={"Enter Address"}
                inputProps={{ maxLength: 150 }}
                value={address}
                multiline
                rows={3}
                onChange={onHandleAddress}
                error={!isValidAddress}
                helperText={!isValidAddress && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Phone Number"}
                placeholder={"Enter Phone Number"}
                inputProps={{ maxLength: 50 }}
                value={phoneNumber}
                onChange={onHandlePhoneNumber}
                error={!isValidPhoneNumber}
                helperText={
                  !isValidPhoneNumber
                    ? phoneNumber
                      ? "Please enter a valid Phone number"
                      : "* Required Field"
                    : ""
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Email"}
                placeholder={"Enter Email"}
                inputProps={{ maxLength: 100 }}
                value={email}
                onChange={onHandleEmail}
                error={!isValidEmail}
                helperText={
                  !isValidEmail
                    ? email
                      ? "Please enter a valid Email"
                      : "* Required Field"
                    : ""
                }
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Designation"}
                placeholder={"Enter Designation"}
                inputProps={{ maxLength: 100 }}
                value={designation}
                onChange={onHandleDesignation}
                error={!isValidDesignation}
                helperText={!isValidDesignation && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"User Role"}
                value={role || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Status *"}
                isShowPlaceholder
                value={status || ""}
                selectData={STATUS_LIST}
                onChange={onHandleStatus}
                isValid={isValidStatus}
                handleClear={onHandleClearStatus}
                isClear={isClearStatus}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingUser}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateUser;
