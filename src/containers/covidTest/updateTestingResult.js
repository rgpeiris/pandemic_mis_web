import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";
import { AddButton } from "../../components/button";

import {
  checkStringValidity,
  checkContactValidity,
  checkNICValidity,
  findInfoFromNic,
  GENDER_LIST,
  DISTRICT_LIST,
  MOH_LIST,
  GRAMA_NILADHARI_DIVISION_LIST,
  TESTING_RESULT_STATUS_LIST,
  TESTING_STATUS_LIST,
} from "../../utils";

import { updatePandemicTestResult } from "../../store/actions";

const UpdateTestingResult = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pandemicTestResultId, setPandemicTestResultId] = useState("");
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
  const [center, setCenter] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isValidCenter, setIsValidCenter] = useState(true);
  const [dateOfPandemicTest, setDateOfPandemicTest] = useState("");
  const [isValidDateOfPandemicTest, setIsValidDateOfPandemicTest] =
    useState(true);
  const [testingType, setTestingType] = useState("");
  const [isValidTestingType, setIsValidTestingType] = useState(true);
  const [isClearTestingType, setIsClearTestingType] = useState(false);
  const [testingResult, setTestingResult] = useState("");
  const [isValidTestingResult, setIsValidTestingResult] = useState(true);
  const [isClearTestingResult, setIsClearTestingResult] = useState(false);
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);
  const [summary, setSummary] = useState("");
  const [isValidSummary, setIsValidSummary] = useState(true);

  const {
    covidTestings,
    isGettingTestings,
    isUpdatingPandemicTestResult,
    testCentres,
    isGettingTestCentres,
    isGettingPandemicTestResultById,
    pandemicTestResultsById,
  } = useSelector((state) => state.covidTest);

  useEffect(() => {
    if (pandemicTestResultsById) {
      setPandemicTestResultId(pandemicTestResultsById?.pandemicTestResultId);
      setFullName(pandemicTestResultsById?.name);
      setNicNumber(pandemicTestResultsById?.nicNumber);
      setAge(pandemicTestResultsById?.age);
      setGender(pandemicTestResultsById?.gender);
      setPhoneNumber(pandemicTestResultsById?.phoneNumber);
      setAddress(pandemicTestResultsById?.address);
      setDistrict(pandemicTestResultsById?.district);

      let moList = MOH_LIST.find(
        (x) => x.key === pandemicTestResultsById?.district
      )?.mohList;
      setMohList(moList);

      setMoh(pandemicTestResultsById?.mohArea);

      let gnList = GRAMA_NILADHARI_DIVISION_LIST.find(
        (x) => x.key === pandemicTestResultsById?.district
      )?.gndList;
      setGndList(gnList);

      setGnd(pandemicTestResultsById?.gramaNiladhariArea);
      setSerialNumber(pandemicTestResultsById?.serialNumber);
      setCenter(pandemicTestResultsById?.testCentreId);
      setDateOfPandemicTest(
        pandemicTestResultsById?.dateOfPandemicTest?.split("T")[0]
      );
      setTestingType(pandemicTestResultsById?.testingType);
      setTestingResult(pandemicTestResultsById?.testResult);
      setSummary(pandemicTestResultsById?.testResultSummary);
      setStatus(pandemicTestResultsById?.status);

      let cen = testCentres.find(
        (x) => x.testCentreId === pandemicTestResultsById?.testCentreId
      );
      setSelectedCenter(cen);

      setIsValidFullName(true);
      setIsValidNicNumber(true);
      setIsValidGender(true);
      setIsClearGender(true);
      setIsValidPhoneNumber(true);
      setIsValidAddress(true);
      setIsValidDistrict(true);
      setIsClearDistrict(true);
      setIsValidMoh(true);
      setIsClearMoh(true);
      setIsValidGnd(true);
      setIsClearGnd(true);
      setIsValidSerialNumber(true);
      setIsValidDateOfPandemicTest(true);
      setIsValidTestingType(true);
      setIsClearTestingType(true);
      setIsValidTestingResult(true);
      setIsClearTestingResult(true);
      setIsValidSummary(true);
      setIsValidStatus(true);
    }
  }, [pandemicTestResultsById]);

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

  const onHandleCenter = (e, newValue) => {
    setIsValidCenter(true);
    setSelectedCenter(newValue);
    setCenter(newValue != null ? newValue.testCentreId : "");
  };

  const onHandleDateOfPandemicTest = (e) => {
    setIsValidDateOfPandemicTest(true);
    setDateOfPandemicTest(e.target.value);
  };

  const onHandleTestingType = (e) => {
    setIsValidTestingType(true);
    setIsClearTestingType(true);
    setTestingType(e.target.value);
  };

  const onHandleClearTestingType = () => {
    setTestingType("");
    setIsClearTestingType(false);
  };

  const onHandleTestingResult = (e) => {
    setIsValidTestingResult(true);
    setIsClearTestingResult(true);
    setTestingResult(e.target.value);
  };

  const onHandleClearTestingResult = () => {
    setTestingResult("");
    setIsClearTestingResult(false);
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

  const onHandleSummary = (e) => {
    setIsValidSummary(true);
    setSummary(e.target.value);
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
    if (!checkStringValidity(center)) {
      setIsValidCenter(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(dateOfPandemicTest)) {
      setIsValidDateOfPandemicTest(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(testingType)) {
      setIsValidTestingType(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(testingResult)) {
      setIsValidTestingResult(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(summary)) {
      setIsValidSummary(false);
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
      pandemicTestResultId,
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
      testCentreId: center,
      dateOfPandemicTest,
      testingType,
      testResult: testingResult,
      testResultSummary: summary,
      status,
      createdDate: pandemicTestResultsById?.createdDate,
      createdBy: pandemicTestResultsById?.createdBy,
    };

    dispatch(updatePandemicTestResult(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  const onHandleDownload = () => {
    navigate(`/covid-test-management/medical-testing-certificate`, {
      state: {
        patientName: pandemicTestResultsById?.name,
        nicNumber: pandemicTestResultsById?.nicNumber,
        address: pandemicTestResultsById?.address,
        phoneNumber: pandemicTestResultsById?.phoneNumber,
        collectedOn: pandemicTestResultsById?.createdDate,
        testingType: pandemicTestResultsById?.testingType,
        testResult: pandemicTestResultsById?.testResult,
      },
      replace: true,
    });
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingTestings ||
      isGettingTestCentres ||
      isGettingPandemicTestResultById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Heading title={"Update Testing Result"} />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <AddButton
                title="Download Certificate"
                onHandleClick={onHandleDownload}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Full Name"}
                placeholder={"Enter Full Name"}
                inputProps={{ maxLength: 150 }}
                value={fullName || ""}
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
                value={nicNumber || ""}
                onChange={onHandleNicNumber}
                error={!isValidNicNumber}
                helperText={!isValidNicNumber && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth disabled label={"Age"} value={age || ""} />
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
                value={phoneNumber || ""}
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
                value={address || ""}
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
                selectData={mohList || []}
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
                selectData={gndList || []}
                onChange={onHandleGnd}
                isValid={isValidGnd}
                handleClear={onHandleClearGnd}
                isClear={isClearGnd}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Testing Type *"}
                isShowPlaceholder
                value={testingType || ""}
                menuItemValue={"testType"}
                menuItemText={"testType"}
                selectData={covidTestings || []}
                onChange={onHandleTestingType}
                isValid={isValidTestingType}
                handleClear={onHandleClearTestingType}
                isClear={isClearTestingType}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Testing Result *"}
                isShowPlaceholder
                value={testingResult || ""}
                selectData={TESTING_RESULT_STATUS_LIST}
                onChange={onHandleTestingResult}
                isValid={isValidTestingResult}
                handleClear={onHandleClearTestingResult}
                isClear={isClearTestingResult}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Status *"}
                isShowPlaceholder
                value={status || ""}
                selectData={TESTING_STATUS_LIST}
                onChange={onHandleStatus}
                isValid={isValidStatus}
                handleClear={onHandleClearStatus}
                isClear={isClearStatus}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Autocomplete
                value={selectedCenter || ""}
                onChange={onHandleCenter}
                options={testCentres || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Testing Center"
                    placeholder="Search Testing Center"
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
                label={"Date Of Testing"}
                type="date"
                value={dateOfPandemicTest || ""}
                onChange={onHandleDateOfPandemicTest}
                error={!isValidDateOfPandemicTest}
                helperText={!isValidDateOfPandemicTest && "* Required Field"}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Testing Result Summary"}
                placeholder={"Enter Testing Result Summary"}
                inputProps={{ maxLength: 150 }}
                value={summary || ""}
                multiline
                rows={3}
                onChange={onHandleSummary}
                error={!isValidSummary}
                helperText={!isValidSummary && "* Required Field"}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Serial Number"}
                placeholder={"Enter Serial Number"}
                inputProps={{ maxLength: 50 }}
                value={serialNumber || ""}
                onChange={onHandleSerialNumber}
                error={!isValidSerialNumber}
                helperText={!isValidSerialNumber && "* Required Field"}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingPandemicTestResult}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateTestingResult;
