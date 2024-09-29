import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";
import { AdvanceSearch } from "../../components/searchBar";
import { AddButton } from "../../components/button";
import { BasicTable } from "../../components/dataTable";
import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

const UserManagement = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const columns = [
    {
      field: "roleName",
      columnName: "Role Name",
      width: "30%",
    },
    {
      field: "status",
      columnName: "Status",
      width: "25%",
    },
    {
      field: "createdDate",
      columnName: "Created Date",
      width: "20%",
    },
    {
      field: "updatedDate",
      columnName: "Updated Date",
      width: "20%",
    },
  ];

  const onHandleCreate = () => {};

  const onHandleEdit = (row) => {};

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onClearSearch = () => {};

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      <SpaceBetween>
        <Heading title="Manage User Roles" isArrowBack={true} />
        <AddButton title="Create User Role" onCreateClick={onHandleCreate} />
      </SpaceBetween>
      <SpaceBetween>
        <AdvanceSearch
          placeholder="Search User Role"
          keyword={searchValue}
          onChange={setSearchValue}
          onClear={onClearSearch}
          onClick={onChangeSearch}
        />
      </SpaceBetween>
      <BasicTable
        currentPage={currentPage}
        columns={columns}
        rows={[]}
        recordsPerPage={10}
        handleChangeCurrentPage={(data) => changeCurrentPage(data)}
        handleEdit={onHandleEdit}
      />
    </CustomCard>
  );
};

export default UserManagement;
