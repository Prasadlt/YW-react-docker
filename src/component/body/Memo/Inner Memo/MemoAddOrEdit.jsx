import { Tab, Tabs, Paper, Button } from "@material-ui/core";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./InnerMemo.module.css";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

function MemoAddOrEdit() {
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const memoDetails = useSelector((state) => state.memo);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function sendMemoDataToApi(memoData) {
    fetch("https://localhost:7142/api/Memos/SaveMemo", {
      method: "POST",
      body: JSON.stringify(memoData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        /* eslint-disable no-console */
        console.log(res);
      })
      .catch((err) => {
        /* eslint-disable no-console */
        console.log(err);
      });
  }

  function sendMemoDataToApiForEdit(memoData) {
    fetch("https://localhost:7142/api/Memos/UpdateMemo", {
      method: "POST",
      body: JSON.stringify(memoData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        /* eslint-disable no-console */
        console.log(res);
      })
      .catch((err) => {
        /* eslint-disable no-console */
        console.log(err);
      });
  }

  async function sendDataForApproval() {
    const memoFormData = memoDetails;
    const editDetails = JSON.parse(localStorage.getItem("editDetails"));
    const memoJSONData = {
      memoId: editDetails.editStatus ? editDetails.memoId : 0,
      detailsFrom: memoFormData.email,
      detailsOn: memoFormData.onDate,
      detailsSubject: memoFormData.subject,
      detailsContent: memoFormData.content,
      notes: memoFormData.notes,
      HistoryLastUpdatedOn: memoFormData.lastUpdatedOn,
      HistoryLastUpdatedBy: memoFormData.lastUpdatedBy,
      HistoryDocumentLockedBy: memoFormData.documentLockedBy,
      HistoryCreatedOn: memoFormData.createdOn,
      HistoryCreatedBy: memoFormData.createdBy,
      HistoryAdminAuthors: memoFormData.adminAuthors,
      HistoryDocumentAuthors: memoFormData.documentAuthors,
      HistoryAdminReaders: memoFormData.adminReaders,
      HistoryDocumentReaders: memoFormData.documentReaders,
      HistoryDetails: memoFormData.details
    };

    let statusMessage = "";
    if (editDetails.editStatus) {
      statusMessage = "Memo Edited Successfully";
      await sendMemoDataToApiForEdit(memoJSONData);
    } else {
      statusMessage = "Memo Added Successfully";
      await sendMemoDataToApi(memoJSONData);
    }

    await navigate("/layout/memo");
    setOpen(true);
    setSnackMessage(statusMessage);
  }

  return (
    <div className="memoContent">
      <div>
        <Snackbar
          ContentProps={{
            sx: {
              background: "blue",
              color: "white"
            }
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackMessage}
          action={action}
        />
        <header style={{ display: "flex" }}>
          <div style={{ width: "70%" }}>
            <h1 className="title">Memo</h1>
          </div>
          <div
            className="buttons"
            style={{ width: "30%", display: "flex", justifyContent: "space-evenly" }}>
            <Button onClick={() => navigate("/layout/memo")} className="cancelBtn">
              Back
            </Button>
            <Button onClick={sendDataForApproval} className="cancelBtn">
              Submit YW for Approval
            </Button>
          </div>
        </header>
        <div className="tab-div">
          <Paper square>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary">
              <Tab
                classes={{ selected: classes.tabTitleSelected }}
                className={classes.tabTitle}
                label="Details"
                to="/layout/memoAddorEdit/memoDetails"
                component={Link}></Tab>
              <Tab
                classes={{ selected: classes.tabTitleSelected }}
                className={classes.tabTitle}
                label="Notes"
                to="/layout/memoAddorEdit/memoNotes"
                component={Link}></Tab>
              <Tab
                classes={{ selected: classes.tabTitleSelected }}
                className={classes.tabTitle}
                label="Change History"
                to="/layout/memoAddorEdit/memoChangeHistory"
                component={Link}></Tab>
            </Tabs>
          </Paper>
        </div>
      </div>
      <div className="content">
        <Outlet context={[setSelectedTab, setOpen, setSnackMessage]} />
      </div>
    </div>
  );
}

export default MemoAddOrEdit;
