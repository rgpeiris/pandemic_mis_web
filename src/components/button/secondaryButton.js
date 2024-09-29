import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const SecondaryButton = ({ title, onClick, loading, disabled, style }) => {
  return (
    <LoadingButton
      variant="outlined"
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: "115px",
        height: "40px",
        border: "1px solid #C0183E",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: !loading && !disabled && "#FFFFFF",
        color: "#C0183E",
        "&:hover": {
          border: "1px solid #C0183E",
        },
        ...style,
      }}
    >
      {title}
    </LoadingButton>
  );
};

SecondaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SecondaryButton;
