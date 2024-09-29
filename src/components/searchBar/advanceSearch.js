import React from "react";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Clear, Search } from "@mui/icons-material";
import PropTypes from "prop-types";

import { MAX_SEARCH_FIELD_LENGTH, MIN_SEARCH_FIELD_LENGTH } from "../../utils";

const AdvanceSearch = ({
  placeholder,
  maxLength,
  onChange,
  onClick,
  onClear,
  keyword,
  label
}) => {
  return (
    <Tooltip
      arrow
      title={
        keyword.length < MIN_SEARCH_FIELD_LENGTH
          ? "Search term must be at least 2 characters in length"
          : ""
      }
    >
      <TextField
        value={keyword}
        placeholder={placeholder}
        label={label}
        type="text"
        size="medium"
        required={true}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <>
              {keyword.length > 0 && (
                <IconButton onClick={onClear}>
                  <Clear />
                </IconButton>
              )}
              <IconButton
                onClick={onClick}
                disabled={keyword.length < MIN_SEARCH_FIELD_LENGTH}
              >
                <Search />
              </IconButton>
            </>
          ),
        }}
        onInput={(e) => {
          e.target.value = e.target.value
            .toString()
            .slice(0, maxLength ? maxLength : MAX_SEARCH_FIELD_LENGTH);
        }}
      />
    </Tooltip>
  );
};

AdvanceSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default AdvanceSearch;
