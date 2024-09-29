import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";

import {
  checkEmailValidity,
  checkStringValidity,
  checkContactValidity,
  checkNICValidity,
  SALUTATION_LIST,
  GENDER_LIST,
  USER_ROLE_LIST,
} from "../../utils";

import { userRegister } from "../../store/actions";

const CreateUser = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [salutation, setSalutation] = useState("");
  const [isValidSalutation, setIsValidSalutation] = useState(true);
  const [isClearSalutation, setIsClearSalutation] = useState(false);
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
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
  const [isValidRole, setIsValidRole] = useState(true);
  const [isClearRole, setIsClearRole] = useState(false);

  const { isUserRegistering, loggedInUser } = useSelector(
    (state) => state.auth
  );

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

  const onHandleUsername = (e) => {
    setIsValidUsername(true);
    setUsername(e.target.value);
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

  const onHandleUserRole = (e) => {
    setIsValidRole(true);
    setIsClearRole(true);
    setRole(e.target.value);
  };

  const onHandleClearRole = () => {
    setRole("");
    setIsClearRole(false);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(username)) {
      setIsValidUsername(false);
      isErrorValidation = true;
    }
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
    if (!checkStringValidity(role)) {
      setIsValidRole(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      username,
      callingName,
      gender,
      salutation,
      fullName,
      nicNumber,
      address,
      email,
      phoneNumber,
      designation,
      password: "Admin@123",
      isActive: true,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
      role,
    };

    dispatch(userRegister(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create System User"} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              required
              fullWidth
              label={"Username"}
              placeholder={"Enter Username"}
              inputProps={{ maxLength: 20 }}
              value={username}
              onChange={onHandleUsername}
              error={!isValidUsername}
              helperText={!isValidUsername && "* Required Field"}
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
            <CustomSelect
              fullWidth
              label={"User Role *"}
              isShowPlaceholder
              value={role || ""}
              selectData={USER_ROLE_LIST}
              onChange={onHandleUserRole}
              isValid={isValidRole}
              handleClear={onHandleClearRole}
              isClear={isClearRole}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField disabled fullWidth label={"Status"} value={"Active"} />
          </Grid>
        </Grid>
        <FormActionButton
          onCancelClick={onHandleCancel}
          loading={isUserRegistering}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateUser;
