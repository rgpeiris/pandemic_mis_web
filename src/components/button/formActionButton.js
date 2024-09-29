import React from "react";
import { Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const FormActionButton = ({
  title,
  cancelTitle,
  onCancelClick,
  loading,
  disabled,
  Edit,
  type,
  onSubmitClick,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent={"flex-end"}
      alignItems="center"
      spacing={1}
      sx={{ mt: 5 }}
    >
      <LoadingButton
        type="button"
        variant="outlined"
        sx={{
          width: "180px",
          borderRadius: "20px",
          border: "1px solid #D32F2F",
          "&:hover": {
            border: "1px solid #D32F2F",
          },
        }}
        onClick={onCancelClick}
        disabled={loading}
      >
        <Typography
          variant="button"
          sx={{
            color: "#D32F2F",
          }}
        >
          {cancelTitle}
        </Typography>
      </LoadingButton>
      {type == "submit" ? (
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{
            width: "180px",
            borderRadius: "20px",
            background: "transparent linear-gradient(94deg, #B02D41, #D9596D)",
          }}
          loading={loading}
          loadingPosition="start"
          startIcon={<></>}
          disabled={disabled}
        >
          {title ? title : Edit ? "Update" : "Create"}
        </LoadingButton>
      ) : (
        <LoadingButton
          type={type}
          variant="contained"
          sx={{
            width: "180px",
            borderRadius: "20px",
            background: "transparent linear-gradient(94deg, #B02D41, #D9596D)",
          }}
          loading={loading}
          loadingPosition="start"
          startIcon={<></>}
          disabled={disabled}
          onClick={onSubmitClick}
        >
          {title ? title : Edit ? "Update" : "Create"}
        </LoadingButton>
      )}
    </Stack>
  );
};

FormActionButton.defaultProps = {
  type: "submit",
  cancelTitle: "Cancel",
};

FormActionButton.propTypes = {
  title: PropTypes.string,
  cancelTitle: PropTypes.string,
  Edit: PropTypes.bool,
  onCancelClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  onSubmitClick: PropTypes.func,
};

export default FormActionButton;
