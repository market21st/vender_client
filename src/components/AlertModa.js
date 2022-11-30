import React from "react";
import { Modal, Button, Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AlertModal = ({ isOpen, onClose, text, closeBtn }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nav = () => navigate("/");
  if (text && text?.includes("가입이 완료")) {
    onClose = nav;
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {text}
        </Typography>
        <Grid container justifyContent={"flex-end"} mt={3}>
          {closeBtn && (
            <Button variant="outlined" sx={{ marginRight: "13px" }}>
              아니요
            </Button>
          )}

          <Button variant="outlined" onClick={onClose}>
            네
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AlertModal;
