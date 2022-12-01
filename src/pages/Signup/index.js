import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { auth } from "@config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SignupUser, EmailCheck } from "../../api/user";
import AlertModal from "@components/AlertModa";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import loginImg from "../../assets/img/login.png";

const Label = styled(InputLabel)(({ theme }) => ({
  width: "9rem",
  color: theme.palette.text.secondary,
}));

const Input = styled(TextField)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const SelectBox = styled(Select)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Stacks = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  marginBottom: "10px",
}));

const imgStyle = {
  position: "absolute",
  width: "647px",
  top: "50%",
  left: "36%",
  transform: "translate(-50%,-50%)",
};

const Signup = () => {
  const navigate = useNavigate();
  const [detailFile, setDetailFile] = useState("");
  const [check, setCheck] = useState(false);
  // 파이어베이스 회원가입
  const [autoInfo, setAuthInfo] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
  });

  // 회원가입
  const [userInfo, setUserInfo] = useState({
    name: "",
    bankName: "",
    bankAccount: "",
    bizType: "개인사업자",
    taxType: "단위과세",
    bizNum: "",
    adminName: "",
    phone: "",
    address: "",
  });

  //사업자 분류
  const [biz, setBiz] = useState("개인사업자");
  const bizChange = (e) => {
    setBiz(e.target.value);
    setUserInfo({ ...userInfo, bizType: e.target.value });
  };

  //과세유형
  const [tax, setTax] = useState("단위과세");
  const taxChange = (e) => {
    setTax(e.target.value);
    setUserInfo({ ...userInfo, taxType: e.target.value });
  };

  // 파이어베이스 가입 정보
  const { id, password, passwordConfirm } = autoInfo;
  function onAuthChange(e) {
    if (e.target.id == "id") setCheck(false);
    const { value, id } = e.target;
    setAuthInfo({
      ...autoInfo,
      [id]: value,
    });
  }

  // 회원가입 정보
  function InfoChange(e) {
    const { value, id } = e.target;
    setUserInfo({
      ...userInfo,
      [id]: value,
    });
  }
  const formData = new FormData();

  const join = async (e) => {
    if (e) e.preventDefault();

    for (let key in userInfo) {
      if (userInfo[key] === "") {
        setOpenModal1(true);
        setAlertText("모든 항목은 필수 입력 항목입니다.");
        return;
      }
    }

    if (check == false) {
      setOpenModal1(true);
      setAlertText("이메일 중복확인을 해주세요.");
      return;
    }

    if (password.length < 7) {
      setOpenModal1(true);
      setAlertText("비밀번호를 8글자 이상 입력해주세요.");
      return;
    }

    if (password != passwordConfirm || password === "") {
      setOpenModal1(true);
      setAlertText("비밀번호를 확인해주세요.");
      return;
    }

    if (detailFile == "") {
      setOpenModal1(true);
      setAlertText("사업자등록증을 첨부해주세요.");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, id, password);
      const { uid, email } = user;
      formData.append("firebaseUid", uid && uid);
      formData.append("email", email && email);

      console.log(uid, email, userInfo);

      await addUserInfo();
    } catch ({ code, message }) {}
  };

  // Signup Api
  const addUserInfo = async (e) => {
    if (e) e.preventDefault();
    for (let key in userInfo) {
      formData.append(key, userInfo[key]);
    }
    formData.append("file", detailFile && detailFile);

    // 추가 리스트
    const { data, statusCode } = await SignupUser(formData);
    if (statusCode === 200) {
      setOpenModal1(true);
      setAlertText(
        "가입이 완료되었습니다. 가입승인까지 최대 3일이 걸릴 수 있습니다."
      );
    }
  };

  // 중복확인
  const checkEmail = async (e) => {
    if (e) e.preventDefault();
    console.log(autoInfo);
    const { error, statusCode } = await EmailCheck({ email: autoInfo.id });

    console.log(statusCode);
    if (statusCode === 200) {
      setOpenModal1(true);
      setAlertText("사용가능한 이메일입니다.");
      setCheck(true);
    }
    if (statusCode === 400) {
      setOpenModal1(true);
      setAlertText("이미 사용중인 이메일입니다.");
      setCheck(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //모달
  const [openModal1, setOpenModal1] = useState(false);
  const [alertText, setAlertText] = useState("");
  const modalHandleClose = () => setOpenModal1(false);

  return (
    <Grid container>
      <AlertModal
        isOpen={openModal1}
        onClose={modalHandleClose}
        text={alertText}
        closeBtn={false}
      />
      <Grid item xs={8}>
        <img src={loginImg} alt="dd" style={imgStyle} />
      </Grid>
      <Grid
        alignItems={"center"}
        sx={{
          position: "absolute",
          top: "50%",
          right: "5%",
          transform: "translateY(-50%)",
        }}
      >
        <Grid item sx={{ position: "relative" }}>
          <Grid container direction="column">
            <Stacks direction="row" spacing={2}>
              <Label htmlFor="id" required>
                이메일
              </Label>
              <Input
                type="email"
                id="id"
                size="small"
                onChange={onAuthChange}
              ></Input>
              <Button variant="contained" onClick={checkEmail}>
                중복확인
              </Button>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label htmlFor="password" required>
                비밀번호
              </Label>
              <Input
                type="password"
                id="password"
                size="small"
                onChange={onAuthChange}
                sx={{ width: "100%", pl: "50px" }}
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label htmlFor="passwordConfirm" required>
                비밀번호확인
              </Label>
              <Input
                type="password"
                id="passwordConfirm"
                size="small"
                onChange={onAuthChange}
                sx={{ width: "100%", pl: "50px" }}
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label htmlFor="tradeName" required>
                상호명
              </Label>
              <Input
                type="text"
                id="name"
                size="small"
                onChange={InfoChange}
                sx={{ width: "100%", pl: "50px" }}
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label htmlFor="bankName" required>
                은행명
              </Label>
              <Input
                type="text"
                id="bankName"
                size="small"
                onChange={InfoChange}
                sx={{ width: "100%", pl: "50px" }}
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label htmlFor="bankAccount" required>
                계좌번호
              </Label>
              <Input
                type="text"
                id="bankAccount"
                size="small"
                onChange={InfoChange}
                sx={{ width: "100%", pl: "50px" }}
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label required id="bizType">
                사업자분류
              </Label>
              <Select
                value={biz}
                id="bizType"
                onChange={bizChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                sx={{ width: "18.5rem" }}
              >
                <MenuItem value="개인사업자">개인사업자</MenuItem>
                <MenuItem value="법인사업자">법인사업자</MenuItem>
              </Select>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label required id="taxType">
                과세유형
              </Label>
              <Select
                value={tax}
                id="taxType"
                onChange={taxChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                sx={{ width: "18.5rem" }}
              >
                <MenuItem value="단위과세">단위과세</MenuItem>
                <MenuItem value="간이과세">간이과세</MenuItem>
              </Select>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label htmlFor="bizNum" required>
                사업자번호
              </Label>
              <Input
                type="text"
                id="bizNum"
                size="small"
                onChange={InfoChange}
                sx={{ width: "100%", pl: "50px" }}
              ></Input>
              <></>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label required id="image">
                사업자등록증
              </Label>
              <Input
                type="file"
                id="image"
                addept="img/*"
                size="small"
                sx={{ width: "18.5rem" }}
                onChange={(e) => {
                  setDetailFile(e.target.files[0]);
                }}
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label required htmlFor="adminName">
                관리자명
              </Label>
              <Input
                type="text"
                id="adminName"
                size="small"
                onChange={InfoChange}
                sx={{ width: "100%", pl: "50px" }}
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label required htmlFor="phone">
                전화번호
              </Label>
              <Input
                type="text"
                id="phone"
                size="small"
                onChange={InfoChange}
                sx={{ width: "100%", pl: "50px" }}
              />
            </Stacks>

            <Stacks direction="row" spacing={2}>
              <Label htmlFor="address" required>
                회사주소
              </Label>
              <Input
                type="text"
                id="address"
                size="small"
                onChange={InfoChange}
                sx={{ width: "100%", pl: "50px" }}
              />
            </Stacks>
            <Grid container justifyContent={"flex-end"} pt={1}>
              <Button variant="contained" onClick={join}>
                가입하기
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
