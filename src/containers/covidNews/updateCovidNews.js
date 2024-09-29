import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import { checkStringValidity, STATUS_LIST } from "../../utils";

import { updateCovidNews } from "../../store/actions";

const UpdateCovidNews = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [newsId, setNewsId] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [isValidNewsTitle, setIsValidNewsTitle] = useState(true);
  const [description, setDescription] = useState("");
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [priority, setPriority] = useState("");
  const [isValidPriority, setIsValidPriority] = useState(true);
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const { covidNewsById, isGettingCovidNewsById, isUpdatingCovidNews } =
    useSelector((state) => state.covidNews);

  useEffect(() => {
    if (covidNewsById) {
      setNewsId(covidNewsById?.newsId);
      setNewsTitle(covidNewsById?.title);
      setDescription(covidNewsById?.description);
      setPriority(covidNewsById?.priority);
      setStatus(covidNewsById?.isActive ? "Active" : "Inactive");
      setIsClearStatus(true);
      setIsValidNewsTitle(true);
      setIsValidDescription(true);
      setIsValidPriority(true);
      setIsValidStatus(true);
    }
  }, [covidNewsById]);

  const onHandleNewsTitle = (e) => {
    setIsValidNewsTitle(true);
    setNewsTitle(e.target.value);
  };

  const onHandleDescription = (e) => {
    setIsValidDescription(true);
    setDescription(e.target.value);
  };

  const onHandlePriority = (e) => {
    setIsValidPriority(true);
    setPriority(e.target.value);
  };

  const onHandleStatus = (e) => {
    setIsValidStatus(true);
    setIsClearStatus(true);
    setStatus(e.target.value);
  };

  const onHandleClearStatus = () => {
    setStatus("");
    setIsClearStatus(false);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(newsTitle)) {
      setIsValidNewsTitle(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(description)) {
      setIsValidDescription(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(priority)) {
      setIsValidPriority(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(status)) {
      setIsValidStatus(false);
      isErrorValidation = true;
    }

    if (!isErrorValidation) {
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      newsId,
      title: newsTitle,
      description,
      priority,
      isActive: status === "Active" ? true : false,
      createdDate: covidNewsById?.createdDate,
      createdBy: covidNewsById?.createdBy,
    };

    dispatch(updateCovidNews(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingCovidNewsById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update COVID News"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"News Title"}
                placeholder={"Enter News Title"}
                inputProps={{ maxLength: 50 }}
                value={newsTitle || ""}
                onChange={onHandleNewsTitle}
                error={!isValidNewsTitle}
                helperText={!isValidNewsTitle && "* Required Field"}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Description"}
                placeholder={"Enter Description"}
                inputProps={{ maxLength: 400 }}
                value={description || ""}
                multiline
                rows={5}
                onChange={onHandleDescription}
                error={!isValidDescription}
                helperText={!isValidDescription && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                type="number"
                label={"Priority"}
                placeholder={"Enter Priority"}
                value={priority || ""}
                onChange={onHandlePriority}
                error={!isValidPriority}
                helperText={!isValidPriority && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Status *"}
                isShowPlaceholder
                value={status || ""}
                selectData={STATUS_LIST}
                onChange={onHandleStatus}
                isValid={isValidStatus}
                handleClear={onHandleClearStatus}
                isClear={isClearStatus}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingCovidNews}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateCovidNews;
