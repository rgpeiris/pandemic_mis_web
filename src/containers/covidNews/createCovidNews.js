import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import { FormActionButton } from "../../components/button";

import { checkStringValidity } from "../../utils";

import { createCovidNews } from "../../store/actions";

const CreateCovidNews = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [newsTitle, setNewsTitle] = useState("");
  const [isValidNewsTitle, setIsValidNewsTitle] = useState(true);
  const [description, setDescription] = useState("");
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [priority, setPriority] = useState("");
  const [isValidPriority, setIsValidPriority] = useState(true);

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isCreatingCovidNews } = useSelector((state) => state.covidNews);

  useEffect(() => {
    setNewsTitle("");
    setIsValidNewsTitle(true);
    setDescription("");
    setIsValidDescription(true);
    setPriority("");
    setIsValidPriority(true);
  }, []);

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

    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      newsId: 0,
      title: newsTitle,
      description,
      priority,
      isActive: true,
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createCovidNews(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create COVID News"} />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"News Title"}
              placeholder={"Enter News Title"}
              inputProps={{ maxLength: 50 }}
              value={newsTitle}
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
              value={description}
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
              value={priority}
              onChange={onHandlePriority}
              error={!isValidPriority}
              helperText={!isValidPriority && "* Required Field"}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField disabled fullWidth label={"Status"} value={"Active"} />
          </Grid>
        </Grid>
        <FormActionButton
          onCancelClick={onHandleCancel}
          loading={isCreatingCovidNews}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateCovidNews;
