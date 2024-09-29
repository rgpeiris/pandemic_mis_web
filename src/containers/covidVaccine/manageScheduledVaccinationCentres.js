import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";
import { AdvanceSearch } from "../../components/searchBar";
import { AddButton } from "../../components/button";
import { BasicTable } from "../../components/dataTable";
import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

import CreateScheduledVaccinationCentre from "./createScheduledVaccinationCentre";
import UpdateScheduledVaccinationCentre from "./updateScheduledVaccinationCentre";

import {
  getScheduledVaccinationCentres,
  getScheduledVaccinationCentreById,
  getVaccinationCentres,
} from "../../store/actions";

const ManageScheduledVaccinationCentres = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [scheduledVaccinationCentresList, setScheduledVaccinationCentresList] =
    useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingScheduledVaccinationCentres,
    isErrorGettingScheduledVaccinationCentres,
    scheduledVaccinationCentres,
  } = useSelector((state) => state.covidVaccine);

  const columns = [
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

  useEffect(() => {
    dispatch(getScheduledVaccinationCentres());
  }, [dispatch]);

  useEffect(() => {
    setScheduledVaccinationCentresList(scheduledVaccinationCentres);
  }, [scheduledVaccinationCentres]);

  const onHandleCreate = () => {
    dispatch(getVaccinationCentres());
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(
      getScheduledVaccinationCentreById(row.scheduledVaccinationCentreId)
    );
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedScheduledVaccinationCentresList =
      scheduledVaccinationCentres.filter((x) =>
        x.centreName.toLowerCase().includes(searchValue.toLowerCase())
      );
    setScheduledVaccinationCentresList(searchedScheduledVaccinationCentresList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setScheduledVaccinationCentresList(scheduledVaccinationCentres);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingScheduledVaccinationCentres ? (
        <Loading />
      ) : isErrorGettingScheduledVaccinationCentres ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading
              title="Manage Scheduled Vaccination Centers"
              isArrowBack={true}
            />
            <AddButton
              title="Schedule Vaccination Center"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Vaccination Center"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={scheduledVaccinationCentresList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Schedule Vaccination Centre */}
          <CreateScheduledVaccinationCentre
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Scheduled Vaccination Centre */}
          <UpdateScheduledVaccinationCentre
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageScheduledVaccinationCentres;
