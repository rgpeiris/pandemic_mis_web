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

import CreatePatient from "./createPatient";

import {
  getPatients,
  getPatientsByHealthcareProfessional,
  getHospitals,
  getHealthcareProfessionals,
  getPatientById,
} from "../../store/actions";

const CovidPatientManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [patientsList, setPatientsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);

  const { loggedInUser } = useSelector((state) => state.auth);
  const {
    isGettingPatients,
    isErrorGettingPatients,
    covidPatients,
    isGettingPatientsByHealthcareProfessional,
    isErrorGettingPatientsByHealthcareProfessional,
    covidPatientsByHealthcareProfessional,
  } = useSelector((state) => state.covidPatient);

  const columns = [
    {
      field: "patientName",
      columnName: "Patient Name",
      width: "15%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "14%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "14%",
    },
    {
      field: "phoneNumber",
      columnName: "Phone Number",
      width: "12%",
    },
    {
      field: "guardianPhoneNumber",
      columnName: "Guardian's Phone Number",
      width: "12%",
    },
    {
      field: "registrationDate",
      columnName: "Registration Date",
      width: "7%",
    },
    {
      field: "confirmedDate",
      columnName: "Confirmed Date",
      width: "7%",
    },
    {
      field: "status",
      columnName: "Status",
      width: "14%",
    },
  ];

  useEffect(() => {
    if (loggedInUser?.role === "CHIEF_HEALTHCARE_PROFESSIONAL") {
      dispatch(getPatients());
    } else {
      dispatch(getPatientsByHealthcareProfessional(loggedInUser?.userName));
    }
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser?.role === "CHIEF_HEALTHCARE_PROFESSIONAL") {
      setPatientsList(covidPatients);
    } else {
      setPatientsList(covidPatientsByHealthcareProfessional);
    }
  }, [covidPatients, covidPatientsByHealthcareProfessional]);

  const onHandleCreate = () => {
    dispatch(getHealthcareProfessionals());
    dispatch(getHospitals());
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getHospitals());
    dispatch(getPatientById(row.patientId));
    navigate(`/covid-patient-management/update-patient/${row.patientId}`);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedPatientsList =
      loggedInUser?.role === "CHIEF_HEALTHCARE_PROFESSIONAL"
        ? covidPatients.filter((x) =>
            x.nicNumber.toLowerCase().includes(searchValue.toLowerCase())
          )
        : covidPatientsByHealthcareProfessional.filter((x) =>
            x.nicNumber.toLowerCase().includes(searchValue.toLowerCase())
          );
    setPatientsList(searchedPatientsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setPatientsList(
      loggedInUser?.role === "CHIEF_HEALTHCARE_PROFESSIONAL"
        ? covidPatients
        : covidPatientsByHealthcareProfessional
    );
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {(
        loggedInUser?.role === "CHIEF_HEALTHCARE_PROFESSIONAL"
          ? isGettingPatients
          : isGettingPatientsByHealthcareProfessional
      ) ? (
        <Loading />
      ) : (
          loggedInUser?.role === "CHIEF_HEALTHCARE_PROFESSIONAL"
            ? isErrorGettingPatients
            : isErrorGettingPatientsByHealthcareProfessional
        ) ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage COVID Patients" isArrowBack={true} />
            {loggedInUser?.role === "CHIEF_HEALTHCARE_PROFESSIONAL" && (
              <AddButton
                title="Create Patient"
                onHandleClick={onHandleCreate}
              />
            )}
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Patient"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={patientsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Patient */}
          <CreatePatient
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default CovidPatientManagement;
