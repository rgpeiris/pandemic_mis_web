import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { ArrowBack } from "@mui/icons-material";

const Heading = ({ title, textCenter, isArrowBack }) => {
  const navigate = useNavigate();

  return (
    <>
      {isArrowBack ? (
        <Typography
          sx={{ fontSize: "24px", color: "#681F6E", fontWeight: "bold" }}
        >
          <ArrowBack
            onClick={() => navigate(-1)}
            sx={{
              position: "relative",
              top: "4px",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          />{" "}
          {title}
        </Typography>
      ) : (
        <Typography
          sx={{
            fontSize: "24px",
            color: "#681F6E",
            fontWeight: "bold",
            textAlign: textCenter ? "center" : null,
          }}
        >
          {title}
        </Typography>
      )}
    </>
  );
};

Heading.defaultProps = {
  isArrowBack: false,
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Heading;
