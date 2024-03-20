import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memoid: 0,
  email: "",
  onDate: "",
  subject: "",
  content: "",
  notes: "",
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
const MemoReducer = createSlice({
  name: "memo",
  initialState,
  reducers: {
    addDetails: (state, action) => {
      const { email, onDate, subject, content } = action.payload;
      state.email = email;
      state.onDate = onDate;
      state.subject = subject;
      state.content = content;
    },

    addNotes: (state, action) => {
      const { notes } = action.payload;
      state.notes = notes;
    },

    addHistory: (state, action) => {
      const {
        lastUpdatedOn,
        lastUpdatedBy,
        documentLockedBy,
        createdOn,
        createdBy,
        adminAuthors,
        documentAuthors,
        adminReaders,
        documentReaders,
        details
      } = action.payload;
      state.lastUpdatedOn = lastUpdatedOn;
      state.lastUpdatedBy = lastUpdatedBy;
      state.documentLockedBy = documentLockedBy;
      state.createdOn = createdOn;
      state.createdBy = createdBy;
      state.adminAuthors = adminAuthors;
      state.documentAuthors = documentAuthors;
      state.adminReaders = adminReaders;
      state.documentReaders = documentReaders;
      state.details = details;
    },

    getMemoList: (state, action) => {
      state = action.payload;
    }
  }
});

export const { addDetails, addNotes, addHistory, getMemoList } = MemoReducer.actions;
export default MemoReducer.reducer;
