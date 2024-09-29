import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const PrimaryButton = ({ title, onClick, loading, disabled, style }) => {
  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: "115px",
        height: "40px",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "bold",
        background:
          !loading &&
          !disabled &&
          "transparent linear-gradient(92deg, #B02D41, #D9596D)",
        color: "#FFFFFF",
        ...style,
      }}
    >
      {title}
    </LoadingButton>
  );
};

PrimaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default PrimaryButton;
