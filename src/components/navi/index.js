import React, { useEffect, useRef, useState } from "react";
import { Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AlertModal from "@components/AlertModa";
import { Cookies } from "react-cookie";
export const cookies = new Cookies();

const Nav = () => {
  const navigator = useNavigate();

  const Title = styled(Grid)(({ theme }) => ({
    padding: "35px 15px",
    fontSize: "18px",
    borderBottom: "1px solid #ddd",
  }));
  const GridTop = styled(Grid)(({ theme }) => ({
    padding: "18px 15px",
    fontSize: "18px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  }));
  const GridBtm = styled(Grid)(({ theme }) => ({
    padding: "18px 15px",
    cursor: "pointer",
    borderTop: "1px solid #ddd",
  }));

  const [islogout, setIsLogout] = useState(false);
  const modalHandleClose = () => {
    setIsLogout(false);
    window.location.reload();
    navigator("/");
  };

  const getBiz = () => {
    window.open(window.localStorage.getItem("bizFile", "_blank"));
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{
        borderRight: "1px solid #ddd",
        borderLeft: "1px solid #ddd",
        width: "12rem",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <AlertModal
        isOpen={islogout}
        onClose={modalHandleClose}
        text={"로그아웃되었습니다."}
      />
      <Grid textAlign={"right"}>
        <Title item>
          <Link href="/" underline="none" color={"#000"}>
            21세기전파상
          </Link>
        </Title>
        <GridTop item>
          <Link href="/sell" underline="none" color={"#000"}>
            판매관리
          </Link>
        </GridTop>
      </Grid>
      <Grid textAlign={"right"}>
        <GridBtm item onClick={getBiz}>
          21세기전파상 사업자등록증 다운로드
        </GridBtm>
        <GridBtm
          item
          onClick={() => {
            cookies.remove("refreshToken");
            cookies.remove("accessToken");
            setIsLogout(true);
          }}
        >
          로그아웃
        </GridBtm>
      </Grid>
    </Grid>
  );
};

export default Nav;
