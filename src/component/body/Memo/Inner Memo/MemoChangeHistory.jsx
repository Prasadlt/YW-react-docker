// import { useState } from "react";
import "./MemoChangeHistory.css";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHistory } from "../../../../store/Reducer/MemoReducer";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

function MemoChangeHistory() {
  const [isEdit, setIsEdit] = useState(false);
  const [savedValues, setSavedValues] = useState();
  const dispatch = useDispatch();
  const memoDetails = useSelector((state) => state.memo);
  const [setSelectedTab, setOpen, setSnackMessage] = useOutletContext();

  useEffect(() => {
    const editDetails = JSON.parse(localStorage.getItem("editDetails"));
    if (editDetails.editStatus) {
      const historyEditData = memoDetails;

      setSavedValues({
        lastUpdatedOn: historyEditData.lastUpdatedOn,
        lastUpdatedBy: historyEditData.lastUpdatedBy,
        documentLockedBy: historyEditData.documentLockedBy,
        createdOn: historyEditData.createdOn,
        createdBy: historyEditData.createdBy,
        adminAuthors: historyEditData.adminAuthors,
        documentAuthors: historyEditData.documentAuthors,
        adminReaders: historyEditData.adminReaders,
        documentReaders: historyEditData.documentReaders,
        details: historyEditData.details
      });
      setIsEdit(true);
    }
  }, []);

  const initialValues = {
    lastUpdatedOn: "",
    lastUpdatedBy: "",
    documentLockedBy: "",
    createdOn: "",
    createdBy: "",
    adminAuthors: "",
    documentAuthors: "",
    adminReaders: "",
    documentReaders: "",
    details: ""
  };

  const formik = useFormik({
    initialValues: isEdit ? savedValues : initialValues,
    onSubmit: (values) => {
      dispatch(addHistory(values));
      setSelectedTab(2);
      setOpen(true);
      setSnackMessage("Change History Saved Successfully");
    },
    enableReinitialize: true
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="save-div">
        <Button type="submit" className="cancelBtn">
          Save
        </Button>
      </div>
      <div className="outer-div">
        <div className="inner-div">
          <label>Last updated on : </label>
          <input
            type="date"
            required
            id="lastUpdatedOn"
            name="lastUpdatedOn"
            onChange={formik.handleChange}
            value={formik.values.lastUpdatedOn}
          />
        </div>
        <div className="inner-div">
          <label>Last updated by : </label>
          <input
            type="text"
            required
            id="lastUpdatedBy"
            name="lastUpdatedBy"
            onChange={formik.handleChange}
            value={formik.values.lastUpdatedBy}
          />
        </div>
        <div className="inner-div">
          <label>Document locked by : </label>
          <input
            type="text"
            required
            id="documentLockedBy"
            name="documentLockedBy"
            onChange={formik.handleChange}
            value={formik.values.documentLockedBy}
          />
        </div>
        <div className="inner-div">
          <label>Created on : </label>
          <input
            type="date"
            required
            id="createdOn"
            name="createdOn"
            onChange={formik.handleChange}
            value={formik.values.createdOn}
          />
        </div>
        <div className="inner-div-full">
          <label>Created by : </label>
          <input
            type="text"
            required
            id="createdBy"
            name="createdBy"
            onChange={formik.handleChange}
            value={formik.values.createdBy}
          />
        </div>
        <section className="line inner-div-full"></section>
        <div className="inner-div-full">
          <label className="inner-title">Security Details</label>
        </div>
        <div className="inner-div">
          <label>Admin authors : </label>
          <input
            type="text"
            required
            id="adminAuthors"
            name="adminAuthors"
            onChange={formik.handleChange}
            value={formik.values.adminAuthors}
          />
        </div>
        <div className="inner-div">
          <label>Document authors : </label>
          <input
            type="text"
            required
            id="documentAuthors"
            name="documentAuthors"
            onChange={formik.handleChange}
            value={formik.values.documentAuthors}
          />
        </div>
        <div className="inner-div">
          <label>Admin readers : </label>
          <input
            type="text"
            required
            id="adminReaders"
            name="adminReaders"
            onChange={formik.handleChange}
            value={formik.values.adminReaders}
          />
        </div>
        <div className="inner-div">
          <label>Document readers : </label>
          <input
            type="text"
            required
            id="documentReaders"
            name="documentReaders"
            onChange={formik.handleChange}
            value={formik.values.documentReaders}
          />
        </div>
        <section className="line inner-div-full"></section>
        <div className="inner-div-full">
          <label className="inner-title">Edit History</label>
        </div>
        <div className="inner-div-full">
          <label>Details : </label>
          <input
            type="text"
            required
            id="details"
            name="details"
            onChange={formik.handleChange}
            value={formik.values.details}
          />
        </div>
      </div>
    </form>
  );
}

export default MemoChangeHistory;
