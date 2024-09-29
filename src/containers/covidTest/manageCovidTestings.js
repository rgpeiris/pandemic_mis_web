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

import CreateCovidTestingType from "./createCovidTestingType";
import UpdateCovidTestingType from "./updateCovidTestingType";

import { getTestings, getTestingById } from "../../store/actions";

const ManageCovidTestings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [covidTestingsList, setCovidTestingsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const { isGettingTestCentres, isErrorGettingTestCentres, covidTestings } =
    useSelector((state) => state.covidTest);

  const columns = [
    {
      field: "testType",
      columnName: "Testing Type",
      width: "30%",
    },
    {
      field: "description",
      columnName: "Description",
      width: "35%",
    },
    {
      field: "createdDate",
      columnName: "Created Date",
      width: "30%",
    },
  ];

  useEffect(() => {
    dispatch(getTestings());
  }, [dispatch]);

  useEffect(() => {
    setCovidTestingsList(covidTestings);
  }, [covidTestings]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getTestingById(row.pandemicTestId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedCovidTestingsList = covidTestings.filter((x) =>
      x.testType.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCovidTestingsList(searchedCovidTestingsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setCovidTestingsList(covidTestings);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingTestCentres ? (
        <Loading />
      ) : isErrorGettingTestCentres ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage Testing Types" isArrowBack={true} />
            <AddButton
              title="Create Testing Type"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Testing Type"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={covidTestingsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create COVID Testing Type */}
          <CreateCovidTestingType
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update COVID Testing Type */}
          <UpdateCovidTestingType
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageCovidTestings;
