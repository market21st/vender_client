import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { auth } from "@config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

const Label = styled(InputLabel)(({ theme }) => ({
  width: "8rem",
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

const Signup = () => {
  const [detailFile, setDetailFile] = useState("");

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
    bizType: "",
    taxType: "",
    adminName: "",
    phone: "",
    address: "",
  });

  //사업자 분류
  const [biz, setBiz] = useState("");
  const bizChange = (e) => {
    setBiz(e.target.value);
    setUserInfo({ ...userInfo, bizType: e.target.value });
  };

  //과세유형
  const [tax, setTax] = useState("");
  const taxChange = (e) => {
    setTax(e.target.value);
    setUserInfo({ ...userInfo, taxType: e.target.value });
  };

  // 파이어베이스 가입 정보
  const { id, password, passwordConfirm } = autoInfo;
  function onAuthChange(e) {
    const { value, id } = e.target;
    setAuthInfo({
      ...autoInfo,
      [id]: value,
    });
  }

  // 회원가입 정보
  const {
    name,
    bankName,
    bankAccount,
    bizType,
    taxType,
    adminName,
    phone,
    address,
    bizNum,
  } = userInfo;
  function InfoChange(e) {
    const { value, id } = e.target;
    setUserInfo({
      ...userInfo,
      [id]: value,
    });
  }
  const formData = new FormData();
  console.log(passwordConfirm, password);
  // 가입하기 클릭시
  const join = async (e) => {
    if (e) e.preventDefault();

    // 유효성 검사 추가
    if (password != passwordConfirm) {
      setOpenModal1(true);
      setAlertText("비밀번호를 확인해주세요.");
      return;
    }

    const auth = getAuth();
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

    console.log(userInfo);

    for (let key in userInfo) {
      formData.append(key, userInfo[key]);
    }
    formData.append("file", detailFile && detailFile);

    // 추가 리스트
    const { data, statusCode } = await SignupUser(formData);
    if (statusCode === 200) {
      console.log("회원가입 성공");
      console.log(data);
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
    }
    if (statusCode === 400) {
      setOpenModal1(true);
      setAlertText("이미 사용중인 이메일입니다.");
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
      <Grid container alignItems={"center"}>
        <Grid item width={"30rem"}>
          <h2>회원가입</h2>
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
              <Button variant="outlined" onClick={checkEmail}>
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
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label htmlFor="tradeName" required>
                상호명
              </Label>
              <Input type="text" id="name" size="small" onChange={InfoChange} />
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
              />
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label required id="bizType">
                사업자분류
              </Label>
              <Select
                value={biz}
                // defaultValue={"개인사업자"}
                id="bizType"
                onChange={bizChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                sx={{ width: "12.2rem" }}
              >
                <MenuItem value="개인사업자">개인사업자</MenuItem>
                <MenuItem value="법인사업자">법인사업자</MenuItem>
              </Select>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Label required id="taxType">
                과세유형
              </Label>
              <SelectBox
                value={tax}
                id="taxType"
                onChange={taxChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                sx={{ width: "12.2rem" }}
              >
                <MenuItem autoFocus value="단위과세">
                  단위과세
                </MenuItem>
                <MenuItem value="간이과세">간이과세</MenuItem>
              </SelectBox>
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
                sx={{ width: "12.2rem" }}
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
              />
            </Stacks>
          </Grid>

          <Button
            variant="outlined" //contained 활성화
            sx={{ marginTop: 3 }}
            onClick={join}
          >
            가입하기
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
