import React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

const NumberRef = React.forwardRef(function NumberRef(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalScale={2}
      allowNegative={false}
      allowLeadingZeros
    />
  );
});

const NumericField = ({ maxLength, ...rest }) => (
  <TextField
    {...rest}
    inputProps={{ maxLength: maxLength }}
    InputProps={{
      inputComponent: NumberRef,
    }}
  />
);

NumericField.propTypes = {
  maxLength: PropTypes.number,
};

export default NumericField;
