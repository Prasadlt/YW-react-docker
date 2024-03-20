import "./CertificateForm.css";
import { Tabs, Tab, Box, Button } from "@material-ui/core";
// import { FaArrowLeft } from "react-icons/fa";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import { TabPanel } from "./TabPanel";
import PropTypes from "prop-types";
import React, { useState } from 'react';

const CertificateForm = (props) => {
  const [showDetails, setShowDetails] = useState(props?.showDetails);
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  function changeTab(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSaveClick = () => {
    
  };

  const handleEdit = () => {
    setShowDetails(!props?.showDetails);
  };

  const handleSave = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Box className="main-box-container">
      <Box>
        <Button variant="outlined" onClick={handleSaveClick}>
          Submit YW for Approval
        </Button>
        {showDetails ? (
          <Button
            type="edit"
            variant="contained"
            form="hook-form"
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            form="hook-form"
            onClick={handleSave}
          >
            Save
          </Button>
        )}
      </Box>
      <Box className="child-box-container">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Section 1" {...changeTab(0)} />
            <Tab label="Section 2" {...changeTab(1)} />
            <Tab label="Section 3" {...changeTab(2)} />
            <Tab label="Section 4" {...changeTab(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SectionOne />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SectionTwo />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SectionThree />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SectionFour />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default CertificateForm;
