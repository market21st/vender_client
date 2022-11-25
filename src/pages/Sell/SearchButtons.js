import { Button, Grid } from "@mui/material";
import { reload } from "firebase/auth";

const SearchButtons = ({ onSearch, urlEvent, onReset, wd }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Button
        fullWidth
        type="submit"
        variant="outlined"
        style={{ padding: "6px 0", width: wd || "10%", margin: "10px" }}
        onClick={(e) => {
          onSearch(e);
          urlEvent && urlEvent(e);
        }}
      >
        필터 적용
      </Button>
      <Button
        fullWidth
        type="submit"
        variant="outlined"
        color="secondary"
        style={{ padding: "6px 0", width: wd || "10%", margin: "10px" }}
        onClick={() => {
          window.location.reload();
        }}
      >
        초기화
      </Button>
    </Grid>
  );
};

export default SearchButtons;
