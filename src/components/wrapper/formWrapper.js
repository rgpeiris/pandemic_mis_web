import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const FormWrapper = ({ children, onSubmit }) => {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormWrapper;
