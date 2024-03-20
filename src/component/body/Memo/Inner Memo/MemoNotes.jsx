import { Button } from "@mui/material";
import "./MemoNotes.css";
import { useFormik } from "formik";
import { CgAttachment } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotes } from "../../../../store/Reducer/MemoReducer";
import { useSelector } from "react-redux";

function MemoNotes() {
  const [isEdit, setIsEdit] = useState(false);
  const [savedValues, setSavedValues] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setSelectedTab, setOpen, setSnackMessage] = useOutletContext();
  const memoDetails = useSelector((state) => state.memo);

  useEffect(() => {
    const editDetails = JSON.parse(localStorage.getItem("editDetails"));
    if (editDetails.editStatus) {
      const notesEditData = memoDetails;
      setSavedValues({
        notes: notesEditData.notes
      });
      setIsEdit(true);
    }
  }, []);

  const initialValues = {
    notes: ""
  };

  function changeAttachmentsHandler() {}

  const formik = useFormik({
    initialValues: isEdit ? savedValues : initialValues,
    onSubmit: (values) => {
      dispatch(addNotes(values));
      setSelectedTab(2);
      setOpen(true);
      setSnackMessage("Notes Saved Successfully");
      navigate("/layout/memoAddorEdit/memoChangeHistory");
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
        <div className="inner-div-full">
          <label>Your Notes : </label>
          <input
            type="text"
            id="notes"
            name="notes"
            required
            onChange={formik.handleChange}
            value={formik.values.notes}
          />
        </div>
        <div className="inner-div-full">
          <label>Attachments : </label>
          <div className="attachment-div">
            <button
              name="attachment"
              id="attachment"
              type="button"
              className="attachmentBtn"
              onClick={changeAttachmentsHandler}>
              Attach your documents <CgAttachment />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MemoNotes;
