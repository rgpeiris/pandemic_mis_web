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

import CreateTestingResult from "./createTestingResult";
import UpdateTestingResult from "./updateTestingResult";

import {
  getPandemicTestResults,
  getPandemicTestResultById,
  getTestings,
  getTestCentres,
} from "../../store/actions";

const ManageTestingResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [testResultsList, setTestResultsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingPandemicTestResults,
    isErrorGettingPandemicTestResults,
    pandemicTestResults,
  } = useSelector((state) => state.covidTest);

  const columns = [
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
    dispatch(getPandemicTestResults());
  }, [dispatch]);

  useEffect(() => {
    setTestResultsList(pandemicTestResults);
  }, [pandemicTestResults]);

  const onHandleCreate = () => {
    dispatch(getTestings());
    dispatch(getTestCentres());
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getTestings());
    dispatch(getTestCentres());
    dispatch(getPandemicTestResultById(row.pandemicTestResultId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedTestResultsList = pandemicTestResults.filter(
      (x) =>
        x.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.nicNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.centreName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.status.toLowerCase().includes(searchValue.toLowerCase())
    );
    setTestResultsList(searchedTestResultsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setTestResultsList(pandemicTestResults);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingPandemicTestResults ? (
        <Loading />
      ) : isErrorGettingPandemicTestResults ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage Testing Results" isArrowBack={true} />
            <AddButton title="Create Testing" onHandleClick={onHandleCreate} />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Testing"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={testResultsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Testing Result */}
          <CreateTestingResult
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Testing Result */}
          <UpdateTestingResult
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageTestingResults;
