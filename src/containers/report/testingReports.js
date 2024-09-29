import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Autocomplete,
  Divider,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
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

import {
  TESTING_REPORT_LIST,
  DISTRICT_LIST,
  TESTING_RESULT_STATUS_LIST,
} from "../../utils";

import {
  getScheduledTestCentres,
  getTestsAppointments,
  getPandemicTestResults,
  getTestCentres,
} from "../../store/actions";

const TestingReports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isGettingScheduledTestCentres,
    isErrorGettingScheduledTestCentres,
    scheduledTestCentres,
    isGettingTestsAppointments,
    isErrorGettingTestsAppointments,
    testsAppointments,
    isGettingPandemicTestResults,
    isErrorGettingPandemicTestResults,
    pandemicTestResults,
    testCentres,
    isGettingTestCentres,
    isErrorGettingTestCentres,
  } = useSelector((state) => state.covidTest);

  const [option, setOption] = useState("");
  const [isValidOption, setIsValidOption] = useState(true);
  const [isClearOption, setIsClearOption] = useState(false);
  const [searchValueTc, setSearchValueTc] = useState("");
  const [searchValueTa, setSearchValueTa] = useState("");
  const [searchValueT, setSearchValueT] = useState("");
  const [currentPageTc, setCurrentPageTc] = useState(0);
  const [currentPageTa, setCurrentPageTa] = useState(0);
  const [currentPageT, setCurrentPageT] = useState(0);
  const [tcList, setTcList] = useState([]);
  const [taList, setTaList] = useState([]);
  const [tList, setTList] = useState([]);
  const [openTc, setOpenTc] = useState(false);
  const [openTa, setOpenTa] = useState(false);
  const [openT, setOpenT] = useState(false);
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [district, setDistrict] = useState("");
  const [isClearDistrict, setIsClearDistrict] = useState(false);
  const [center, setCenter] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [testingResult, setTestingResult] = useState("");
  const [isValidTestingResult, setIsValidTestingResult] = useState(true);
  const [isClearTestingResult, setIsClearTestingResult] = useState(false);

  const columnsTc = [
    {
      field: "centreName",
      columnName: "Testing Center",
      width: "20%",
    },
    {
      field: "dateScheduled",
      columnName: "Date Scheduled",
      width: "20%",
    },
    {
      field: "timeScheduled",
      columnName: "Time Scheduled",
      width: "20%",
    },
    {
      field: "availableCapacity",
      columnName: "Available Capacity",
      width: "20%",
    },
    {
      field: "createdDate",
      columnName: "Created Date",
      width: "15%",
    },
  ];

  const columnsTa = [
    {
      field: "name",
      columnName: "Full Name",
      width: "20%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "10%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "20%",
    },
    {
      field: "centreName",
      columnName: "Testing Center Name",
      width: "20%",
    },
    {
      field: "dateScheduled",
      columnName: "Date Scheduled",
      width: "10%",
    },
    {
      field: "timeScheduled",
      columnName: "Time Scheduled",
      width: "10%",
    },
    {
      field: "status",
      columnName: "Status",
      width: "5%",
    },
  ];

  const columnsT = [
    {
      field: "name",
      columnName: "Full Name",
      width: "15%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "15%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "15%",
    },
    {
      field: "centreName",
      columnName: "Testing Center Name",
      width: "20%",
    },
    {
      field: "testResult",
      columnName: "Testing Result",
      width: "10%",
    },
    {
      field: "dateOfPandemicTest",
      columnName: "Date Of Testing",
      width: "10%",
    },
    {
      field: "status",
      columnName: "Status",
      width: "10%",
    },
  ];

  useEffect(() => {
    dispatch(getScheduledTestCentres());
    dispatch(getTestsAppointments());
    dispatch(getPandemicTestResults());
    dispatch(getTestCentres());
  }, [dispatch]);

  useEffect(() => {
    setTcList(scheduledTestCentres);
    setTaList(testsAppointments);
    setTList(pandemicTestResults);
  }, [scheduledTestCentres, testsAppointments, pandemicTestResults]);

  const onHandleOption = (e) => {
    setIsValidOption(true);
    setIsClearOption(true);
    setOption(e.target.value);
  };

  const onHandleClearOption = () => {
    setOption("");
    setIsClearOption(false);
  };

  const onChangeSearchTc = (e) => {
    setSearchValueTc(e.target.value.trim());
  };

  const onChangeSearchTa = (e) => {
    setSearchValueTa(e.target.value.trim());
  };

  const onChangeSearchT = (e) => {
    setSearchValueT(e.target.value.trim());
  };

  const onSubmitSearchTc = () => {
    setDate("");
    setOpenTc(false);

    setCurrentPageTc(0);
    let searchedTcList = scheduledTestCentres.filter((x) =>
      x.centreName.toLowerCase().includes(searchValueTc.toLowerCase())
    );
    setTcList(searchedTcList);
  };

  const onSubmitSearchTa = () => {
    setFromDate("");
    setToDate("");
    setOpenTa(false);

    setCurrentPageTa(0);
    let searchedTaList = testsAppointments.filter((x) =>
      x.centreName.toLowerCase().includes(searchValueTa.toLowerCase())
    );
    setTaList(searchedTaList);
  };

  const onSubmitSearchT = () => {
    setDistrict("");
    setIsClearDistrict(false);
    setCenter("");
    setSelectedCenter(null);
    setTestingResult("");
    setIsClearTestingResult(false);

    setCurrentPageT(0);
    let searchedTList = pandemicTestResults.filter(
      (x) => x.nicNumber === searchValueT
    );
    setTList(searchedTList);
  };

  const onClearSearchTc = () => {
    setCurrentPageTc(0);
    setSearchValueTc("");
    setTcList(scheduledTestCentres);
  };

  const onClearSearchTa = () => {
    setCurrentPageTa(0);
    setSearchValueTa("");
    setTaList(testsAppointments);
  };

  const onClearSearchT = () => {
    setCurrentPageT(0);
    setSearchValueT("");
    setTList(pandemicTestResults);
  };

  const changeCurrentPageTc = (data) => {
    setCurrentPageTc(data);
  };

  const changeCurrentPageTa = (data) => {
    setCurrentPageTa(data);
  };

  const changeCurrentPageT = (data) => {
    setCurrentPageT(data);
  };

  const handleApplyFiltersTc = () => {
    setDate("");
    setOpenTc(!openTc);
  };

  const handleApplyFiltersTa = () => {
    setFromDate("");
    setToDate("");
    setOpenTa(!openTa);
  };

  const handleApplyFiltersT = () => {
    setDistrict("");
    setIsClearDistrict(false);
    setCenter("");
    setSelectedCenter(null);
    setTestingResult("");
    setIsClearTestingResult(false);
    setOpenT(!openT);
  };

  const handleSearchFiltersTc = () => {
    setCurrentPageTc(0);

    if (date) {
      let searchedTcList = scheduledTestCentres.filter(
        (x) => Date.parse(date) == Date.parse(x.dateScheduled.split("T")[0])
      );
      setTcList(searchedTcList);
    } else {
      if (searchValueTc) {
        let searchedTcList = scheduledTestCentres.filter((x) =>
          x.centreName.toLowerCase().includes(searchValueTc.toLowerCase())
        );
        setTcList(searchedTcList);
      } else {
        setTcList(scheduledTestCentres);
      }
    }
  };

  const handleSearchFiltersTa = () => {
    setCurrentPageTa(0);

    if (fromDate && toDate) {
      let searchedTaList = testsAppointments.filter(
        (x) =>
          Date.parse(fromDate) <= Date.parse(x.dateScheduled) &&
          Date.parse(x.dateScheduled) <= Date.parse(toDate)
      );
      setTaList(searchedTaList);
    } else if (fromDate) {
      let searchedTaList = testsAppointments.filter(
        (x) => Date.parse(fromDate) <= Date.parse(x.dateScheduled)
      );
      setTaList(searchedTaList);
    } else if (toDate) {
      let searchedTaList = testsAppointments.filter(
        (x) => Date.parse(x.dateScheduled) <= Date.parse(toDate)
      );
      setTaList(searchedTaList);
    } else {
      if (searchValueTa) {
        let searchedTaList = testsAppointments.filter((x) =>
          x.centreName.toLowerCase().includes(searchValueTa.toLowerCase())
        );
        setTaList(searchedTaList);
      } else {
        setTaList(testsAppointments);
      }
    }
  };

  const handleSearchFiltersT = () => {
    setCurrentPageT(0);

    if (district && center && date) {
      let searchedTList = pandemicTestResults.filter(
        (x) =>
          x.district === district &&
          x.testCentreId === center &&
          Date.parse(x.dateOfPandemicTest) === date
      );
      setTList(searchedTList);
    } else if (district && center) {
      let searchedTList = pandemicTestResults.filter(
        (x) => x.district === district && x.testCentreId === center
      );
      setTList(searchedTList);
    } else if (district && date) {
      let searchedTList = pandemicTestResults.filter(
        (x) =>
          x.district === district && Date.parse(x.dateOfPandemicTest) === date
      );
      setTList(searchedTList);
    } else if (center && date) {
      let searchedTList = pandemicTestResults.filter(
        (x) =>
          x.testCentreId === center && Date.parse(x.dateOfPandemicTest) === date
      );
      setTList(searchedTList);
    } else if (district) {
      let searchedTList = pandemicTestResults.filter(
        (x) => x.district === district
      );
      setTList(searchedTList);
    } else if (center) {
      let searchedTList = pandemicTestResults.filter(
        (x) => x.testCentreId === center
      );
      setTList(searchedTList);
    } else if (date) {
      let searchedTList = pandemicTestResults.filter(
        (x) => Date.parse(x.dateOfPandemicTest) === date
      );
      setTList(searchedTList);
    } else {
      if (searchValueT) {
        let searchedTList = pandemicTestResults.filter(
          (x) => x.nicNumber === searchValueT
        );
        setTList(searchedTList);
      } else {
        setTList(pandemicTestResults);
      }
    }
  };

  const handleClearFiltersTc = () => {
    setCurrentPageTc(0);
    setDate("");

    if (searchValueTc) {
      let searchedTcList = scheduledTestCentres.filter((x) =>
        x.centreName.toLowerCase().includes(searchValueTc.toLowerCase())
      );
      setTcList(searchedTcList);
    } else {
      setTcList(scheduledTestCentres);
    }
  };

  const handleClearFiltersTa = () => {
    setCurrentPageTa(0);
    setFromDate("");
    setToDate("");

    if (searchValueTa) {
      let searchedTaList = testsAppointments.filter((x) =>
        x.centreName.toLowerCase().includes(searchValueTa.toLowerCase())
      );
      setTaList(searchedTaList);
    } else {
      setTaList(testsAppointments);
    }
  };

  const handleClearFiltersT = () => {
    setCurrentPageT(0);
    setDistrict("");
    setIsClearDistrict(false);
    setCenter("");
    setSelectedCenter(null);
    setTestingResult("");
    setIsClearTestingResult(false);

    if (searchValueT) {
      let searchedTList = pandemicTestResults.filter(
        (x) => x.nicNumber === searchValueT
      );
      setTList(searchedTList);
    } else {
      setTList(pandemicTestResults);
    }
  };

  const onHandleDate = (e) => {
    setDate(e.target.value);
  };

  const onHandleFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const onHandleToDate = (e) => {
    setToDate(e.target.value);
  };

  const onHandleDistrict = (e) => {
    setIsClearDistrict(true);
    setDistrict(e.target.value);
  };

  const onHandleClearDistrict = () => {
    setDistrict("");
    setIsClearDistrict(false);
  };

  const onHandleCenter = (e, newValue) => {
    setSelectedCenter(newValue);
    setCenter(newValue != null ? newValue.testCentreId : "");
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

  const handleDownloadTc = () => {
    navigate(`/report-management/testing-centers-report`, {
      state: {
        otherData: {
          nicNumber: searchValueTc,
          scheduledDate: date,
        },
        dataList: tcList,
      },
    });
  };

  const handleDownloadTa = () => {
    navigate(`/report-management/testing-appointments-report`, {
      state: {
        otherData: {
          center: searchValueTa,
          fromDate: fromDate,
          toDate: toDate,
        },
        dataList: taList,
      },
    });
  };

  const handleDownloadT = () => {
    navigate(`/report-management/testing-results-report`, {
      state: {
        otherData: {
          nicNumber: searchValueT,
          district: district,
          center: selectedCenter,
          testingResult: testingResult,
        },
        dataList: tList,
      },
    });
  };

  return (
    <CustomCard style={{ minHeight: "500px" }}>
      {isGettingScheduledTestCentres ||
      isGettingTestsAppointments ||
      isGettingPandemicTestResults ||
      isGettingTestCentres ? (
        <Loading />
      ) : isErrorGettingScheduledTestCentres ||
        isErrorGettingTestsAppointments ||
        isErrorGettingPandemicTestResults ||
        isErrorGettingTestCentres ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="COVID Testing Reports" isArrowBack={true} />
          </SpaceBetween>
          <Grid container spacing={2} sx={{ marginTop: 1, marginBottom: 5 }}>
            <Grid item sm={4} xs={12}>
              <CustomSelect
                fullWidth
                label={"Select Option *"}
                isShowPlaceholder
                value={option || ""}
                selectData={TESTING_REPORT_LIST}
                onChange={onHandleOption}
                isValid={isValidOption}
                handleClear={onHandleClearOption}
                isClear={isClearOption}
              />
            </Grid>
          </Grid>
          <div
            style={{
              display: option === "COVID Testing Centers" ? "block" : "none",
            }}
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
                    placeholder="Search Testing Center"
                    keyword={searchValueTc}
                    onChange={onChangeSearchTc}
                    onClear={onClearSearchTc}
                    onClick={onSubmitSearchTc}
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
                        onClick={handleApplyFiltersTc}
                      >
                        <FilterAlt />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              {openTc && (
                <>
                  <Grid item sm={3} xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      label={"Scheduled Date"}
                      placeholder={"Enter Date"}
                      inputProps={{ maxLength: 50 }}
                      value={date}
                      onChange={onHandleDate}
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
                            onClick={handleSearchFiltersTc}
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
                            onClick={handleClearFiltersTc}
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
                  color: tcList.length == 0 ? "red" : "#681F6E",
                  cursor: "pointer",
                }}
                onClick={handleDownloadTc}
                disabled={tcList.length == 0}
              >
                <DownloadForOfflineOutlined />
                &nbsp;Download
              </IconButton>
            </div>
            <BasicTable
              currentPage={currentPageTc}
              columns={columnsTc}
              rows={tcList || []}
              recordsPerPage={10}
              handleChangeCurrentPage={(data) => changeCurrentPageTc(data)}
              handleEdit={null}
            />
          </div>
          <div
            style={{
              display:
                option === "COVID Testing Appointments" ? "block" : "none",
            }}
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
                    placeholder="Search Testing Center"
                    keyword={searchValueTa}
                    onChange={onChangeSearchTa}
                    onClear={onClearSearchTa}
                    onClick={onSubmitSearchTa}
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
                        onClick={handleApplyFiltersTa}
                      >
                        <FilterAlt />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              {openTa && (
                <>
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
                            onClick={handleSearchFiltersTa}
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
                            onClick={handleClearFiltersTa}
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
                  color: taList.length == 0 ? "red" : "#681F6E",
                  cursor: "pointer",
                }}
                onClick={handleDownloadTa}
                disabled={taList.length == 0}
              >
                <DownloadForOfflineOutlined />
                &nbsp;Download
              </IconButton>
            </div>
            <BasicTable
              currentPage={currentPageTa}
              columns={columnsTa}
              rows={taList || []}
              recordsPerPage={10}
              handleChangeCurrentPage={(data) => changeCurrentPageTa(data)}
              handleEdit={null}
            />
          </div>
          <div
            style={{
              display: option === "COVID Testing Results" ? "block" : "none",
            }}
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
                    keyword={searchValueT}
                    onChange={onChangeSearchT}
                    onClear={onClearSearchT}
                    onClick={onSubmitSearchT}
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
                        onClick={handleApplyFiltersT}
                      >
                        <FilterAlt />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              {openT && (
                <>
                  <Grid item sm={3} xs={12} sx={{ marginTop: 2 }}>
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
                  <Grid item sm={3} xs={12} sx={{ marginTop: 2 }}>
                    <Autocomplete
                      value={selectedCenter}
                      onChange={onHandleCenter}
                      options={testCentres || []}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Testing Center"
                          placeholder="Search Testing Center"
                          variant="outlined"
                        />
                      )}
                      getOptionLabel={(option) => option.centreName || ""}
                    />
                  </Grid>
                  <Grid item sm={3} xs={12} sx={{ marginTop: 2 }}>
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
                            onClick={handleSearchFiltersT}
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
                            onClick={handleClearFiltersT}
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
                  color: tList.length == 0 ? "red" : "#681F6E",
                  cursor: "pointer",
                }}
                onClick={handleDownloadT}
                disabled={tList.length == 0}
              >
                <DownloadForOfflineOutlined />
                &nbsp;Download
              </IconButton>
            </div>
            <BasicTable
              currentPage={currentPageT}
              columns={columnsT}
              rows={tList || []}
              recordsPerPage={10}
              handleChangeCurrentPage={(data) => changeCurrentPageT(data)}
              handleEdit={null}
            />
          </div>
        </>
      )}
    </CustomCard>
  );
};

export default TestingReports;
