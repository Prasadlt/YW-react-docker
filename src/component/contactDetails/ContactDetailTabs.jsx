import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { useFormik } from 'formik';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  //const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [contactNo, setcontactNo] = useState('');
  // const [officePhoneNo, setofficePhoneNo] = useState('');
  // const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [notification, setNotification] = useState('');
  const [note, setNote] = useState('');
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const handleClose = () => {
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="green"
        onClick={handleClose}
      >

      </IconButton>
    </React.Fragment>
  );

  const validateEmployee = (empData) => {
    const errors = {};

    if (!empData.firstName) {
      errors.firstName = 'Please Enter First Name';
    } else if (empData.firstName.length > 20) {
      errors.firstName = 'Name cannot exceed 20 characters';
    }

    if (!empData.lastName) {
      errors.lastName = 'Please Enter Last Name';
    } else if (empData.lastName.length > 20) {
      errors.lastName = 'Name cannot exceed 20 characters';
    }

    if (!empData.email) {
      errors.email = 'Please Enter Email ID';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(empData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!empData.contactNo) {
      errors.contactNo = 'Please Enter contactNo';
    } else if (empData.contactNo.length > 10) {
      errors.contactNo = 'Contact cannot exceed 10 characters';
    }

    if (!empData.officePhoneNo) {
      errors.officePhoneNo = 'Please Enter Office PhoneNo';
    } else if (empData.officePhoneNo.length > 10) {
      errors.officePhoneNo = 'officePhoneNo cannot exceed 10 characters';
    }

    if (!empData.company) {
      errors.company = 'Please Enter Company';
    } else if (empData.company.length > 20) {
      errors.company = 'Name cannot exceed 20 characters';
    }

    return errors;
  };

  const contactDetail = {
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    officePhoneNo: '',
    company: ''
  }

  const contactDetailEdit = {
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    officePhoneNo: '',
    company: ''
  }

  const formik = useFormik({
    initialValues: editMode ? contactDetailEdit : contactDetail,
    enableReinitialize: true,
    validate: validateEmployee,
    onSubmit: () => {
      handleSave();
      //setValue(1);
      //setOpen(true);
    }
  });



  useEffect(() => {
    setEditMode(true);

  }, []);


  const handleSave = () => {
    const payload = {
      id: '',
      name: formik.values.firstName,
      role: formik.values.lastName,
      mobileNumber: formik.values.contactNo,
      emailID: formik.values.email,
      officePhoneNo: formik.values.officePhoneNo,
      company: formik.values.company,
      address: address,
      city: city,
      country: country,
      postCode: postCode,
      notification: notification
    }

    axios({
      method: 'post',
      url: 'https://localhost:7142/api/v1/SaveUser',
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: payload,
    }).then(() => {
      setValue(1);
      setOpen(true);
    })
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          backgroundColor="green"
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Saved Successfully"
          action={action}
        />
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Contact Details" {...a11yProps(0)} />
            <Tab label="Notes" {...a11yProps(1)} />
            <Tab label="History" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <form onSubmit={formik.handleSubmit}>
            <Grid style={{ paddingTop: "15px" }} container spacing={2}>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>First Name</label>
              </Grid>
              <Grid item xs={3}>
                <input className="form-control" type="text" id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
                {formik.touched.firstName && formik.errors.firstName ? <span style={{ color: 'red' }}>{formik.errors.firstName}</span> : null}
              </Grid>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Last Name</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" className="form-control" id="lastName" name='lastName' value={formik.values.lastName} onChange={formik.handleChange} />
                {formik.touched.lastName && formik.errors.lastName ? <span style={{ color: 'red' }}>{formik.errors.lastName}</span> : null}
              </Grid>
            </Grid>
            <Grid style={{ paddingTop: "15px" }} container spacing={2}>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Email ID</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" id="email" className="form-control" value={formik.email} onChange={formik.handleChange} />
                {formik.touched.email && formik.errors.email ? <span style={{ color: 'red' }}>{formik.errors.email}</span> : null}
              </Grid>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Contact No</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" className="form-control" id="contactNo" value={formik.contactNo} onChange={formik.handleChange} />
                {formik.touched.contactNo && formik.errors.contactNo ? <span style={{ color: 'red' }}>{formik.errors.contactNo}</span> : null}
              </Grid>
            </Grid>
            <Grid style={{ paddingTop: "15px" }} container spacing={2}>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Office Phone No</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" className="form-control" id="officePhoneNo" value={formik.officePhoneNo} onChange={formik.handleChange} />
                {formik.touched.officePhoneNo && formik.errors.officePhoneNo ? <span style={{ color: 'red' }}>{formik.errors.officePhoneNo}</span> : null}
              </Grid>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Company</label>
              </Grid>
              <Grid item xs={3}>
                {/* <input type="text" id="company" value={formik.company} onChange={formik.handleChange} /> */}
                <select id="company" className="form-control" style={{ width: '100%' }} value={formik.company} onChange={formik.handleChange}>
                  <option value="">Select</option>
                  <option value="Yorkshire Water">Yorkshire Water</option>
                  <option value="Jacobs Field Service Ltd">Jacobs Field Service Ltd</option>
                </select>
                {formik.touched.company && formik.errors.company ? <span style={{ color: 'red' }}>{formik.errors.company}</span> : null}
              </Grid>
            </Grid>
            <Grid style={{ paddingTop: "15px" }} container spacing={2}>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Address</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" className="form-control" id="firstName" value={address} onChange={(e) => setAddress(e.target.value)} />
              </Grid>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Country</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" className="form-control" id="firstName" value={country} onChange={(e) => setCountry(e.target.value)} />
              </Grid>
            </Grid>
            <Grid style={{ paddingTop: "15px" }} container spacing={2}>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>City</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" className="form-control" id="firstName" value={city} onChange={(e) => setCity(e.target.value)} />
              </Grid>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Post Code</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" className="form-control" id="firstName" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
              </Grid>
            </Grid>
            <Grid style={{ paddingTop: "15px" }} container spacing={2}>
              <Grid item xs={2}>
                <label style={{ fontWeight: 'bold' }}>Notification</label>
              </Grid>
              <Grid item xs={3}>
                <input type="text" className="form-control" id="firstName" value={notification} onChange={(e) => setNotification(e.target.value)} />
              </Grid>
            </Grid>
            <Grid style={{ paddingTop: "15px", justifyContent: "center" }} container spacing={2}>
              <Button variant="contained" type='submit' style={{ backgroundColor: "rgb(25, 118, 210)", color: "white" }}>
                Save
              </Button>
              {/* <Button variant="contained"  type='submit' style={{ backgroundColor: "rgb(25, 118, 210)", color: "white" }}>
              Submit
            </Button> */}
            </Grid>
          </form>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid style={{ paddingTop: "15px" }} container spacing={2}>
            <Grid item xs={2} style={{ textAlign: "left", paddingLeft: "25px" }}>
              <label style={{ fontWeight: 'bold', fontSize: '125%' }}>Notes</label>
            </Grid>
            <Grid item xs={10} style={{ textAlign: "Right", paddingRight: "30px" }}>
              <Button variant="contained" style={{ marginRight: "10px" }}>
                Submit YW for Approval
              </Button>
              <Button variant="contained" style={{ backgroundColor: "rgb(25, 118, 210)", color: "white" }}>
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid style={{ padding: "15px" }} container spacing={2}>
            <Box my={4} display="flex" alignItems="center" gap={4} p={2} style={{ border: "1px solid grey", height: "200px", width: "100%" }}>
              <Grid item xs={12} style={{ textAlign: "left", paddingTop: "10px", paddingLeft: "20px" }}>
                <label>Your notes</label>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "left", paddingTop: "10px", paddingLeft: "20px" }}>
                <input type="text" className="form-control" id="yourNote" style={{ width: "98%" }} value={note} onChange={(e) => setNote(e.target.value)} />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "left", paddingTop: "10px", paddingLeft: "20px" }}>
                <label>Attachment</label>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "left", paddingTop: "10px", paddingLeft: "20px" }}>
                <input className="form-control" type="file" />
              </Grid>
            </Box>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </div>
  );
}