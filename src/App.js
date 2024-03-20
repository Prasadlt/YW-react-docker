import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/login/Login";
import Home from "./component/Home";
import ErrorBoundary from "./component/ErrorBoundary";
import Certificate from "./component/body/Certificate";
import Signout from "./component/Signout";
import Handover from "./component/body/Handover";
import Handbook from "./component/body/Handbook";
import Layout from "./component/layout/Layout";
import ProtectedRoutes from "./component/ProtectedRoutes";
import CertificateForm from "./component/body/certificate-form/CertificateForm";
import ContactDetailsTabs from "./component/contactDetails/ContactDetailTabs";
import ContactList  from "./component/contactDetails/ContactDetailList";  
import Memo from "./component/body/Memo/Memo";
import MemoDetails from "./component/body/Memo/Inner Memo/MemoDetails";
import MemoNotes from "./component/body/Memo/Inner Memo/MemoNotes";
import MemoChangeHistory from "./component/body/Memo/Inner Memo/MemoChangeHistory";
import MemoAddOrEdit from "./component/body/Memo/Inner Memo/MemoAddOrEdit";
import Site from "./component/body/Site";

function App() {
  //const role = sessionStorage.getItem("role");

  return (
    <ErrorBoundary>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/layout/" element={<Layout />}>
              <Route path="/layout/" element={<ProtectedRoutes />}>
                <Route path="handover" element={<Handover />} />
                <Route path="handbook" element={<Handbook />} />
                <Route path="siteform" element={<Site />} />

              </Route>
              <Route path="home" element={<Home />} />
              <Route path="certificate" element={<Certificate />} />
              <Route path="/layout/certificateform" element={<CertificateForm showDetails={true}/>} />
              <Route path="memo" element={<Memo />} />
              <Route path="memoAddorEdit" element={<MemoAddOrEdit />}>
                <Route path="" element={<Navigate replace to="memoDetails" />} />
                <Route path="memoDetails" element={<MemoDetails />} />
                <Route path="memoNotes" element={<MemoNotes />} />
                <Route path="memoChangeHistory" element={<MemoChangeHistory />} />
              </Route>
              <Route path="signout" element={<Signout />} />
              <Route path="contactDetails" element={<ContactDetailsTabs/>} />
              <Route path="Contact" element={<ContactList/>} />
              <Route path="site" element={<Site />} />


            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
