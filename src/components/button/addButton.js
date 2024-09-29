import React from "react";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

const AddButton = ({ title, onHandleClick }) => {
  return (
    <Button
      sx={{ border: "1px solid #D32F2F", borderRadius: "20px", height: "40px" }}
      onClick={onHandleClick}
    >
      <Typography
        variant="button"
        sx={{
          color: "#D32F2F",
          fontSize: "17px",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  onHandleClick: PropTypes.func.isRequired,
};

export default AddButton;
