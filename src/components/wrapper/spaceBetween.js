import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

const SpaceBetween = ({ children, alignItems, justifyContent }) => {
  return (
    <Grid
      item
      container
      justifyContent={justifyContent}
      alignItems={alignItems}
      sx={{ mb: 3 }}
    >
      {children}
    </Grid>
  );
};

SpaceBetween.defaultProps = {
  alignItems: "self-start",
  justifyContent: "space-between",
};

SpaceBetween.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
};

export default SpaceBetween;
