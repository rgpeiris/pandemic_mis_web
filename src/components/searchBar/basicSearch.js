import React from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

const BasicSearch = ({ placeholder, onChange }) => {
  return (
    <TextField
      placeholder={placeholder}
      type="number"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

BasicSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BasicSearch;
