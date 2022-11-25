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
  Box,
  MenuItem,
} from "@mui/material";
import SearchButtons from "./SearchButtons";
import sellColumns from "@utils/sellColumns";
import { Listing } from "../../api/sell";

const SellList = () => {
  const navigator = useNavigate();

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

  //필터
  const [searchList, setSearchList] = useState({
    name: "",
    isRegistered: "전체",
    grade: "전체",
  });
  const { name, isRegistered, grade } = searchList;
  function onChange(e) {
    const { value, name } = e.target;
    setSearchList({
      ...searchList,
      [name]: value,
    });
  }

  const handleRowClick = (params) => {
    navigator(`/user/item/${params.row.id}`);
  };

  // 조회한 데이터
  const [data, setData] = useState([]);
  const rowsData = data?.map((e, i) => {
    return {
      id: e.id,
      num: i + 1,
      name: e.name,
      state: e.grade,
      price: e.price || "-원",
      stock: e.stock,
    };
  });

  // 조회
  const getSearch = async (e) => {
    if (e) e.preventDefault();
    const list = {
      name: name,
      isRegistered:
        isRegistered === "전체" ? "" : isRegistered === "등록" ? true : false,
      grade: grade === "전체" ? "" : grade,
    };
    const { data, statusCode } = await Listing(list);
    if (statusCode === 200) {
      setData(data || []);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);

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
                      id="name"
                      name="name"
                      size="small"
                      value={searchList.name}
                      onChange={onChange}
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
                        id="isRegistered"
                        value={searchList.isRegistered}
                        name="isRegistered"
                        size="small"
                        onChange={onChange}
                        displayEmpty
                      >
                        <MenuItem value="전체" name="전체">
                          전체
                        </MenuItem>
                        <MenuItem value="등록" name="등록">
                          등록
                        </MenuItem>
                        <MenuItem value="미등록" name="미등록">
                          미등록
                        </MenuItem>
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
                        id="grade"
                        name="grade"
                        value={searchList.grade}
                        size="small"
                        onChange={onChange}
                        displayEmpty
                      >
                        <MenuItem value="전체" name="전체">
                          전체
                        </MenuItem>
                        <MenuItem value="A" name="A">
                          A
                        </MenuItem>
                        <MenuItem value="A-" name="A-">
                          A-
                        </MenuItem>
                        <MenuItem value="B+" name="B+">
                          B+
                        </MenuItem>
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
              rows={rowsData}
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
