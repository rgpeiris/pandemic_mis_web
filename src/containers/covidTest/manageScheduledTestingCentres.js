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

import CreateScheduledTestingCentre from "./createScheduledTestingCentre";
import UpdateScheduledTestingCentre from "./updateScheduledTestingCentre";

import {
  getScheduledTestCentres,
  getScheduledTestCentreById,
  getTestCentres,
} from "../../store/actions";

const ManageScheduledTestingCentres = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [scheduledTestCentresList, setScheduledTestCentresList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingScheduledTestCentres,
    isErrorGettingScheduledTestCentres,
    scheduledTestCentres,
  } = useSelector((state) => state.covidTest);

  const columns = [
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

  useEffect(() => {
    dispatch(getScheduledTestCentres());
  }, [dispatch]);

  useEffect(() => {
    setScheduledTestCentresList(scheduledTestCentres);
  }, [scheduledTestCentres]);

  const onHandleCreate = () => {
    dispatch(getTestCentres());
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getScheduledTestCentreById(row.scheduledTestCentreId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedScheduledTestCentresList = scheduledTestCentres.filter((x) =>
      x.centreName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setScheduledTestCentresList(searchedScheduledTestCentresList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setScheduledTestCentresList(scheduledTestCentres);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingScheduledTestCentres ? (
        <Loading />
      ) : isErrorGettingScheduledTestCentres ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading
              title="Manage Scheduled Testing Centres"
              isArrowBack={true}
            />
            <AddButton
              title="Schedule Testing Centre"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Testing Centre"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={scheduledTestCentresList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Schedule Testing Centre */}
          <CreateScheduledTestingCentre
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Scheduled Testing Centre */}
          <UpdateScheduledTestingCentre
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageScheduledTestingCentres;
