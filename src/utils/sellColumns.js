import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import { useState } from "react";
import { getStock } from "src/api/sell";
// components
import RegisterModal from "@pages/Sell/RegisterModal";
import CurrentStatus from "@pages/Sell/CurrentStatus";

function Counter({ params }) {
  const [islogout, setIsLogout] = useState(false);
  const modalHandleClose = () => {
    setIsLogout(false);
  };

  const [colorList, setColorList] = useState([]);

  const onClick = async () => {
    const { data, statusCode } = await getStock(params.row.id);
    if (statusCode === 200) {
      console.log(data.colors);
      setColorList(data.colors || []);
    }
    setIsLogout(true);
  };

  return (
    <>
      <Button
        onClick={onClick}
        sx={{
          border: "1px solid #3b3b3b",
          color: "#3b3b3b",
          borderRadius: "3px",
        }}
      >
        가격/재고
      </Button>
      <RegisterModal
        stock={colorList}
        isOpen={islogout}
        onClose={modalHandleClose}
        text={"가격/재고 등록"}
      />
    </>
  );
}

function List() {
  const [islogout, setIsLogout] = useState(false);
  const modalHandleClose = () => {
    setIsLogout(false);
  };
  const modalHandleOpen = () => {
    setIsLogout(true);
  };
  return (
    <>
      <Button
        onClick={modalHandleOpen}
        sx={{
          border: "1px solid #3b3b3b",
          color: "#3b3b3b",
          borderRadius: "3px",
        }}
      >
        판매 현황
      </Button>
      <CurrentStatus
        isOpen={islogout}
        onClose={modalHandleClose}
        text={"판매 현황"}
      />
    </>
  );
}

const sellColumns = [
  {
    field: "num",
    headerName: "No",
    width: 100,
  },
  {
    field: "name",
    headerName: "제품명",
    width: 350,
  },
  {
    field: "state",
    headerName: "상태",
    width: 120,
  },
  {
    field: "price",
    headerName: "판매가격",
    width: 150,
  },
  {
    field: "stock",
    headerName: "재고",
    width: 120,
  },
  {
    field: "register",
    headerName: "",
    width: 100,
    renderCell: (params) => {
      return <Counter params={params} />;
    },
  },
  {
    field: "current",
    headerName: "",
    width: 100,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation();
        console.log(params.id);
      };

      return <List />;
    },
  },
];

export default sellColumns;
