import axios from "axios";
import { API } from "../../api/Api-Endpoint";
import { React, useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

import { Paper } from "@material-ui/core";
import {
  IconButton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const SiteGetData = () => {
  const [items, setData] = useState([]);
  const [page, pageChange] = useState(0);
  const [rowperpage, rowpageChange] = useState(5);

  //editicons
  const [editRowIndex, setEditRowIndex] = useState(null);

  const [editedRowData, setEditedRowData] = useState({});
  const handlechangepage = (event, newpage) => {
    pageChange(newpage);
  };
  const handlerowsperchange = (event) => {
    rowpageChange(+event.target.value);
    pageChange(0);
  };
  const columns = [
    { id: "siteId", name: "SiteId" },
    { id: "name", name: "Name" },
    { id: "address", name: "Address" },
    { id: "handover_No", name: "handover_No" },
    { id: "test_No", name: "test_No" },
    { id: "remedial_No", name: "remedial_No" },
    { id: "certificate_InProgress", name: "certificate_InProgress" },
    { id: "last_UpdatedOn", name: "last_UpdatedOn" },
    { id: "last_UpdatedBy", name: "last_UpdatedBy" },
    { id: "document_LockedBy", name: "document_LockedBy" },
    { id: "createdOn", name: "createdOn" },
    { id: "createdBy", name: "createdBy" }
    //   { id: "Edit", name: "Edit",
    // render:rowData=(
    //   <EditIcon onClick={()=>handleEdit(rowData.id)} />
    // ) },
  ];
  const handleEdit = (index, rowData) => {
    // if (editRowIndex === index) {
    //   console.log("edited", editedRowData);
    // } else {
    //   setEditRowIndex(index);
    //   setEditedRowData({ ...rowData });
    // }
    setEditRowIndex(index);
    setEditedRowData({ ...rowData });
  };
  const handleCancel = () => {
    setEditRowIndex(null);
  };
  const handleSave = () => {
    setEditRowIndex(null);
  };
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditedRowData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };
 // const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(null);
  const [showGrid, setshowGrid] = useState(true);
  const [showTabs, setshowTabs] = useState(false);

  const addNewSite = () => {
    //setTabOpen(true);
    //navigate(`/layout/siteform`);
    setshowGrid(false);
    setshowTabs(true);
    tabDisplay(1);
  };
  useEffect(() => {
    const fetchData = async () => {
      const baseURL = process.env.REACT_APP_API_BASE_URI;
      await axios({
        method: "GET",
        url: baseURL + API.getsites.GetSite
        //data: body  --to uncomment when we handle this POST request using FromBody in Backend API
      }).then((response) => {
        setData(response.data);

        //if (response.data.length > 0) {
        // setColumns(Object.keys(response.data[0]));
        // console.log(response.data);

        //}
      });
    };
    fetchData();
  }, []);

  const tabDisplay = (tabnumber) => {
    setIsOpen(tabnumber);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const siteData = {
      siteId: formData.siteId,
      name: formData.name,
      address: formData.address,
      handover_No: formData.handover,
      test_No: formData.test,
      remedial_No: formData.remedial,
      certificate_InProgress: formData.certificateinprogress
    };
    console.log(formData);
    const fetchData = async () => {
      const baseURL = process.env.REACT_APP_API_BASE_URI;
      await axios({
        method: "POST",
        url: baseURL + API.createsites.CreateSite,
        data: siteData
        //body  --to uncomment when we handle this POST request using FromBody in Backend API
      }).then((response) => {
        setData(response.data);

        console.log(response.data);

        //}
      });
    };
    fetchData();
  };
  const [formData, setFormData] = useState({
    siteId: "",
    name: "",
    address: "",
    handover: "",
    test: "",
    remedial: "",
    certificateinprogress: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div>
      {showTabs && (
        <div>
          {/* {istabopen && ( */}
          <div>
            <button onClick={() => tabDisplay(1)}>Sites</button>
            <button onClick={() => tabDisplay(2)}>Notes</button>
            <button onClick={() => tabDisplay(3)}>Change History</button>

            <div>
              {isOpen === 1 && (
                <div>
                  <Tab label="Sites" value={0} index={0} />
                  <form onSubmit={handleSubmit}>
                    <label>
                      ID:
                      <input
                        type="text"
                        name="siteId"
                        placeholder="Site_Id"
                        value={formData.siteId}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        placeholder="Site_Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Address:
                      <input
                        type="text"
                        name="address"
                        placeholder="Site_Address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Handover No:
                      <input
                        type="text"
                        name="handover"
                        placeholder="Site_HandoverNo"
                        value={formData.handover}
                        onChange={handleChange}
                      />
                    </label>

                    <label>
                      Test No:
                      <input
                        type="text"
                        name="test"
                        placeholder="Site_TestNo"
                        value={formData.test}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Remedial No:
                      <input
                        type="text"
                        name="remedial"
                        placeholder="Site_RemedialNo"
                        value={formData.remedial}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Certificate in Progress:
                      <input
                        type="text"
                        name="certificateinprogress"
                        placeholder="Site_CertInProg"
                        value={formData.certificateinprogress}
                        onChange={handleChange}
                      />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </div>
              )}
              <div>{isOpen === 2 && <Tab label="tab 2" />}</div>
            </div>
          </div>
          {/* )} */}
        </div>
      )}

      <div>
        {!showTabs && (
          <div>
            <button onClick={addNewSite}>Add site</button>
            {showGrid && (
            <div>
              <Paper>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Edit</TableCell>
                        {columns.map((column, columnIndex) => (
                          <TableCell
                            style={{ backgroundColor: "black", color: "white" }}
                            key={columnIndex}>
                            {column.name}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {items.map((publication) => (
              <TableRow key={publication.siteId}>{publication.name}
                <TableCell>{publication.name}</TableCell>
                <TableCell>{publication.address}</TableCell>
              </TableRow>
            ))} */}
                      {items &&
                        items
                          .slice(page * rowperpage, page * rowperpage + rowperpage)

                          .map((row, index) => {
                            return (
                              <TableRow key={index}>
                                {/* <EditIcon
                          onClick={() => {
                            console.log("id", row.siteId);
                            handleEdit(row.siteId);
                          }}
                        /> */}
                                <TableCell>
                                  {editRowIndex === index ? (
                                    <>
                                      <IconButton onClick={handleSave}>
                                        <SaveIcon />
                                      </IconButton>
                                      <IconButton onClick={handleCancel}>
                                        <CancelIcon />
                                      </IconButton>
                                    </>
                                  ) : (
                                    <IconButton onClick={() => handleEdit(index, row)}>
                                      <EditIcon />
                                    </IconButton>
                                  )}
                                </TableCell>

                                {columns &&
                                  columns.map((column, columnIndex) => {
                                    // let value = row[column.id];
                                    return (
                                      <TableCell key={columnIndex}>
                                        {/* {value} */}

                                        {editRowIndex === index ? (
                                          <TextField
                                            value={editedRowData[column.id] || row[column.id]}
                                            onChange={(e) =>
                                              handleInputChange(e, column.id)
                                            }></TextField>
                                        ) : (
                                          // (editRowIndex !== null && row[column.field]) || ""
                                          <span>{row[column.id]}</span>
                                        )}
                                      </TableCell>
                                    );
                                  })}
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[2, 4, 6]}
                  page={page}
                  count={items.length}
                  rowpageChange={rowperpage}
                  component="div"
                  onPageChange={handlechangepage}
                  onRowsPerPageChange={handlerowsperchange}></TablePagination>
              </Paper>
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SiteGetData;
