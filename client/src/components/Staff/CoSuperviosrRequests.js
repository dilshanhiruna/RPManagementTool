import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  LinearProgress,
  IconButton,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import "./SupervisorDashboard.css";
import NoData from "../Common/NoData";
import { Grid, ThemeProvider, createTheme, Typography } from "@mui/material";
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from "./utils/StudentDetailsPopUp";
import { columns } from "./utils/sup-cosupRequestUtil";

const API = process.env.REACT_APP_API;

//themes
const theme = createTheme();

export default function CoSuperviosrRequests({ user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState();
  const [pageIsLoadig, setPageIsLoading] = useState(true);
  const [Students, setStudents] = useState([]);
  const [openGroupMemberModal, setOpenGroupMemberModal] = useState(false);
  const [groupId, setGroupId] = useState();
  const [_id, set_id] = useState();
  const [action, setAction] = useState();

  useEffect(() => {
    getTopicReqs();
  }, []);

  //function to get topic requests of the relevant supervisor
  const getTopicReqs = async () => {
    try {
      let objArray = [];
      await axios.get(`${API}/cosupervisorRequests/${user._id}`).then((res) => {
        if (res.data.data.length == 0) {
          console.log("No topic reqs");
        } else {
          res.data.data.map((data) => {
            const studentsArray = [
              data.student1,
              data.student2 ? data.student2 : "",
              data.student3 ? data.student3 : "",
              data.student4 ? data.student4 : "",
            ];
            const obj = {
              _id: data._id,
              groupID: data.groupID,
              reTopic: data.researchTopic,
              students: studentsArray,
            };
            objArray.push(obj);
          });
        }
      });
      setPageIsLoading(false);
      setRows(objArray);
    } catch (err) {
      console.log(err);
    }
  };

  //functions to handle view student members
  const handleClickOpenGroupMemberModal = (groupId, students) => {
    setOpenGroupMemberModal(true);
    setStudents(students);
    setGroupId(groupId);
  };
  const handleCloseOpenGroupMemberModal = () => {
    setOpenGroupMemberModal(false);
  };

  //function to accept/reject topic reqest
  const acceptOrReject = () => {
    let accRej = "";
    if (action == "Accept") {
      accRej = "accepted";
    } else if (action == "Reject") {
      accRej = "rejected";
    }
    axios
      .post(`${API}/cosupervisorRequests/acceptOrReject/${_id}`, {
        action: accRej,
      })
      .then(() => {
        window.location.reload();
      });
  };

  //get confirmation to accept or reject action
  const getConfirmation = (groupId, _id, action) => {
    setGroupId(groupId);
    set_id(_id);
    setAction(action);
    setOpenConfirmModal(true);
  };

  //functions to handle table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //function to handle modal close
  const handleModalClose = () => {
    setOpenConfirmModal(false);
  };

  return (
    <>
      <div>
        <div className="student__dashboard">
          <Grid container style={{ marginBottom: "70px" }}>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <div style={{ marginTop: "120px" }}>
                <div className="centerHorizontal">
                  <ThemeProvider theme={theme}>
                    <Typography
                      variant="h1"
                      sx={{ fontWeight: "regular", fontSize: 64 }}
                    >
                      Co-Supervioser
                    </Typography>
                  </ThemeProvider>
                </div>
                <div className="centerHorizontal">
                  <ThemeProvider theme={theme}>
                    <Typography
                      variant="h1"
                      sx={{ fontWeight: "regular", fontSize: 64 }}
                    >
                      Requests
                    </Typography>
                  </ThemeProvider>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  height: "400px",
                  maxHeight: "400px",
                  position: "relative",
                }}
              >
                <img
                  src={require("../../assets/images/studentGroup.gif")}
                  alt="paper"
                  style={{
                    display: "block",
                    width: " 100%",
                    height: "auto",
                    maxHeight: "550px",
                    maxWidth: "650px",
                    bottom: 0,
                    position: "absolute",
                  }}
                />{" "}
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          {pageIsLoadig ? <LinearProgress color="inherit" /> : ""}
        </div>
        {rows.length != 0 ? (
          <div className="student__dashboard">
            <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: 15 }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          // className="hash-table-border"
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
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              if (column.id == "students") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    <IconButton
                                      color="primary"
                                      onClick={() => {
                                        handleClickOpenGroupMemberModal(
                                          row["groupID"],
                                          row["students"]
                                        );
                                      }}
                                    >
                                      <GroupIcon />
                                      <Button>view</Button>
                                    </IconButton>
                                  </TableCell>
                                );
                              }
                              if (column.id == "accept") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    // className="hash-table-border"
                                  >
                                    <Button
                                      color="success"
                                      onClick={() => {
                                        getConfirmation(
                                          row["groupID"],
                                          row["_id"],
                                          "Accept"
                                        );
                                      }}
                                    >
                                      Accept
                                    </Button>
                                  </TableCell>
                                );
                              }
                              if (column.id == "reject") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    // className="hash-table-border"
                                  >
                                    <Button
                                      color="error"
                                      onClick={() => {
                                        getConfirmation(
                                          row["groupID"],
                                          row["_id"],
                                          "Reject"
                                        );
                                      }}
                                    >
                                      Reject
                                    </Button>
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  // className="hash-table-border"
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            {/* confirm modal */}
            <Dialog
              open={openConfirmModal}
              // onClose={handleCloseRemoveMember}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`${action} Topic`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Are you sure you want to ${action} the topic of group "${groupId}" ?`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleModalClose();
                  }}
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => {
                    acceptOrReject();
                  }}
                  autoFocus
                  color="error"
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          ""
        )}
        <BootstrapDialog
          onClose={handleCloseOpenGroupMemberModal}
          aria-labelledby="customized-dialog-title"
          open={openGroupMemberModal}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleCloseOpenGroupMemberModal}
          >
            Group {groupId} : Members
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>SID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Students.filter((std) => {
                    return std !== "";
                  }).map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.uid}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>

                      <TableCell>
                        {Students.indexOf(row) == 0 ? (
                          <div style={{ color: "red" }}>Leader</div>
                        ) : (
                          <div style={{ color: "green" }}>Member</div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </BootstrapDialog>
      </div>
      <div>
        {pageIsLoadig == false && rows.length == 0 ? (
          <div className="student__dashboard">
            <NoData
              msg={"Any student group has not requested you as co-supervisor"}
              type={"sup_cosup"}
            ></NoData>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
