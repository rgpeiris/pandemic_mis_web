import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Autocomplete } from "@mui/material";
import moment from "moment";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import {
  checkStringValidity,
  checkContactValidity,
  checkNICValidity,
  findInfoFromNic,
  GENDER_LIST,
  DISTRICT_LIST,
  MOH_LIST,
  GRAMA_NILADHARI_DIVISION_LIST,
} from "../../utils";

import { createPandemicVaccination } from "../../store/actions";

const CreateVaccination = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [nicNumber, setNicNumber] = useState("");
  const [isValidNicNumber, setIsValidNicNumber] = useState(true);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isValidGender, setIsValidGender] = useState(true);
  const [isClearGender, setIsClearGender] = useState(false);
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [district, setDistrict] = useState("");
  const [isValidDistrict, setIsValidDistrict] = useState(true);
  const [isClearDistrict, setIsClearDistrict] = useState(false);
  const [moh, setMoh] = useState("");
  const [mohList, setMohList] = useState([]);
  const [isValidMoh, setIsValidMoh] = useState(true);
  const [isClearMoh, setIsClearMoh] = useState(false);
  const [gnd, setGnd] = useState("");
  const [gndList, setGndList] = useState([]);
  const [isValidGnd, setIsValidGnd] = useState(true);
  const [isClearGnd, setIsClearGnd] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [isValidSerialNumber, setIsValidSerialNumber] = useState(true);
  const [vaccineName, setVaccineName] = useState("");
  const [isValidVaccineName, setIsValidVaccineName] = useState(true);
  const [isClearVaccineName, setIsClearVaccineName] = useState(false);
  const [vaccineDose, setVaccineDose] = useState("");
  const [isValidVaccineDose, setIsValidVaccineDose] = useState(true);
  const [isClearVaccineDose, setIsClearVaccineDose] = useState(false);
  const [center, setCenter] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isValidCenter, setIsValidCenter] = useState(true);
  const [dateOfVaccination, setDateOfVaccination] = useState("");
  const [isValidDateOfVaccination, setIsValidDateOfVaccination] =
    useState(true);
  const [nextAppointmentDate, setNextAppointmentDate] = useState("");

  const { loggedInUser } = useSelector((state) => state.auth);
  const {
    covidVaccines,
    isGettingVaccines,
    isCreatingPandemicVaccination,
    vaccinationCentres,
    isGettingVaccinationCentres,
  } = useSelector((state) => state.covidVaccine);

  const onHandleFullName = (e) => {
    setIsValidFullName(true);
    setFullName(e.target.value);
  };

  const onHandleNicNumber = (e) => {
    setIsValidNicNumber(true);
    setNicNumber(e.target.value);

    if (checkNICValidity(e.target.value)) {
      var info = findInfoFromNic(e.target.value);

      if (info != null) {
        setAge(info.age);
      } else {
        setAge("");
      }
    } else {
      setAge("");
    }
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

  const onHandleAddress = (e) => {
    setIsValidAddress(true);
    setAddress(e.target.value);
  };

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const onHandleDistrict = (e) => {
    setIsValidDistrict(true);
    setIsClearDistrict(true);
    setDistrict(e.target.value);

    let moList = MOH_LIST.find((x) => x.key === e.target.value).mohList;

    let gnList = GRAMA_NILADHARI_DIVISION_LIST.find(
      (x) => x.key === e.target.value
    ).gndList;

    setMohList(moList);
    setGndList(gnList);
  };

  const onHandleClearDistrict = () => {
    setDistrict("");
    setIsClearDistrict(false);
    setMoh("");
    setIsClearMoh(false);
    setMohList([]);
    setGnd("");
    setIsClearGnd(false);
    setGndList([]);
  };

  const onHandleMoh = (e) => {
    setIsValidMoh(true);
    setIsClearMoh(true);
    setMoh(e.target.value);
  };

  const onHandleClearMoh = () => {
    setMoh("");
    setIsClearMoh(false);
  };

  const onHandleGnd = (e) => {
    setIsValidGnd(true);
    setIsClearGnd(true);
    setGnd(e.target.value);
  };

  const onHandleClearGnd = () => {
    setGnd("");
    setIsClearGnd(false);
  };

  const onHandleSerialNumber = (e) => {
    setIsValidSerialNumber(true);
    setSerialNumber(e.target.value);
  };

  const onHandleVaccineName = (e) => {
    setIsValidVaccineName(true);
    setIsClearVaccineName(true);
    setVaccineName(e.target.value);

    if (e.target.value && vaccineDose && dateOfVaccination) {
      let item = covidVaccines.find(
        (x) => x.vaccineName === e.target.value && x.dose === vaccineDose
      );

      if (item) {
        const date = new Date(dateOfVaccination);
        let nextAppointment = new Date(
          date.setMonth(date.getMonth() + item?.nextDose)
        );

        setNextAppointmentDate(nextAppointment.toISOString());
      }
    }
  };

  const onHandleClearVaccineName = () => {
    setVaccineName("");
    setIsClearVaccineName(false);
    setNextAppointmentDate("");
  };

  const onHandleVaccineDose = (e) => {
    setIsValidVaccineDose(true);
    setIsClearVaccineDose(true);
    setVaccineDose(e.target.value);

    if (vaccineName && e.target.value && dateOfVaccination) {
      let item = covidVaccines.find(
        (x) => x.vaccineName === vaccineName && x.dose === e.target.value
      );

      if (item) {
        const date = new Date(dateOfVaccination);
        let nextAppointment = new Date(
          date.setMonth(date.getMonth() + item?.nextDose)
        );

        setNextAppointmentDate(nextAppointment.toISOString());
      }
    }
  };

  const onHandleClearVaccineDose = () => {
    setVaccineDose("");
    setIsClearVaccineDose(false);
    setNextAppointmentDate("");
  };

  const onHandleCenter = (e, newValue) => {
    setIsValidCenter(true);
    setSelectedCenter(newValue);
    setCenter(newValue != null ? newValue.vaccinationCentreId : "");
  };

  const onHandleDateOfVaccination = (e) => {
    setIsValidDateOfVaccination(true);
    setDateOfVaccination(e.target.value);

    if (vaccineName && vaccineDose && e.target.value) {
      let item = covidVaccines.find(
        (x) => x.vaccineName === vaccineName && x.dose === vaccineDose
      );

      if (item) {
        const date = new Date(e.target.value);
        let nextAppointment = new Date(
          date.setMonth(date.getMonth() + item?.nextDose)
        );

        setNextAppointmentDate(nextAppointment.toISOString());
      }
    }
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(fullName)) {
      setIsValidFullName(false);
      isErrorValidation = true;
    }
    if (!checkNICValidity(nicNumber)) {
      setIsValidNicNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(gender)) {
      setIsValidGender(false);
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
    if (!checkStringValidity(district)) {
      setIsValidDistrict(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(moh)) {
      setIsValidMoh(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(gnd)) {
      setIsValidGnd(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(serialNumber)) {
      setIsValidSerialNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(vaccineName)) {
      setIsValidVaccineName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(vaccineDose)) {
      setIsValidVaccineDose(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(center)) {
      setIsValidCenter(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(dateOfVaccination)) {
      setIsValidDateOfVaccination(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      pandemicVaccinationId: 0,
      name: fullName,
      nicNumber,
      age,
      gender,
      address,
      phoneNumber,
      district,
      mohArea: moh,
      gramaNiladhariArea: gnd,
      serialNumber,
      vaccineName,
      vaccineDose,
      vaccinationCentreId: center,
      dateOfVaccination,
      nextAppointmentDate,
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createPandemicVaccination(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingVaccinationCentres || isGettingVaccines ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Create Vaccination"} />
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
                helperText={!isValidNicNumber && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth disabled label={"Age"} value={age} />
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
                label={"Phone Number"}
                placeholder={"Enter Phone Number"}
                inputProps={{ maxLength: 50 }}
                value={phoneNumber}
                onChange={onHandlePhoneNumber}
                error={!isValidPhoneNumber}
                helperText={!isValidPhoneNumber && "* Required Field"}
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
                label={"MOH Area *"}
                isShowPlaceholder
                value={moh || ""}
                selectData={mohList}
                onChange={onHandleMoh}
                isValid={isValidMoh}
                handleClear={onHandleClearMoh}
                isClear={isClearMoh}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Grama Niladhari Division *"}
                isShowPlaceholder
                value={gnd || ""}
                selectData={gndList}
                onChange={onHandleGnd}
                isValid={isValidGnd}
                handleClear={onHandleClearGnd}
                isClear={isClearGnd}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Vaccine Name *"}
                isShowPlaceholder
                value={vaccineName || ""}
                menuItemValue={"vaccineName"}
                menuItemText={"vaccineName"}
                selectData={covidVaccines.filter((obj, index) => {
                  return (
                    index ===
                    covidVaccines.findIndex(
                      (o) => obj.vaccineName === o.vaccineName
                    )
                  );
                })}
                onChange={onHandleVaccineName}
                isValid={isValidVaccineName}
                handleClear={onHandleClearVaccineName}
                isClear={isClearVaccineName}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Vaccine Dose *"}
                isShowPlaceholder
                value={vaccineDose || ""}
                menuItemValue={"dose"}
                menuItemText={"dose"}
                selectData={covidVaccines.filter((obj, index) => {
                  return (
                    index ===
                    covidVaccines.findIndex((o) => obj.dose === o.dose)
                  );
                })}
                onChange={onHandleVaccineDose}
                isValid={isValidVaccineDose}
                handleClear={onHandleClearVaccineDose}
                isClear={isClearVaccineDose}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Autocomplete
                value={selectedCenter}
                onChange={onHandleCenter}
                options={vaccinationCentres || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Vaccination Center"
                    placeholder="Search Vaccination Center"
                    variant="outlined"
                    error={!isValidCenter}
                    helperText={!isValidCenter && "* Required Field"}
                  />
                )}
                getOptionLabel={(option) => option.centreName || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                label={"Date Of Vaccination"}
                type="date"
                value={dateOfVaccination}
                onChange={onHandleDateOfVaccination}
                error={!isValidDateOfVaccination}
                helperText={!isValidDateOfVaccination && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label={"Next Appointment Date"}
                value={
                  nextAppointmentDate &&
                  moment(nextAppointmentDate).format("MM/DD/YYYY")
                }
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Serial Number"}
                placeholder={"Enter Serial Number"}
                inputProps={{ maxLength: 50 }}
                value={serialNumber}
                onChange={onHandleSerialNumber}
                error={!isValidSerialNumber}
                helperText={!isValidSerialNumber && "* Required Field"}
              />
            </Grid>
          </Grid>
          <FormActionButton
            onCancelClick={onHandleCancel}
            loading={isCreatingPandemicVaccination}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default CreateVaccination;
