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

import CreateVaccine from "./createVaccine";
import UpdateVaccine from "./updateVaccine";

import { getVaccines, getVaccineById } from "../../store/actions";

const ManageVaccines = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [vaccinesList, setVaccinesList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const { isGettingVaccines, isErrorGettingVaccines, covidVaccines } =
    useSelector((state) => state.covidVaccine);

  const columns = [
    {
      field: "vaccineName",
      columnName: "Vaccine Name",
      width: "30%",
    },
    {
      field: "dose",
      columnName: "Dose",
      width: "20%",
    },
    {
      field: "nextDose",
      columnName: "Next Dose",
      width: "20%",
    },
    {
      field: "createdDate",
      columnName: "Created Date",
      width: "25%",
    },
  ];

  useEffect(() => {
    dispatch(getVaccines());
  }, [dispatch]);

  useEffect(() => {
    setVaccinesList(covidVaccines);
  }, [covidVaccines]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getVaccineById(row.vaccineId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedVaccinesList = covidVaccines.filter((x) =>
      x.vaccineName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setVaccinesList(searchedVaccinesList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setVaccinesList(covidVaccines);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingVaccines ? (
        <Loading />
      ) : isErrorGettingVaccines ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage Vaccines" isArrowBack={true} />
            <AddButton title="Create Vaccine" onHandleClick={onHandleCreate} />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Vaccine"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={vaccinesList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Vaccine */}
          <CreateVaccine
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Vaccine */}
          <UpdateVaccine
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageVaccines;
