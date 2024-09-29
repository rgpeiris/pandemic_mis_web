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

import CreateCovidNews from "./createCovidNews";
import UpdateCovidNews from "./updateCovidNews";

import { getCovidNews, getCovidNewsById } from "../../store/actions";

const CovidNewsManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [newsList, setNewsList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);

  const { isGettingCovidNews, isErrorGettingCovidNews, covidNews } =
    useSelector((state) => state.covidNews);

  const columns = [
    {
      field: "title",
      columnName: "News Title",
      width: "20%",
    },
    {
      field: "description",
      columnName: "Description",
      width: "30%",
    },
    {
      field: "priority",
      columnName: "Priority",
      width: "5%",
    },
    {
      field: "isActive",
      columnName: "Status",
      width: "10%",
    },
    {
      field: "createdBy",
      columnName: "Created By",
      width: "15%",
    },
    {
      field: "createdDate",
      columnName: "Created Date",
      width: "15%",
    },
  ];

  useEffect(() => {
    dispatch(getCovidNews());
  }, [dispatch]);

  useEffect(() => {
    setNewsList(covidNews);
  }, [covidNews]);

  const onHandleCreate = () => {
    setShowCreate(true);
  };

  const onHandleEdit = (row) => {
    dispatch(getCovidNewsById(row.newsId));
    setShowUpdate(true);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedNewsList = covidNews.filter(
      (x) =>
        x.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setNewsList(searchedNewsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setNewsList(covidNews);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  return (
    <CustomCard>
      {isGettingCovidNews ? (
        <Loading />
      ) : isErrorGettingCovidNews ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <SpaceBetween>
            <Heading title="Manage COVID News" isArrowBack={true} />
            <AddButton
              title="Create COVID News"
              onHandleClick={onHandleCreate}
            />
          </SpaceBetween>
          <SpaceBetween>
            <AdvanceSearch
              placeholder="Search News"
              keyword={searchValue}
              onChange={onChangeSearch}
              onClear={onClearSearch}
              onClick={onSubmitSearch}
            />
          </SpaceBetween>
          <BasicTable
            currentPage={currentPage}
            columns={columns}
            rows={newsList || []}
            recordsPerPage={10}
            handleChangeCurrentPage={(data) => changeCurrentPage(data)}
            handleEdit={onHandleEdit}
          />

          {/* Create COVID News */}
          <CreateCovidNews
            isOpen={isShowCreate}
            handleClose={() => setShowCreate(false)}
          />

          {/* Update COVID News */}
          <UpdateCovidNews
            isOpen={isShowUpdate}
            handleClose={() => setShowUpdate(false)}
          />
        </>
      )}
    </CustomCard>
  );
};

export default CovidNewsManagement;
