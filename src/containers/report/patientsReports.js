import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import {
  FilterAlt,
  Search,
  FilterAltOff,
  DownloadForOfflineOutlined,
} from "@mui/icons-material";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";
import CustomSelect from "../../components/customSelect";
import { BasicTable } from "../../components/dataTable";
import { AdvanceSearch } from "../../components/searchBar";
import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

import Account from "./collections/account";

import { PATIENT_REPORT_LIST, DISTRICT_LIST } from "../../utils";

import {
  getPatients,
  getPatientsOverallStats,
  getPatientsMonthlyConfirmedStats,
} from "../../store/actions";

const PatientsReports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isGettingPatientsOverallStats,
    isErrorGettingPatientsOverallStats,
    covidPatientsOverallStats,
    isGettingPatientsMonthlyConfirmedStats,
    isErrorGettingPatientsMonthlyConfirmedStats,
    covidPatientsMonthlyConfirmedStats,
    isGettingPatients,
    isErrorGettingPatients,
    covidPatients,
  } = useSelector((state) => state.covidPatient);

  const [option, setOption] = useState("");
  const [isValidOption, setIsValidOption] = useState(true);
  const [isClearOption, setIsClearOption] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [patientsList, setPatientsList] = useState([]);
  const [district, setDistrict] = useState("");
  const [isClearDistrict, setIsClearDistrict] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getPatientsOverallStats());
    dispatch(getPatientsMonthlyConfirmedStats());
  }, [dispatch]);

  useEffect(() => {
    setPatientsList(covidPatients);
  }, [covidPatients]);

  const columns = [
    {
      field: "patientName",
      columnName: "Patient Name",
      width: "15%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "14%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "14%",
    },
    {
      field: "phoneNumber",
      columnName: "Phone Number",
      width: "12%",
    },
    {
      field: "guardianPhoneNumber",
      columnName: "Guardian's Phone Number",
      width: "12%",
    },
    {
      field: "registrationDate",
      columnName: "Registration Date",
      width: "7%",
    },
    {
      field: "confirmedDate",
      columnName: "Confirmed Date",
      width: "7%",
    },
    {
      field: "status",
      columnName: "Status",
      width: "14%",
    },
  ];

  const chartSetting = {
    yAxis: [
      {
        label: "Total cases",
      },
    ],
    width: 600,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const dataset = [
    {
      count: 0,
      month: "Jan",
    },
    {
      count: 0,
      month: "Feb",
    },
    {
      count: 0,
      month: "Mar",
    },
    {
      count: 0,
      month: "Apr",
    },
    {
      count: 0,
      month: "May",
    },
    {
      count: 0,
      month: "June",
    },
    {
      count: 0,
      month: "July",
    },
    {
      count: 0,
      month: "Aug",
    },
    {
      count: 0,
      month: "Sept",
    },
    {
      count: 0,
      month: "Oct",
    },
    {
      count: 0,
      month: "Nov",
    },
    {
      count: 0,
      month: "Dec",
    },
  ];

  const valueFormatter = (value) => `${value}`;

  const onHandleOption = (e) => {
    setIsValidOption(true);
    setIsClearOption(true);
    setOption(e.target.value);
  };

  const onHandleClearOption = () => {
    setOption("");
    setIsClearOption(false);
  };

  const onHandleDistrict = (e) => {
    setIsClearDistrict(true);
    setDistrict(e.target.value);
  };

  const onHandleClearDistrict = () => {
    setDistrict("");
    setIsClearDistrict(false);
  };

  const onHandleFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const onHandleToDate = (e) => {
    setToDate(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setDistrict("");
    setFromDate("");
    setToDate("");
    setIsClearDistrict(false);
    setOpen(false);

    setCurrentPage(0);
    let searchedPandemicPatientsList = covidPatients.filter(
      (x) => x.nicNumber === searchValue
    );
    setPatientsList(searchedPandemicPatientsList);
  };

  const onClearSearch = () => {
    setDistrict("");
    setFromDate("");
    setToDate("");
    setIsClearDistrict(false);
    setOpen(false);

    setCurrentPage(0);
    setSearchValue("");
    setPatientsList(covidPatients);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  const handleApplyFilters = () => {
    setDistrict("");
    setFromDate("");
    setToDate("");
    setIsClearDistrict(false);
    setOpen(!open);
  };

  const handleClearFilters = () => {
    setCurrentPage(0);
    setDistrict("");
    setFromDate("");
    setToDate("");
    setIsClearDistrict(false);

    if (searchValue) {
      let searchedPandemicPatientsList = covidPatients.filter(
        (x) => x.nicNumber === searchValue
      );
      setPatientsList(searchedPandemicPatientsList);
    } else {
      setPatientsList(covidPatients);
    }
  };

  const handleSearchFilters = () => {
    setCurrentPage(0);

    if (district && fromDate && toDate) {
      let searchedPandemicPatientsList = patientsList.filter(
        (x) =>
          x.district === district &&
          Date.parse(fromDate) <= Date.parse(x.confirmedDate) &&
          Date.parse(x.confirmedDate) <= Date.parse(toDate)
      );
      setPatientsList(searchedPandemicPatientsList);
    } else if (district && fromDate) {
      let searchedPandemicPatientsList = patientsList.filter(
        (x) =>
          x.district === district &&
          Date.parse(fromDate) <= Date.parse(x.confirmedDate)
      );
      setPatientsList(searchedPandemicPatientsList);
    } else if (district && toDate) {
      let searchedPandemicPatientsList = patientsList.filter(
        (x) =>
          x.district === district &&
          Date.parse(x.confirmedDate) <= Date.parse(toDate)
      );
      setPatientsList(searchedPandemicPatientsList);
    } else if (fromDate && toDate) {
      let searchedPandemicPatientsList = patientsList.filter(
        (x) =>
          Date.parse(fromDate) <= Date.parse(x.confirmedDate) &&
          Date.parse(x.confirmedDate) <= Date.parse(toDate)
      );
      setPatientsList(searchedPandemicPatientsList);
    } else if (district) {
      let searchedPandemicPatientsList = patientsList.filter(
        (x) => x.district === district
      );
      setPatientsList(searchedPandemicPatientsList);
    } else if (fromDate) {
      let searchedPandemicPatientsList = patientsList.filter(
        (x) => Date.parse(fromDate) <= Date.parse(x.confirmedDate)
      );
      setPatientsList(searchedPandemicPatientsList);
    } else if (toDate) {
      let searchedPandemicPatientsList = patientsList.filter(
        (x) => Date.parse(x.confirmedDate) <= Date.parse(toDate)
      );
      setPatientsList(searchedPandemicPatientsList);
    } else {
      if (searchValue) {
        let searchedPandemicPatientsList = patientsList.filter(
          (x) => x.nicNumber === searchValue
        );
        setPatientsList(searchedPandemicPatientsList);
      } else {
        setPatientsList(covidPatients);
      }
    }
  };

  const handleDownload = () => {
    navigate(`/report-management/covid-patients-report`, {
      state: {
        otherData: {
          nicNumber: searchValue,
          district: district,
          fromDate: fromDate,
          toDate: toDate,
        },
        dataList: patientsList,
      },
    });
  };

  return (
    <CustomCard style={{ minHeight: "500px" }}>
      {isGettingPatients ||
      isGettingPatientsOverallStats ||
      isGettingPatientsMonthlyConfirmedStats ? (
        <Loading />
      ) : isErrorGettingPatients ||
        isErrorGettingPatientsOverallStats ||
        isErrorGettingPatientsMonthlyConfirmedStats ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="COVID Patients Reports" isArrowBack={true} />
          </SpaceBetween>
          <Grid container spacing={2} sx={{ marginTop: 1, marginBottom: 5 }}>
            <Grid item sm={4} xs={12}>
              <CustomSelect
                fullWidth
                label={"Select Option *"}
                isShowPlaceholder
                value={option || ""}
                selectData={PATIENT_REPORT_LIST}
                onChange={onHandleOption}
                isValid={isValidOption}
                handleClear={onHandleClearOption}
                isClear={isClearOption}
              />
            </Grid>
          </Grid>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "200px",
              minWidth: "850px",
              marginTop: "16px",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              background:
                "transparent linear-gradient(94deg, #cadbee, #eeeeee)",
              border: "1px solid #d9dadf",
              borderRadius: "12px",
              padding: 20,
              display: option === "Overall Statistics" ? "block" : "none",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#60707B",
              }}
            >
              COVID-19 TRACKER | SRI LANKA
            </Typography>
            <Typography
              sx={{
                fontSize: "32px",
                color: "#333333",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Overall Statistics
            </Typography>
            {isGettingPatientsOverallStats ? (
              <Loading />
            ) : isErrorGettingPatientsOverallStats ? (
              <Typography
                variant="string"
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  color: "#8D8D8D",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {"No Data Available"}
              </Typography>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {covidPatientsOverallStats.map((item) => (
                  <Account key={item.type} item={item} />
                ))}
              </div>
            )}
          </Box>
          <CustomCard
            style={{
              width: "100%",
              background:
                "transparent linear-gradient(94deg, #cadbee, #eeeeee)",
              display:
                option === "Month Wise Reported Cases" ? "block" : "none",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#000000",
                fontWeight: "bold",
              }}
            >
              Month Wise Reported Cases (Year 2024)
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            {isGettingPatientsMonthlyConfirmedStats ? (
              <Loading />
            ) : isErrorGettingPatientsMonthlyConfirmedStats ? (
              <Typography
                variant="string"
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  color: "#8D8D8D",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {"No Data Available"}
              </Typography>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BarChart
                  dataset={covidPatientsMonthlyConfirmedStats || dataset}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    {
                      dataKey: "count",
                      label: "Confirmed COVID Cases",
                      valueFormatter,
                      color: "#3364c5",
                    },
                  ]}
                  {...chartSetting}
                />
              </Box>
            )}
          </CustomCard>
          <div
            style={{ display: option === "COVID Patients" ? "block" : "none" }}
          >
            <Divider />
            <Grid container spacing={2} sx={{ marginBottom: 3, marginTop: 3 }}>
              <Grid item sm={12} xs={12}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: "5px",
                  }}
                >
                  <AdvanceSearch
                    placeholder="Search NIC Number"
                    keyword={searchValue}
                    onChange={onChangeSearch}
                    onClear={onClearSearch}
                    onClick={onSubmitSearch}
                  />
                  <div style={{ padding: "5px 0px 5px 15px" }}>
                    <Tooltip title="Apply Filters">
                      <IconButton
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "7px",
                          background:
                            "transparent linear-gradient(90deg, #B02D41 0%, #D9596D 100%) 0% 0% no-repeat padding-box",
                          color: "#FFFFFF",
                        }}
                        onClick={handleApplyFilters}
                      >
                        <FilterAlt />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              {open && (
                <>
                  <Grid item sm={4} xs={12} sx={{ marginTop: 2 }}>
                    <CustomSelect
                      fullWidth
                      label={"District"}
                      isShowPlaceholder
                      value={district || ""}
                      selectData={DISTRICT_LIST}
                      onChange={onHandleDistrict}
                      handleClear={onHandleClearDistrict}
                      isClear={isClearDistrict}
                    />
                  </Grid>
                  <Grid item sm={2} xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      label={"From Date"}
                      placeholder={"Enter Date"}
                      inputProps={{ maxLength: 50 }}
                      value={fromDate}
                      onChange={onHandleFromDate}
                    />
                  </Grid>
                  <Grid item sm={2} xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      label={"To Date"}
                      placeholder={"Enter Date"}
                      inputProps={{ maxLength: 50 }}
                      value={toDate}
                      onChange={onHandleToDate}
                    />
                  </Grid>
                  <Grid item sm={3} xs={12} sx={{ marginTop: 2 }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ padding: "5px 0px 5px 0px" }}>
                        <Tooltip title="Search">
                          <IconButton
                            sx={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "7px",
                              background:
                                "transparent linear-gradient(90deg, #B02D41 0%, #D9596D 100%) 0% 0% no-repeat padding-box",
                              color: "#FFFFFF",
                            }}
                            onClick={handleSearchFilters}
                          >
                            <Search />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div style={{ padding: "5px 0px 5px 10px" }}>
                        <Tooltip title="Clear Filters">
                          <IconButton
                            sx={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "7px",
                              background:
                                "transparent linear-gradient(90deg, #B02D41 0%, #D9596D 100%) 0% 0% no-repeat padding-box",
                              color: "#FFFFFF",
                            }}
                            onClick={handleClearFilters}
                          >
                            <FilterAltOff />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </Grid>
                </>
              )}
            </Grid>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                paddingRight: "30px",
              }}
            >
              <IconButton
                sx={{
                  fontSize: "15px",
                  color: patientsList.length == 0 ? "red" : "#681F6E",
                  cursor: "pointer",
                }}
                onClick={handleDownload}
                disabled={patientsList.length == 0}
              >
                <DownloadForOfflineOutlined />
                &nbsp;Download
              </IconButton>
            </div>
            <BasicTable
              currentPage={currentPage}
              columns={columns}
              rows={patientsList || []}
              recordsPerPage={10}
              handleChangeCurrentPage={(data) => changeCurrentPage(data)}
              handleEdit={null}
            />
          </div>
        </>
      )}
    </CustomCard>
  );
};

export default PatientsReports;
