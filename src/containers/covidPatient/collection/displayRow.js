import React from "react";
import { Grid, FormLabel, TextField } from "@mui/material";
import PropTypes from "prop-types";

const DisplayRow = ({ label, value }) => {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={5} md={5}>
        <FormLabel component="legend">{label}</FormLabel>
      </Grid>
      <Grid item xs={7} md={7}>
        <TextField
          fullWidth
          sx={{
            ".MuiInputBase-input": {
              textAlign: "center !important",
            },
          }}
          value={value || ""}
          margin="normal"
          disabled
        />
      </Grid>
    </Grid>
  );
};

DisplayRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default DisplayRow;
