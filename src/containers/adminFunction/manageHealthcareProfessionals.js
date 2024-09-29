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

import CreateHealthcareProfessional from "./createHealthcareProfessional";
import UpdateHealthcareProfessional from "./updateHealthcareProfessional";

import {
  getHealthcareProfessionals,
  getHealthcareProfessionalById,
  getHospitals,
} from "../../store/actions";

const ManageHealthcareProfessionals = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [healthcareProfessionalsList, setHealthcareProfessionalsList] =
    useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingHealthcareProfessionals,
    isErrorGettingHealthcareProfessionals,
    healthcareProfessionals,
  } = useSelector((state) => state.covidPatient);

  const columns = [
    {
      field: "healthcareProfessionalName",
      columnName: "Healthcare Professional Name",
      width: "23%",
    },
    {
      field: "medicalSpecialty",
      columnName: "Medical Specialty",
      width: "15%",
    },
    {
      field: "hospitalName",
      columnName: "Assigned Hospital",
      width: "15%",
    },
    {
      field: "phoneNumber",
      columnName: "Phone Number",
      width: "12%",
    },
    {
      field: "assignedUsername",
      columnName: "Assigned Username",
      width: "15%",
    },
    {
      field: "isActive",
      columnName: "Status",
      width: "15%",
    },
  ];

  useEffect(() => {
    dispatch(getHealthcareProfessionals());
  }, [dispatch]);

  useEffect(() => {
    setHealthcareProfessionalsList(healthcareProfessionals);
  }, [healthcareProfessionals]);

  const onHandleCreate = () => {
    dispatch(getHospitals());
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getHospitals());
    dispatch(getHealthcareProfessionalById(row.healthcareProfessionalId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedHealthcareProfessionalsList = healthcareProfessionals.filter(
      (x) =>
        x.healthcareProfessionalName
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        x.medicalSpecialty.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.hospitalName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setHealthcareProfessionalsList(searchedHealthcareProfessionalsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setHealthcareProfessionalsList(healthcareProfessionals);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingHealthcareProfessionals ? (
        <Loading />
      ) : isErrorGettingHealthcareProfessionals ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading
              title="Manage Healthcare Professionals"
              isArrowBack={true}
            />
            <AddButton
              title="Create Professional"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Professional"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={healthcareProfessionalsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Healthcare Professional */}
          <CreateHealthcareProfessional
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Healthcare Professional */}
          <UpdateHealthcareProfessional
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageHealthcareProfessionals;
