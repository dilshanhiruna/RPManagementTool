import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import "./SupervisorDashboard.css";

const API = process.env.REACT_APP_API;

//table columns
const columns = [
  { id: "groupID", label: "Group ID", minWidth: 100, align: "center" },
  { id: "reTopic", label: "Research Topic", minWidth: 0, align: "center" },
  {
    id: "students",
    label: "Members",
    minWidth: 300,
    align: "center",
  },
  { id: "accept", label: "", minWidth: 50, align: "center" },
  { id: "reject", label: "", minWidth: 50, align: "center" },
];

export default function CoSuperviosrRequests({ user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState();
  const [pageIsLoadig, setPageIsLoading] = useState(true);
  const [Students, setStudents] = useState([]);
  const [openGroupMemberModal, setOpenGroupMemberModal] = useState(false);

  //set group id and action for topic request accept and reject
  const [groupId, setGroupId] = useState();
  const [_id, set_id] = useState();
  const [action, setAction] = useState();

  //function to get topic requests of the relevant supervisor
  const getTopicReqs = async () => {
    try {
      let objArray = [];

      await axios.get(`${API}/cosupervisorRequests/${user._id}`).then((res) => {
        if (res.data.data.length == 0) {
          console.log("No topic reqs");
        } else {
          // res.data.data.forEach((data) => {});
          let student1, student2, student3, student4;

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

  // show group memebrs dialog
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  // create BootstrapDialogTitle component to display group name on chat
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  //functions to handle view student members
  const handleClickOpenGroupMemberModal = (groupId, students) => {
    console.log(students);
    console.log(groupId);

    setOpenGroupMemberModal(true);
    setStudents(students);
    setGroupId(groupId);
  };
  const handleCloseOpenGroupMemberModal = () => {
    setOpenGroupMemberModal(false);
  };
  //function to accept/reject topic reqest
  const acceptOrReject = () => {
    console.log(_id);
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

    if (confirmAction) {
      console.log("true");
    } else {
      console.log("false");
    }
  };

  useEffect(() => {
    getTopicReqs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModalClose = () => {
    setOpenConfirmModal(false);
  };
  return (
    <>
      <div>
        <div className="student__dashboard">
          {pageIsLoadig ? <LinearProgress color="inherit" /> : ""}
        </div>
        {rows.length != 0 ? (
          <div className="student__dashboard">
            <h1 className="centerItems">Co-Supervioser Requests</h1>

            <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                                    <Button
                                      onClick={() => {
                                        handleClickOpenGroupMemberModal(
                                          row["groupID"],
                                          row["students"]
                                        );
                                      }}
                                    >
                                      view
                                    </Button>
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
            <div>No New Requests avaialable</div>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
