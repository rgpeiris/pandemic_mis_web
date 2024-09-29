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

import { updateVaccinationCentre } from "../../store/actions";

const UpdateVaccinationCentre = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [vaccinationCentreId, setVaccinationCentreId] = useState("");
  const [centerName, setCenterName] = useState("");
  const [isValidCenterName, setIsValidCenterName] = useState(true);
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
  const [latitude, setLatitude] = useState("");
  const [isValidLatitude, setIsValidLatitude] = useState(true);
  const [longitude, setLongitude] = useState("");
  const [isValidLongitude, setIsValidLongitude] = useState(true);
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const {
    isUpdatingVaccinationCentre,
    isGettingVaccinationCentreById,
    vaccinationCentreById,
  } = useSelector((state) => state.covidVaccine);

  useEffect(() => {
    if (vaccinationCentreById) {
      setVaccinationCentreId(vaccinationCentreById?.vaccinationCentreId);
      setCenterName(vaccinationCentreById?.centreName);
      setDistrict(vaccinationCentreById?.district);

      let dsDList = DS_DIVISION_LIST.find(
        (x) => x.key === vaccinationCentreById?.district
      )?.dsDivisions;
      setDsDivisionsList(dsDList);

      setDsDivision(vaccinationCentreById?.city);
      setAddress(vaccinationCentreById?.address);
      setPhoneNumber(vaccinationCentreById?.phoneNumber);
      setLatitude(vaccinationCentreById?.latitude);
      setLongitude(vaccinationCentreById?.longitude);
      setStatus(vaccinationCentreById?.isActive ? "Active" : "Inactive");
      setIsValidCenterName(true);
      setIsValidDistrict(true);
      setIsClearDistrict(true);
      setIsValidDsDivision(true);
      setIsClearDsDivision(true);
      setIsValidAddress(true);
      setIsValidPhoneNumber(true);
      setIsValidStatus(true);
      setIsClearStatus(true);
      setIsValidLatitude(true);
      setIsValidLongitude(true);
    }
  }, [vaccinationCentreById]);

  const onHandleCenterName = (e) => {
    setIsValidCenterName(true);
    setCenterName(e.target.value);
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

  const onHandleLatitude = (e) => {
    setIsValidLatitude(true);
    setLatitude(e.target.value);
  };

  const onHandleLongitude = (e) => {
    setIsValidLongitude(true);
    setLongitude(e.target.value);
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

    if (!checkStringValidity(centerName)) {
      setIsValidCenterName(false);
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
    if (!checkStringValidity(longitude)) {
      setIsValidLongitude(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(latitude)) {
      setIsValidLatitude(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      vaccinationCentreId,
      centreName: centerName,
      district,
      city: dsDivision,
      address,
      phoneNumber,
      latitude,
      longitude,
      isActive: status === "Active" ? true : false,
      createdDate: vaccinationCentreById?.createdDate,
      createdBy: vaccinationCentreById?.createdBy,
    };

    dispatch(updateVaccinationCentre(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingVaccinationCentreById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Vaccination Center"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Center Name"}
                placeholder={"Enter Center Name"}
                inputProps={{ maxLength: 250 }}
                value={centerName || ""}
                multiline
                rows={2}
                onChange={onHandleCenterName}
                error={!isValidCenterName}
                helperText={!isValidCenterName && "* Required Field"}
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
                label={"Longitude"}
                placeholder={"Enter Longitude"}
                inputProps={{ maxLength: 50 }}
                value={longitude || ""}
                onChange={onHandleLongitude}
                error={!isValidLongitude}
                helperText={!isValidLongitude && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Latitude"}
                placeholder={"Enter Latitude"}
                inputProps={{ maxLength: 50 }}
                value={latitude || ""}
                onChange={onHandleLatitude}
                error={!isValidLatitude}
                helperText={!isValidLatitude && "* Required Field"}
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
            loading={isUpdatingVaccinationCentre}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateVaccinationCentre;
