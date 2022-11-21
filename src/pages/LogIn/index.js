import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
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

const LogIn = () => {
  const navigate = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();

  // style
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    marginTop: theme.spacing(1.5),
  }));
  const LinkStyled = styled("a")(({ theme }) => ({
    fontSize: "0.875rem",
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  // 회원가입 클릭시
  const onClick = () => {
    console.log("링크 이동");
    //navigate('/signup')
  };

  //비밀번호
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // 로그인 클릭
  const loginClick = async () => {
    if (!idRef.current.value || !pwRef.current.value) {
      console.log("id확인/Pw확인");
      // setOpenModal1(true); 에러 모달
      return;
    }

    // const { data, statusCode } = await OrderListApi(searchList);
    // if (statusCode === 200) {
    //   setTotal(data?.total || 0);
    //   setData(data?.results || []);
    //   setChk(false);
    //   if (data.pageTotal === 0) {
    //     setPageBtn(1);
    //     setPage(1);
    //   }
    // }
    const userInfo = {
      id: idRef.current.value,
      pw: pwRef.current.value,
    };
    console.log(userInfo);
  };
  // 배송준비중
  const [openModal1, setOpenModal1] = useState(false);
  const modalHandleClose = () => setOpenModal1(false);

  return (
    <Grid container height={"100vh"}>
      <AlertModal
        isOpen={openModal1}
        onClose={modalHandleClose}
        text={"배송준비중으로 변경하시겠습니까?"}
      />
      <Grid item xs={8}></Grid>
      <Grid container item xs={4} padding={"0 30px"} alignItems={"center"}>
        <Grid item textAlign={"center"} width={"16rem"} minWidth={"12rem"}>
          <h2>21세기 전파상 판매자 센터</h2>
          <TextField
            fullWidth
            size="small"
            inputRef={idRef}
            placeholder={"아이디"}
            sx={{ marginBottom: 1 }}
          />
          <FormControl variant="filled" fullWidth>
            <OutlinedInput
              inputRef={pwRef}
              size="small"
              placeholder={"비밀번호"}
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={loginClick}
          >
            로그인
          </Button>
          {/* <Button variant="outlined" fullWidth sx={{ marginTop: 1 }}>
            회원가입
          </Button> */}
          <TypographyStyled variant="subtitle1">
            회원이 아니신가요?{" "}
            <LinkStyled onClick={onClick} sx={{ cursor: "pointer" }}>
              회원가입하기
            </LinkStyled>
          </TypographyStyled>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogIn;
