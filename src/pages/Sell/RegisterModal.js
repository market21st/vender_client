import React, { useEffect, useState } from "react";
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
import { editStock } from "src/api/sell";

//저장버튼+확인모달
const ChildModals = ({ stockLists, price, id, total }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const modalHandleClose = () => {
    setIsOpen2(false);
  };

  const handleOpen = async () => {
    if (price === null || price == 0) {
      setOpen(true);
      setText("가격을 0원으로 등록 불가능합니다.");
      return;
    }
    setIsOpen2(true);
  };

  const edit = async (e) => {
    console.log("eeeee");
    const { statusCode } = await editStock(id, stockLists, price);
    if (statusCode === 200) {
      console.log("200");
      window.location.reload();
    }
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
      <AlertModal isOpen={open} onClose={handleClose} text={text} />
      <Modal
        open={isOpen2}
        onClose={modalHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            가격 {price}원, 총 재고수량 {total}개로 등록하시겠습니까?
          </Typography>
          <Grid container justifyContent={"flex-end"} mt={3}>
            <Button
              variant="outlined"
              sx={{ marginRight: "13px" }}
              onClick={modalHandleClose}
            >
              아니요
            </Button>
            <Button variant="outlined" onClick={edit}>
              네
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

// 가격/재고 등록 모달
const RegisterModal = ({ isOpen, onClose, text, stockState }) => {
  const [stockList, setStockList] = useState(stockState?.colors);
  const [total, setTotal] = useState(stockState?.totalStock);
  const [totalPrice, setTotalPrice] = useState(stockState?.price);
  const [value, setValue] = useState(0);

  const onChange = async (e) => {
    setValue(e.target.value);
    const index = stockList.findIndex((el) => el.color == e.target.name);
    const newStockList = [...stockList];
    if (index != -1) {
      newStockList[index] = {
        ...newStockList[index],
        stock: Number(e.target.value),
      };
      setStockList(newStockList);
      const lists = newStockList.reduce((sum, currentObject) => {
        return sum + currentObject.stock;
      }, 0);
      setTotal(lists);
    }
  };

  const onAdd = () => {
    const lists = stockList.reduce((sum, currentObject) => {
      return sum + currentObject.stock;
    }, 0);

    setTotal(lists);
  };

  useEffect(() => {
    onAdd();
  }, [value]);

  // column
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
        const { color, stock } = params.row;
        return (
          <>
            <TextField
              name={color}
              defaultValue={stock}
              size="small"
              onChange={onChange}
              sx={{ width: "4rem" }}
            />
            <Typography ml={1}>개</Typography>
          </>
        );
      },
    },
  ];

  return (
    <>
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
            <Item2
              type="number"
              id="price"
              size="small"
              value={totalPrice || ""}
              onChange={(e) => setTotalPrice(e.target.value)}
              sx={{ width: "30%" }}
            ></Item2>
            <Typography>원</Typography>
          </Stacks>
          <Stacks direction="row" spacing={2}>
            <Item htmlFor="price">총 재고</Item>
            <Grid textAlign={"right"}>
              <Typography variant="subtitle1" textAlign={"left"} width={"6rem"}>
                {total}개
              </Typography>
            </Grid>
          </Stacks>
          <DataGrid
            sx={gridBtm}
            autoHeight
            rows={stockState?.colors}
            cell--textCenter
            columns={sellColumns}
            disableColumnMenu
            getRowId={(row) => row.internalId}
          />
          <Grid container justifyContent={"flex-end"} mt={10}>
            {/* <Buttons variant="outlined" sx={{ marginRight: "13px" }}>
              초기화
            </Buttons> */}
            <Buttons
              variant="outlined"
              sx={{ marginRight: "3px" }}
              onClick={onClose}
            >
              닫기
            </Buttons>
            <ChildModals
              stockLists={stockList}
              price={totalPrice}
              id={stockState.id}
              total={total}
            />
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default RegisterModal;

// Style
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
