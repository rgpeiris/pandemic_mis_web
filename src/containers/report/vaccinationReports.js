import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Divider,
  IconButton,
  Tooltip,
  TextField,
  Autocomplete,
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

import { VACCINATION_REPORT_LIST, DISTRICT_LIST, DOSE_LIST } from "../../utils";

import {
  getScheduledVaccinationCentres,
  getVaccineAppointments,
  getPandemicVaccinations,
  getVaccinationCentres,
} from "../../store/actions";

const VaccinationReports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isGettingScheduledVaccinationCentres,
    isErrorGettingScheduledVaccinationCentres,
    scheduledVaccinationCentres,
    isGettingVaccineAppointments,
    isErrorGettingVaccineAppointments,
    vaccineAppointments,
    isGettingPandemicVaccinations,
    isErrorGettingPandemicVaccinations,
    pandemicVaccinations,
    vaccinationCentres,
    isGettingVaccinationCentres,
    isErrorGettingVaccinationCentres,
  } = useSelector((state) => state.covidVaccine);

  const [option, setOption] = useState("");
  const [isValidOption, setIsValidOption] = useState(true);
  const [isClearOption, setIsClearOption] = useState(false);
  const [searchValueVc, setSearchValueVc] = useState("");
  const [searchValueVa, setSearchValueVa] = useState("");
  const [searchValueV, setSearchValueV] = useState("");
  const [currentPageVc, setCurrentPageVc] = useState(0);
  const [currentPageVa, setCurrentPageVa] = useState(0);
  const [currentPageV, setCurrentPageV] = useState(0);
  const [vcList, setVcList] = useState([]);
  const [vaList, setVaList] = useState([]);
  const [vList, setVList] = useState([]);
  const [openVc, setOpenVc] = useState(false);
  const [openVa, setOpenVa] = useState(false);
  const [openV, setOpenV] = useState(false);
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [district, setDistrict] = useState("");
  const [isClearDistrict, setIsClearDistrict] = useState(false);
  const [center, setCenter] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [vDate, setVDate] = useState("");
  const [vaccineDose, setVaccineDose] = useState("");
  const [isClearVaccineDose, setIsClearVaccineDose] = useState(false);

  const columnsVc = [
    {
      field: "centreName",
      columnName: "Vaccination Center",
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

  const columnsVa = [
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
      columnName: "Vaccination Center Name",
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

  const columnsV = [
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
      columnName: "Vaccination Center Name",
      width: "20%",
    },
    {
      field: "vaccineName",
      columnName: "Vaccine Name",
      width: "10%",
    },
    {
      field: "vaccineDose",
      columnName: "Vaccine Dose",
      width: "10%",
    },
    {
      field: "dateOfVaccination",
      columnName: "Date Of Vaccination",
      width: "10%",
    },
  ];

  useEffect(() => {
    dispatch(getScheduledVaccinationCentres());
    dispatch(getVaccineAppointments());
    dispatch(getPandemicVaccinations());
    dispatch(getVaccinationCentres());
  }, [dispatch]);

  useEffect(() => {
    setVcList(scheduledVaccinationCentres);
    setVaList(vaccineAppointments);
    setVList(pandemicVaccinations);
  }, [scheduledVaccinationCentres, vaccineAppointments, pandemicVaccinations]);

  const onHandleOption = (e) => {
    setIsValidOption(true);
    setIsClearOption(true);
    setOption(e.target.value);
  };

  const onHandleClearOption = () => {
    setOption("");
    setIsClearOption(false);
  };

  const onChangeSearchVc = (e) => {
    setSearchValueVc(e.target.value.trim());
  };

  const onChangeSearchVa = (e) => {
    setSearchValueVa(e.target.value.trim());
  };

  const onChangeSearchV = (e) => {
    setSearchValueV(e.target.value.trim());
  };

  const onSubmitSearchVc = () => {
    setDate("");
    setOpenVc(false);

    setCurrentPageVc(0);
    let searchedVcList = scheduledVaccinationCentres.filter((x) =>
      x.centreName.toLowerCase().includes(searchValueVc.toLowerCase())
    );
    setVcList(searchedVcList);
  };

  const onSubmitSearchVa = () => {
    setFromDate("");
    setToDate("");
    setOpenVa(false);

    setCurrentPageVa(0);
    let searchedVaList = vaccineAppointments.filter((x) =>
      x.centreName.toLowerCase().includes(searchValueVa.toLowerCase())
    );
    setVaList(searchedVaList);
  };

  const onSubmitSearchV = () => {
    setDistrict("");
    setIsClearDistrict(false);
    setCenter("");
    setSelectedCenter(null);
    setVDate("");

    setCurrentPageV(0);
    let searchedVList = pandemicVaccinations.filter(
      (x) => x.nicNumber === searchValueV
    );
    setVList(searchedVList);
  };

  const onClearSearchVc = () => {
    setDate("");
    setOpenVc(false);

    setCurrentPageVc(0);
    setSearchValueVc("");
    setVcList(scheduledVaccinationCentres);
  };

  const onClearSearchVa = () => {
    setFromDate("");
    setToDate("");
    setOpenVa(false);

    setCurrentPageVa(0);
    setSearchValueVa("");
    setVaList(vaccineAppointments);
  };

  const onClearSearchV = () => {
    setDistrict("");
    setIsClearDistrict(false);
    setCenter("");
    setSelectedCenter(null);
    setVDate("");

    setCurrentPageV(0);
    setSearchValueV("");
    setVList(pandemicVaccinations);
  };

  const changeCurrentPageVc = (data) => {
    setCurrentPageVc(data);
  };

  const changeCurrentPageVa = (data) => {
    setCurrentPageVa(data);
  };

  const changeCurrentPageV = (data) => {
    setCurrentPageV(data);
  };

  const handleApplyFiltersVc = () => {
    setDate("");
    setOpenVc(!openVc);
  };

  const handleApplyFiltersVa = () => {
    setFromDate("");
    setToDate("");
    setOpenVa(!openVa);
  };

  const handleApplyFiltersV = () => {
    setDistrict("");
    setIsClearDistrict(false);
    setCenter("");
    setSelectedCenter(null);
    setVDate("");
    setVaccineDose("");
    setIsClearVaccineDose(false);
    setOpenV(!openV);
  };

  const handleSearchFiltersVc = () => {
    setCurrentPageVc(0);

    if (date) {
      let searchedVcList = scheduledVaccinationCentres.filter(
        (x) => Date.parse(date) == Date.parse(x.dateScheduled.split("T")[0])
      );
      setVcList(searchedVcList);
    } else {
      if (searchValueVc) {
        let searchedVcList = scheduledVaccinationCentres.filter((x) =>
          x.centreName.toLowerCase().includes(searchValueVc.toLowerCase())
        );
        setVcList(searchedVcList);
      } else {
        setVcList(scheduledVaccinationCentres);
      }
    }
  };

  const handleSearchFiltersVa = () => {
    setCurrentPageVa(0);

    if (fromDate && toDate) {
      let searchedVaList = vaccineAppointments.filter(
        (x) =>
          Date.parse(fromDate) <= Date.parse(x.dateScheduled) &&
          Date.parse(x.dateScheduled) <= Date.parse(toDate)
      );
      setVaList(searchedVaList);
    } else if (fromDate) {
      let searchedVaList = vaccineAppointments.filter(
        (x) => Date.parse(fromDate) <= Date.parse(x.dateScheduled)
      );
      setVaList(searchedVaList);
    } else if (toDate) {
      let searchedVaList = vaccineAppointments.filter(
        (x) => Date.parse(x.dateScheduled) <= Date.parse(toDate)
      );
      setVaList(searchedVaList);
    } else {
      if (searchValueVa) {
        let searchedVaList = vaccineAppointments.filter((x) =>
          x.centreName.toLowerCase().includes(searchValueVa.toLowerCase())
        );
        setVaList(searchedVaList);
      } else {
        setVaList(vaccineAppointments);
      }
    }
  };

  const handleSearchFiltersV = () => {
    setCurrentPageV(0);

    if (district && center && vDate && vaccineDose) {
      let searchedVList = pandemicVaccinations.filter(
        (x) =>
          x.district === district &&
          x.vaccinationCentreId === center &&
          Date.parse(x.dateOfVaccination.split("T")[0]) === Date.parse(vDate)
      );
      setVList(searchedVList);
    } else if (district && center) {
      let searchedVList = pandemicVaccinations.filter(
        (x) => x.district === district && x.vaccinationCentreId === center
      );
      setVList(searchedVList);
    } else if (district && vDate) {
      let searchedVList = pandemicVaccinations.filter(
        (x) =>
          x.district === district &&
          Date.parse(x.dateOfVaccination.split("T")[0]) === Date.parse(vDate)
      );
      setVList(searchedVList);
    } else if (center && vDate) {
      let searchedVList = pandemicVaccinations.filter(
        (x) =>
          x.vaccinationCentreId === center &&
          Date.parse(x.dateOfVaccination.split("T")[0]) === Date.parse(vDate)
      );
      setVList(searchedVList);
    } else if (district) {
      let searchedVList = pandemicVaccinations.filter(
        (x) => x.district === district
      );
      setVList(searchedVList);
    } else if (center) {
      let searchedVList = pandemicVaccinations.filter(
        (x) => x.vaccinationCentreId === center
      );
      setVList(searchedVList);
    } else if (vDate) {
      let searchedVList = pandemicVaccinations.filter(
        (x) =>
          Date.parse(x.dateOfVaccination.split("T")[0]) === Date.parse(vDate)
      );
      setVList(searchedVList);
    } else if (vaccineDose) {
      let searchedVList = pandemicVaccinations.filter(
        (x) => x.vaccineDose === vaccineDose
      );
      setVList(searchedVList);
    } else {
      if (searchValueV) {
        let searchedVList = pandemicVaccinations.filter(
          (x) => x.nicNumber === searchValueV
        );
        setVList(searchedVList);
      } else {
        setVList(pandemicVaccinations);
      }
    }
  };

  const handleClearFiltersVc = () => {
    setCurrentPageVc(0);
    setDate("");

    if (searchValueVc) {
      let searchedVcList = scheduledVaccinationCentres.filter((x) =>
        x.centreName.toLowerCase().includes(searchValueVc.toLowerCase())
      );
      setVcList(searchedVcList);
    } else {
      setVcList(scheduledVaccinationCentres);
    }
  };

  const handleClearFiltersVa = () => {
    setCurrentPageVa(0);
    setFromDate("");
    setToDate("");

    if (searchValueVa) {
      let searchedVaList = vaccineAppointments.filter((x) =>
        x.centreName.toLowerCase().includes(searchValueVa.toLowerCase())
      );
      setVaList(searchedVaList);
    } else {
      setVaList(vaccineAppointments);
    }
  };

  const handleClearFiltersV = () => {
    setCurrentPageV(0);
    setDistrict("");
    setIsClearDistrict(false);
    setCenter("");
    setSelectedCenter(null);
    setVDate("");
    setVaccineDose("");
    setIsClearVaccineDose(false);

    if (searchValueV) {
      let searchedVList = pandemicVaccinations.filter(
        (x) => x.nicNumber === searchValueV
      );
      setVList(searchedVList);
    } else {
      setVList(pandemicVaccinations);
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
    setCenter(newValue != null ? newValue.vaccinationCentreId : "");
  };

  const onHandleVDate = (e) => {
    setVDate(e.target.value);
  };

  const handleDownloadVc = () => {
    navigate(`/report-management/vaccination-centers-report`, {
      state: {
        otherData: {
          nicNumber: searchValueVc,
          scheduledDate: date,
        },
        dataList: vcList,
      },
    });
  };

  const handleDownloadVa = () => {
    navigate(`/report-management/vaccination-appointments-report`, {
      state: {
        otherData: {
          center: searchValueVa,
          fromDate: fromDate,
          toDate: toDate,
        },
        dataList: vaList,
      },
    });
  };

  const handleDownloadV = () => {
    navigate(`/report-management/vaccinations-report`, {
      state: {
        otherData: {
          nicNumber: searchValueV,
          district: district,
          center: selectedCenter,
          dateOfVaccination: vDate,
        },
        dataList: vList,
      },
    });
  };

  const onHandleVaccineDose = (e) => {
    setIsClearVaccineDose(true);
    setVaccineDose(e.target.value);
  };

  const onHandleClearVaccineDose = () => {
    setVaccineDose("");
    setIsClearVaccineDose(false);
  };

  return (
    <CustomCard style={{ minHeight: "500px" }}>
      {isGettingScheduledVaccinationCentres ||
      isGettingVaccineAppointments ||
      isGettingPandemicVaccinations ||
      isGettingVaccinationCentres ? (
        <Loading />
      ) : isErrorGettingScheduledVaccinationCentres ||
        isErrorGettingVaccineAppointments ||
        isErrorGettingPandemicVaccinations ||
        isErrorGettingVaccinationCentres ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="COVID Vaccination Reports" isArrowBack={true} />
          </SpaceBetween>
          <Grid container spacing={2} sx={{ marginTop: 1, marginBottom: 5 }}>
            <Grid item sm={4} xs={12}>
              <CustomSelect
                fullWidth
                label={"Select Option *"}
                isShowPlaceholder
                value={option || ""}
                selectData={VACCINATION_REPORT_LIST}
                onChange={onHandleOption}
                isValid={isValidOption}
                handleClear={onHandleClearOption}
                isClear={isClearOption}
              />
            </Grid>
          </Grid>
          <div
            style={{
              display:
                option === "COVID Vaccination Centers" ? "block" : "none",
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
                    placeholder="Search Vaccination Center"
                    keyword={searchValueVc}
                    onChange={onChangeSearchVc}
                    onClear={onClearSearchVc}
                    onClick={onSubmitSearchVc}
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
                        onClick={handleApplyFiltersVc}
                      >
                        <FilterAlt />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              {openVc && (
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
                            onClick={handleSearchFiltersVc}
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
                            onClick={handleClearFiltersVc}
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
                  color: vcList.length == 0 ? "red" : "#681F6E",
                  cursor: "pointer",
                }}
                onClick={handleDownloadVc}
                disabled={vcList.length == 0}
              >
                <DownloadForOfflineOutlined />
                &nbsp;Download
              </IconButton>
            </div>
            <BasicTable
              currentPage={currentPageVc}
              columns={columnsVc}
              rows={vcList || []}
              recordsPerPage={10}
              handleChangeCurrentPage={(data) => changeCurrentPageVc(data)}
              handleEdit={null}
            />
          </div>
          <div
            style={{
              display:
                option === "COVID Vaccination Appointments" ? "block" : "none",
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
                    placeholder="Search Vaccination Center"
                    keyword={searchValueVa}
                    onChange={onChangeSearchVa}
                    onClear={onClearSearchVa}
                    onClick={onSubmitSearchVa}
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
                        onClick={handleApplyFiltersVa}
                      >
                        <FilterAlt />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              {openVa && (
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
                            onClick={handleSearchFiltersVa}
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
                            onClick={handleClearFiltersVa}
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
                  color: vaList.length == 0 ? "red" : "#681F6E",
                  cursor: "pointer",
                }}
                onClick={handleDownloadVa}
                disabled={vaList.length == 0}
              >
                <DownloadForOfflineOutlined />
                &nbsp;Download
              </IconButton>
            </div>
            <BasicTable
              currentPage={currentPageVa}
              columns={columnsVa}
              rows={vaList || []}
              recordsPerPage={10}
              handleChangeCurrentPage={(data) => changeCurrentPageVa(data)}
              handleEdit={null}
            />
          </div>
          <div
            style={{
              display: option === "COVID Vaccination" ? "block" : "none",
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
                    keyword={searchValueV}
                    onChange={onChangeSearchV}
                    onClear={onClearSearchV}
                    onClick={onSubmitSearchV}
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
                        onClick={handleApplyFiltersV}
                      >
                        <FilterAlt />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              {openV && (
                <>
                  <Grid item sm={2} xs={12} sx={{ marginTop: 2 }}>
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
                      options={vaccinationCentres || []}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Vaccination Center"
                          placeholder="Search Vaccination Center"
                          variant="outlined"
                        />
                      )}
                      getOptionLabel={(option) => option.centreName || ""}
                    />
                  </Grid>
                  <Grid item sm={2} xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      label={"Date of Vaccination"}
                      placeholder={"Enter Date"}
                      inputProps={{ maxLength: 50 }}
                      value={vDate}
                      onChange={onHandleVDate}
                    />
                  </Grid>
                  <Grid item sm={2} xs={12} sx={{ marginTop: 2 }}>
                    <CustomSelect
                      fullWidth
                      label={"Dose *"}
                      isShowPlaceholder
                      value={vaccineDose || ""}
                      selectData={DOSE_LIST}
                      onChange={onHandleVaccineDose}
                      handleClear={onHandleClearVaccineDose}
                      isClear={isClearVaccineDose}
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
                            onClick={handleSearchFiltersV}
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
                            onClick={handleClearFiltersV}
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
                  color: vList.length == 0 ? "red" : "#681F6E",
                  cursor: "pointer",
                }}
                onClick={handleDownloadV}
                disabled={vList.length == 0}
              >
                <DownloadForOfflineOutlined />
                &nbsp;Download
              </IconButton>
            </div>
            <BasicTable
              currentPage={currentPageV}
              columns={columnsV}
              rows={vList || []}
              recordsPerPage={10}
              handleChangeCurrentPage={(data) => changeCurrentPageV(data)}
              handleEdit={null}
            />
          </div>
        </>
      )}
    </CustomCard>
  );
};

export default VaccinationReports;
