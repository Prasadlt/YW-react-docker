// import { useState } from "react";
import { Button } from "@mui/material";
import "./MemoDetails.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDetails } from "../../../../store/Reducer/MemoReducer";
import { useSelector } from "react-redux";

function MemoDetails() {
  const [isEdit, setIsEdit] = useState(false);
  const [savedValues, setSavedValues] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memoDetails = useSelector((state) => state.memo);
  const [setSelectedTab, setOpen, setSnackMessage] = useOutletContext();

  useEffect(() => {
    const editDetails = JSON.parse(localStorage.getItem("editDetails"));
    if (editDetails.editStatus) {
      const detailsEditData = memoDetails;
      setSavedValues({
        memoid: editDetails.memoid,
        email: detailsEditData.email,
        onDate: moment(detailsEditData.onDate).format("yyyy-MM-DD"),
        subject: detailsEditData.subject,
        content: detailsEditData.content
      });
      setIsEdit(true);
    }
  }, []);

  const initialValues = {
    email: "",
    onDate: "",
    subject: "",
    content: ""
  };

  const formik = useFormik({
    initialValues: isEdit ? savedValues : initialValues,
    onSubmit: (values) => {
      /* eslint-disable no-console */
      console.log(values);
      dispatch(addDetails(values));
      setSelectedTab(1);
      setOpen(true);
      setSnackMessage("Details Saved Successfully");
      navigate("/layout/memoAddorEdit/memoNotes");
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
          <label>From : </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="inner-div">
          <label>On : </label>
          <input
            type="date"
            id="onDate"
            name="onDate"
            onChange={formik.handleChange}
            value={formik.values.onDate}
          />
        </div>
        <div className="inner-div-full">
          <label>Subject : </label>
          <input
            type="text"
            id="subject"
            name="subject"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
        </div>
        <div className="inner-div-full inner-div-content">
          <label>Content : </label>
          <textarea
            id="content"
            name="content"
            rows={3}
            onChange={formik.handleChange}
            value={formik.values.content}
          />
        </div>
      </div>
    </form>
  );
}

export default MemoDetails;
