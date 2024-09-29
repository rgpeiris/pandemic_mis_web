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
  checkStringValidity,
  checkContactValidity,
  DISTRICT_LIST,
  DS_DIVISION_LIST,
  STATUS_LIST,
} from "../../utils";

import { updateHospital } from "../../store/actions";

const UpdateHospital = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [hospitalId, setHospitalId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
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
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const { isUpdatingHospital, hospitalById, isGettingHospitalById } =
    useSelector((state) => state.covidPatient);

  useEffect(() => {
    if (hospitalById) {
      setHospitalId(hospitalById?.hospitalId);
      setHospitalName(hospitalById?.hospitalName);
      setDistrict(hospitalById?.district);

      let dsDList = DS_DIVISION_LIST.find(
        (x) => x.key === hospitalById?.district
      )?.dsDivisions;
      setDsDivisionsList(dsDList);

      setDsDivision(hospitalById?.city);
      setAddress(hospitalById?.address);
      setPhoneNumber(hospitalById?.phoneNumber);
      setStatus(hospitalById?.isActive ? "Active" : "Inactive");
      setIsValidDistrict(true);
      setIsClearDistrict(true);
      setIsValidDsDivision(true);
      setIsClearDsDivision(true);
      setIsValidAddress(true);
      setIsValidPhoneNumber(true);
      setIsValidStatus(true);
      setIsClearStatus(true);
    }
  }, [hospitalById]);

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
    if (!checkStringValidity(status)) {
      setIsValidStatus(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      hospitalId: hospitalId,
      hospitalName,
      district,
      city: dsDivision,
      address,
      phoneNumber,
      isActive: status === "Active" ? true : false,
      createdDate: hospitalById?.createdDate,
      createdBy: hospitalById?.createdBy,
    };

    dispatch(updateHospital(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingHospitalById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Hospital"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Hospital Name"}
                value={hospitalName || ""}
                multiline
                rows={3}
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
                selectData={dsDivisionsList || []}
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
                value={address || ""}
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
                value={phoneNumber || ""}
                onChange={onHandlePhoneNumber}
                error={!isValidPhoneNumber}
                helperText={!isValidPhoneNumber && "* Required Field"}
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
            loading={isUpdatingHospital}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateHospital;
