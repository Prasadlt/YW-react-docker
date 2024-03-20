import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { axiosGet } from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";
import { Grid } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
  {
    field: "company",
    headerName: "Company",
    type: "number",
    width: 150,
  },
  {
    field: "Action",
    headerName: "Action",
    type: "number",
    width: 150,
    renderCell: () => {
      return (
        <div>
          <ModeEditOutlineOutlinedIcon />
          <DeleteOutlineOutlinedIcon />
        </div>
      );
    }
  }
];

export default function DataTable() {
  const navigate = useNavigate();

  const [rows, setrow] = useState([]);

  useEffect(() => {
    //const base_uri = process.env.REACT_APP_API_BASE_URI;
    const response = axiosGet("https://localhost:7142/api/v1/users");
    response
      .then((res) => {
        setrow(res.data);
        //console.log("response", res.data);
      })
      .catch(() => {
        //console.error("Error occur", error);
      });
  }, []);

  return (
    <div>
      <Grid style={{ padding: "20px" }} container spacing={2}>
        <Grid item xs={6} style={{ textAlign: "left" }}>
          <h2>Contacts</h2>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/layout/contactDetails")}>
            Add New
          </Button>
        </Grid>
      </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
