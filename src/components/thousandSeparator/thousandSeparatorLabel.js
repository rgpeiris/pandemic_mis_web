import React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { Typography } from "@mui/material";

const ThousandSeparatorLabel = ({ amount, sx }) => {
  return (
    <NumericFormat
      displayType={"text"}
      thousandSeparator
      decimalScale={2}
      fixedDecimalScale={2}
      value={amount}
      isNumericString
      renderText={(value) => <Typography sx={sx}>{value}</Typography>}
    />
  );
};

ThousandSeparatorLabel.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sx: PropTypes.object,
};

export default ThousandSeparatorLabel;
