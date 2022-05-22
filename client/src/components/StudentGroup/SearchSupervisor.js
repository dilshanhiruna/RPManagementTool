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
import React, { useEffect, useState } from "react";
import "./SearchSupervisor.css";

export default function SearchSupervisor() {
  function createData(name, researcharea) {
    return { name, researcharea };
  }

  const rows = [
    createData(" Nuwan Kodagoda (SE, HPC, PC,PL, ADD)", "Software Engineering"),
    createData(" Anuththara Kuruppu (SE)", "Software Engineering"),
    createData(" Udara Samaratunge (SE)", "Software Engineering"),
    createData(" Dinuka R. Wijendra (SE,PL,ADD)", "Software Engineering"),
    createData(" Disni Sriyaratna (SE, MC)", "Software Engineering"),
    createData(" Dilani Lunugalage (SE)", "Software Engineering"),
    createData(" Dilshan De Silva (SE)", "Software Engineering"),
    createData(" Nalaka Dissanayake (SE, RAAD)", "Software Engineering"),
    createData(" Shalini Rupasinghe (SE)", "Software Engineering"),
    createData(
      " Aruna Ishara Gamage (AR/VR)",
      "Artificial Intelligence and Machine Learning"
    ),
    createData(" Samanthi Eranga Siriwardene(SE)", "Software Engineering"),
    createData(
      " Thilmi Anuththara Kuruppu(PL,ADD,A/VR,RAAD)",
      "Distributed & Parallel Computing"
    ),
    createData(
      " Amali Upekha Gunasinghe(A/VR)",
      "Artificial Intelligence and Machine Learning"
    ),
    createData(" Vishan Jayasinghearachchi (SE, PL)", "Software Engineering"),
  ];

  const [selectedResearchArea, setSelectedResearchArea] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");

  const onSelecteResearchArea = (event) => {
    event.preventDefault();
    setSelectedResearchArea(event.target.value);
  };
  const onSelecteSupervisor = (event, name) => {
    event.preventDefault();
    setSelectedSupervisor(name);
  };
  useEffect(() => {
    setSelectedSupervisor("");
  }, [selectedResearchArea]);

  return (
    <div className="searchsupervisor__component">
      <div className="topicreg__form">
        <div>
          <h1>Search Supervisor</h1>
          <h3>Select a research interest area</h3>
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
                <MenuItem value={"Visual Computing"}>Visual Computing</MenuItem>
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
        </div>
        <div
          style={{ maxWidth: "500px", marginTop: "20px", textAlign: "justify" }}
          hidden={!selectedSupervisor}
        >
          <span>
            Do you want to send a request
            <b>{selectedSupervisor}</b> as the supervisor of your research group
            under the research area
            <b> {selectedResearchArea}</b>? Please not that after sending the
            request, you will not be able to request a another supervisor while
            the request is still pending.
          </span>
        </div>

        <div className="submittopic__button">
          <Button
            variant="contained"
            size="large"
            style={{
              height: "60px",
              width: "200px",
              borderRadius: "40px",
            }}
            disabled={!selectedSupervisor}
          >
            Request
          </Button>
        </div>
      </div>
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
              {rows
                .filter((row) => {
                  return row.researcharea === selectedResearchArea;
                })
                .map((row, key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.researcharea}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          onSelecteSupervisor(e, row.name);
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
