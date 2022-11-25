import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AlertModal from "@components/AlertModa";

const Home = () => {
  // style
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    marginTop: theme.spacing(1.5),
  }));

  return (
    <Grid pl={5} pt={4}>
      <Typography variant="h4" mb={2}>
        안녕하세요, 아이픽스님
      </Typography>
      <Box
        textAlign={"center"}
        border={"1px solid #000"}
        width={347}
        p={"20px 0"}
      >
        <p>총 등록 상품 수</p>
        <h1>30개</h1>
      </Box>
      <Typography variant="subtitle2" color={"#FF0000"} mt={2}>
        * 정보 수정은 고객채널로 문의바랍니다.
      </Typography>
    </Grid>
  );
};

export default Home;
