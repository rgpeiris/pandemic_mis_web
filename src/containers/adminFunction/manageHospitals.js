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

import CreateHospital from "./createHospital";
import UpdateHospital from "./updateHospital";

import { getHospitals, getHospitalById } from "../../store/actions";

const ManageHospitals = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [hospitalsList, setHospitalsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const { isGettingHospitals, isErrorGettingHospitals, hospitals } =
    useSelector((state) => state.covidPatient);

  const columns = [
    {
      field: "hospitalName",
      columnName: "Hospital Name",
      width: "20%",
    },
    {
      field: "district",
      columnName: "District",
      width: "15%",
    },
    {
      field: "city",
      columnName: "DS Division",
      width: "15%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "20%",
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
  ];

  useEffect(() => {
    dispatch(getHospitals());
  }, [dispatch]);

  useEffect(() => {
    setHospitalsList(hospitals);
  }, [hospitals]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getHospitalById(row.hospitalId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedHospitalsList = hospitals.filter(
      (x) =>
        x.hospitalName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.district.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.city.toLowerCase().includes(searchValue.toLowerCase())
    );
    setHospitalsList(searchedHospitalsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setHospitalsList(hospitals);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingHospitals ? (
        <Loading />
      ) : isErrorGettingHospitals ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage Hospitals" isArrowBack={true} />
            <AddButton title="Create Hospital" onHandleClick={onHandleCreate} />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Hospital"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={hospitalsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Hospital */}
          <CreateHospital
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Hospital */}
          <UpdateHospital
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageHospitals;
