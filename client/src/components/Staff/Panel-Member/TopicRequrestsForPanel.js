import * as React from "react";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { triggerBase64Download } from "common-base64-downloader-react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { columns, createObjResponse } from "./utils/TopicRequrestsForPanelUtil";
import MuiAlert from "@mui/material/Alert";

const API = process.env.REACT_APP_API;

//alert for snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TopicRequrestsForPanel({ user }) {
  //hooks for table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [pageIsLoadig, setPageIsLoading] = useState(true);

  //modal varivales
  const [openAddModal, setopenAddModal] = useState(false);

  //validation hooks
  const [valError, setValError] = useState(false);
  const [helperText, setHelperText] = useState("");

  //submission details of selected row (cuurent context)
  const [currentSubmissionId, setcurrentSubmissionId] = useState();
  const [currentgroupId, setcurrentgroupId] = useState();
  const [currentgroupObjectID, setcurrentgroupObjectID] = useState();
  const [feedback, setFeedback] = useState("");
  const [approveOrReject, setapproveOrReject] = useState(false);
  const [selectTagError, setselectTagError] = useState(false);

  //handle search vars
  const [searchByGroupId, setsearchByGroupId] = useState(null);
  const [searchByResearchTopic, setsearchByResearchTopic] = useState(null);

  //for confirmation snackbar
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
        .get(`${API}/studentSubmission/panel/topic/${user._id}`)
        .then((res) => {
          if (res.data.data.length == 0) {
            console.log("No topic reqs");
          } else {
            console.log(res.data.data);
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

  //function to handle accept or reject
  const handleAcceptOrReject = async (e) => {
    setapproveOrReject(e.target.value);
    setselectTagError(false);
  };

  //function to handle marks form input
  const handleFeedbackChange = async (e) => {
    await validateInput(e.target.value);
    setFeedback(e.target.value);
  };

  //function to validate input
  const validateInput = (feedback) => {
    if (feedback.length == 0) {
      setHelperText("Feedback cannot be empty");
      setValError(true);
      return false;
    } else if (feedback.length >= 100) {
      setHelperText("Feedback cannot exceed word limit 100");
      setValError(true);
      return false;
    } else {
      setValError(false);
      setHelperText("");
      return true;
    }
  };
  //function to provide marks for student submissions
  const addFeedBack = async () => {
    const isValid = await validateInput(feedback);
    await setshowErrorr(false);

    const approveOrRejectLocal = approveOrReject;
    if (!approveOrRejectLocal) {
      setselectTagError(true);
      return;
    }
    try {
      if (isValid) {
        let requestBody = {
          currentSubmissionId,
          topicFeedback: {
            approveOrReject,
            feedback,
          },
        };

        const result = await axios.put(
          `${API}/studentgroups/topicfeedback/${currentgroupObjectID}`,
          requestBody
        );
        if (result.data.success) {
          handleCloseAdd();
          setopenAlert(true);

          setTimeout(function () {
            window.location.reload();
          }, 1300);
        } else {
          setopenAlert(true);
          handleCloseAdd();
        }
      }
    } catch (error) {
      await setshowErrorr(true);
      setopenAlert(true);
      handleCloseAdd();
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
  const handleClickOpenAdd = (_id, groupId, groupObjectID) => {
    setcurrentSubmissionId(_id);
    setcurrentgroupId(groupId);
    setcurrentgroupObjectID(groupObjectID);
    setopenAddModal(true);
  };
  const handleCloseAdd = () => {
    setopenAddModal(false);
  };

  //function to search by group id
  const searchByGroupIdMethod = (e) => {
    setsearchByGroupId(e.target.value);
  };

  //function to search by submission name
  const searchByResearchTopicMethod = (e) => {
    setsearchByResearchTopic(e.target.value);
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
        {pageIsLoadig ? <LinearProgress color="inherit" /> : ""}
      </div>
      {rows.length != 0 ? (
        <>
          <h1 className="centerItems" style={{ marginBottom: "40px" }}>
            Topic Requests
          </h1>{" "}
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
              label="Search Research Topic"
              variant="outlined"
              onChange={searchByResearchTopicMethod}
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
                            {(!searchByGroupId && !searchByResearchTopic) ||
                            (searchByGroupId &&
                              !searchByResearchTopic &&
                              row["groupID"]
                                .toLowerCase()
                                .startsWith(searchByGroupId.toLowerCase())) ||
                            (searchByResearchTopic &&
                              !searchByGroupId &&
                              row["topic"]
                                .toLowerCase()
                                .startsWith(
                                  searchByResearchTopic.toLowerCase()
                                )) ||
                            (searchByGroupId &&
                              searchByResearchTopic &&
                              row["groupID"]
                                .toLowerCase()
                                .startsWith(searchByGroupId.toLowerCase()) &&
                              row["topic"]
                                .toLowerCase()
                                .startsWith(
                                  searchByResearchTopic.toLowerCase()
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
                                          </>
                                        ) : (
                                          <>
                                            <Button
                                              variant="contained"
                                              color="grey"
                                              onClick={() => {
                                                handleClickOpenAdd(
                                                  row["_id"],
                                                  row["groupID"],
                                                  row["groupObjectID"]
                                                );
                                              }}
                                            >
                                              Evaluate
                                            </Button>
                                            <Dialog
                                              open={openAddModal}
                                              onClose={handleCloseAdd}
                                            >
                                              <DialogTitle>
                                                {currentgroupId}
                                              </DialogTitle>
                                              <DialogContent>
                                                <DialogContentText>
                                                  Would you like to approve the
                                                  topic of group-
                                                  {currentgroupId} as the final
                                                  year research project?
                                                </DialogContentText>
                                                <br></br>
                                                <FormControl fullWidth>
                                                  <InputLabel id="demo-simple-select-label">
                                                    Evaluate Topic
                                                  </InputLabel>
                                                  <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Evaluate Topic"
                                                    error={selectTagError}
                                                    onChange={
                                                      handleAcceptOrReject
                                                    }
                                                    value={approveOrReject}
                                                  >
                                                    <MenuItem value="Approved">
                                                      Approve
                                                    </MenuItem>
                                                    <MenuItem value="Rejected">
                                                      Reject
                                                    </MenuItem>
                                                  </Select>
                                                </FormControl>
                                                <TextField
                                                  error={valError}
                                                  helperText={helperText}
                                                  autoFocus
                                                  multiline
                                                  defaultValue={feedback}
                                                  maxRows={4}
                                                  margin="dense"
                                                  id="name"
                                                  label="Provide Feedback"
                                                  fullWidth
                                                  variant="outlined"
                                                  onChange={
                                                    handleFeedbackChange
                                                  }
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
                                                  color="success"
                                                  onClick={() => addFeedBack()}
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
                                      {column.id == "submission" ? (
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
                  Topic Feedback Sent!
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
          <div>Oops no topic requests</div>{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
