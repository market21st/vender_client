import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
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

const Item = styled(InputLabel)(({ theme }) => ({
  width: "8rem",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(TextField)(({ theme }) => ({
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
  const navigate = useNavigate();

  // 회원가입 클릭시
  const onClick = () => {
    console.log("링크 이동");
    //navigate('/signup')
  };

  const [age, setAge] = useState("");
  const handleChange2 = (e) => {
    setAge(e.target.value);
  };
  const [age1, setAge1] = useState("");
  const handleChange1 = (e) => {
    setAge1(e.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [openModal1, setOpenModal1] = useState(false);
  const modalHandleClose = () => setOpenModal1(false);

  return (
    <Grid container>
      <AlertModal
        isOpen={openModal1}
        onClose={modalHandleClose}
        text={"모든정보를 기입해주세요"}
      />
      <Grid container alignItems={"center"}>
        <Grid item width={"30rem"}>
          <h2>회원가입</h2>
          <Grid container direction="column">
            <Stacks direction="row" spacing={2}>
              <Item htmlFor="id" required>
                아이디
              </Item>
              <Item2 type="text" id="id" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item htmlFor="pw" required>
                비밀번호
              </Item>
              <Item2 type="password" id="pw" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item htmlFor="pwCheck" required>
                비밀번호확인
              </Item>
              <Item2 type="password" id="pwCheck" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item htmlFor="name" required>
                상호명
              </Item>
              <Item2 type="text" id="name" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item htmlFor="bank" required>
                은행명
              </Item>
              <Item2 type="text" id="bank" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item htmlFor="num" required>
                계좌번호
              </Item>
              <Item2 type="text" id="num" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item required>사업자분류</Item>
              <SelectBox
                value={age}
                onChange={handleChange2}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
              >
                <MenuItem value="개인사업자">개인사업자</MenuItem>
                <MenuItem value="법인사업자">법인사업자</MenuItem>
              </SelectBox>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item required>과세유형</Item>
              <SelectBox
                value={age1}
                onChange={handleChange1}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
              >
                <MenuItem value="단위과세">단위과세</MenuItem>
                <MenuItem value="간이과세">간이과세</MenuItem>
              </SelectBox>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item required>사업자등록증</Item>
              <Item2 type="file" addept="img/*" size="small" padding></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item required htmlFor="userName">
                관리자명
              </Item>
              <Item2 type="text" id="userName" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item required htmlFor="phone">
                전화번호
              </Item>
              <Item2 type="text" id="phone" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item htmlFor="email" required>
                이메일
              </Item>
              <Item2 type="email" id="email" size="small"></Item2>
            </Stacks>
            <Stacks direction="row" spacing={2}>
              <Item htmlFor="address" required>
                회사주소
              </Item>
              <Item2 type="text" id="address" size="small"></Item2>
            </Stacks>
          </Grid>

          {/* 버튼 */}
          <Button
            variant="outlined" //contained 활성화
            sx={{ marginTop: 3 }}
          >
            가입하기
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
