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

import CreateTestingCentre from "./createTestingCentre";
import UpateTestingCentre from "./upateTestingCentre";

import { getTestCentres, getTestCentreById } from "../../store/actions";

const ManageTestingCentres = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [testCentresList, setTestCentresList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const { isGettingTestings, isErrorGettingTestings, testCentres } =
    useSelector((state) => state.covidTest);

  const columns = [
    {
      field: "centreName",
      columnName: "Center Name",
      width: "15%",
    },
    {
      field: "district",
      columnName: "District",
      width: "10%",
    },
    {
      field: "city",
      columnName: "DS Division",
      width: "15%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "15%",
    },
    {
      field: "phoneNumber",
      columnName: "Phone Number",
      width: "15%",
    },
    {
      field: "isActive",
      columnName: "Status",
      width: "10%",
    },
    {
      field: "createdDate",
      columnName: "Created Date",
      width: "15%",
    },
  ];

  useEffect(() => {
    dispatch(getTestCentres());
  }, [dispatch]);

  useEffect(() => {
    setTestCentresList(testCentres);
  }, [testCentres]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getTestCentreById(row.testCentreId));
    setShowUpdate(true);
  };
  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedTestCentresList = testCentres.filter(
      (x) =>
        x.centreName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.district.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.city.toLowerCase().includes(searchValue.toLowerCase())
    );
    setTestCentresList(searchedTestCentresList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setTestCentresList(testCentres);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingTestings ? (
        <Loading />
      ) : isErrorGettingTestings ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage Testing Centers" isArrowBack={true} />
            <AddButton
              title="Create Testing Center"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Testing Center"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={testCentresList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Testing Centre */}
          <CreateTestingCentre
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Testing Centre */}
          <UpateTestingCentre
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageTestingCentres;
