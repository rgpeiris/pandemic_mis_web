import React from "react";
import { Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";

const CustomTabs = ({ lists, tabIndex, onChange }) => {
  return (
    <Tabs
      value={tabIndex}
      onChange={onChange}
      sx={{
        marginBottom: "30px",
        width: "fit-content",
        backgroundColor: "#f0f8ff",
        borderRadius: "25px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      {lists.map((item, index) => (
        <Tab
          label={item}
          key={index}
          sx={{
            padding: "10px 20px",
            color: tabIndex === index ? "#ffffff !important" : "#195481",
            fontWeight: 600,
            textTransform: "initial",
            backgroundColor: tabIndex === index ? "#195481" : "#f0f8ff",
          }}
        />
      ))}
    </Tabs>
  );
};

CustomTabs.propTypes = {
  lists: PropTypes.array.isRequired,
  tabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomTabs;
