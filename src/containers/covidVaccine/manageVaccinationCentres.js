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

import CreateVaccinationCentre from "./createVaccinationCentre";
import UpdateVaccinationCentre from "./updateVaccinationCentre";

import {
  getVaccinationCentres,
  getVaccinationCentreById,
} from "../../store/actions";

const ManageVaccinationCentres = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [vaccinationCentresList, setVaccinationCentresList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingVaccinationCentres,
    isErrorGettingVaccinationCentres,
    vaccinationCentres,
  } = useSelector((state) => state.covidVaccine);

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
    dispatch(getVaccinationCentres());
  }, [dispatch]);

  useEffect(() => {
    setVaccinationCentresList(vaccinationCentres);
  }, [vaccinationCentres]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getVaccinationCentreById(row.vaccinationCentreId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedVaccinationCentresList = vaccinationCentres.filter(
      (x) =>
        x.centreName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.district.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.city.toLowerCase().includes(searchValue.toLowerCase())
    );
    setVaccinationCentresList(searchedVaccinationCentresList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setVaccinationCentresList(vaccinationCentres);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingVaccinationCentres ? (
        <Loading />
      ) : isErrorGettingVaccinationCentres ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage Vaccination Centers" isArrowBack={true} />
            <AddButton
              title="Create Vaccination Center"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Center"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={vaccinationCentresList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Vaccination Centre */}
          <CreateVaccinationCentre
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Vaccination Centre */}
          <UpdateVaccinationCentre
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageVaccinationCentres;
