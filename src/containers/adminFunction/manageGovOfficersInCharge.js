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

import CreateGovOfficerInCharge from "./createGovOfficerInCharge";
import UpdateGovOfficerInCharge from "./updateGovOfficerInCharge";

import {
  getGovOfficersInCharge,
  getGovOfficersInChargeById,
} from "../../store/actions";

const ManageGovOfficersInCharge = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [govOfficersInChargeList, setGovOfficersInChargeList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const {
    isGettingGovOfficersInCharge,
    isErrorGettingGovOfficersInCharge,
    govOfficersInCharge,
  } = useSelector((state) => state.covidPatient);

  const columns = [
    {
      field: "localGovernmentInChargeName",
      columnName: "Government In Charge Name",
      width: "23%",
    },
    {
      field: "designation",
      columnName: "Designation",
      width: "15%",
    },
    {
      field: "assignedDistrict",
      columnName: "Assigned District",
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
    dispatch(getGovOfficersInCharge());
  }, [dispatch]);

  useEffect(() => {
    setGovOfficersInChargeList(govOfficersInCharge);
  }, [govOfficersInCharge]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getGovOfficersInChargeById(row.localGovernmentInChargeId));
    setShowUpdate(true);
  };
  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedGovOfficersInChargeList = govOfficersInCharge.filter(
      (x) =>
        x.localGovernmentInChargeName
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        x.designation.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.assignedDistrict.toLowerCase().includes(searchValue.toLowerCase())
    );
    setGovOfficersInChargeList(searchedGovOfficersInChargeList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setGovOfficersInChargeList(govOfficersInCharge);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingGovOfficersInCharge ? (
        <Loading />
      ) : isErrorGettingGovOfficersInCharge ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading
              title="Manage Government Officers In Charge"
              isArrowBack={true}
            />
            <AddButton
              title="Create Officer In Charge"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search Officer In Charge"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={govOfficersInChargeList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create Government Officer In Charge */}
          <CreateGovOfficerInCharge
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update Government Officer In Charge */}
          <UpdateGovOfficerInCharge
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default ManageGovOfficersInCharge;
