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

import CreatePandemicContact from "./createPandemicContact";
import UpdatePandemicContact from "./updatePandemicContact";

import {
  getPandemicContacts,
  getPandemicContactById,
  getOrganizations,
} from "../../store/actions";

const ManageContacts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pandemicContactsList, setPandemicContactsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingPandemicContacts,
    isErrorGettingPandemicContacts,
    pandemicContacts,
  } = useSelector((state) => state.covidContact);

  const columns = [
    {
      field: "name",
      columnName: "Contact Name",
      width: "14%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "14%",
    },
    {
      field: "phoneNumber",
      columnName: "Contact Number",
      width: "12%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "14%",
    },
    {
      field: "organizationName",
      columnName: "Visited Organization",
      width: "10%",
    },
    {
      field: "checkInTime",
      columnName: "Check-In",
      width: "15%",
    },
    {
      field: "checkOutTime",
      columnName: "Check-Out",
      width: "16%",
    },
  ];

  useEffect(() => {
    dispatch(getPandemicContacts());
  }, [dispatch]);

  useEffect(() => {
    setPandemicContactsList(pandemicContacts);
  }, [pandemicContacts]);

  const onHandleCreate = () => {
    dispatch(getOrganizations());
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getOrganizations());
    dispatch(getPandemicContactById(row.pandemicContactId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedPandemicContactsList = pandemicContacts.filter(
      (x) =>
        x.nicNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.organizationName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setPandemicContactsList(searchedPandemicContactsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setPandemicContactsList(pandemicContacts);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingPandemicContacts ? (
        <Loading />
      ) : isErrorGettingPandemicContacts ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage COVID Contacts" isArrowBack={true} />
            <AddButton title="Create Contact" onHandleClick={onHandleCreate} />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Contact"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={pandemicContactsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Pandemic Contact */}
          <CreatePandemicContact
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Pandemic Contact */}
          <UpdatePandemicContact
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageContacts;
