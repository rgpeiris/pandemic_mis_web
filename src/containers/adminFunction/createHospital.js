import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";

import {
  checkStringValidity,
  checkContactValidity,
  DISTRICT_LIST,
  DS_DIVISION_LIST,
} from "../../utils";

import { createHospital } from "../../store/actions";

const CreateHospital = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [hospitalName, setHospitalName] = useState("");
  const [isValidHospitalName, setIsValidHospitalName] = useState(true);
  const [district, setDistrict] = useState("");
  const [isValidDistrict, setIsValidDistrict] = useState(true);
  const [isClearDistrict, setIsClearDistrict] = useState(false);
  const [dsDivision, setDsDivision] = useState("");
  const [dsDivisionsList, setDsDivisionsList] = useState([]);
  const [isValidDsDivision, setIsValidDsDivision] = useState(true);
  const [isClearDsDivision, setIsClearDsDivision] = useState(false);
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isCreatingHospital } = useSelector((state) => state.covidPatient);

  const onHandleHospitalName = (e) => {
    setIsValidHospitalName(true);
    setHospitalName(e.target.value);
  };

  const onHandleDistrict = (e) => {
    setIsValidDistrict(true);
    setIsClearDistrict(true);
    setDistrict(e.target.value);

    let dsDList = DS_DIVISION_LIST.find(
      (x) => x.key === e.target.value
    ).dsDivisions;

    setDsDivisionsList(dsDList);
  };

  const onHandleClearDistrict = () => {
    setDistrict("");
    setIsClearDistrict(false);
    setDsDivision("");
    setIsClearDsDivision(false);
    setDsDivisionsList([]);
  };

  const onHandleDsDivision = (e) => {
    setIsValidDsDivision(true);
    setIsClearDsDivision(true);
    setDsDivision(e.target.value);
  };

  const onHandleClearDsDivision = () => {
    setDsDivision("");
    setIsClearDsDivision(false);
  };

  const onHandleAddress = (e) => {
    setIsValidAddress(true);
    setAddress(e.target.value);
  };

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(hospitalName)) {
      setIsValidHospitalName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(district)) {
      setIsValidDistrict(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(dsDivision)) {
      setIsValidDsDivision(false);
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
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      hospitalId: 0,
      hospitalName,
      district,
      city: dsDivision,
      address,
      phoneNumber,
      isActive: true,
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createHospital(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create Hospital"} />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Hospital Name"}
              placeholder={"Enter Hospital Name"}
              inputProps={{ maxLength: 150 }}
              value={hospitalName}
              multiline
              rows={3}
              onChange={onHandleHospitalName}
              error={!isValidHospitalName}
              helperText={!isValidHospitalName && "* Required Field"}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CustomSelect
              fullWidth
              label={"District *"}
              isShowPlaceholder
              value={district || ""}
              selectData={DISTRICT_LIST}
              onChange={onHandleDistrict}
              isValid={isValidDistrict}
              handleClear={onHandleClearDistrict}
              isClear={isClearDistrict}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CustomSelect
              fullWidth
              label={"DS Division *"}
              isShowPlaceholder
              value={dsDivision || ""}
              selectData={dsDivisionsList}
              onChange={onHandleDsDivision}
              isValid={isValidDsDivision}
              handleClear={onHandleClearDsDivision}
              isClear={isClearDsDivision}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Address"}
              placeholder={"Enter Address"}
              inputProps={{ maxLength: 200 }}
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
            <TextField disabled fullWidth label={"Status"} value={"Active"} />
          </Grid>
        </Grid>
        <FormActionButton
          onCancelClick={onHandleCancel}
          loading={isCreatingHospital}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateHospital;
