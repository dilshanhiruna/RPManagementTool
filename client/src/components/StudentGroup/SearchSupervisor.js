import { Button, Chip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchSupervisor.css";

export default function SearchSupervisor({ user }) {
  const API = process.env.REACT_APP_API;

  //all supervisors in the system
  const [supervisors, setSupervisors] = useState([]);
  //Supervisor
  const [Supervisor, setSupervisor] = useState("");
  //Co-Supervisor
  const [CoSupervisor, setCoSupervisor] = useState("");
  //Supervisor Status
  const [SupervisorStatus, setSupervisorStatus] = useState("");
  //Co-SupervisorStatus
  const [CoSupervisorStatus, setCoSupervisorStatus] = useState("");

  const [selectedResearchArea, setSelectedResearchArea] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");

  //alearts
  const [showRejectedAlert, setShowRejectedAlert] = useState(true);

  const fetchGroupDetails = async () => {
    try {
      axios.get(`${API}/studentgroups/${user.studentGroupID}`).then((res) => {
        //set the supervisor and cosupervisor
        if (isNaN(res.data.data.supervisor)) {
          setSupervisor(res.data.data.supervisor.name);
        }
        if (isNaN(res.data.data.cosupervisor)) {
          setCoSupervisor(res.data.data.cosupervisor.name);
        }
        //set the supervisor status and cosupervisor status
        setSupervisorStatus(res.data.data.supervisorStatus);
        setCoSupervisorStatus(res.data.data.cosupervisorStatus);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroupDetails();

    axios
      .get(`${API}/users/supervisors`)
      .then((res) => {
        setSupervisors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSelecteResearchArea = (event) => {
    event.preventDefault();
    setSelectedResearchArea(event.target.value);
  };

  useEffect(() => {
    setSelectedSupervisor("");
  }, [selectedResearchArea]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (SupervisorStatus === "accepted") {
      const data = {
        cosupervisor: selectedSupervisor.id,
        status: "pending",
      };
      axios
        .put(`${API}/studentgroups/cosupervisor/${user.studentGroupID}`, data)
        .then((res) => {
          console.log(res);
        });
    } else {
      const data = {
        supervisor: selectedSupervisor.id,
        status: "pending",
      };
      axios
        .put(`${API}/studentgroups/supervisor/${user.studentGroupID}`, data)
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="searchsupervisor__component">
      {SupervisorStatus !== "accepted" && CoSupervisorStatus !== "accepted" ? (
        <div className="topicreg__form">
          <div>
            <h1>
              {SupervisorStatus === "accepted"
                ? "Search Co-Supervisor"
                : "Search Supervisor"}
            </h1>

            <Collapse
              in={
                SupervisorStatus !== "pending" &&
                CoSupervisorStatus !== "pending"
              }
            >
              <h3>Select your research interest area</h3>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Area</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedResearchArea}
                    label="Area"
                    onChange={(e) => {
                      onSelecteResearchArea(e);
                    }}
                  >
                    <MenuItem value={"Information Security"}>
                      Information Security
                    </MenuItem>
                    <MenuItem
                      value={"Artificial Intelligence and Machine Learning"}
                    >
                      Artificial Intelligence and Machine Learning
                    </MenuItem>
                    <MenuItem value={"ICT for Development"}>
                      ICT for Development
                    </MenuItem>
                    <MenuItem value={"Distributed & Parallel Computing"}>
                      Distributed & Parallel Computing
                    </MenuItem>
                    <MenuItem value={"Software Engineering"}>
                      Software Engineering
                    </MenuItem>
                    <MenuItem value={"Data Communication and Networking"}>
                      Data Communication and Networking
                    </MenuItem>
                    <MenuItem value={"Visual Computing"}>
                      Visual Computing
                    </MenuItem>
                    <MenuItem value={"Robotics @ Intelligent Systems"}>
                      Robotics & Intelligent Systems
                    </MenuItem>
                    <MenuItem value={"Data Science"}>Data Science</MenuItem>
                    <MenuItem value={"Design Lab"}>Design Lab</MenuItem>
                    <MenuItem value={"Assitive Technology"}>
                      Assitive Technology
                    </MenuItem>
                    <MenuItem value={"Elearning and Education"}>
                      Elearning and Education
                    </MenuItem>
                    <MenuItem value={"Computing Linguistics"}>
                      Computing Linguistics
                    </MenuItem>
                    <MenuItem value={"Business Intelligence and Analytics"}>
                      Business Intelligence and Analytics
                    </MenuItem>
                    <MenuItem value={"Human Computer Interaction"}>
                      Human Computer Interaction
                    </MenuItem>
                    <MenuItem value={"Internet of Things"}>
                      Internet of Things
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Collapse>
          </div>
          <Collapse
            in={
              SupervisorStatus === "pending" || CoSupervisorStatus === "pending"
            }
          >
            <Alert
              hidden
              severity="error"
              color="error"
              sx={{
                marginTop: "1rem",
              }}
            >
              A supervisor request is still pending!
            </Alert>
          </Collapse>
          <Collapse in={SupervisorStatus === "rejected"}>
            <Alert
              hidden
              severity="warning"
              color="warning"
              sx={{
                marginTop: "1rem",
              }}
            >
              Your previous request for supervisor has been rejected!
            </Alert>
          </Collapse>
          <Collapse in={CoSupervisorStatus === "rejected"}>
            <Alert
              hidden
              severity="warning"
              color="warning"
              sx={{
                marginTop: "1rem",
              }}
            >
              Your previous request for co-supervisor has been rejected!
            </Alert>
          </Collapse>
          <Collapse
            in={
              SupervisorStatus === "pending" || CoSupervisorStatus === "pending"
            }
          >
            <div
              style={{
                maxWidth: "500px",
                marginTop: "20px",
                textAlign: "justify",
              }}
            >
              <span>
                Your have already send a supervisor request to{" "}
                <b>
                  {SupervisorStatus === "accepted" ? CoSupervisor : Supervisor}
                </b>{" "}
                as the {SupervisorStatus === "accepted" ? "co-" : ""}supervisor
                of your research group. You won't be able to send another
                request while the previous one is still pending.
              </span>
            </div>
          </Collapse>
          <Collapse in={selectedSupervisor.name}>
            <div
              style={{
                maxWidth: "500px",
                marginTop: "20px",
                textAlign: "justify",
              }}
            >
              <span>
                Do you want to send a request <b>{selectedSupervisor.name}</b>{" "}
                as the {SupervisorStatus === "accepted" ? "co-" : ""}supervisor
                of your research group under the research area
                <b> {selectedResearchArea}</b>? Please not that after sending
                the request, you will not be able to request a another
                supervisor while the request is still pending.
              </span>
            </div>
          </Collapse>

          <div className="submittopic__button">
            <Button
              variant="contained"
              size="large"
              style={{
                height: "60px",
                width: "200px",
                borderRadius: "40px",
              }}
              disabled={
                !selectedSupervisor ||
                SupervisorStatus === "pending" ||
                CoSupervisorStatus === "pending"
              }
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Request
            </Button>
          </div>
        </div>
      ) : (
        <div className="topicreg__form">
          <h1>Y'all are Done 👏</h1>
          <h2 style={{ textAlign: "justify", width: "500px" }}>
            Your research group has been assigned a supervisor and a
            co-supervisor successfully! Your supervisor is <u>{Supervisor}</u>{" "}
            and your co-supervisor is <u>{CoSupervisor}</u>.
          </h2>
        </div>
      )}

      <div className="">
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 470 }}
          hidden={!selectedResearchArea}
        >
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Supervisor name</TableCell>
                <TableCell>Reasearch area</TableCell>
                <TableCell>Intrested?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supervisors
                .filter((row) => {
                  return row.interestedResearchField === selectedResearchArea;
                })
                .map((row, key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.interestedResearchField}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          setSelectedSupervisor({
                            name: row.name,
                            id: row._id,
                          });
                        }}
                        disabled={selectedSupervisor === row.name}
                      >
                        Yes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <img
        hidden={selectedResearchArea}
        src={require("../../assets/images/supervisors.png")}
        alt="supervisors"
        width={"40%"}
      />
    </div>
  );
}
