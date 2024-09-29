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

import CreateVaccinationAppointment from "./createVaccinationAppointment";
import UpdateVaccinationAppointment from "./updateVaccinationAppointment";

import {
  getVaccineAppointments,
  getVaccineAppointmentById,
} from "../../store/actions";

const ManageVaccinationAppointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [vaccineAppointmentsList, setVaccineAppointmentsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingVaccineAppointments,
    isErrorGettingVaccineAppointments,
    vaccineAppointments,
  } = useSelector((state) => state.covidVaccine);

  const columns = [
    {
      field: "name",
      columnName: "Full Name",
      width: "20%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "10%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "20%",
    },
    {
      field: "centreName",
      columnName: "Vaccination Center Name",
      width: "20%",
    },
    {
      field: "dateScheduled",
      columnName: "Date Scheduled",
      width: "10%",
    },
    {
      field: "timeScheduled",
      columnName: "Time Scheduled",
      width: "10%",
    },
    {
      field: "status",
      columnName: "Status",
      width: "5%",
    },
  ];

  useEffect(() => {
    dispatch(getVaccineAppointments());
  }, [dispatch]);

  useEffect(() => {
    setVaccineAppointmentsList(vaccineAppointments);
  }, [vaccineAppointments]);

  const onHandleCreate = (row) => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getVaccineAppointmentById(row.vaccineAppointmentId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedVaccineAppointmentsList = vaccineAppointments.filter(
      (x) =>
        x.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.nicNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.centreName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.status.toLowerCase().includes(searchValue.toLowerCase())
    );
    setVaccineAppointmentsList(searchedVaccineAppointmentsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setVaccineAppointmentsList(vaccineAppointments);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingVaccineAppointments ? (
        <Loading />
      ) : isErrorGettingVaccineAppointments ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading
              title="Manage Vaccination Appointments"
              isArrowBack={true}
            />
            <AddButton
              title="Create Appointment"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Appointment"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={vaccineAppointmentsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Vaccination Appointment */}
          <CreateVaccinationAppointment
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Vaccination Appointment */}
          <UpdateVaccinationAppointment
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageVaccinationAppointments;
