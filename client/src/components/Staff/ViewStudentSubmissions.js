import * as React from "react";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { triggerBase64Download } from "common-base64-downloader-react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Snackbar,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableCell,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Grid,
} from "@mui/material";
import NoData from "../Common/NoData";
import MuiAlert from "@mui/material/Alert";
import { columns, createObjResponse } from "./utils/viewStudentSubmissionsUtil";

//alert for snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const API = process.env.REACT_APP_API;

export default function ViewStudentSubmissions({ user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [pageIsLoadig, setPageIsLoading] = useState(true);
  const [openAddModal, setopenAddModal] = useState(false);
  const [openEditModal, setopenEditModal] = useState(false);
  const [valError, setValError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [marks, setMarks] = useState(50);
  const [currentSubmissionId, setcurrentSubmissionId] = useState();
  const [currentgroupId, setcurrentgroupId] = useState();
  const [currentsubmissionName, setcurrentsubmissionName] = useState();
  const [currentMarks, setcurrentMarks] = useState();
  const [searchByGroupId, setsearchByGroupId] = useState(null);
  const [searchBySubmissionName, setsearchBySubmissionName] = useState(null);
  const [openAlert, setopenAlert] = useState(false);
  const [showErrorr, setshowErrorr] = useState(false);

  //calling server endpoint through use effect hook
  useEffect(() => {
    getStudentSubmissions();
  }, []);

  //function to get student submissions of supervior and cosupervisor
  const getStudentSubmissions = async () => {
    try {
      let objArray = [];
      await axios
        .get(`${API}/studentSubmission/staff/${user._id}`)
        .then((res) => {
          if (res.data.data.length == 0) {
            console.log("No topic reqs");
          } else {
            res.data.data.map((data) => {
              let obj = createObjResponse(res, data);
              if (obj) objArray.push(obj);
            });
          }
        });
      setPageIsLoading(false);
      setRows(objArray);
    } catch (err) {
      console.log(err);
    }
  };

  //function to handle marks form input
  const handleMarkChange = async (e) => {
    await validateInput(e.target.value);
    setMarks(e.target.value);
  };

  //function to validate input
  const validateInput = (marks) => {
    if (marks < 0) {
      setHelperText("Marks cannot be a negetive value");
      setValError(true);
    } else if (marks > 100) {
      setHelperText("Marks cannot exceed 100");
      setValError(true);
    } else {
      setValError(false);
      setHelperText("");
    }
  };

  //function to provide marks for student submissions
  const addMarks = async () => {
    setshowErrorr(false);
    try {
      if (valError == false) {
        const result = await axios.put(
          `${API}/studentSubmission/addMarks/${currentSubmissionId}`,
          {
            marks,
          }
        );
        if (result.data.success) {
          handleCloseAdd();
          handleCloseEdit();
          setopenAlert(true);

          setTimeout(function () {
            window.location.reload();
          }, 1300);
        } else {
          setopenAlert(true);
          handleCloseAdd();
          handleCloseEdit();
        }
      }
    } catch (error) {
      await setshowErrorr(true);
      setopenAlert(true);
      handleCloseAdd();
      handleCloseEdit();
    }
  };

  //functions to manage table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //functions to handle add dialog
  const handleClickOpenAdd = (_id, groupId, submissionName) => {
    setcurrentSubmissionId(_id);
    setcurrentgroupId(groupId);
    setcurrentsubmissionName(submissionName);
    setopenAddModal(true);
  };
  const handleCloseAdd = () => {
    setopenAddModal(false);
  };

  //functions to handle edit dialog
  const handleClickOpenEdit = (_id, groupId, submissionName, currentMarks) => {
    setcurrentSubmissionId(_id);
    setcurrentgroupId(groupId);
    setcurrentsubmissionName(submissionName);
    setcurrentMarks(currentMarks);
    setopenEditModal(true);
  };
  const handleCloseEdit = () => {
    setopenEditModal(false);
  };

  //function to search by group id
  const searchByGroupIdMethod = (e) => {
    setsearchByGroupId(e.target.value);
  };

  //function to search by submission name
  const searchBySubmissionNameMethod = (e) => {
    setsearchBySubmissionName(e.target.value);
  };

  //function to close confirmation snackbar
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenAlert(false);
  };

  return (
    <>
      <div className="student__dashboard">
        <h1 className="centerItems" style={{ marginBottom: "40px" }}>
          Student Document Submissions
        </h1>{" "}
        {pageIsLoadig ? <LinearProgress color="inherit" /> : ""}
      </div>
      {rows.length != 0 ? (
        <>
          <div className="student__dashboard">
            <TextField
              style={{ backgroundColor: "#fcfcfc" }}
              id="standard-basic"
              label="Search Group ID"
              variant="outlined"
              onChange={searchByGroupIdMethod}
            />

            <TextField
              style={{
                marginLeft: "20px",
                width: 270,
                backgroundColor: "#fcfcfc",
              }}
              id="standard-basic"
              label="Search Submission Name"
              variant="outlined"
              onChange={searchBySubmissionNameMethod}
            />

            <Paper
              sx={{ width: "100%", overflow: "hidden" }}
              style={{ marginTop: "10px" }}
            >
              <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <>
                            {(!searchByGroupId && !searchBySubmissionName) ||
                            (searchByGroupId &&
                              !searchBySubmissionName &&
                              row["groupID"]
                                .toLowerCase()
                                .startsWith(searchByGroupId.toLowerCase())) ||
                            (searchBySubmissionName &&
                              !searchByGroupId &&
                              row["submissionName"]
                                .toLowerCase()
                                .startsWith(
                                  searchBySubmissionName.toLowerCase()
                                )) ||
                            (searchByGroupId &&
                              searchBySubmissionName &&
                              row["groupID"]
                                .toLowerCase()
                                .startsWith(searchByGroupId.toLowerCase()) &&
                              row["submissionName"]
                                .toLowerCase()
                                .startsWith(
                                  searchBySubmissionName.toLowerCase()
                                )) ? (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                {columns.map((column) => {
                                  if (column.id == "marks") {
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {row["marks"] ? (
                                          <>
                                            <Grid container spacing={1}>
                                              <Grid item xs={4}></Grid>
                                              <Grid item xs={2}>
                                                {row["marks"]}{" "}
                                              </Grid>
                                              <Grid item xs={2}>
                                                <EditIcon
                                                  color="success"
                                                  fontSize="small"
                                                  onClick={() => {
                                                    handleClickOpenEdit(
                                                      row["_id"],
                                                      row["groupID"],
                                                      row["submissionName"],
                                                      row["marks"]
                                                    );
                                                  }}
                                                />
                                              </Grid>
                                            </Grid>
                                            <Dialog
                                              open={openEditModal}
                                              onClose={handleCloseEdit}
                                            >
                                              <DialogTitle>
                                                {currentsubmissionName}
                                              </DialogTitle>
                                              <DialogContent>
                                                <DialogContentText>
                                                  Please provide marks for
                                                  group-
                                                  {currentgroupId} to the '
                                                  {currentsubmissionName}' below
                                                </DialogContentText>
                                                <TextField
                                                  error={valError}
                                                  helperText={helperText}
                                                  type="number"
                                                  autoFocus
                                                  margin="dense"
                                                  id="name"
                                                  label="Marks"
                                                  fullWidth
                                                  variant="outlined"
                                                  onChange={handleMarkChange}
                                                  defaultValue={currentMarks}
                                                  InputProps={{
                                                    inputProps: {
                                                      min: 0,
                                                      max: 100,
                                                    },
                                                  }}
                                                />
                                              </DialogContent>
                                              <DialogActions>
                                                <Button
                                                  onClick={handleCloseEdit}
                                                >
                                                  Cancel
                                                </Button>
                                                <Button
                                                  onClick={() => addMarks()}
                                                >
                                                  Submit
                                                </Button>
                                              </DialogActions>
                                            </Dialog>
                                          </>
                                        ) : (
                                          <>
                                            <AddIcon
                                              fontSize="small"
                                              color="primary"
                                              onClick={() => {
                                                handleClickOpenAdd(
                                                  row["_id"],
                                                  row["groupID"],
                                                  row["submissionName"]
                                                );
                                              }}
                                            />
                                            <Dialog
                                              open={openAddModal}
                                              onClose={handleCloseAdd}
                                            >
                                              <DialogTitle>
                                                {currentsubmissionName}
                                              </DialogTitle>
                                              <DialogContent>
                                                <DialogContentText>
                                                  Please provide marks for
                                                  group-
                                                  {currentgroupId} to the '
                                                  {currentsubmissionName}' below
                                                </DialogContentText>
                                                <TextField
                                                  error={valError}
                                                  helperText={helperText}
                                                  type="number"
                                                  autoFocus
                                                  margin="dense"
                                                  id="name"
                                                  label="Marks"
                                                  fullWidth
                                                  variant="outlined"
                                                  onChange={handleMarkChange}
                                                  InputProps={{
                                                    inputProps: {
                                                      min: 0,
                                                      max: 100,
                                                    },
                                                  }}
                                                />
                                              </DialogContent>
                                              <DialogActions>
                                                <Button
                                                  onClick={handleCloseAdd}
                                                >
                                                  Cancel
                                                </Button>
                                                <Button
                                                  onClick={() => addMarks()}
                                                >
                                                  Submit
                                                </Button>
                                              </DialogActions>
                                            </Dialog>
                                          </>
                                        )}
                                      </TableCell>
                                    );
                                  }
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.id == "marking" ? (
                                        <Button
                                          onClick={() =>
                                            triggerBase64Download(
                                              row["marking"].file,
                                              `${row["marking"].name}`
                                            )
                                          }
                                        >
                                          Download
                                        </Button>
                                      ) : column.id == "submission" ? (
                                        <Button
                                          style={{
                                            textTransform: "none",
                                          }}
                                          onClick={() =>
                                            triggerBase64Download(
                                              row["submission"].base64,
                                              `${row["submission"].name}`
                                            )
                                          }
                                        >
                                          {row["submission"].name}
                                        </Button>
                                      ) : (
                                        <>
                                          {" "}
                                          {column.format &&
                                          typeof value === "number"
                                            ? column.format(value)
                                            : value}
                                        </>
                                      )}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ) : (
                              ""
                            )}{" "}
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={openAlert}
              autoHideDuration={5000}
              onClose={handleAlertClose}
            >
              {showErrorr ? (
                <Alert severity="error" sx={{ width: "100%" }}>
                  Error Ocuured!
                </Alert>
              ) : (
                <Alert severity="success" sx={{ width: "100%" }}>
                  Assignment marks updated!
                </Alert>
              )}
            </Snackbar>
          </div>
        </>
      ) : (
        ""
      )}

      {pageIsLoadig == false && rows.length == 0 ? (
        <div className="student__dashboard">
          <NoData msg={"No any student submission yet"} type={"vss"}></NoData>{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
