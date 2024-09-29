import React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

const ThousandSeparatorField = React.forwardRef(function ThousandSeparatorField(
  props,
  ref
) {
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
      thousandSeparator
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale={2}
    />
  );
});

ThousandSeparatorField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ThousandSeparatorField;
