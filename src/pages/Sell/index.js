import React, { useEffect, useRef, useState } from "react";

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AlertModal from "@components/AlertModa";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Select,
  FormControl,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import SearchButtons from "./SearchButtons";
import sellColumns from "@utils/sellColumns";

const SellList = () => {
  const navigator = useNavigate();

  const Title = styled(Grid)(({ theme }) => ({
    padding: "35px 15px",
    fontSize: "18px",
    borderBottom: "1px solid #ddd",
  }));

  const gridBtm = {
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      paddingLeft: "10px",
    },
    "& .MuiDataGrid-cell": {
      paddingLeft: "20px",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
  };

  const ref = useRef();

  // 이름
  const [userName, setUserName] = useState("");
  // select 박스
  const handleChange = (event) => {
    setUserState(event.target.value);
  };
  const [userState, setUserState] = useState([]);

  const handleChange1 = (event) => {
    setUserState1(event.target.value);
  };
  const [userState1, setUserState1] = useState([]);

  // 전화번호
  const [userPhone, setUserPhone] = useState("");

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  // 클릭시 상세보기
  const [page, setPage] = useState(1);
  const [pageBtn, setPageBtn] = useState(1);

  const handleChangess = async (event, value) => {
    setPageBtn(value);
    setPage(value);
  };

  const handleRowClick = (params) => {
    navigator(`/user/item/${params.row.id}`);
  };
  const rowsData = data.map((e, i) => {
    return {
      id: e.id,
      num: page === 1 ? i + 1 : `${page}${i}`,
      name: e.name,
      birthday: e.birthday,
      phone: e.phone,
      stateText: e.stateText,
      createdAt: `${e.createdAt.split("T")[0]} ${e.createdAt.substring(
        11,
        19
      )}`,
    };
  });

  const rows = [
    {
      id: 1,
      num: 1,
      name: "아이폰",
      state: "A",
      price: "549,000",
      stock: "12개",
    },
    {
      id: 2,
      num: 1,
      name: "아이폰",
      state: "A",
      price: "1,549,000",
      stock: "12개",
    },
  ];

  // 검색
  const getSearch = async (e) => {
    if (e) e.preventDefault();
    const searchList = {
      num: 1,
      name: "아이폰",
      state: "A",
      price: "549,000",
      stock: "12개",
      register: "",
      current: "",
      //   isWithdrawal: userState === "탈퇴회원" ? true : false,
    };
    // const { data, statusCode } = await getUserListApi(searchList);
    // if (statusCode === 200) {
    //   setTotal(data?.total || 0);
    //   setData(data?.results || []);
    // }
  };
  return (
    <Grid container spacing={1} sx={{ p: 3 }}>
      <Grid item xs={12} mb={2}>
        <CardHeader title="판매 관리" />
        <Card>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid container item>
                <Grid container item xs={3} alignItems={"center"}>
                  <Grid item xs={3} textAlign={"right"} marginRight={2}>
                    제품명
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      size="small"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={3} alignItems={"center"}>
                  <Grid item xs={5} textAlign={"right"} marginRight={2}>
                    가격등록여부
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <Select
                        value={userState1}
                        size="small"
                        onChange={handleChange1}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>전체</em>
                        </MenuItem>
                        <MenuItem value={"등록"}>등록</MenuItem>
                        <MenuItem value={"미등록"}>미등록</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container item xs={2} alignItems={"center"}>
                  <Grid item xs={3} textAlign={"right"} marginRight={2}>
                    등급
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <Select
                        value={userState}
                        size="small"
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>전체</em>
                        </MenuItem>
                        <MenuItem value={"A"}>A</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction={"row-reverse"}
                  alignItems={"center"}
                >
                  <Grid item xs={7}>
                    <SearchButtons onSearch={getSearch} wd={"100%"} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <Box
            sx={{
              textAlign: "center",
              justifyContent: "center",
              borderRadius: 0,
              p: 2,
            }}
          >
            <DataGrid
              sx={gridBtm}
              autoHeight
              rows={rows}
              columns={sellColumns}
              //   experimentalFeatures={{ newEditingApi: true }}
              cell--textCenter
              disableSelectionOnClick
              disableColumnMenu
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SellList;
