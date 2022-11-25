import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  InputLabel,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import AlertModal from "@components/AlertModa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "26rem",
  bgcolor: "background.paper",
  border: "1px solid #000",
  p: 4,
};

const Buttons = styled(Button)(({ theme }) => ({
  color: "#4b4b4b",
  borderColor: "#4b4b4b",
}));

const CurrentStatus = ({ isOpen, onClose, text, stockState }) => {
  // style
  const gridBtm = {
    "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      paddingLeft: "10px",
      justifyContent: "center",
    },
    "& .MuiDataGrid-cell": {
      paddingLeft: "20px",
      justifyContent: "center",
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
  };

  const sellColumns = [
    {
      field: "name",
      headerName: "업체명",
      width: 120,
    },
    {
      field: "price",
      headerName: "판매가",
      width: 120,
    },
    {
      field: "stock",
      headerName: "총재고",
      width: 120,
    },
  ];

  return (
    <Modal
      sx={gridBtm}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
          {text}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
          {stockState?.length == 0 ? "등록 업체 없음" : null}
        </Typography>

        <DataGrid
          sx={gridBtm}
          autoHeight
          rows={stockState}
          cell--textCenter
          columns={sellColumns || []}
          disableColumnMenu
          getRowId={(row) => row.fkVendorId}
        />
        <Grid container justifyContent={"center"} mt={3}>
          <Buttons
            variant="outlined"
            sx={{ marginRight: "3px", width: "100%" }}
            onClick={onClose}
          >
            닫기
          </Buttons>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CurrentStatus;
