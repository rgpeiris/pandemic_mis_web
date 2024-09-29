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

import CreateUser from "./createUser";
import UpdateUser from "./updateUser";

import { getUsers, getUserById } from "../../store/actions";

const UserManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const { isGettingUsers, isErrorGettingUsers, systemUsers } = useSelector(
    (state) => state.auth
  );

  const columns = [
    {
      field: "fullName",
      columnName: "Full Name",
      width: "20%",
    },
    {
      field: "userName",
      columnName: "Username",
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
      width: "20%",
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
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsersList(systemUsers);
  }, [systemUsers]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getUserById(row.userName));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedUsersList = systemUsers.filter(
      (x) =>
        x.userName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.nicNumber.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUsersList(searchedUsersList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setUsersList(systemUsers);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingUsers ? (
        <Loading />
      ) : isErrorGettingUsers ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage System Users" isArrowBack={true} />
            <AddButton
              title="Create System User"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search User"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={usersList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create User */}
          <CreateUser
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update User */}
          <UpdateUser
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default UserManagement;
