import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";
import { AdvanceSearch } from "../../components/searchBar";
import { BasicTable } from "../../components/dataTable";
import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

import {
  getPatientsByGovernmentInCharge,
  getHospitals,
  getPatientById,
} from "../../store/actions";

const ApprovalManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [patientsList, setPatientsList] = useState([]);

  const { loggedInUser } = useSelector((state) => state.auth);
  const {
    isGettingPatientsByGovernmentInCharge,
    isErrorGettingPatientsByGovernmentInCharge,
    covidPatientsByGovernmentInCharge,
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
    dispatch(getPatientsByGovernmentInCharge(loggedInUser?.userName));
  }, [dispatch]);

  useEffect(() => {
    setPatientsList(covidPatientsByGovernmentInCharge);
  }, [covidPatientsByGovernmentInCharge]);

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
    let searchedPatientsList = covidPatientsByGovernmentInCharge.filter((x) =>
      x.nicNumber.toLowerCase().includes(searchValue.toLowerCase())
    );
    setPatientsList(searchedPatientsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setPatientsList(covidPatientsByGovernmentInCharge);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingPatientsByGovernmentInCharge ? (
        <Loading />
      ) : isErrorGettingPatientsByGovernmentInCharge ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Approval Management" isArrowBack={true} />
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
        </>
      )}
    </CustomCard>
  );
};

export default ApprovalManagement;
