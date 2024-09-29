import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Checkbox,
  Typography,
  Box,
  IconButton,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Search, FilterAltOff } from "@mui/icons-material";

import CustomModal from "../../components/modal";
import { FormWrapper, SpaceBetween } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";

import {
  GENDER_LIST,
  DISTRICT_LIST,
  DS_DIVISION_LIST,
  checkNICValidity,
  findInfoFromNic,
  checkStringValidity,
  checkContactValidity,
} from "../../utils";

import {
  createTestsAppointment,
  getScheduledTestCentresByInfo,
} from "../../store/actions";

const CreateTestingAppointment = ({ isOpen, handleClose }) => {
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
  const [dsDivision, setDsDivision] = useState("");
  const [dsDivisionsList, setDsDivisionsList] = useState([]);
  const [isValidDsDivision, setIsValidDsDivision] = useState(true);
  const [isClearDsDivision, setIsClearDsDivision] = useState(false);
  const [date, setDate] = useState("");
  const [showCenters, setShowCenters] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [isValidCentre, setIsValidCentre] = useState(true);

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isCreatingTestAppointment } = useSelector((state) => state.covidTest);

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

  const onHandleDate = (e) => {
    setDate(e.target.value);
  };

  const onSelectAction = (scheduledTestCentreId, e) => {
    const { value } = e.target;

    const newArr = searchedData.map((obj) => {
      if (obj.scheduledTestCentreId === scheduledTestCentreId) {
        return { ...obj, timeSelected: value };
      }
      return obj;
    });
    setSearchedData(newArr);
  };

  const onCheckAction = (scheduledTestCentreId, e) => {
    const { checked } = e.target;
    setIsValidCentre(true);

    searchedData.map((element) => ({
      ...element,
      checked: false,
    }));

    const newArr = searchedData.map((obj) => {
      if (obj.scheduledTestCentreId === scheduledTestCentreId) {
        return { ...obj, checked: checked };
      }
      return obj;
    });
    setSearchedData(newArr);
  };

  const onHandleSearch = (e) => {
    e.preventDefault();
    setIsValidCentre(true);
    const userData = {
      district,
      city: dsDivision,
      date,
    };

    dispatch(getScheduledTestCentresByInfo(userData, onHandleSuccessSearch));
  };

  const onHandleSuccessSearch = (data) => {
    setShowCenters(true);
    setSearchedData(data);
  };

  const onHandleClearFilters = (e) => {
    e.preventDefault();
    setDistrict("");
    setIsClearDistrict(false);
    setDsDivision("");
    setIsClearDsDivision(false);
    setDsDivisionsList([]);
    setDate("");
    setSearchedData([]);
    setShowCenters(false);
    setIsValidCentre(true);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    let selectedCentre = searchedData.find((x) => x.checked === true);

    if (!checkStringValidity(fullName)) {
      setIsValidFullName(false);
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
    if (!checkStringValidity(gender)) {
      setIsValidGender(false);
      isErrorValidation = true;
    }
    if (selectedCentre === undefined) {
      setIsValidCentre(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();

    let selectedCentre = searchedData.find((x) => x.checked === true);

    const userData = {
      testsAppointmentId: 0,
      name: fullName,
      nicNumber,
      age,
      gender,
      address,
      phoneNumber,
      testCentreId: selectedCentre.testCentreId,
      dateScheduled: selectedCentre.dateScheduled,
      timeScheduled: selectedCentre.timeSelected,
      status: "SCHEDULED",
      createdBy: loggedInUser.userName,
      createdDate: new Date().toISOString(),
    };

    dispatch(createTestsAppointment(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create Testing Appointment"} />
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
              helperText={!isValidPhoneNumber && "* Required Field"}
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
          <Grid item sm={12} xs={12}>
            <Typography fontSize="15px">Select Testing Center *</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: "#F0F0F0",
            borderRadius: "15px 15px 15px 15px",
            p: "20px 20px 20px 20px",
            mt: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Typography fontSize="13px">
                Find center with District and City
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Select District *"}
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
                label={"Select City *"}
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
              <TextField
                fullWidth
                label={"Select Date"}
                type="date"
                value={date}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
                sx={{ pr: 1 }}
                onChange={onHandleDate}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <IconButton
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "7px",
                  background:
                    "transparent linear-gradient(90deg, #B02D41 0%, #D9596D 100%) 0% 0% no-repeat padding-box",
                  color: "#FFFFFF",
                  mr: "5px",
                }}
                onClick={onHandleSearch}
              >
                <Search />
              </IconButton>
              <IconButton
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "7px",
                  background:
                    "transparent linear-gradient(90deg, #B02D41 0%, #D9596D 100%) 0% 0% no-repeat padding-box",
                  color: "#FFFFFF",
                }}
                onClick={onHandleClearFilters}
              >
                <FilterAltOff />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        {showCenters && (
          <Grid container spacing={2}>
            {searchedData.map((item, index) => {
              return (
                <Grid key={index} item sm={6} xs={12}>
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #D0D0D0",
                      borderRadius: "15px 15px 15px 15px",
                      p: "5px 5px 5px 5px",
                      mt: "15px",
                    }}
                  >
                    <SpaceBetween>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "600",
                          pl: 3,
                          pt: 3,
                        }}
                      >
                        {item.centreName}
                      </Typography>
                      <Checkbox
                        checked={item.checked}
                        style={{ color: "#CD4C60" }}
                        onChange={onCheckAction.bind(
                          this,
                          item.scheduledTestCentreId
                        )}
                      />
                    </SpaceBetween>
                    <Typography sx={{ fontSize: "14px", pl: 3 }}>
                      Date: {item.dateScheduled?.split("T")[0]} (10.00 am - 5.00
                      pm)
                    </Typography>
                    <Typography sx={{ fontSize: "14px", pl: 3 }}>
                      Available Capacity: {item.availableCapacity}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", mb: 1, pl: 3 }}>
                      Schedule Time
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingBottom: "5px",
                      }}
                    >
                      <FormControl sx={{ pl: 3 }}>
                        <RadioGroup
                          row
                          size="medium"
                          name="timeScheduled"
                          value={item.timeSelected}
                          onChange={onSelectAction.bind(
                            this,
                            item.scheduledTestCentreId
                          )}
                        >
                          <FormControlLabel
                            value={"Forenoon"}
                            control={<Radio sx={{ color: "#8D8D8D" }} />}
                            label={
                              <Typography style={{ fontSize: "14px" }}>
                                Forenoon
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value={"Afternoon"}
                            control={<Radio sx={{ color: "#8D8D8D" }} />}
                            label={
                              <Typography style={{ fontSize: "14px" }}>
                                Afternoon
                              </Typography>
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
        {!isValidCentre && (
          <Typography
            style={{
              fontSize: "12px",
              color: "#d32f2f",
              marginLeft: 25,
              marginTop: 5,
            }}
          >
            * Select a testing center to continue
          </Typography>
        )}
        <FormActionButton
          onCancelClick={onHandleCancel}
          loading={isCreatingTestAppointment}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateTestingAppointment;
