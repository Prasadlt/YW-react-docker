/* eslint-disable no-console */
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  Autocomplete,
  Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IsDataFromAPI,
  AuthUserDetails,
  Sites,
  ContractorUserDetails,
  ContractorPersonData
} from "../../DataCollection";
import './Section.css';

const SectionOne = (props) => {
  const username = sessionStorage.getItem("username");
  const [type, setType] = useState("");
  const [site, setSite] = useState("");
  const [status, setStatus] = useState("");
  const [handover_reference, setHandover] = useState("Certificate_Testing_Handover8");
  const [person_name, setPersonname] = useState();
  const [contractor_name, setContractorName] = useState("");
  const [contractor_telephone_number, setContractorTele] = useState("");

  const [auth_person_telephone_number, setAuthTele] = useState("");
  const [representative_name, setRepresentative] = useState("");
  const [representative_telephone_number, setRepresentativeTele] = useState("");
  const [authorizedPersonDetails, setAuthorizedPersonDetails] = useState(
    props?.certificates !== undefined ? [props?.certificates?.authorized_Person] : []
  );
  const [contactorDetails, setContractorDetails] = useState();
  const [contactorRepDetails, setContractorRepDetails] = useState();
  const [siteOptions, setSiteOptions] = useState();
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    IsDataFromAPI && IsDataFromAPI[0].flag === false
      ? setSiteOptions(Sites)
      : fetch("https://localhost:7142/api/v1/sites")
          .then((response) => response.json())
          .then((data) => {
            setSiteOptions(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
  }, []);

  useEffect(() => {
    IsDataFromAPI && IsDataFromAPI[0].flag === false
      ? setAuthorizedPersonDetails(AuthUserDetails)
      : fetch("https://localhost:7142/api/v1/contacts/Authorized")
          .then((response) => response.json())
          .then((data) => {
            setAuthorizedPersonDetails(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
  }, []);

  useEffect(() => {
    IsDataFromAPI && IsDataFromAPI[0].flag === false
      ? setContractorDetails(ContractorUserDetails)
      : fetch("https://localhost:7142/api/v1/contacts/contractor")
          .then((response) => response.json())
          .then((data) => {
            setContractorDetails(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
  }, []);

  useEffect(() => {
    IsDataFromAPI && IsDataFromAPI[0].flag === false
      ? setContractorRepDetails(ContractorUserDetails)
      : fetch("https://localhost:7142/api/v1/contacts/contractor")
          .then((response) => response.json())
          .then((data) => {
            setContractorRepDetails(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
  }, []);

  useEffect(() => {
    IsDataFromAPI && IsDataFromAPI[0].flag === false
      ? setCertificates(ContractorPersonData)
      : fetch("https://localhost:7142/api/v1/certificates")
          .then((response) => response.json())
          .then((data) => {
            setCertificates(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
  }, []);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    let formData = {
      type: type,
      mode: "Manual",
      site: site,
      handover_Reference: "Certificate_Testing_Handover",
      authorized_Person: person_name,
      contractor: contractor_name,
      contractor_Representative: representative_name,
      authorized_Person_tele: auth_person_telephone_number,
      contractor_tele: contractor_telephone_number,
      contractor_Representative_tele: representative_telephone_number,
      site_Location: "",
      equipments: "Sewage Pump",
      access_Arrangements: "",
      work_Description: "Sewage Pump should be Cleaned.",
      commence_Date: "2024-01-05",
      completion_Date: "2025-06-30",
      isInspectionUnderTaken: "Yes",
      isStartOnSiteLetter: "Yes",
      isHealthNSaftey: "Yes",
      handover_Name: "",
      takeover_Name: "",
      handover_Date: "",
      handover_Comment: "",
      handback_Name: "",
      takeback_Name: "",
      handback_Date: "",
      handback_Comment: "",
      createdOn: "12-12-2023 08:03:13 AM",
      createdBy: username,
      updatedOn: "",
      updatedBy: "",
      isActive: "True",
      status: status ? status : "New"
    };

    await fetch("https://localhost:7142/api/v1/certificates", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((data) => {
        setCertificates(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    sessionStorage.setItem("certificate_id", "74f5936e-0917-49e8-bef7-da0e56442f28");
    console.log("siteoption", siteOptions);
  };

  return (
    <Box p="15px" className="tab-cls">
      <form onSubmit={handleSubmit(onSubmit)} id="hook-form">
        <Grid container rowSpacing={1} columnSpacing={10}>
          <Grid item xs={12} md={6}>
            <Typography mt="5px" component="div" align="left">
              Type
            </Typography>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label">
              {console.log(props?.certificate?.type)}
              <FormControlLabel
                value="test"
                control={
                  <Radio
                    name="type"
                    id="type"
                    checked={props?.certificate?.type === "test" ? true : false}
                  />
                }
                label="Test"
                disabled={props?.showDetails}
                onChange={(e) => setType(e.target.value)}
              />
              <FormControlLabel
                value="remedial"
                control={
                  <Radio name="type" id="type" checked={props?.certificate?.type === "remedial"} />
                }
                label="Remedial"
                disabled={props?.showDetails}
                onChange={(e) => setType(e.target.value)}
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography align="left">Status</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={1}
              sx={{ width: 400 }}
              // width={"75%"}
              fullWidth={true}
              disabled
              onChange={(e) => setStatus(e.target.value)}
              // onChange={handleChange}
            >
              <MenuItem value={1}>New</MenuItem>
              <MenuItem value={2}>Handover To Approve</MenuItem>
              <MenuItem value={3}>Handover Approved/Rejected</MenuItem>
              <MenuItem value={4}>Handback To Accept</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography align="left">Site*</Typography>
            <Autocomplete
              disabled={props.showDetails}
              inputValue={"River"}
              id="equipments"
              options={siteOptions?.map((item) => item?.name)}
              sx={{ width: 400 }}
              renderInput={(params) => (
                <TextField {...params} onChange={(e) => setSite(e.target.value)} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography align="left">Handover Reference*</Typography>
            <TextField
              id="handover_reference"
              name={"Handover Reference"}
              disabled={props.showDetails}
              sx={{ width: 400 }}
              inputProps={{
                maxLength: 255
              }}
              fullWidth
              value={handover_reference}
              placeholder="Enter handover reference"
              onChange={(e) => setHandover(e.target.value)}
            />
          </Grid>
          <Divider className='divider' variant="middle" />
          <Grid item xs={12} md={12}>
            <Typography
              align="left"
              mt="5px"
              color="#2441E5"
              fontWeight={600}
              className="heading-fl"
              component="div">
              Contact Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography align="left">Authorized person name*</Typography>
            <Autocomplete
              id="authorizedPersonDetails"
              disabled={props.showDetails}
              options={authorizedPersonDetails?.map((item) => item?.name)}
              sx={{ width: 400 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => setPersonname(e.target.value)}
                  value={authorizedPersonDetails}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography align="left">Telephone number*</Typography>
            <TextField
              id="auth_person_telephone_number"
              name={"Telephone number"}
              disabled={props.showDetails}
              sx={{ width: 400 }}
              value={auth_person_telephone_number}
              inputProps={{
                maxLength: 255
              }}
              fullWidth
              placeholder="Enter telephone number"
              onChange={(e) => setAuthTele(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography align="left">Contractor name*</Typography>
            <Autocomplete
              id="Contrator_Details"
              disabled={props.showDetails}
              options={contactorDetails?.map((item) => item?.name)}
              sx={{ width: 400 }}
              renderInput={(params) => (
                <TextField {...params} onChange={(e) => setContractorName(e.target.value)} />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography align="left">Telephone number*</Typography>
            <TextField
              id="contractor_telephone_number"
              name={"Contractor number"}
              sx={{ width: 400 }}
              inputProps={{
                maxLength: 255
              }}
              fullWidth
              disabled={props.showDetails}
              value={contractor_telephone_number}
              placeholder="Enter telephone number"
              onChange={(e) => setContractorTele(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography align="left">Contactor representative name*</Typography>
            <Autocomplete
              disabled={props.showDetails}
              inputValue={props?.showDetails && certificates[0]?.contractor_Representative}
              id="ContratorRep_Details"
              options={contactorRepDetails?.map((item) => item?.name)}
              sx={{ width: 400 }}
              renderInput={(params) => (
                <TextField {...params} onChange={(e) => setRepresentative(e.target.value)} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography align="left">Telephone number</Typography>
            <TextField
              id="representative_telephone_number"
              name={"Telephone number"}
              sx={{ width: 400 }}
              inputProps={{
                maxLength: 255
              }}
              fullWidth
              disabled={props.showDetails}
              value={representative_telephone_number}
              placeholder="Enter telephone number"
              onChange={(e) => setRepresentativeTele(e.target.value)}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SectionOne;
