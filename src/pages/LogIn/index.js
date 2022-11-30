import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AlertModal from "@components/AlertModa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { LoginUser } from "../../api/user";
import loginImg from "../../assets/img/login.png";

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

  const imgStyle = {
    position: "absolute",
    width: "647px",
    top: "50%",
    left: "36%",
    transform: "translate(-50%,-50%)",
  };

  //비밀번호
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const onClick = () => {
    navigate("/signup");
  };

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

  const [authInfo, setAuthInfo] = useState();

  // 로그인 클릭
  const login = async (e) => {
    if (e) e.preventDefault();
    const id = idRef.current.value;
    const pw = pwRef.current.value;
    if (!id || !pw) {
      setModalText("아이디/비밀번호를 입력해주세요.");
      setOpenModal1(true);
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, id, pw);
      const { uid } = user;
      console.log(user);
      const { data, message } = await LoginUser({ firebaseUid: uid });
      if (message == "OK") {
        navigate("/");
      }
    } catch ({ message }) {
      console.log(message);
      if (message.includes("wrong-password")) {
        setModalText("아이디/비밀번호를 확인해주세요.");
        setOpenModal1(true);
        return;
      }
      if (message.includes("invalid-email")) {
        setModalText("올바른 이메일 형식이 아닙니다. 다시 입력해주세요.");
        setOpenModal1(true);
        return;
      }
      if (message.includes("user-not-found")) {
        setModalText("존재하지 않는 회원입니다.");
        setOpenModal1(true);
        return;
      }
      setOpenModal1(true);
    }
  };
  // 배송준비중
  const [openModal1, setOpenModal1] = useState(false);
  const [modalText, setModalText] = useState("false");
  const modalHandleClose = () => setOpenModal1(false);

  return (
    <Grid container height={"100vh"}>
      <AlertModal
        isOpen={openModal1}
        onClose={modalHandleClose}
        text={modalText}
        // closeBtn={false}
      />
      <Grid item xs={8}>
        <img src={loginImg} alt="dd" style={imgStyle} />
      </Grid>
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
            onClick={login}
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
