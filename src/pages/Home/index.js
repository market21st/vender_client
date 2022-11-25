import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { userInfo } from "../../api/user";

const Home = () => {
  const [info, setInfo] = useState();
  const getInfo = async () => {
    const { data, statusCode } = await userInfo();
    if (statusCode === 200) {
      setInfo(data || []);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Grid pl={5} pt={4}>
      <Typography variant="h4" mb={2}>
        안녕하세요, {info?.name}님
      </Typography>
      <Box
        textAlign={"center"}
        border={"1px solid #000"}
        width={347}
        p={"20px 0"}
      >
        <p>총 등록 상품 수</p>
        <h1>{info?.stockSum}개</h1>
      </Box>
      <Typography variant="subtitle2" color={"#FF0000"} mt={2}>
        * 정보 수정은 고객채널로 문의바랍니다.
      </Typography>
    </Grid>
  );
};

export default Home;
