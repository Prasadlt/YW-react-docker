import { useNavigate } from "react-router-dom";
import "./Memo.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getMemoAction } from "../../../store/Action/MemoAction";
import { addDetails, addHistory, addNotes } from "../../../store/Reducer/MemoReducer";

function Memo() {
  const [memoList, setMemoList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEditButtonClick = (e, row) => {
    e.stopPropagation();
    const editDetails = {
      editStatus: true,
      memoId: row.memoId
    };
    localStorage.setItem("editDetails", JSON.stringify(editDetails));
    const savedDetailsValues = {
      email: row.detailsFrom,
      onDate: moment(row.detailsOn).format("yyyy-MM-DD"),
      subject: row.detailsSubject,
      content: row.detailsContent
    };
    const savedNotesValues = {
      notes: row.notes
    };
    const savedHistoryValues = {
      lastUpdatedOn: moment(row.historyLastUpdatedOn).format("yyyy-MM-DD"),
      lastUpdatedBy: row.historyLastUpdatedBy,
      documentLockedBy: row.historyDocumentLockedBy,
      createdOn: moment(row.historyCreatedOn).format("yyyy-MM-DD"),
      createdBy: row.historyCreatedBy,
      adminAuthors: row.historyAdminAuthors,
      documentAuthors: row.historyDocumentAuthors,
      adminReaders: row.historyAdminReaders,
      documentReaders: row.historyDocumentReaders,
      details: row.historyDetails
    };
    dispatch(addDetails(savedDetailsValues));
    dispatch(addNotes(savedNotesValues));
    dispatch(addHistory(savedHistoryValues));

    navigate("/layout/memoAddorEdit");
  };

  function onAddNewClick() {
    const editDetails = {
      editStatus: false,
      memoId: 0
    };
    localStorage.setItem("editDetails", JSON.stringify(editDetails));
    navigate("/layout/memoAddorEdit");
  }

  const columns = [
    { field: "memoId", headerName: "Memo Id", width: 90 },
    {
      field: "detailsFrom",
      headerName: "Details From",
      width: 250
    },
    {
      field: "detailsOn",
      headerName: "Details On",
      width: 250
    },
    {
      field: "detailsSubject",
      headerName: "Details Subject",
      type: "number",
      width: 240
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      renderCell: (params) => {
        return (
          <Button className="cancelBtn" onClick={(e) => onEditButtonClick(e, params.row)}>
            Edit
          </Button>
        );
      }
    }
  ];

  useEffect(() => {
    dispatch(getMemoAction()).then((response) => {
      setMemoList(response.data);
    });
  }, []);

  return (
    <div>
      <header style={{ display: "flex" }}>
        <div style={{ width: "80%" }}>
          <h1 className="title">Memo</h1>
        </div>
        <div className="buttons">
          <Button onClick={onAddNewClick} className="cancelBtn">
            Add Memo
          </Button>
        </div>
      </header>
      <div className="outer-div">
        <div className="inner-div-full" style={{ paddingTop: "2%" }}>
          <Box sx={{ height: 400, width: 930 }}>
            <DataGrid
              rows={memoList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5
                  }
                }
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              getRowId={(row) => row.memoId}
              disableColumnMenu
              disableColumnFilter
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Memo;
