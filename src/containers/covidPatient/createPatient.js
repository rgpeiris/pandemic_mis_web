import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Box,
  Typography,
} from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

import {
  GENDER_LIST,
  DISTRICT_LIST,
  DS_DIVISION_LIST,
  MOH_LIST,
  GRAMA_NILADHARI_DIVISION_LIST,
  checkNICValidity,
  findInfoFromNic,
  checkStringValidity,
  checkContactValidity,
} from "../../utils";

import { createCovidPatient } from "../../store/actions";

const CreatePatient = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registrationDate, setRegistrationDate] = useState("");
  const [isValidRegistrationDate, setIsValidRegistrationDate] = useState(true);
  const [confirmationDate, setConfirmationDate] = useState("");
  const [isValidConfirmationDate, setIsValidConfirmationDate] = useState(true);
  const [nicNumber, setNicNumber] = useState("");
  const [isValidNicNumber, setIsValidNicNumber] = useState(true);
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [isValidPassportNumber, setIsValidPassportNumber] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [isValidPatientName, setIsValidPatientName] = useState(true);
  const [gender, setGender] = useState("");
  const [isValidGender, setIsValidGender] = useState(true);
  const [isClearGender, setIsClearGender] = useState(false);
  const [district, setDistrict] = useState("");
  const [isValidDistrict, setIsValidDistrict] = useState(true);
  const [isClearDistrict, setIsClearDistrict] = useState(false);
  const [dsDivision, setDsDivision] = useState("");
  const [dsDivisionsList, setDsDivisionsList] = useState([]);
  const [isValidDsDivision, setIsValidDsDivision] = useState(true);
  const [isClearDsDivision, setIsClearDsDivision] = useState(false);
  const [moh, setMoh] = useState("");
  const [mohList, setMohList] = useState([]);
  const [isValidMoh, setIsValidMoh] = useState(true);
  const [isClearMoh, setIsClearMoh] = useState(false);
  const [gnd, setGnd] = useState("");
  const [gndList, setGndList] = useState([]);
  const [isValidGnd, setIsValidGnd] = useState(true);
  const [isClearGnd, setIsClearGnd] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [foreignEntrant, setForeignEntrant] = useState(false);
  const [criticalMedicalInfo, setCriticalMedicalInfo] = useState("");
  const [otherMedicalNotes, setOtherMedicalNotes] = useState("");
  const [medicalReportingAgency, setMedicalReportingAgency] = useState("");
  const [isValidMedicalReportingAgency, setIsValidMedicalReportingAgency] =
    useState(true);
  const [reportedHealthCenter, setReportedHealthCenter] = useState("");
  const [isValidReportedHealthCenter, setIsValidReportedHealthCenter] =
    useState(true);
  const [guardianName, setGuardianName] = useState("");
  const [isValidGuardianName, setIsValidGuardianName] = useState(true);
  const [guardianNicNumber, setGuardianNicNumber] = useState("");
  const [isValidGuardianNicNumber, setIsValidGuardianNicNumber] =
    useState(true);
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState("");
  const [isValidGuardianPhoneNumber, setIsValidGuardianPhoneNumber] =
    useState(true);
  const [guardianAddress, setGuardianAddress] = useState("");
  const [isValidGuardianAddress, setIsValidGuardianAddress] = useState(true);
  const [guardianRelationship, setGuardianRelationship] = useState("");
  const [isValidGuardianRelationship, setIsValidGuardianRelationship] =
    useState(true);
  const [guardianAssignedUsername, setGuardianAssignedUsername] = useState("");
  const [healthcareProfessional, setHealthcareProfessional] = useState("");
  const [isValidHealthcareProfessional, setIsValidHealthcareProfessional] =
    useState(true);
  const [isClearHealthcareProfessional, setIsClearHealthcareProfessional] =
    useState(false);
  const [healthcareProfessionalsList, setHealthcareProfessionalsList] =
    useState([]);
  const [hospitalsList, setHospitalsList] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState("");
  const [isClearSearchDistrict, setIsClearSearchDistrict] = useState(false);
  const [searchHospital, setSearchHospital] = useState("");
  const [isClearSearchHospital, setIsClearSearchHospital] = useState(false);

  const { loggedInUser } = useSelector((state) => state.auth);
  const {
    isGettingHealthcareProfessionals,
    isErrorGettingHealthcareProfessionals,
    healthcareProfessionals,
    isGettingHospitals,
    isErrorGettingHospitals,
    hospitals,
  } = useSelector((state) => state.covidPatient);

  const onHandleRegistrationDate = (e) => {
    setIsValidRegistrationDate(true);
    setRegistrationDate(e.target.value);
  };

  const onHandleConfirmationDate = (e) => {
    setIsValidConfirmationDate(true);
    setConfirmationDate(e.target.value);
  };

  const onHandleNicNumber = (e) => {
    setIsValidNicNumber(true);
    setNicNumber(e.target.value);

    if (checkNICValidity(e.target.value)) {
      var info = findInfoFromNic(e.target.value);

      if (info != null) {
        setAge(info.age);
        setBirthday(info.dob);
      } else {
        setAge("");
        setBirthday("");
      }
    } else {
      setAge("");
      setBirthday("");
    }
  };

  const onHandlePassportNumber = (e) => {
    setIsValidPassportNumber(true);
    setPassportNumber(e.target.value);
  };

  const onHandlePatientName = (e) => {
    setIsValidPatientName(true);
    setPatientName(e.target.value);
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

  const onHandleDistrict = (e) => {
    setIsValidDistrict(true);
    setIsClearDistrict(true);
    setDistrict(e.target.value);

    let dsDList = DS_DIVISION_LIST.find(
      (x) => x.key === e.target.value
    ).dsDivisions;

    let moList = MOH_LIST.find((x) => x.key === e.target.value).mohList;

    let gnList = GRAMA_NILADHARI_DIVISION_LIST.find(
      (x) => x.key === e.target.value
    ).gndList;

    setDsDivisionsList(dsDList);
    setMohList(moList);
    setGndList(gnList);
  };

  const onHandleClearDistrict = () => {
    setDistrict("");
    setIsClearDistrict(false);
    setDsDivision("");
    setIsClearDsDivision(false);
    setDsDivisionsList([]);
    setMoh("");
    setIsClearMoh(false);
    setMohList([]);
    setGnd("");
    setIsClearGnd(false);
    setGndList([]);
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

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const onHandleAddress = (e) => {
    setIsValidAddress(true);
    setAddress(e.target.value);
  };

  const onHandleForeignEntrant = () => {
    setForeignEntrant(!foreignEntrant);
    setIsValidPassportNumber(true);
    setIsValidNicNumber(true);
  };

  const onHandleCriticalMedicalInfo = (e) => {
    setCriticalMedicalInfo(e.target.value);
  };

  const onHandleOtherMedicalNotes = (e) => {
    setOtherMedicalNotes(e.target.value);
  };

  const onHandleMedicalReportingAgency = (e) => {
    setIsValidMedicalReportingAgency(true);
    setMedicalReportingAgency(e.target.value);
  };

  const onHandleReportedHealthCenter = (e) => {
    setIsValidReportedHealthCenter(true);
    setReportedHealthCenter(e.target.value);
  };

  const onHandleGuardianName = (e) => {
    setIsValidGuardianName(true);
    setGuardianName(e.target.value);
  };

  const onHandleGuardianNicNumber = (e) => {
    setIsValidGuardianNicNumber(true);
    setGuardianNicNumber(e.target.value);
  };

  const onHandleGuardianPhoneNumber = (e) => {
    setIsValidGuardianPhoneNumber(true);
    setGuardianPhoneNumber(e.target.value);
  };

  const onHandleGuardianAddress = (e) => {
    setIsValidGuardianAddress(true);
    setGuardianAddress(e.target.value);
  };

  const onHandleGuardianRelationship = (e) => {
    setIsValidGuardianRelationship(true);
    setGuardianRelationship(e.target.value);
  };

  const onHandleGuardianAssignedUsername = (e) => {
    setGuardianAssignedUsername(e.target.value);
  };

  const onHandleHealthcareProfessional = (e) => {
    setIsValidHealthcareProfessional(true);
    setIsClearHealthcareProfessional(true);
    setHealthcareProfessional(e.target.value);
  };

  const onHandleClearHealthcareProfessional = () => {
    setHealthcareProfessional("");
    setIsClearHealthcareProfessional(false);
  };

  const onHandleSearchDistrict = (e) => {
    setIsClearSearchDistrict(true);
    setSearchDistrict(e.target.value);

    let hosList = hospitals.filter((x) => x.district === e.target.value);
    setHospitalsList(hosList);
    setSearchHospital("");
    setIsClearSearchHospital(false);

    setHealthcareProfessionalsList([]);
    setHealthcareProfessional("");
    setIsClearHealthcareProfessional(false);
  };

  const onHandleClearSearchDistrict = () => {
    setIsClearSearchDistrict(false);
    setSearchDistrict("");

    setHospitalsList([]);
    setSearchHospital("");
    setIsClearSearchHospital(false);

    setHealthcareProfessionalsList([]);
    setHealthcareProfessional("");
    setIsClearHealthcareProfessional(false);
  };

  const onHandleSearchHospital = (e) => {
    setIsClearSearchHospital(true);
    setSearchHospital(e.target.value);

    let hpList = healthcareProfessionals.filter(
      (x) => x.assignedHospital === e.target.value
    );
    setHealthcareProfessionalsList(hpList);
    setHealthcareProfessional("");
    setIsClearHealthcareProfessional(false);
  };

  const onHandleClearSearchHospital = () => {
    setSearchHospital("");
    setIsClearSearchHospital(false);

    setHealthcareProfessionalsList([]);
    setHealthcareProfessional("");
    setIsClearHealthcareProfessional(false);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(registrationDate)) {
      setIsValidRegistrationDate(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(confirmationDate)) {
      setIsValidConfirmationDate(false);
      isErrorValidation = true;
    }
    if (!foreignEntrant && !checkNICValidity(nicNumber)) {
      setIsValidNicNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(patientName)) {
      setIsValidPatientName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(gender)) {
      setIsValidGender(false);
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
    if (!checkStringValidity(moh)) {
      setIsValidMoh(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(gnd)) {
      setIsValidGnd(false);
      isErrorValidation = true;
    }
    if (!checkContactValidity(phoneNumber)) {
      setIsValidPhoneNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(address)) {
      setIsValidAddress(false);
      isErrorValidation = true;
    }
    if (foreignEntrant && !checkStringValidity(passportNumber)) {
      setIsValidPassportNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(medicalReportingAgency)) {
      setIsValidMedicalReportingAgency(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(reportedHealthCenter)) {
      setIsValidReportedHealthCenter(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(guardianName)) {
      setIsValidGuardianName(false);
      isErrorValidation = true;
    }
    if (!checkNICValidity(guardianNicNumber)) {
      setIsValidGuardianNicNumber(false);
      isErrorValidation = true;
    }
    if (!checkContactValidity(guardianPhoneNumber)) {
      setIsValidGuardianPhoneNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(guardianAddress)) {
      setIsValidGuardianAddress(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(guardianRelationship)) {
      setIsValidGuardianRelationship(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(healthcareProfessional)) {
      setIsValidHealthcareProfessional(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();

    var hcp = healthcareProfessionals.find(
      (x) => x.healthcareProfessionalId === healthcareProfessional
    )?.assignedUsername;

    const userData = {
      patientId: 0,
      registrationDate,
      confirmedDate: confirmationDate,
      nicNumber,
      passportNumber,
      patientName,
      dateOfBirth: birthday,
      age,
      gender,
      district,
      dsDivision,
      mohArea: moh,
      gramaNiladhariArea: gnd,
      address,
      phoneNumber,
      foreignEntrant,
      criticalMedicalInformation: criticalMedicalInfo
        ? criticalMedicalInfo
        : null,
      otherMedicalNotes: otherMedicalNotes ? otherMedicalNotes : null,
      medicalReportingAgency,
      reportedHealthCenter,
      guardianName,
      guardianNICNumber: guardianNicNumber,
      guardianAddress,
      guardianPhoneNumber,
      guardianAssignedUsername,
      guardianRelationship,
      localGovernmentInCharge: loggedInUser.userName,
      severityUponDiagnosis: null,
      recommendedTreatmentType: null,
      hospitalId: null,
      wardNumber: null,
      bedNumber: null,
      hospitalAdmissionNo: null,
      dateOfHospitalization: null,
      healthcareProfessionalInCharge: hcp,
      firstNegativeConfirmationDate: null,
      secondNegativeConfirmationDate: null,
      dateOfRecovery: null,
      dateOfDeath: null,
      releaseInfoCertifiedBy: null,
      releaseInfoRemarks: null,
      status: "Registration Completed",
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createCovidPatient(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingHealthcareProfessionals || isGettingHospitals ? (
        <Loading />
      ) : isErrorGettingHealthcareProfessionals || isErrorGettingHospitals ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Create Patient"} />
            </Grid>
            <Grid item sm={3} xs={12}>
              <TextField
                required
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                label={"Registration Date"}
                placeholder={"Enter Registration Date"}
                inputProps={{ maxLength: 50 }}
                value={registrationDate}
                onChange={onHandleRegistrationDate}
                error={!isValidRegistrationDate}
                helperText={!isValidRegistrationDate && "* Required Field"}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <TextField
                required
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                label={"Confirmation Date"}
                placeholder={"Enter Confirmation Date"}
                inputProps={{ maxLength: 50 }}
                value={confirmationDate}
                onChange={onHandleConfirmationDate}
                error={!isValidConfirmationDate}
                helperText={!isValidConfirmationDate && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label={foreignEntrant ? "NIC Number" : "NIC Number *"}
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
                label={"Patient Name"}
                placeholder={"Enter Patient Name"}
                inputProps={{ maxLength: 150 }}
                value={patientName}
                multiline
                rows={3}
                onChange={onHandlePatientName}
                error={!isValidPatientName}
                helperText={!isValidPatientName && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth disabled label={"Age"} value={age} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label={"Date Of Birth"}
                value={birthday}
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
            <Grid item sm={3} xs={12}>
              <FormControlLabel
                label="Foreign Entrant"
                control={
                  <Checkbox
                    checked={foreignEntrant}
                    style={{ color: "#CD4C60" }}
                    onChange={onHandleForeignEntrant}
                  />
                }
              />
            </Grid>
            <Grid item sm={9} xs={12}>
              <TextField
                fullWidth
                label={foreignEntrant ? "Passport Number *" : "Passport Number"}
                placeholder={"Enter Passport Number"}
                inputProps={{ maxLength: 50 }}
                value={passportNumber}
                onChange={onHandlePassportNumber}
                error={!isValidPassportNumber}
                helperText={!isValidPassportNumber && "* Required Field"}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Divider>
                <Box
                  sx={{
                    backgroundColor: "#ebebeb",
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 2,
                    paddingRight: 2,
                    borderRadius: "50px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <Typography
                    color="#000000"
                    sx={{ fontSize: 18, fontWeight: 600 }}
                  >
                    {"Medical Information"}
                  </Typography>
                </Box>
              </Divider>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                label={"Critical Medical Information"}
                placeholder={"Enter Critical Medical Information"}
                inputProps={{ maxLength: 150 }}
                value={criticalMedicalInfo}
                multiline
                rows={3}
                onChange={onHandleCriticalMedicalInfo}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                label={"Other Medical Notes"}
                placeholder={"Enter Other Medical Notes"}
                inputProps={{ maxLength: 150 }}
                value={otherMedicalNotes}
                multiline
                rows={3}
                onChange={onHandleOtherMedicalNotes}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Divider>
                <Box
                  sx={{
                    backgroundColor: "#ebebeb",
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 2,
                    paddingRight: 2,
                    borderRadius: "50px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <Typography
                    color="#000000"
                    sx={{ fontSize: 18, fontWeight: 600 }}
                  >
                    {"Initial Confirmation Information"}
                  </Typography>
                </Box>
              </Divider>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Medical Reporting Agency"}
                placeholder={"Enter Medical Reporting Agency"}
                inputProps={{ maxLength: 100 }}
                value={medicalReportingAgency}
                onChange={onHandleMedicalReportingAgency}
                error={!isValidMedicalReportingAgency}
                helperText={
                  !isValidMedicalReportingAgency && "* Required Field"
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Reported Health Center"}
                placeholder={"Enter Reported Health Center"}
                inputProps={{ maxLength: 100 }}
                value={reportedHealthCenter}
                onChange={onHandleReportedHealthCenter}
                error={!isValidReportedHealthCenter}
                helperText={!isValidReportedHealthCenter && "* Required Field"}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Divider>
                <Box
                  sx={{
                    backgroundColor: "#ebebeb",
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 2,
                    paddingRight: 2,
                    borderRadius: "50px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <Typography
                    color="#000000"
                    sx={{ fontSize: 18, fontWeight: 600 }}
                  >
                    {"Guardian's Information"}
                  </Typography>
                </Box>
              </Divider>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Guardian's Name"}
                placeholder={"Enter Guardian's Name"}
                inputProps={{ maxLength: 150 }}
                value={guardianName}
                multiline
                rows={3}
                onChange={onHandleGuardianName}
                error={!isValidGuardianName}
                helperText={!isValidGuardianName && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Guardian's NIC Number"}
                placeholder={"Enter Guardian's NIC Number"}
                inputProps={{ maxLength: 50 }}
                value={guardianNicNumber}
                onChange={onHandleGuardianNicNumber}
                error={!isValidGuardianNicNumber}
                helperText={
                  !isValidGuardianNicNumber
                    ? guardianNicNumber
                      ? "Please enter a valid NIC number"
                      : "* Required Field"
                    : ""
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Guardian's Phone Number"}
                placeholder={"Enter Guardian's Phone Number"}
                inputProps={{ maxLength: 50 }}
                value={guardianPhoneNumber}
                onChange={onHandleGuardianPhoneNumber}
                error={!isValidGuardianPhoneNumber}
                helperText={
                  !isValidGuardianPhoneNumber
                    ? guardianPhoneNumber
                      ? "Please enter a valid Phone number"
                      : "* Required Field"
                    : ""
                }
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Guardian's Address"}
                placeholder={"Enter Guardian's Address"}
                inputProps={{ maxLength: 200 }}
                value={guardianAddress}
                multiline
                rows={3}
                onChange={onHandleGuardianAddress}
                error={!isValidGuardianAddress}
                helperText={!isValidGuardianAddress && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Relationship to the Patient"}
                placeholder={"Enter Relationship to the Patient"}
                inputProps={{ maxLength: 50 }}
                value={guardianRelationship}
                onChange={onHandleGuardianRelationship}
                error={!isValidGuardianRelationship}
                helperText={!isValidGuardianRelationship && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label={"Guardian's Assigned Username"}
                placeholder={"Enter Guardian's Assigned Username"}
                inputProps={{ maxLength: 50 }}
                value={guardianAssignedUsername}
                onChange={onHandleGuardianAssignedUsername}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Divider>
                <Box
                  sx={{
                    backgroundColor: "#ebebeb",
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 2,
                    paddingRight: 2,
                    borderRadius: "50px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <Typography
                    color="#000000"
                    sx={{ fontSize: 18, fontWeight: 600 }}
                  >
                    {"Allocation Information"}
                  </Typography>
                </Box>
              </Divider>
            </Grid>
            <Grid item sm={4} xs={12}>
              <CustomSelect
                fullWidth
                label={"Select District"}
                isShowPlaceholder
                value={searchDistrict || ""}
                selectData={DISTRICT_LIST}
                onChange={onHandleSearchDistrict}
                handleClear={onHandleClearSearchDistrict}
                isClear={isClearSearchDistrict}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <CustomSelect
                fullWidth
                label={"Select Hospital"}
                isShowPlaceholder
                menuItemValue={"hospitalId"}
                menuItemText={"hospitalName"}
                value={searchHospital || ""}
                selectData={hospitalsList}
                onChange={onHandleSearchHospital}
                handleClear={onHandleClearSearchHospital}
                isClear={isClearSearchHospital}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <CustomSelect
                fullWidth
                label={"Healthcare Professional In Charge *"}
                isShowPlaceholder
                menuItemValue={"healthcareProfessionalId"}
                menuItemText={"healthcareProfessionalName"}
                value={healthcareProfessional || ""}
                selectData={healthcareProfessionalsList}
                onChange={onHandleHealthcareProfessional}
                isValid={isValidHealthcareProfessional}
                handleClear={onHandleClearHealthcareProfessional}
                isClear={isClearHealthcareProfessional}
              />
            </Grid>
          </Grid>
          <FormActionButton onCancelClick={onHandleCancel} loading={false} />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default CreatePatient;
