/* eslint-disable no-console */
import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import { API } from "../../api/Api-Endpoint";
import { axiosGet } from "../../api/axiosApi";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Certificate = () => {
  const [certificateList, setcertificateList] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const base_uri = process.env.REACT_APP_API_BASE_URI;
    const response = axiosGet(base_uri + API.home.certificate);
    response
      .then((res) => {
        setcertificateList(res.data);
        console.log("response", res.data);
      })
      .catch((error) => {
        console.error("Error occur", error);
      });
  }, []);

  const columns = [
    { headerName: "Handover_Ref", field: "Handover_Ref", width: 240 },
    { headerName: "Last_Modified", field: "Last_Modified", width: 120 },
    { headerName: "Authorized_Person", field: "Authorized_Person", width: 220 },
    { headerName: "Contractors_Rep", field: "Contractors_Rep", width: 200 },
    { headerName: "Start_Date", field: "Start_Date", width: 100 },
    { headerName: "Completion_Date", field: "Completion_Date", width: 150 }
  ];

  const rows = certificateList?.map((item) => {
    return {
      id: item.id,
      Handover_Ref: item.handover_Reference,
      Last_Modified: item?.updatedOn !== "" ? item?.updaredOn : item?.createdOn,
      Authorized_Person: item?.authorized_Person,
      Contractors_Rep: item?.contractor_Representative,
      Start_Date: item?.commence_Date,
      Completion_Date: item?.Completion_Date
    };
  });
  console.log("column", columns);
  console.log("rows", rows);
  return (
    <div style={{padding:'20px',textAlign:'right'}}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate("/layout/certificateform")}>
        Add New Certificate
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      {/* <Box sx={{ height: 520, width: "100%" }}>
        {rows?.map((aa) => (
          <div key={"list_certificate"}>
            <Grid item xs={2} sm={4} md={4} key={aa.id}>
              <item>{aa.id}</item>
            </Grid>
            <Grid item xs={2} sm={4} md={4} key={aa.Handover_Ref}>
              <item>{aa.Handover_Ref}</item>
            </Grid>
            <Grid item xs={2} sm={4} md={4} key={aa.Authorized_Person}>
              <item>{aa.Authorized_Person}</item>
            </Grid>
            <Grid item xs={2} sm={4} md={4} key={aa.Contractors_Rep}>
              <item>{aa.Contractors_Rep}</item>
            </Grid>
          </div>
        ))}
      </Box> */}
    </div>
  );
};

export default Certificate;
