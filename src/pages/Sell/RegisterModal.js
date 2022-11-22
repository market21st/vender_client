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

const Item = styled(InputLabel)(({ theme }) => ({
  width: "5rem",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(TextField)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "6rem",
}));

const Stacks = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  marginBottom: "10px",
}));

const Buttons = styled(Button)(({ theme }) => ({
  color: "#4b4b4b",
  borderColor: "#4b4b4b",
}));

//확인 모달
function ChildModals() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ backgroundColor: "#353535" }}
      >
        저장
      </Button>
      <AlertModal
        isOpen={open}
        onClose={handleClose}
        text={"해당 상품의 판매를 안하겠습니까?"}
      />
    </>
  );
}

const RegisterModal = ({ isOpen, onClose, text }) => {
  const [open, setOpen] = React.useState(false);
  const [s, ss] = useState(0);

  const [openModal1, setOpenModal1] = useState(false);
  const modalHandleClose = () => setOpenModal1(false);

  const a = 1;
  // 리스트 추가(저장 클릭시)
  const addList = () => {
    const list = {};
  };

  // 가격/재고 조회
  const getList = () => {
    // const { data, statusCode } = await getUserListApi(searchList);
    // if (statusCode === 200) {
    //   setTotal(data?.total || 0);
    //   setData(data?.results || []);
    // }
  };

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
  const rows = [
    {
      id: 1,
      color: "핑크",
      stock: "12개",
    },
    {
      id: 2,
      color: "레드",
      stock: "12개",
    },
    {
      id: 3,
      color: "그린",
      stock: "12개",
    },
    {
      id: 4,
      color: "블랙",
      stock: "12개",
    },
  ];
  const sellColumns = [
    {
      field: "color",
      headerName: "색상",
      width: 200,
    },
    {
      field: "stock",
      headerName: "재고",
      width: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          console.log(params.id);
        };
        const change = (e) => {
          ss(e.target.value);
        };

        return (
          <>
            <TextField
              size="small"
              value={s}
              onChange={change}
              sx={{ width: "4rem" }}
            />
            <Typography ml={1}>개</Typography>
          </>
        );
      },
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
        <Stacks direction="row" spacing={2}>
          <Item htmlFor="price">판매가격</Item>
          <Item2 type="number" id="price" size="small"></Item2>
          <Typography>원</Typography>
        </Stacks>
        <Stacks direction="row" spacing={2}>
          <Item htmlFor="price">총 재고</Item>
          <Grid textAlign={"right"}>
            <Typography variant="subtitle1" textAlign={"left"} width={"6rem"}>
              13개
            </Typography>
          </Grid>
        </Stacks>
        <DataGrid
          sx={gridBtm}
          autoHeight
          rows={rows}
          cell--textCenter
          columns={sellColumns}
          disableColumnMenu
        />
        <Grid container justifyContent={"flex-end"} mt={10}>
          <Buttons variant="outlined" sx={{ marginRight: "13px" }}>
            초기화
          </Buttons>
          <Buttons
            variant="outlined"
            sx={{ marginRight: "3px" }}
            onClick={onClose}
          >
            닫기
          </Buttons>
          <ChildModals />
        </Grid>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
