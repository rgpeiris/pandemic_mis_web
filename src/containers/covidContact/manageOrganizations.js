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

import CreateOrganization from "./createOrganization";
import UpdateOrganization from "./updateOrganization";

import { getOrganizations, getOrganizationById } from "../../store/actions";

const ManageOrganizations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [organizationsList, setOrganizationsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const { isGettingOrganizations, isErrorGettingOrganizations, organizations } =
    useSelector((state) => state.covidContact);

  const columns = [
    {
      field: "organizationName",
      columnName: "Organization Name",
      width: "20%",
    },
    {
      field: "organizationType",
      columnName: "Organization Type",
      width: "17%",
    },
    {
      field: "contactName",
      columnName: "Contact Name",
      width: "15%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "18%",
    },
    {
      field: "phoneNumber",
      columnName: "Contact Number",
      width: "15%",
    },
    {
      field: "isActive",
      columnName: "Status",
      width: "10%",
    },
  ];

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    setOrganizationsList(organizations);
  }, [organizations]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getOrganizationById(row.organizationId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedOrganizationsList = organizations.filter(
      (x) =>
        x.organizationName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.organizationType.toLowerCase().includes(searchValue.toLowerCase())
    );
    setOrganizationsList(searchedOrganizationsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setOrganizationsList(organizations);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingOrganizations ? (
        <Loading />
      ) : isErrorGettingOrganizations ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage Organizations" isArrowBack={true} />
            <AddButton
              title="Create Organization"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Organization"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={organizationsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Organization */}
          <CreateOrganization
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Organization */}
          <UpdateOrganization
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageOrganizations;
