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

import CreateVaccination from "./createVaccination";
import UpdateVaccination from "./updateVaccination";

import {
  getPandemicVaccinations,
  getPandemicVaccinationById,
  getVaccines,
  getVaccinationCentres,
} from "../../store/actions";

const ManageVaccinations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [vaccinationsList, setVaccinationsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingPandemicVaccinations,
    isErrorGettingPandemicVaccinations,
    pandemicVaccinations,
  } = useSelector((state) => state.covidVaccine);

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
    dispatch(getPandemicVaccinations());
  }, [dispatch]);

  useEffect(() => {
    setVaccinationsList(pandemicVaccinations);
  }, [pandemicVaccinations]);

  const onHandleCreate = () => {
    dispatch(getVaccines());
    dispatch(getVaccinationCentres());
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getPandemicVaccinationById(row.pandemicVaccinationId));
    dispatch(getVaccines());
    dispatch(getVaccinationCentres());
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedVaccinationsList = pandemicVaccinations.filter(
      (x) =>
        x.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.nicNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.centreName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setVaccinationsList(searchedVaccinationsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setVaccinationsList(pandemicVaccinations);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingPandemicVaccinations ? (
        <Loading />
      ) : isErrorGettingPandemicVaccinations ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage Vaccinations" isArrowBack={true} />
            <AddButton
              title="Create Vaccination"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Vaccination"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={vaccinationsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Vaccination */}
          <CreateVaccination
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Vaccination */}
          <UpdateVaccination
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageVaccinations;
