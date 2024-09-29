import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, IconButton, Tooltip } from "@mui/material";
import {
  FilterAlt,
  Search,
  FilterAltOff,
  DownloadForOfflineOutlined,
} from "@mui/icons-material";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";
import { AdvanceSearch } from "../../components/searchBar";
import { BasicTable } from "../../components/dataTable";
import CustomSelect from "../../components/customSelect";
import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

import { getPandemicContacts, getOrganizations } from "../../store/actions";

const ContactsReports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pandemicContactsList, setPandemicContactsList] = useState([]);
  const [organization, setOrganization] = useState("");
  const [isClearOrganization, setIsClearOrganization] = useState(false);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const {
    isGettingPandemicContacts,
    isErrorGettingPandemicContacts,
    pandemicContacts,
    isGettingOrganizations,
    isErrorGettingOrganizations,
    organizations,
  } = useSelector((state) => state.covidContact);

  const columns = [
    {
      field: "name",
      columnName: "Contact Name",
      width: "14%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "14%",
    },
    {
      field: "phoneNumber",
      columnName: "Contact Number",
      width: "12%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "14%",
    },
    {
      field: "organizationName",
      columnName: "Visited Organization",
      width: "10%",
    },
    {
      field: "checkInTime",
      columnName: "Check-In",
      width: "15%",
    },
    {
      field: "checkOutTime",
      columnName: "Check-Out",
      width: "16%",
    },
  ];

  useEffect(() => {
    dispatch(getPandemicContacts());
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    setPandemicContactsList(pandemicContacts);
  }, [pandemicContacts]);

  const onHandleOrganization = (e) => {
    setIsClearOrganization(true);
    setOrganization(e.target.value);
  };

  const onHandleClearOrganization = () => {
    setOrganization("");
    setIsClearOrganization(false);
  };

  const onHandleDate = (e) => {
    setDate(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setOrganization("");
    setDate("");
    setIsClearOrganization(false);
    setOpen(false);

    setCurrentPage(0);
    let searchedPandemicContactsList = pandemicContacts.filter(
      (x) => x.nicNumber === searchValue
    );
    setPandemicContactsList(searchedPandemicContactsList);
  };

  const onClearSearch = () => {
    setOrganization("");
    setDate("");
    setIsClearOrganization(false);
    setOpen(false);

    setCurrentPage(0);
    setSearchValue("");
    setPandemicContactsList(pandemicContacts);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  const handleApplyFilters = () => {
    setOrganization("");
    setDate("");
    setIsClearOrganization(false);
    setOpen(!open);
  };

  const handleClearFilters = () => {
    setCurrentPage(0);
    setOrganization("");
    setDate("");
    setIsClearOrganization(false);

    if (searchValue) {
      let searchedPandemicContactsList = pandemicContacts.filter(
        (x) => x.nicNumber === searchValue
      );
      setPandemicContactsList(searchedPandemicContactsList);
    } else {
      setPandemicContactsList(pandemicContacts);
    }
  };

  const handleSearchFilters = () => {
    setCurrentPage(0);

    if (date && organization) {
      let searchedPandemicContactsList = pandemicContactsList.filter(
        (x) =>
          x.organizationId === organization &&
          x.checkInTime?.split("T")[0] === date
      );
      setPandemicContactsList(searchedPandemicContactsList);
    } else if (date) {
      let searchedPandemicContactsList = pandemicContactsList.filter(
        (x) => x.checkInTime?.split("T")[0] === date
      );
      setPandemicContactsList(searchedPandemicContactsList);
    } else if (organization) {
      let searchedPandemicContactsList = pandemicContactsList.filter(
        (x) => x.organizationId === organization
      );
      setPandemicContactsList(searchedPandemicContactsList);
    } else {
      if (searchValue) {
        let searchedPandemicContactsList = pandemicContacts.filter(
          (x) => x.nicNumber === searchValue
        );
        setPandemicContactsList(searchedPandemicContactsList);
      } else {
        setPandemicContactsList(pandemicContacts);
      }
    }
  };

  const handleDownload = () => {
    let org = organizations.find((x) => x.organizationId === organization);

    navigate(`/report-management/covid-contacts-report`, {
      state: {
        otherData: {
          nicNumber: searchValue,
          organization: org?.organizationName,
          date: date,
        },
        dataList: pandemicContactsList,
      },
    });
  };

  return (
    <CustomCard>
      {isGettingPandemicContacts || isGettingOrganizations ? (
        <Loading />
      ) : isErrorGettingPandemicContacts || isErrorGettingOrganizations ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage COVID Contacts" isArrowBack={true} />
          </SpaceBetween>
          <Grid container spacing={2} sx={{ marginBottom: 3, marginTop: 1 }}>
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
                    label={"Organization"}
                    menuItemValue={"organizationId"}
                    menuItemText={"organizationName"}
                    isShowPlaceholder
                    value={organization || ""}
                    selectData={organizations?.filter(
                      (x) => x.isActive === true
                    )}
                    onChange={onHandleOrganization}
                    handleClear={onHandleClearOrganization}
                    isClear={isClearOrganization}
                  />
                </Grid>
                <Grid item sm={3} xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                    label={"Date"}
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
                color: pandemicContactsList.length == 0 ? "red" : "#681F6E",
                cursor: "pointer",
              }}
              onClick={handleDownload}
              disabled={pandemicContactsList.length == 0}
            >
              <DownloadForOfflineOutlined />
              &nbsp;Download
            </IconButton>
          </div>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={pandemicContactsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={null}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ContactsReports;
